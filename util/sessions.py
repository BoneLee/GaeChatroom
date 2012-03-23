# -*- coding: utf-8 -*-
import os
import time
import datetime
import random
import Cookie
import logging
from google.appengine.api import memcache

# Note - please do not use this for production applications  这是神马情况？
# see: http://code.google.com/p/appengine-utitlies/

#为了安全考虑而不得不采用cookie来实现服务器和客户端的通信！
#否则，直接传递数据那是非常容易被窃取到的
#说明：服务器使用cookie本质上就是将cookie数据保存在memcache里面 在memcache里数据失效的时候 用户会话无效

COOKIE_NAME = 'osclub-chat-session-sid' #cookie名字 
DEFAULT_COOKIE_PATH = '/chat' #cookie路径 放在chat下面
SESSION_EXPIRE_TIME = 10800  #会话有效时间3 hours 
#注：2h内用户一直潜水的话会被退出聊天室 此后用户必须重新登录才可以聊天

class Session(object):

    def __init__(self):
        self.sid = None #服务器产生cookie的值 发送的cookie值就是它啦 self.cookie[COOKIE_NAME] = self.sid
        self.key = None #这是存在memcache里面的key  value是神马自己往下看 self.key = 'session-' + self.sid 
        self.session = None #这是存在memcache里面的key对应之value啦 里面是用户名和用户的数据库记录引用地址（通过它知道用户在数据库的信息）
        string_cookie = os.environ.get('HTTP_COOKIE', '') #获取浏览器发送给服务器的cookie
        ######logging.info("***********from brower client cookie:"+string_cookie) 
        self.cookie = Cookie.SimpleCookie() 
        self.cookie.load(string_cookie) #对cookie进行处理

        #下述判断条件不成立的情形：用户从来没有点击过登录界面或者是注册界面提交表单 那么服务器是不会发送cookie给浏览器的
        #如果用户已经注册并登录成功的话 那么浏览器每次post数据都会有这个cookie 包括用户查看成员列表 发送聊天消息 查看聊天记录
        #正因如此 数据传输安全性得以保证 
        if self.cookie.get(COOKIE_NAME): 
            self.sid = self.cookie[COOKIE_NAME].value #浏览器和服务器相互传输的cookie值
            #######logging.info("***********from brower client cookie sid:"+self.sid)
            self.key = 'session-' + self.sid 
            try:
              self.session = memcache.get(self.key) 
              #注意：cookie的值+session字串是session-sid 它是作为mem的key
            except:     #@@@@@@@@@@@@@@@@@@ 会话过期 会在此抛出异常 非常关键 @@@@@@@@@@@@@@@@@@
              self.session = None  #self.session = dict() 是一个字典
              
            #标识用户自上次登录后的又一次登录
            if self.session is None: 
               self.sid = None #一切重新来过 即便是用户曾经登录成功的话 再次登录会产生新的cookie
               self.key = None
               
        #下面的条件成立：当用户是第一次注册或者登录的时候 || 当用户会话过期再次登录或者注册的时候
        if self.session is None: 
            #当用户第一次访问该网页的时候给其分配一个sid
            self.sid = str(random.random())[5:]+str(random.random())[5:]+str(random.random())[5:]+str(random.random())[5:]
            #@@@@@@@@@@ 出于安全考虑 给你加上这么多随机数序列每个客户端的cookie应该唯一并且非常安全 其他人很难在仿制了吧 @@@@@@@@@@@@@@@@
            self.key = 'session-' + self.sid
            ###########logging.info('Creating session '+self.key);
            self.session = dict() #无值 见后self.session[keyname] = value设置值
            memcache.add(self.key, self.session, SESSION_EXPIRE_TIME)
            self.cookie[COOKIE_NAME] = self.sid
            self.cookie[COOKIE_NAME]['path'] = DEFAULT_COOKIE_PATH
            #发送cookie给用户端浏览器
            #通过header传输
            print self.cookie 
            #cookie的原理就是浏览器和服务器会话的时候 会一直发送cookie 
            #而检测cookie是否有效是通过memcache里面的数据过期来判定的
    
    # Private method to update the cache on modification 
    def _update_cache(self):
        memcache.replace(self.key, self.session, SESSION_EXPIRE_TIME)

    # Convenient delete with no error method
    def delete_item(self, keyname):
        if keyname in self.session:
            del self.session[keyname] 
            self._update_cache() #这个更新倒很关键

    # Support the dictionary get() method
    def get(self, keyname, default=None):
        if keyname in self.session:
            return self.session[keyname] 
        return default

    #使用方法见chat.py
    #self.session['username'] = acct #存用户名到memcache
    #self.session['userkey'] = pkey #存用户在数据库的记录引用地址到memcache
    # session[keyname] = value
    def __setitem__(self, keyname, value): #存数据到memcache 如果memcache里面有数据标识用户会话有效 当用户登录或者注册成功则执行此操作
        self.session[keyname] = value 
        self._update_cache()


    #使用方法： x = session[keyname]
    def __getitem__(self, keyname): #从memcache取数据 当用户登录或者注册成功以后 查看在线成员 查看消息记录 发送聊天信息的执行此操作 检测用户在线状态
        if keyname in self.session:
            return self.session[keyname]
        raise KeyError(str(keyname))

    #使用方法： del session[keyname]  
    def __delitem__(self, keyname): #删除memcache的数据 当用户离线的时候必须进行此操作
        if keyname in self.session:
            del self.session[keyname]
            self._update_cache() #每有数据更新的时候就更新memcache
            return
        raise KeyError(str(keyname)) 

    # if keyname in session :
    def __contains__(self, keyname):
        try:
            r = self.__getitem__(keyname)
        except KeyError:
            return False
        return True

    # x = len(session)
    def __len__(self):
        return len(self.session)
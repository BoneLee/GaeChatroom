# -*- coding: utf-8 -*-
import os
import logging
import cgi
import wsgiref.handlers
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from util.sessions import Session
from google.appengine.ext import db

from django.utils import simplejson
from google.appengine.api import channel, memcache, users

#用户数据模型
class User(db.Model):
  account = db.StringProperty() #账户
  password = db.StringProperty() #密码
  name = db.StringProperty() #真实姓名
  email = db.StringProperty() #邮箱
  is_online=db.BooleanProperty(default=False) #在线状态 默认不在线
  msg_font_color=db.StringProperty(default="#000000") #用户设置的聊天消息字体颜色
  created_time = db.DateTimeProperty(auto_now=True) #创建新用户时间


#聊天信息数据模型 当用户登录到聊天室时候 立即显示最近的n条消息
class ChatMessage(db.Model):
  user = db.ReferenceProperty() #发送消息的用户
  text = db.TextProperty() #消息内容
  created_time = db.DateTimeProperty(auto_now=True) #消息创建时间

''' '''
#私人消息数据模型 如果揉合到chatmessage里面 有些冗余 故而单独建模
class PChatMessage(db.Model):
  user_from = db.ReferenceProperty() #发送消息的用户
  user_to = db.StringProperty() #接收消息的用户
  #is_read=db.BooleanProperty(default=False) #消息读取状态 默认未读消息
  text = db.TextProperty() #消息内容
  created_time = db.DateTimeProperty(auto_now=True) #消息创建时间


def broadcast(message, online_users=None):
  '''
  函数作用：群发消息给在线成员
  '''
  if not online_users:
    online_users=memcache.get('online_users')
  if online_users:
    for id in online_users: 
    # it may take a while if there are many users in the room,
    #I think you can use task queue to handle this problem
      channel.send_message(id, message)

def doRender(handler, tname = 'chat.html', values = { }):
  '''
    函数作用：渲染模板 
    返回：模板渲染后的html给客户端
    参数： 
    handler表示每一个客户端请求; 
    tname表示模板文件名
    values表示模板变量
  '''
  
  temp = os.path.join(os.path.dirname(__file__),'templates/' + tname)
  if not os.path.isfile(temp): #注意：如果模板文件不存在则什么也不回返回 此处当心    
    return False           
  newval = dict(values) # Make a copy of the dictionary
  outstr = template.render(temp, newval)
  handler.response.out.write(outstr)
  return True

class LoginHandler(webapp.RequestHandler):
  '''
  类作用：用户登录页面的响应
  '''  
  def get(self):
    '''
    当用户登录聊天频道首页的时候调用 
    '''
    
    #如果url包含了login 则标识客户端的ajax请求 仅仅传送部分html网页即可
    if self.request.url.find('login') != -1: 
    #见register.html 中已经注册，点此<a href="#" onclick="$('#chat_main').load('/chat/login');return false;">返回</a>
      doRender(self,'login.html')
    #表示用户来到了聊天室主界面 url为/chat
    else:
      doRender(self,'chat.html',{'error' : None})
            
  def post(self):
    '''
    用户提交登录表单时候调用
    '''
    
    #登录的时候会发送cookie ！！！出于安全考虑 用户在和服务器通信的时候通过cookie来认证登录的用户！！！
    self.session = Session()       
    acct = cgi.escape(self.request.get('account')) #!!!安全考虑!!!
    pw = self.request.get('password')
    ######################logging.info('Checking account='+acct.encode('utf-8')+' pw='+pw.encode('utf-8'))

    #为什么要删除？？？因为浏览器会一直发送cookie 只要他曾经来登录过 或者注册过 
    #这样做方便后面更新memcache里面的数据
    self.session.delete_item('username')
    self.session.delete_item('userkey') 
    #delete_item见下源码
    #    def delete_item(self, keyname):
    #        if keyname in self.session:
    #            del self.session[keyname] 
    #            self._update_cache() #更新memcache
    #用户名或密码为空时候提示 已经在客户端js里面进行了判断 所以理论上不会出现这种情况
    if pw == '' or acct == '':
      doRender( self, 'login.html', {'error' : '系统提示：用户名或密码不能够为空！'})
      return
    
    #核对用户名和密码
    que = db.Query(User)
    que = que.filter('account =',acct)
    que = que.filter('password = ',pw)

    results = que.fetch(limit=1)
    
    #密码正确
    if len(results) > 0 : #这里改成！=1更加严密 因为用户名是唯一的
      user = results[0]
      
      #这里就是cookie的使用啦 look 
      #！！！保存用户信息到cookie里 此后用户和服务器通过cookie进行通信 而不是直接发送用户名和密码验证通信！！！
      self.session['userkey'] = user.key() #注意：这里是一个引用地址 而不是用户的密码！！！
      self.session['username'] = acct
      
      #当用户一旦登录成功了以后更新用户的在线状态 
      #############其实在线状态在OpenedSocketHandler里面更新最好
      #user.is_online = True
      #user.put()
      que = db.Query(ChatMessage).order('created_time');
      chat_list = que.fetch(limit=100)              
      ##############聊天记录应该看多少才合适呢？？？我是不是应该在后面加入一些命令？？？例如私人会话 或者是查看聊天记录的命令？？？
      if(len(chat_list)>0):
        doRender(self,'chatroom.html',{'username':self.session['username'],'chat_list': chat_list})                                             
      else:
        doRender(self,'chatroom.html',{'username':self.session['username'],'chat_list': None})
        #self.response.out.write("<p>无聊天记录</p>") 
    #密码错误
    else:
      doRender( self, 'login.html', {'error' : '系统提示：用户名或密码错误！'})
          
          
class RegisterHandler(webapp.RequestHandler):
  '''
  类作用：注册新用户响应
  '''
  def get(self):
    '''
    用户点击注册页面时候调用
    '''
    doRender(self, 'register.html')   

  def post(self):    
    '''
    用户提交注册表单时候调用
    '''
    #一旦用户提交注册信息 则发送cookie（客户端则将一直保存此cookie）
    #只可以放在这里 因为要将cookie放在head里面
    self.session = Session()

    name = cgi.escape(self.request.get('name'))
    acct = cgi.escape(self.request.get('account'))
    pw = self.request.get('password')
    mail = cgi.escape(self.request.get('email'))
    if pw == '' or acct == '' or name == '' or mail == '':
      doRender(self,'register.html', {'error' : '系统提示：用户名、密码、姓名、邮箱均为必填内容！'} )
      return

    #检查账户是否存在
    que = db.Query(User).filter('account =',acct)
    results = que.fetch(limit=1)
    #账户已经有人注册了
    if len(results) > 0 :
      doRender(self,'register.html', {'error' : '系统提示：此用户名已经有人注册了！'} )
      return

    #创建新用户
    newuser = User(name=name, account=acct, password=pw, email=mail)#,is_online=True);
    #############其实在线状态在OpenedSocketHandler里面更新最好
    pkey = newuser.put()
    
    #这里就是cookie的使用啦 look 
    #！！！保存用户信息到cookie里 此后用户和服务器通过cookie进行通信 而不是直接发送用户名和密码验证通信！！！
    self.session['username'] = acct
    self.session['userkey'] = newuser.key() 
    que = db.Query(ChatMessage).order('created_time');
    chat_list = que.fetch(limit=100)
    #############################多少合适呢？？？？？？？？？？ 
    if(len(chat_list)>0):
      doRender(self,'chatroom.html',{'username':self.session['username'],'chat_list': chat_list})               
    else:
      doRender(self,'chatroom.html',{'username':self.session['username'],'chat_list': None})
      #self.response.out.write("<p>无聊天记录</p>")
    
    

class GetTokenHandler(webapp.RequestHandler):
  '''
  类作用：用户注册成功或者登录成功以后向服务器申请channel api的token响应 
  返回给每个用户channel token
  '''
  def get(self):
    '''
    函数作用：向每一个用户返回一个chat channel token
    '''   
    
    user = "" #当前用户  
    session = Session()
    if 'username' in session:
      #！！！因为客户端发送的是cookie 所以只需要通过cookie来识别用户！！！
      user=session['username']
    else:
      #应该不可能出现
      doRender(self,'login.html',{'error' : '系统提示：会话过期，请重新登录！'})      
      return
    channel_id = user #使用用户名作为channel id来产生token 因为用户名是唯一的 而token也是唯一的       
    token = channel.create_channel(channel_id) #创建chat channel token 返回给客户端

    ############将用户的token存起来后面可能要使用 貌似后面用不到 确实用不到 去掉
    #session['usertoken'] = token       
    self.response.out.write(token) #返回token给客户端

class OpenedSocketHandler(webapp.RequestHandler):
  '''
  the handler for _ah/channel/connected/
  类作用：当客户端使用上述产生的token开启socket和服务器通信的时候调用
  '''
  def post(self):   
    '''
    客户端通过socket和服务器建立连接 群发消息 ××用户加入了聊天室
    '''
  
    #客户端通过socket和服务器建立连接的时候会发送from参数表示用户id 即是上述的channel id 也是用户名
    user=client_id = cgi.escape(self.request.get('from'))
    
    #更新用户在线状态
    que = db.Query(User)
    que = que.filter('account =',user)
    results = que.fetch(limit=1)
    if len(results) > 0 : #这里改成！=1更加严密 因为用户名是唯一的
      user_db = results[0]            
      #当用户一旦开启了soecket以后更新用户的在线状态 
      user_db.is_online = True
      user_db.put()
    
    #记录在线的用户！！！且记录的是用户id 不是token！！本来是可以直接查询数据库来找到在线成员的
    #但是从性能上考虑采用memcache更方便 将在线的用户id（即是用户名）存于memcache里
    online_users=memcache.get('online_users') or []
    if user not in online_users: #将在线用户储存在memcache里
      online_users.append(user) 
    memcache.set('online_users', online_users)  
    if online_users:                
      for id in online_users: 
        # it may take a while if there are many users in the room, 
        #I think you can use task queue to handle this problem
        channel.send_message(id, simplejson.dumps(u"<p>&lt;系统提示&gt; "+client_id+u"加入了聊天室！</p>")) 
    channel.send_message(user, simplejson.dumps(u"<p>&lt;系统提示&gt; 如需帮助请输入help！<p>"))   
        
    #将私人未读消息发送给用户 
    #.filter('is_read =',False)
    unread_msgs=db.Query(PChatMessage).filter('user_to =',user).order('created_time').fetch(limit=1000)#未读消息不会超过1000条吧 
    #建立一个搜索所有user数据的query
    query = User.all()   
    if len(unread_msgs)>0:     
      for i in unread_msgs: 
        key = i.user_from   #建立一个Key对象
        from_user = query.ancestor(key).get()   #使用key对象来获取实体
        message =('<p style="color:%s">' % from_user.msg_font_color)+ ('&lt;%s&gt; %s' % (from_user.account, i.text) )+'</p>'       
        json_data={"is_public":False,"user_from": from_user.account,"content":message,}
        channel.send_message( user, simplejson.dumps(json_data))  
        #from_user.is_read=True
        #from_user.put #更新为已读
    # Deleting multiple entities 从数据库中清除所有的未读消息
    db.delete(unread_msgs) 
        
class ChatlistHandler(webapp.RequestHandler): 
  '''
  类作用：返回用户要知道的聊天记录数
  '''
  def post(self):
    '''
    返回聊天记录
    '''
    #！！！需要查看会话是否过期 如果过期 则用户没有权限查看 安全考虑！！！
    session = Session() 
    #用户在聊天频道中
    if 'username' in session:      
      number=int(self.request.get('n') ) 
      if(number>=1):
        que = db.Query(ChatMessage).order('created_time');
        chat_list = que.fetch(limit=number)
        if(len(chat_list)>0):
          doRender(self,'chat_list.html',{'chat_list': chat_list})
        else:
          doRender(self,'chat_list.html',{'chat_list': chat_list})
          #self.response.out.write("<p>无聊天记录</p>")
      else: 
        self.response.out.write("<p>错误的命令</p>")
    else:
      self.response.out.write("<p>&lt;系统消息&gt：会话过期，请重新登录！</p>")
      #doRender( self, 'login.html', {'error' : '系统提示：会话过期，请重新登录！'})   

class FontSetHandler(webapp.RequestHandler):
  '''
  类作用：设置用户聊天字体颜色
  '''
  def post(self):
    '''
    返回设置成功或者失败的信息
    '''
    #！！！需要查看会话是否过期 如果过期 则用户没有权限查看 安全考虑！！！
    session = Session() 
    #用户在聊天频道中
    if 'username' in session:      
      font_color=self.request.get('color')
      if(font_color):
        que = db.Query(User).filter('account =',session['username'])
        results = que.fetch(limit=1)
        if len(results) > 0 :
          results[0].msg_font_color=font_color
          logging.info("setting font:"+results[0].msg_font_color)
          results[0].put()
          channel.send_message( session['username'], simplejson.dumps(u"<p>&lt;系统消息&gt;聊天字体颜色设置成功！</p>"))
        else:
          channel.send_message( session['username'], simplejson.dumps(u"<p>&lt;系统消息&gt;聊天字体颜色设置失败！服务器出错，用户名不存在！！！</p>"))
      else: 
        channel.send_message( session['username'], simplejson.dumps(u"<p>&lt;系统消息&gt;聊天字体颜色设置失败！</p>"))
    else:
      self.response.out.write("<p>&lt;系统消息&gt：会话过期，请重新登录！</p>")
      #doRender( self, 'login.html', {'error' : '系统提示：会话过期，请重新登录！'})   



class UserlistHandler(webapp.RequestHandler):
  '''
  类作用：查看在线用户
  '''
  def get(self):
    '''
    返回在线用户
    '''
    #！！！需要查看会话是否过期 如果过期 则用户没有权限查看 安全考虑！！！
    session = Session() 
    #用户在聊天频道中
    if 'username' in session:      
      online_members=db.Query(User).filter('is_online =',True).fetch(limit=10000)
      all_online_members=''
      for i in online_members:
        all_online_members+=u'“'+i.account+u'”    '
      channel.send_message( session['username'], simplejson.dumps(u"<p>&lt;系统消息&gt;当前在线人数："+str(len(online_members))+
          u" == "+all_online_members+"</p>"))  
    else:
      self.response.out.write("<p>&lt;系统消息&gt：会话过期，请重新登录！</p>")
      #doRender( self, 'login.html', {'error' : '系统提示：会话过期，请重新登录！'})   

class MembersHandler(webapp.RequestHandler):
  '''
  类作用：查看聊天平台注册用户和在线用户
  '''
  def get(self):
    '''
    返回注册人数 包括在线状态
    '''
    #！！！需要查看会话是否过期 如果过期 则用户没有权限查看 安全考虑！！！
    session = Session() 
    #用户在聊天频道中
    if 'username' in session:      
      que = db.Query(User).order('-is_online').order('-created_time');
      #总成员
      user_list = que.fetch(limit=10000) ###########有可能需要改动 limit=300 当协会聊天室人数超过1万的时候需要更改！！！
      #在线成员
      online_members=que.filter('is_online =',True).fetch(limit=10000)
      doRender(self, 'members.html', {'user_list': user_list,'all_members_count':len(user_list),'online_members_count':len(online_members)})
    else:
      doRender( self, 'login.html', {'error' : '系统提示：会话过期，请重新登录！'})   


class ReceiveMsgHandler(webapp.RequestHandler):
  '''
  类作用：接收客户端发送过来的群消息
  '''
  def post(self):
    '''
    作用：客户端发送消息时调用 然后将该消息群发给每一个在线的用户
    '''
    
    #使用username 来标识用户是否在线 客户端会话是否过期
    session = Session()
    if 'username' not in session:
      doRender( self, 'login.html',  {'error' : '系统提示：会话过期，请重新登录！'})
      return
      
    #消息主体  
    message = cgi.escape(self.request.get('content')) ###安全考虑过滤< > &
    if not message:
      return
    if len(message) > channel.MAXIMUM_MESSAGE_LENGTH: #消息过长！！！
      channel.send_message( session['username'], simplejson.dumps(u"<p>&lt;系统提示&gt;消息过长，请拆分发送！"+
       "(消息长度&lt;="+channel.MAXIMUM_MESSAGE_LENGTH+")</p>"))     
      return      
    online_users=memcache.get('online_users')
    if online_users:
      user_name=session['username']                                     
      msg_complete=""
      for line in message.splitlines(): #support multiline good
        msg_complete+=line+"<br>"
      #将用户的消息存储在数据库里面  方便当其他用户一来到聊天室的时候可以看到最近的消息记录       
      newchat = ChatMessage(user = session['userkey'], text=msg_complete)
      newchat.put()
      
      results = db.Query(User).filter('account =',session['username']).fetch(limit=1)
      if(len(results)>0):
        #将用户设置的消消息字体颜色风格加入
        message =('<p style="color:%s">' % results[0].msg_font_color)+ ('&lt;%s&gt; %s' % (user_name, msg_complete) )+'</p>'
        message = simplejson.dumps(message)
        broadcast(message)

class ReceivePMsgHandler(webapp.RequestHandler):
  '''
  类作用：接收客户端发送过来的私人消息
  '''
  def post(self):
    '''
    作用：客户端发送消息时调用 然后将该消息群发给每一个在线的用户
    '''
    
    #使用username 来标识用户是否在线 客户端会话是否过期
    session = Session()
    if 'username' not in session:
      doRender( self, 'login.html',  {'error' : '系统提示：会话过期，请重新登录！'})
      return
      
    #消息主体  
    message = cgi.escape(self.request.get('content')) ###安全考虑过滤< > &
    #user_from = cgi.escape(self.request.get('from')) ###安全考虑过滤< > &
    msg_to = cgi.escape(self.request.get('to')) ###安全考虑过滤< > &
    if not message or not msg_to:
      return
    #重要说明：为了区分私人消息和群消息 将发送的json数据加入一些字段
    if len(message) > channel.MAXIMUM_MESSAGE_LENGTH: #消息过长！！！
      json_data={"is_public":False,"user_to":msg_to,"content":u"<p>&lt;系统提示&gt;消息过长，请拆分发送！"+
        "(消息长度&lt;="+channel.MAXIMUM_MESSAGE_LENGTH+")</p>"}
      channel.send_message( session['username'], simplejson.dumps(json_data))     
      return      
    online_users=memcache.get('online_users')
    if online_users:
      user_name=session['username']                                     
      msg_complete=""
      for line in message.splitlines(): #support multiline good
        msg_complete+=line+"<br>"
      #from_user =db.Query(User).filter('account =',session['username']).fetch(limit=1)
      #从效率上看下面的方法要比上面的语句来的高效
      key = session['userkey']   #建立一个Key对象
      query = User.all()                 #建立一个搜索所有Bus数据的query
      from_user = query.ancestor(key).get()   #使用key对象来获取实体
      #将用户设置的消消息字体颜色风格加入
      if(from_user):
        message =('<p style="color:%s">' % from_user.msg_font_color)+ ('&lt;%s&gt; %s' % (user_name, msg_complete) )+'</p>'
      
      online_or_not=msg_to in online_users
      if online_or_not: #接收消息的用户在线        
        json_data={"is_public":False,"user_from":session['username'],"content":message}
        channel.send_message( msg_to, simplejson.dumps(json_data)) 
        json_data2={"is_public":False,"user_to":msg_to,"content":message}
        channel.send_message( from_user.account, simplejson.dumps(json_data2)) 
      else:
        #用户不在线 提醒将发送离线消息 等对方在线的时候方可查看消息
        json_data2={"is_public":False,"user_to":msg_to,"content":message}
        channel.send_message( session['username'], simplejson.dumps(json_data2)) 
        json_data={"is_public":False,"user_to":msg_to,"content":u"<p>&lt;系统提示&gt;用户不在线，你的消息将作为离线消息发送！</p>"}
        channel.send_message( session['username'], simplejson.dumps(json_data))

        #将用户的消息存储在数据库里面  方便当其他用户一来到聊天室的时候可以看到最近的离线消息记录       
        newchat = PChatMessage(user_from = session['userkey'],user_to=msg_to, text=msg_complete)#,is_read=online_or_not)
        newchat.put()  

class ClosedSocketHandler(webapp.RequestHandler):
  '''
  类作用：当用户关闭了聊天网页或者是离开了聊天网页时候调用
  '''
  def post(self):
    '''
    尤其注意：此post并不会发送cookie 所以不能够通过cookie来标识会话状态
    '''
    
    #但是和开启socket一样 当用户离开了网页便会关闭socket 同时会想服务器发送from字段标识用户id 即是用户名
    user=client_id = cgi.escape(self.request.get('from'))    
    que = db.Query(User)
    que = que.filter('account =',user)
    results = que.fetch(limit=1)

    if len(results) > 0 : #这里改成！=1更加严密
      user = results[0]     
      user.is_online = False
      #更新数据库状态
      user.put()    
    online_users=memcache.get('online_users')
    #从memcache的在线用户列表里面删除此用户
    online_users.remove(client_id)    
    memcache.set('online_users', online_users)
    for id in online_users: 
    # it may take a while if there are many users in the room,
    #I think you can use task queue to handle this problem
      channel.send_message(id, simplejson.dumps(u"<p>&lt;系统提示&gt; "+client_id+u"离开了聊天室！</p>"))

def main():
  application = webapp.WSGIApplication([
      ('/chat', LoginHandler), #登录聊天主页 
      ('/chat/login', LoginHandler), #提交登录表单
      ('/chat/register', RegisterHandler), #注册新用户 
      ('/chat/members', MembersHandler), #查看成员列表
      ('/chat/chat_list', ChatlistHandler), #查看消息历史记录
      ('/chat/set_font_color',FontSetHandler), #用户设置聊天字体
      ('/chat/online_user_list', UserlistHandler), #查看在线成员
      ('/chat/get_token', GetTokenHandler), #建立channel会话的token      
      ('/_ah/channel/connected/',OpenedSocketHandler), #客户端开启socket
      ('/chat/post_msg', ReceiveMsgHandler), #提交群聊天信息
      ('/chat/post_pmsg', ReceivePMsgHandler), #提交私人聊天信息
      ('/_ah/channel/disconnected/',ClosedSocketHandler), #客户端关闭socket     
     ],
     debug=False) #需要改成False
  wsgiref.handlers.CGIHandler().run(application)

if __name__ == '__main__':
  main()
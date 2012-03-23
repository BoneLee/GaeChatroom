/* 
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-17073626-1']);
_gaq.push(['_trackPageview']);

 (function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl': 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);

})();
什么是 Google Analytics（分析）？
Google Analytics（分析）可显示人们如何找到您的网站、如何浏览您的网站以及您如何能够改善访问者的体验。
这些信息有助于您提高网站的投资回报率、增加转化次数并通过网络获得更多收益。本指南可帮助您了解 Google Analytics（分析）的主要功能。
要开始使用 Google Analytics（分析），请使用您的 Google 帐户进行登录。
*/

 (function($) {

    var Vector = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;

    };

    Vector.prototype = {
        add: function(v) {
            this.x += v.x;
            this.y += v.y;
            return this;

        },
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y);

        },
        rotate: function(theta) {
            var x = this.x;
            var y = this.y;
            this.x = Math.cos(theta) * this.x - Math.sin(theta) * this.y;
            this.y = Math.sin(theta) * this.x + Math.cos(theta) * this.y;
            //this.x = Math.cos(theta) * x - Math.sin(theta) * y;
            //this.y = Math.sin(theta) * x + Math.cos(theta) * y;
            return this;

        },
        mult: function(f) {
            this.x *= f;
            this.y *= f;
            return this;

        }

    };

    var Leaf = function(p, r, c, ctx) {
        this.p = p || null;
        this.r = r || 0;
        this.c = c || 'rgba(255,255,255,1.0)';
        this.ctx = ctx;

    }

    Leaf.prototype = {
        render: function() {
            var that = this;
            var ctx = this.ctx;
            var f = Branch.random(1, 2)
            for (var i = 0; i < 5; i++) {
                (function(r) {
                    setTimeout(function() {
                        ctx.beginPath();
                        ctx.fillStyle = that.color;
                        ctx.moveTo(that.p.x, that.p.y);
                        ctx.arc(that.p.x, that.p.y, r, 0, Branch.circle, true);
                        ctx.fill();

                    },
                    r * 60);

                })(i);

            }

        }

    }


    var Branch = function(p, v, r, c, t) {
        this.p = p || null;
        this.v = v || null;
        this.r = r || 0;
        this.length = 0;
        this.generation = 1;
        this.tree = t || null;
        this.color = c || 'rgba(255,255,255,1.0)';
        this.register();

    };

    Branch.prototype = {
        register: function() {
            this.tree.addBranch(this);

        },
        draw: function() {
            var ctx = this.tree.ctx;
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.moveTo(this.p.x, this.p.y);
            ctx.arc(this.p.x, this.p.y, this.r, 0, Branch.circle, true);
            ctx.fill();

        },
        modify: function() {
            var angle = 0.18 - (0.10 / this.generation);
            this.p.add(this.v);
            this.length += this.v.length();
            this.r *= 0.99;
            this.v.rotate(Branch.random( - angle, angle));
            //.mult(0.996);
            if (this.r < 0.8 || this.generation > 10) {
                this.tree.removeBranch(this);
                var l = new Leaf(this.p, 10, this.color, this.tree.ctx);
                l.render();

            }

        },
        grow: function() {
            this.draw();
            this.modify();
            this.fork();

        },
        fork: function() {
            var p = this.length - Branch.random(100, 200);
            // + (this.generation * 10);
            if (p > 0) {
                var n = Math.round(Branch.random(1, 3));
                this.tree.stat.fork += n - 1;
                for (var i = 0; i < n; i++) {
                    Branch.clone(this);

                }
                this.tree.removeBranch(this);

            }

        }

    };

    Branch.circle = 2 * Math.PI;
    Branch.random = function(min, max) {
        return Math.random() * (max - min) + min;

    };
    Branch.clone = function(b) {
        var r = new Branch(new Vector(b.p.x, b.p.y), new Vector(b.v.x, b.v.y), b.r, b.color, b.tree);
        r.generation = b.generation + 1;
        return r;

    };
    Branch.rgba = function(r, g, b, a) {
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

    };
    Branch.randomrgba = function(min, max, a) {
        return Branch.rgba(Math.round(Branch.random(min, max)), Math.round(Branch.random(min, max)), Math.round(Branch.random(min, max)), a);

    };

    var Tree = function() {
        var branches = [];
        var timer;
        this.stat = {
            fork: 0,
            length: 0

        };
        this.addBranch = function(b) {
            branches.push(b);

        };
        this.removeBranch = function(b) {
            for (var i = 0; i < branches.length; i++) {
                if (branches[i] === b) {
                    branches.splice(i, 1);
                    return;

                }

            }

        };
        this.render = function(fn) {
            var that = this;
            timer = setInterval(function() {
                fn.apply(that, arguments);
                if (branches.length > 0) {
                    for (var i = 0; i < branches.length; i++) {
                        branches[i].grow();

                    }

                }
                else {
                    //clearInterval(timer);
                    }

            },
            1000 / 30);

        };
        this.init = function(ctx) {
            this.ctx = ctx;

        };
        this.abort = function() {
            branches = [];
            this.stat = {
                fork: 0,
                length: 0

            }

        };

    };


    function init() {

        // init

        var $window = $("drawArea");
        var $body = $("body");

        ///////////////////////////////////////////// 
        //此部分内容使得可以根据浏览器可见区域自动调整画布大小    
        var geometry = {};
        if (window.innerWidth) {
	  geometry.viewportWidth = window.innerWidth;
	  geometry.viewportHeight = window.innerHeight;

        }
        else if (document.documentElement && document.document.ClientWidth) {
	  geometry.viewportWidth = document.document.ClientWidth;
	  geometry.viewportHeight = document.document.ClientHeight;

        }
        else if (document.body.clientWidth) {
	  geometry.viewportWidth = document.body.clientWidth;
	  geometry.viewportHeight = document.body.clientHeight;

        }
        //var canvas_height = $window.height() *0.8;
        var canvas_width = 320; /*树canvas的宽度*/
        var canvas_height = 700; /*树canvas高度*/
        if(geometry.viewportWidth>1280){
	//var canvas_width = geometry.viewportWidth / 4;
	//var canvas_height = geometry.viewportHeight;
	$('#main').width(geometry.viewportWidth);
	canvas_width=(geometry.viewportWidth-640)/2;
        }

        //////////////////////////////////////
        var center_x = canvas_width / 2;
        var stretch_factor = 600 / canvas_height;
        var y_speed = 3 / stretch_factor;
        var $statMsg = $("#statMsg");

        // tx

        var canvas = $('#canvas')[0];
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        var ctx = canvas.getContext("2d");
        ctx.globalCompositeOperation = "lighter";

        // tree

        var t = new Tree();
        t.init(ctx);
        for (var i = 0; i < 3; i++) {
            new Branch(new Vector(center_x, canvas_height), new Vector(Math.random( - 1, 1), -y_speed), 5 / stretch_factor, Branch.randomrgba(0, 255, 0.3), t);

        }
        t.render(function() {
            $statMsg.html(this.stat.fork);

        });

        // events

      $("#drawArea").click(function(e) {
            //e.preventDefault();
            var x,
            y;
            //x = e.pageX - this.offsetLeft;
            //y = e.pageY - this.offsetTop;
            x = e.pageX - 900;
            y = e.pageY;
            new Branch(new Vector(x, canvas_height), new Vector(0, -y_speed), 5 / stretch_factor, Branch.randomrgba(0, 255, 0.3), t);

        });
        $("#btnClear3").click(function(e) {
            e.stopPropagation();
            t.abort();
            ctx.clearRect(0, 0, canvas_width, canvas_height);
            $statMsg.html("0");
	    return false;
        });
    }


    $(function() {
        init();

    });



})(jQuery);

 (function($) {

    function Vector(x, y) {
        this.x = x;
        this.y = y;

    };
    Vector.prototype = {
        rotate: function(theta) {
            var x = this.x;
            var y = this.y;
            this.x = Math.cos(theta) * x - Math.sin(theta) * y;
            this.y = Math.sin(theta) * x + Math.cos(theta) * y;
            return this;

        },
        mult: function(f) {
            this.x *= f;
            this.y *= f;
            return this;

        },
        clone: function() {
            return new Vector(this.x, this.y);

        },
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y);

        },
        subtract: function(v) {
            this.x -= v.x;
            this.y -= v.y;
            return this;

        },
        set: function(x, y) {
            this.x = x;
            this.y = y;
            return this;

        }

    };

    function Petal(stretchA, stretchB, startAngle, angle, growFactor, bloom) {
        //花瓣
        this.stretchA = stretchA;
        this.stretchB = stretchB;
        this.startAngle = startAngle;
        this.angle = angle;
        this.bloom = bloom;
        this.growFactor = growFactor;
        this.r = 1;
        this.isfinished = false;
        //this.tanAngleA = Garden.random(-Garden.degrad(Garden.options.tanAngle), Garden.degrad(Garden.options.tanAngle));
        //this.tanAngleB = Garden.random(-Garden.degrad(Garden.options.tanAngle), Garden.degrad(Garden.options.tanAngle));

    }
    Petal.prototype = {
        draw: function() {
            var ctx = this.bloom.garden.ctx;
            var v1,
            v2,
            v3,
            v4;
            v1 = new Vector(0, this.r).rotate(Garden.degrad(this.startAngle));
            v2 = v1.clone().rotate(Garden.degrad(this.angle));
            v3 = v1.clone().mult(this.stretchA);
            //.rotate(this.tanAngleA);
            v4 = v2.clone().mult(this.stretchB);
            //.rotate(this.tanAngleB);
            ctx.strokeStyle = this.bloom.c;
            ctx.beginPath();
            ctx.moveTo(v1.x, v1.y);
            ctx.bezierCurveTo(v3.x, v3.y, v4.x, v4.y, v2.x, v2.y);
            ctx.stroke();

        },
        render: function() {
            if (this.r <= this.bloom.r) {
                this.r += this.growFactor;
                // / 10;
                this.draw();

            } else {
                this.isfinished = true;

            }

        }

    }

    function Bloom(p, r, c, pc, garden) {
        this.p = p;
        this.r = r;
        this.c = c;
        this.pc = pc;
        this.petals = [];
        this.garden = garden;
        this.init();
        this.garden.addBloom(this);

    }
    Bloom.prototype = {
        draw: function() {
            var p,
            isfinished = true;
            this.garden.ctx.save();
            this.garden.ctx.translate(this.p.x, this.p.y);
            for (var i = 0; i < this.petals.length; i++) {
                p = this.petals[i];
                p.render();
                isfinished *= p.isfinished;

            }
            this.garden.ctx.restore();
            if (isfinished == true) {
                this.garden.removeBloom(this);

            }

        },
        init: function() {
            var angle = 360 / this.pc;
            var startAngle = Garden.randomInt(0, 90);
            for (var i = 0; i < this.pc; i++) {
                this.petals.push(new Petal(Garden.random(Garden.options.petalStretch.min, Garden.options.petalStretch.max), Garden.random(Garden.options.petalStretch.min, Garden.options.petalStretch.max), startAngle + i * angle, angle, Garden.random(Garden.options.growFactor.min, Garden.options.growFactor.max), this));

            }

        }

    }

    function Garden(ctx, element) {
        this.blooms = [];
        this.element = element;
        this.ctx = ctx;

    }
    Garden.prototype = {
        render: function() {
            for (var i = 0; i < this.blooms.length; i++) {
                this.blooms[i].draw();

            }

        },
        addBloom: function(b) {
            this.blooms.push(b);

        },
        removeBloom: function(b) {
            var bloom;
            for (var i = 0; i < this.blooms.length; i++) {
                bloom = this.blooms[i];
                if (bloom === b) {
                    this.blooms.splice(i, 1);
                    return this;

                }

            }

        },
        createRandomBloom: function(x, y) {
            this.createBloom(x, y, Garden.randomInt(Garden.options.bloomRadius.min, Garden.options.bloomRadius.max), Garden.randomrgba(Garden.options.color.min, Garden.options.color.max, Garden.options.color.opacity), Garden.randomInt(Garden.options.petalCount.min, Garden.options.petalCount.max));

        },
        createBloom: function(x, y, r, c, pc) {
            new Bloom(new Vector(x, y), r, c, pc, this);

        },
        clear: function() {
            this.blooms = [];
            this.ctx.clearRect(0, 0, this.element.width, this.element.height);

        }

    }

    Garden.options = {
        petalCount: {
            min: 5,
            max: 15

        },
        petalStretch: {
            min: 0.1,
            max: 3

        },
        growFactor: {
            min: 0.1,
            max: 1

        },
        bloomRadius: {
            min: 5,
            max: 20

        },
        density: 10,
        growSpeed: 1000 / 60,
        color: {
            min: 0,
            max: 40,//初始化的颜色值在这里
            opacity: 0.5

        },
        tanAngle: 90

    };
    Garden.random = function(min, max) {
        return Math.random() * (max - min) + min;

    };
    Garden.randomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;

    };
    Garden.circle = 2 * Math.PI;
    Garden.degrad = function(angle) {
        return Garden.circle / 360 * angle;

    };
    Garden.raddeg = function(angle) {
        return angle / Garden.circle * 360;

    };
    Garden.rgba = function(r, g, b, a) {
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

    };
    Garden.randomrgba = function(min, max, a) {
        return Garden.rgba(Math.round(Garden.random(min, max)), Math.round(Garden.random(min, max)), Math.round(Garden.random(min, max)), a);

    };
    Garden.previewColor = "rgba(127,127,127,0.4)";

    $(function() {

        function renderPreview(caller) {
            clearInterval(previewInterval);
            previewInterval = setInterval(function() {
                preview.render();

            },
            1);
            preview.clear();
            var $caller = $(caller);
            var id = $caller.attr("id");
            $previewArea.css({
                //以前是50 有点难看 因此改成了100
                top: 100, 
                //$caller.position().left - 40 //这下不会被遮挡住了			     
                left: 0 

            },
            100).fadeIn("slow");

        }

        function previewBloomRadius() {
	  /*
            $lblPreview.html("Size [left: min, right: max]");*/
            preview.createBloom(80, 100, Garden.options.bloomRadius.min, Garden.previewColor, Garden.options.petalCount.min);
            preview.createBloom(220, 100, Garden.options.bloomRadius.max, Garden.previewColor, Garden.options.petalCount.max);
	    

        }

        function previewPetalCount() {
	  /*
            $lblPreview.text("Petals [left: min, right: max]"); */
            preview.createBloom(80, 100, 30, Garden.previewColor, Garden.options.petalCount.min);
            preview.createBloom(220, 100, 30, Garden.previewColor, Garden.options.petalCount.max);
	   

        }

        function previewPetalStretch() {
	  /*
            $lblPreview.text("Bezier stretch factor"); */
            preview.createBloom(80, 100, 30, Garden.previewColor, Garden.options.petalCount.min);
            preview.createBloom(220, 100, 30, Garden.previewColor, Garden.options.petalCount.max);
	    

        }

        function previewColor() {
             /* $lblPreview.text("Color variability");  */
            for (var i = 1; i < 5; i++) {
                for (var j = 1; j < 4; j++) {
                    preview.createBloom(i * 60, j * 50, 20, Garden.randomrgba(Garden.options.color.min, Garden.options.color.max, Garden.options.color.opacity), Garden.random(Garden.options.petalCount.min, Garden.options.petalCount.max));

                }

            }

        }

        function onChangeBloomRadius(v, caller) {
            saveValues("bloomRadius", v);
            renderPreview(caller);
            previewBloomRadius();

        }

        function onChangePetalCount(v, caller) {
            saveValues("petalCount", v);
            renderPreview(caller);
            previewPetalCount();

        }

        function onChangePetalStretch(v, caller) {
            saveValues("petalStretch", v);
            renderPreview(caller);
            previewPetalStretch();

        }

        function onChangeColor(v, caller) {
            saveValues("color", v);
            renderPreview(caller);
            previewColor();

        }

        function saveValues(name, values) {
            Garden.options[name].min = values[0];
            Garden.options[name].max = values[1];

        }

        // variables

var mousePressed = false,
        lastPos = new Vector(0, 0),
        actualPos = new Vector(0, 0),
        $window = $(window),
        $lblPreview = $("#lblPreview");

        // garden

var gardenCtx,
        gardenCanvas,
        $garden,
        garden,
        previewInterval;

        // preview

var previewCtx,
        previewCanvas,
        $preview,
        preview,
        $previewArea;

        $garden = $("#garden");
        gardenCanvas = $garden[0];
 
        var geometry = {};
        if (window.innerWidth) {
	  geometry.viewportWidth = window.innerWidth;
	  geometry.viewportHeight = window.innerHeight;

        }
        else if (document.documentElement && document.document.ClientWidth) {
	  geometry.viewportWidth = document.document.ClientWidth;
	  geometry.viewportHeight = document.document.ClientHeight;

        }
        else if (document.body.clientWidth) {
	  geometry.viewportWidth = document.body.clientWidth;
	  geometry.viewportHeight = document.body.clientHeight;

        }
        //////////////////////////////////////////////////////////////
        gardenCanvas.width = 320;               
        if(geometry.viewportWidth>1280){
	gardenCanvas.width=(geometry.viewportWidth-640)/2;
        }
        gardenCanvas.height = 622;
        //////////////////////////////////////////////////////////////
        gardenCtx = gardenCanvas.getContext("2d");
        gardenCtx.globalCompositeOperation = "lighter";
        garden = new Garden(gardenCtx, gardenCanvas);

        // setup preview

        $preview = $("#preview");
        $previewArea = $("#previewArea");
        previewCanvas = $preview[0];
        previewCtx = previewCanvas.getContext("2d");
        previewCtx.globalCompositeOperation = "lighter";
        preview = new Garden(previewCtx, previewCanvas);

        // renderLoop

        setInterval(function() {
            garden.render();

        },
        Garden.options.growSpeed);

        // sliders

        $("#sliderBloomRadius").slider({
            range: true,
            min: 3,
            max: 40,
            values: [5, 20],
            start: function(e, ui) {
                onChangeBloomRadius(ui.values, this);

            },
            slide: function(e, ui) {
                onChangeBloomRadius(ui.values, this);

            }

        });

        $("#sliderPetalCount").slider({
            range: true,
            min: 3,
            max: 25,
            values: [5, 15],
            start: function(e, ui) {
                onChangePetalCount(ui.values, this);

            },
            slide: function(e, ui) {
                onChangePetalCount(ui.values, this);

            }

        });

        $("#sliderPetalStretch").slider({
            range: true,
            min: 0.2,
            max: 5,
            values: [0.1, 3],
            start: function(e, ui) {
                onChangePetalStretch(ui.values, this);

            },
            slide: function(e, ui) {
                onChangePetalStretch(ui.values, this);

            }

        });

        $("#sliderColor").slider({
            range: true,
            min: 0,
            max: 255,
            values: [0, 20],
            start: function(e, ui) {
                onChangeColor(ui.values, this);

            },
            slide: function(e, ui) {
                onChangeColor(ui.values, this);

            }

        });

        // events

      $garden.bind("mouseover", 
        function(e) {
            clearInterval(previewInterval);
            $previewArea.fadeOut("slow");

        });
        $garden.bind("mousedown", 
        function(e) {
            e.preventDefault();
            var x = e.clientX;
            //var y = e.clientY - 30;
            var y = e.clientY - 75;
            mousePressed = true;
            garden.createRandomBloom(x, y);

        });
        $garden.bind("mouseup", 
        function(e) {
            mousePressed = false;

        });
        $garden.bind("mousemove", 
        function(e) {
            var x = e.clientX;
            var y = e.clientY - 75;
            var l = actualPos.set(x, y).subtract(lastPos).length();
            if (mousePressed && l > (Garden.options.bloomRadius.max)) {
                garden.createRandomBloom(x, y);
                lastPos.set(x, y);

            }

        });
        $("#btnClear").click(function(e) {
            garden.clear();
	    return false;
        });
    });

})(jQuery);
/********************上面的代码完成html5的花朵和树canvas渲染 与聊天功能无关 仅仅是为了使聊天页面更绚丽而存在*************************/

/********************下面的函数与聊天功能紧密相关*************************/
function supports_canvas() {
  return !!document.createElement('canvas').getContext;
}
function supports_local_storage() {
  return ('localStorage' in window) && window['localStorage'] !== null;
}
$(function(){
  // 文档就绪
  if(!supports_canvas())
    error_window1=$.window({
	    title: "友情提示",
	    content: '<p></p><div style="padding:10px;"><p> 本聊天室采用html5搭建，但是你的浏览器并不支持html5 canvas！</p><p>如果你想正常访问本站，建议你：</p><p>(1)升级你的浏览器到最新版</p>'+
	      '<p>(2)使用较新的firefox、chrome或者opera浏览器，本聊天室在这些浏览器上面都通过测试！</p></div><center><button onclick="error_window1.close();">我知道了</button></center>',
	    draggable: true,
	    resizable: false,
	    maximizable: false,
	    minimizable: false,
	    showModal: true,
	    showFooter: false //不显示页脚	    
	  });
  if(!supports_local_storage())
    error_window2=$.window({
	    title: "友情提示",
	    content: '<p></p><div style="padding:10px;"><p> 本聊天室采用html5搭建，但是你的浏览器并不支持html5 本地存储！你的私人聊天信息将无法保存在本地！</p><p>如果你想正常访问本站，建议你：</p><p>(1)升级你的浏览器到最新版</p>'+
	      '<p>(2)使用较新的firefox、chrome或者opera浏览器，本聊天室在这些浏览器上面都通过测试！</p></div><center><button onclick="error_window2.close();">我知道了</button></center>',
	    draggable: true,
	    resizable: false,
	    maximizable: false,
	    minimizable: false,
	    showModal: true,
	    showFooter: false //不显示页脚	    
	  });	  
});


//由于采用的是ajax发送网页请求 因此仅仅更新局部网页即可 但是这些局部网页在加载成功以后需要运行一些js代码 这些代码如下

chat_windows={} //私聊窗口集合 全局函数
//对停靠的私聊窗口一些初始化工作
 $.window.prepare({
	        dock: 'bottom',       // change the dock direction: 'left', 'right', 'top', 'bottom' //这是停靠地方
	        animationSpeed: 500,  // set animation speed 越小闪得越快
	        minWinLong: 180,       // set minimized window long dimension width in pixel
	        handleScrollbar:false//[boolean:true] to handle browser scrollbar when window status changed(maximize, minimize, cascade)
	      });
	      
function newChatWindow(account,isminimized){
  if(!isminimized) isminimized=false;
  //新建聊天窗口 并注册一些事件 例如发送消息
  pchatWnd=$.window({        
    //showModal: false,//控制是否模态对话框
    //modalOpacity: 0.5,//控制透明度
    containerClass: "my_container",
    headerClass: "my_header",
    frameClass: "my_frame",
    //footerClass: "my_footer",
    selectedHeaderClass: "my_selected_header",
		
    icon: "/static/img/favicon.ico",//标题栏icon
    title: "To "+account,
    //showFooter: false, //不显示页脚
    showRoundCorner: true, //圆角
    createRandomOffset: {x:20, y:15},//为了不让多个窗口重叠在一起所做的工作
    draggable: true, //窗口是否可以拖动
    resizable: true, //是否可以放大缩小
    maximizable: false,//是否可以最大化
    minimizable: true,//是否可以最小化    
    x: -1,               // the x-axis value on screen, if -1 means put on screen center
    y: -1,               // the y-axis value on screen, if -1 means put on screen center
    width: 500,           // window width
    height: 400,          // window height
    minWidth: 200,        // the minimum width, if -1 means no checking
    minHeight: 100,       // the minimum height, if -1 means no checking
    maxWidth: 500,        // the minimum width, if -1 means no checking
    maxHeight: 400,       // the minimum height, if -1 means no checking
    scrollable: false,    // a boolean flag to show scroll bar or not
    content: $("#private_chat").html(), // load window_block5 html content
    showFooter: false,	//[boolean:true] to control show footer panel		
    //footerContent:"", 	//[html string, jquery object, element:""] same as content attribute, but it's put on footer panel.
    onClose: function(wnd) { // a callback function while user click close button
      delete chat_windows[account];
    },
    afterMinimize: function(wnd) { // a callback function after window minimized
      var title=wnd.getTitle();      
      if(title.indexOf("From")>=0){ wnd.showIcon(); wnd.setTitle(title.replace(/From/i, "To"));}
      else  wnd.hideIcon();
    },
    afterMaximize: function(wnd) { // a callback function after window maximized
      wnd.showIcon();
    },
    afterCascade: function(wnd) { // a callback function after window cascaded
      wnd.showIcon();
    } //窗口正常显示的时候调用
  });
  if(isminimized){
    title=pchatWnd.getTitle();
    pchatWnd.setTitle(title.replace(/To/i, "From"));
    pchatWnd.minimize();//
  }
  //sampleWnd.alignCenter();//窗口居中
  chat_windows[account]=pchatWnd;
  //注册一些事件
  var container=pchatWnd.getContainer();
  var msg_body=container.find("#msg2");
  ////var one_msg=container.find("#one_msg");
  var msg_area=container.find("#content2");
  var send_pmsg=container.find(".send_pmsg");  
  var msg_scrollbar=container.find("#msg_scrollbar2");       
  ///one_msg.text("私人聊天消息窗口");
  //发送私人聊天消息函数
  function submit2(){
	var msg_content=msg_area.val().replace(/(^\s*)|(\s*$)/g, "");
	if( msg_content =="") return; //消息为空则什么也不做！！！                	
	  //如果消息内容为clear则表示清屏		     
	else if(msg_content=="clear"){
	  msg_body.html('');
	  msg_area.val('');
	  return;
	}
	  //如果消息内容为help表示帮助		     
	else if(msg_content=="help"){
	  msg_body.append('<p>帮助：私人会话窗口中支持的命令及其作用说明，命令clear清屏，history n查看最近的n条私人聊天记录(n为数字)，clrchat清除当前私人聊天记录，'+
	    'clrchat -a清除所有的私人聊天记录(释放本地存储之用)。');
	  msg_scrollbar.scrollTop(msg_scrollbar.scrollTop()+500);//实现自动滚屏	
	  msg_area.val('');
	  return;
	}     
	else if(msg_content=="clrchat"){	    
	  //需要将私人消息存储在本地 服务器上面不存储私人消息 否则很占用数据库
	  if (typeof(localStorage) == 'undefined' ) {
	      msg_body.append('</p>不支持该命令！原因：你的浏览器并不支持HTML5本地存储(^_^你的私人聊天信息存储在本地！)！试试升级浏览器或换成其他浏览器！</p>');
	  } else {
	      try {    
	        var msg_from=account;
	        var msg_cnt= 0;
	        var tmp=localStorage.getItem( msg_from+'msg_cnt' );
	        if(tmp!=null){
		localStorage.removeItem( msg_from+'msg_cnt' );
		msg_cnt=parseInt(tmp);//消息条数
	        }
	        var msg="<p>消息记录清除成功！</p>";
	        if(msg_cnt==0) msg="<p>消息记录为空！</p>";
	        for(var i=1;i<=msg_cnt;i++){
		localStorage.removeItem(msg_from+'msg'+i);
	        }      
	        msg_body.append(msg);      
	        /* 存取json数据
	        var car = {};
	        car.wheels = 4;
	        car.doors = 2;
	        car.sound = 'vroom';
	        car.name = 'Lightning McQueen';
	        console.log( car );
	        console.log( "car***********************" );
	        localStorage.setItem( 'car', JSON.stringify(car) );
	        console.log( JSON.parse( localStorage.getItem( 'car' ) ) );
	        */    	    
	      } catch (e) {
		//if (e == QUOTA_EXCEEDED_ERR) {
		    // localStorage.clear();
		    msg_body.append('<p>html5本地存储满！你的私人聊天消息无法保存！尝试释放本地存储可解决此问题！</p>');
		    //data wasn't successfully saved due to quota exceed so throw an error
		//}
	      }
	  }
	  msg_scrollbar.scrollTop(msg_scrollbar.scrollTop()+500);//实现自动滚屏	
	  msg_area.val('');	       
	  return;
	}	

	else {
	  //消息内容为history -n时候查看历史聊天记录
	  var result=msg_content.match(/^history\s*-?(\d*)$/);
	  if(result!=null){
	    var number=result[1] || 100; //如果直接输入history则默认查看100条历史消息
	    //需要将私人消息存储在本地 服务器上面不存储私人消息 否则很占用服务器数据库
	    if (typeof(localStorage) == 'undefined' ) {
	      msg_body.append('</p>不支持该命令！原因：你的浏览器并不支持HTML5本地存储(^_^你的私人聊天信息存储在本地！)！试试升级浏览器或换成其他浏览器！</p>');
	      msg_scrollbar.scrollTop(msg_scrollbar.scrollTop()+500);//实现自动滚屏	
	    } else {
	        try {
		var msg_from=account;
		var msg_cnt= 0;
		var tmp=localStorage.getItem( msg_from+'msg_cnt' );
		if(tmp!=null)
		  msg_cnt=parseInt(tmp);//消息条数
		var msg="";
		if(msg_cnt==0) msg="<p>消息记录为空！</p>";
		if(msg_cnt<number) number=msg_cnt;
		for(var i=msg_cnt-number+1;i<=msg_cnt;i++){
		  var one_msg=localStorage.getItem( msg_from+'msg'+i);
		  msg+=one_msg;
		}	
		//console.log("消息："+ msg );//
		msg_body.html(msg);
	        } catch (e) {
		  //if (e == QUOTA_EXCEEDED_ERR) {
		        // localStorage.clear();
		        msg_body.append('<p>html5本地存储满！你的私人聊天消息无法保存！尝试释放本地存储可解决此问题！</p>');
		        msg_scrollbar.scrollTop(msg_scrollbar.scrollTop()+500);//实现自动滚屏	
		        //data wasn't successfully saved due to quota exceed so throw an error
		  //}
	        }
	    }			        
	    msg_area.val('');	       
	    return;
	  }
	  //清除所有聊天记录
	  result=msg_content.match(/^clrchat\s+\-a$/); 
	  if(result!=null){
	      if (typeof(localStorage) == 'undefined') {
	        msg_body.append('</p>不支持该命令！原因：你的浏览器并不支持HTML5本地存储(^_^你的私人聊天信息存储在本地！)！试试升级浏览器或换成其他浏览器！</p>');         
	      } else { 
		localStorage.clear();  
		msg_body.append("<p>所有私人聊天记录已被清除！</p>");	  
	      }
	      msg_scrollbar.scrollTop(msg_scrollbar.scrollTop()+500);//实现自动滚屏
	      msg_area.val('');	
	      return;
	  }
	}
	//发送消息
	//msg_body.append(msg_content);        
	//消息末尾追加发送消息的时间 以本地时间为准 如果是服务器时间 则有时差		      
	var x= new Date(); 
	var y=x.getFullYear();// 年 
	var m=x.getMonth()+1;//月 
	var d=x.getDay();//星期 
	var ds=x.getDate();//日 
	var h=x.getHours();//小时 
	var m1=x.getMinutes();//分 
	var s=x.getSeconds();//秒 
	var time_str="("+m+"-"+ds+" "+h+":"+m1+")";
	$.ajax({
		url: '/chat/post_pmsg',
		type: 'POST',
		data: {'to':account,'content': msg_content+time_str} //'token': token, 
	});	  	  
	msg_area.val('');
  } 
  send_pmsg.click(submit2);   
  //shift+enter发送消息
  msg_area.keypress(function(e) {
      if (e.shiftKey && e.keyCode == 13) {
        submit2();
        return false;
      }
  });
}
//当聊天室页面加载完毕时运行的js函数
function chatroom_page_loaded(){
    //chatroom_page_loaded= Function("");//函数仅运行一次     
    //goog.appengine.Socket.POLLING_TIMEOUT_MS = 1000; //poll every 1 seconds 注意此数值不能够超过1500 效果见下 look
    //放在服务器上无效 说undefined？
    /*
    [18:47:50.704] GET http://localhost:8080/_ah/channel/dev?command=poll&channel=channel-1599799707-jack&client=1 [HTTP/1.0 200  76ms]
    [18:47:51.793] GET http://localhost:8080/_ah/channel/dev?command=poll&channel=channel-1599799707-jack&client=1 [HTTP/1.0 200  85ms]
    [18:47:52.885] GET http://localhost:8080/_ah/channel/dev?command=poll&channel=channel-1599799707-jack&client=1 [HTTP/1.0 200  79ms]
    也就是说在本地运行gae的时候 浏览器客户端每间隔1s便向服务器发送get请求查询是否有聊天数据更新
    但是在服务器上面运行gae的时候 并没有定时发送get请求 不知道为何？？？
    */  
    $content = $('#content');
    $msg = $('#msg');
    var token;
    var channel;
    var socket;
    function openChannel() {
        if (typeof(goog) == 'undefined' ){
	error_window_nojs=$.window({
	    title: "友情提示",
	    content: '<p></p><div style="padding:10px;"><p> 如果你看到这个窗口，说明你很不幸的没有获取到google服务器上面的javascript库(0.3%概率)！</p><p>这种情况很糟糕，他会让你无法接送聊天信息，解决方法：</p>'+
	      '<p>清除浏览器本地cache，然后刷新网页！直到一切风平浪静！</p></div><center><button onclick="error_window_nojs.close();">我知道了</button></center>',
	    draggable: true,
	    resizable: false,
	    maximizable: false,
	    minimizable: false,
	    showModal: true,
	    showFooter: false //不显示页脚	    
	  });
	return;  
        }
        channel = new goog.appengine.Channel(token);
        var handler = {
	'onopen': onOpen,//开启socket时调用
	'onmessage': onMessage, //服务器发来消息时调用
	'onerror': function() {
	  //alert("因为潜水太久或网络问题导致网页出错，请刷新网页，重新登录！") 
	  error_window=$.window({
	    title: "网页出错",
	    content: '<p></p><div style="padding:10px;"><p> scoket连接出错，这可能是因为：</p><p>(1)潜水太久</p><p>(2)网络问题(gae服务器挂掉？你的网线断了？)</p>'+
	      '<p>解决方法：</p><p>尝试刷新网页，重新登录！</p></div><center><button onclick="error_window.close();">我知道了</button></center>',
	    draggable: true,
	    resizable: false,
	    maximizable: false,
	    minimizable: false,
	    showModal: true,
	    showFooter: false //不显示页脚	    
	  });	
	}, //socket出错时调用
	'onclose': function() { //socket关闭时调用
	      $.window({
	        title: "提示",
	        content: '<div style="padding:10px;"><p>socket关闭！</p></div>',
	        draggable: true,
	        resizable: false,
	        maximizable: false,
	        minimizable: false,
	        showModal: true
	      });
	} 
	  // you can reopen the channel here if token has expired
        };
        socket=channel.open(handler); //打开channel socket
    }
    function get_token() { //从服务器获取channel的token
        $.get('/chat/get_token', function(data){
	  if (data) {
		  token = data;
		  openChannel();
	  } else {
		  $msg.append('<p>聊天室人满为患！请稍候重试！</p>');
	  }
        });
    }
    get_token();

    function onOpen() {//socket已经开启
	  //alert("Web Socket已开启！");
    }
    //获取聊天记录的滚动条 当有消息到来 聊天信息自动跳到最后一条
    var div = document.getElementById('msg_scrollbar');
    function onMessage(m) {
        //alert(m.data);
        var message = $.parseJSON(m.data);        
        //表示私人消息
        if(message.is_public==false){
          if(message.user_to) {//系统发送的提示信息
	  if(message.user_to in chat_windows){  
	    if(chat_windows[message.user_to].isMinimized())//窗口最小化 则通过显示icon来标识有新消息到来	      
	      chat_windows[message.user_to].showIcon();
	    //else{
	    //  chat_windows[message.user_to].show();
	    // }
	   }
	  else{
	      newChatWindow(message.user_to,true);//创建新的私人聊天窗口并注册其中的事件
	   } 
	    var container=chat_windows[message.user_to].getContainer();
	    var msg_body=container.find("#msg2"); 
	    //var msg_scrollbar = document.getElementById('#msg_scrollbar2');
	    var msg_scrollbar=container.find("#msg_scrollbar2"); 	  
	    var submit_msg2=container.find("#submit_msg2");     
	    var content2=container.find("#content2");   
	    
	    //需要将私人消息存储在本地 服务器上面不存储私人消息 
	    if (typeof(localStorage) == 'undefined' ) {
	      msg_body.append('</p>请注意：你的浏览器并不支持HTML5本地存储(^_^你的私人聊天信息存储在本地！)！你的私人聊天记录将会转瞬即逝！</p>');
	    } else {
	      try {
	        var msg=message.content;
	        if(msg.indexOf("系统提示")<0){//不是系统消息
		var msg_from=message.user_to;
		var msg_cnt= 0;
		var tmp=localStorage.getItem( msg_from+'msg_cnt' );
		if(tmp!=null)
		  msg_cnt=parseInt(tmp);//消息条数
		msg_cnt+=1;
		localStorage.setItem( msg_from+'msg_cnt',msg_cnt );      
		//console.log("消息条数："+ localStorage.getItem( msg_from+'msg_cnt' ) );//////////
		localStorage.setItem( msg_from+'msg'+msg_cnt,msg );//将每条消息存储起来	
		//console.log("消息："+ localStorage.getItem( msg_from+'msg'+msg_cnt) );//////////
	        }	  
	      } catch (e) {
		//if (e == QUOTA_EXCEEDED_ERR) {
		    // localStorage.clear();
		    msg_body.append('<p>html5本地存储满！你的私人聊天消息无法保存！尝试释放本地存储可解决此问题！</p>');
		    //data wasn't successfully saved due to quota exceed so throw an error
		//}
	      }
	    }
	    msg_body.append(message.content); 
	    msg_scrollbar.scrollTop(msg_scrollbar.scrollTop()+500);//实现自动滚屏
	    //alert(msg_scrollbar.scrollTop +"?"+ msg_scrollbar.scrollHeight);
	    //当有消息到来时 自动获取输入焦点
	    submit_msg2.focus();
	    content2.focus();
          }
          else if(message.user_from){//他人发送的聊天消息 
	  //需要实现本地存储！！！
	  if(message.user_from in chat_windows){
	     if(chat_windows[message.user_from].isMinimized())//窗口最小化 则通过显示icon来标识有新消息到来	       
	       chat_windows[message.user_from].showIcon();
	  }
	  else{
	     newChatWindow(message.user_from,true);//////创建新的私人聊天窗口并注册其中的事件
	  }
	  var container=chat_windows[message.user_from].getContainer();
	  var msg_body=container.find("#msg2"); 
	  //var msg_scrollbar = document.getElementById('#msg_scrollbar2');
	  var msg_scrollbar=container.find("#msg_scrollbar2"); 	
	  var submit_msg2=container.find("#submit_msg2");     
	  var content2=container.find("#content2"); 
	  
	   	    
	  //需要将私人消息存储在本地 服务器上面不存储私人消息
	  if (typeof(localStorage) == 'undefined' ) {
	    msg_body.append('</p>请注意：你的浏览器并不支持HTML5本地存储(^_^你的私人聊天信息存储在本地！)！你的私人聊天记录将会转瞬即逝！</p>');
	  } else {
	      try {
	        var msg=message.content;
	        var msg_from=message.user_from;
	        var msg_cnt= 0;
	        var tmp=localStorage.getItem( msg_from+'msg_cnt' );
	        if(tmp!=null)
		msg_cnt=parseInt(tmp);//消息条数
	        msg_cnt+=1;
	        localStorage.setItem( msg_from+'msg_cnt',msg_cnt );		
	        localStorage.setItem( msg_from+'msg'+msg_cnt,msg );//将每条消息存储起来	
	        //console.log("消息："+ localStorage.getItem( msg_from+'msg'+msg_cnt) );
	      } catch (e) {
		//if (e == QUOTA_EXCEEDED_ERR) {
		    // localStorage.clear();
		    msg_body.append('<p>html5本地存储满！你的私人聊天消息无法保存！尝试释放本地存储可解决此问题！</p>');
		    //data wasn't successfully saved due to quota exceed so throw an error
		//}
	      }
	  }
	  msg_body.append(message.content);	 
	  msg_scrollbar.scrollTop(msg_scrollbar.scrollTop()+500);//实现自动滚屏
	  submit_msg2.focus();
	  content2.focus();
	  //alert(msg_scrollbar.scrollTop +"?"+ msg_scrollbar.scrollHeight);
	}
        } else{ //群消息
	    $msg.append(message);	
	    div.scrollTop = div.scrollHeight;//聊天信息自动跳到最后一条 可以实现自动滚屏	
	    //当有消息到来时 自动获取输入焦点
	    $('#submit_msg').focus();
	    $content.focus();
        }
    }
    //提交聊天信息
    function submit() {
        var msg_content=$content.val().replace(/(^\s*)|(\s*$)/g, "");
        if( msg_content =="") return; //消息为空则什么也不做！！！
	
	//如果消息内容为clear则表示清屏		     
        else if(msg_content=="clear"){
	$('#msg').html('');
	$content.val('');
	return;
        }
	//如果消息内容为help表示帮助		     
        else if(msg_content=="help"){
	$('#msg').append('<p>帮助：群聊窗口中支持的命令及其作用说明，命令clear清屏，who查看在线成员，history n查看最近的n条历史聊天记录(n为数字)。'+
	  'colorset #rrggbb设置聊天字体颜色(#rrggbb为16进制RGB颜色，如#ff0000表示红色)。</p>'+
	  '<p>关于：本聊天室采用python + google app engine + html5搭建。</p>'+
	  '<p>贡献者：Bone & Spark & 宋华</p>'+
	  '<p>其他：如果你对此聊天平台有什么意见或者建议，请给bone留言，或email至osclubofcas@gmail.com</p>');
	div.scrollTop = div.scrollHeight;//实现自动滚屏	
	$content.val('');
	return;
        }  
        else if(msg_content=="who"){
	$.get('/chat/online_user_list');	      			      
	$content.val('');	      
	return;
        }	           
        
        else {
	  //消息内容为history -n时候查看历史聊天记录
	  var result=msg_content.match(/^history\s*-?(\d*)$/);
	  if(result!=null){
	  var number=result[1] || 100; //如果直接输入history则默认查看100条历史消息
	  
	  $msg.html('<img width="36" height="36" src="/static/img/loading.gif" border="0" alt="正在加载...">');
	  $msg.load('/chat/chat_list',{'n': number});
	  $content.val('');	       
	  return;
	  }
	  
	  //如果消息内容为colorset则表示设置聊天信息颜色	
	  result=msg_content.match(/^colorset\s+(#[0-9a-fA-F]{6})$/);
	  if(result!=null){
	  var color=result[1] || '#000000'; 
	  $.post('/chat/set_font_color',{'color': color});
	  $content.val('');	       
	  return;
	  }
	}
	//发送消息
        if (token) {
	  //消息末尾追加发送消息的时间 以本地时间为准 如果是服务器时间 则有时差		      
	  var x= new Date(); 
	  var y=x.getFullYear();// 年 
	  var m=x.getMonth()+1;//月 
	  var d=x.getDay();//星期 
	  var ds=x.getDate();//日 
	  var h=x.getHours();//小时 
	  var m1=x.getMinutes();//分 
	  var s=x.getSeconds();//秒 
	  var time_str="("+m+"-"+ds+" "+h+":"+m1+")";
	  $.ajax({
		  url: '/chat/post_msg',
		  type: 'POST',
		  data: {'content': msg_content+time_str} //'token': token, 
	  });
	  $content.val('');
        }
    }
    //shift+enter发送消息
    $content.keypress(function(e) {
        if (e.shiftKey && e.keyCode == 13) {
	        submit();
	        return false;
        }
    });
    $('#submit_msg').click(submit);
    //切换到聊天页面
    $('#chatting').click(function(){ 
        $('#table_list_members').hide();//slideDown(); 
        $('#chat_room').show();
        return false;   
      });
    
    //查看成员列表	    
    $('#members').click(function(){ 
      $('#chat_room').hide();
      $('#table_list_members').show();
      
      $('#table_list_members').html('<img width="36" height="36" src="/static/img/loading.gif" border="0" alt="正在加载...">');
      $('#table_list_members').load('/chat/members');	      
      return false;               
    });
}
function members_list_page_loaded(){
      var tbodies = $("#member_list_body");        
      for (var h = 0; h < tbodies.length; h++) {
	var even = true;
	var trs = tbodies[h].getElementsByTagName("tr");
	  
	for (var i = 0; i < trs.length; i++) {
	    trs[i].onmouseover=function(){
		    this.className += " ruled"; return false;
	    }
	    trs[i].onmouseout=function(){
		    this.className = this.className.replace("ruled", ""); return false;
	    }
	    trs[i].onclick=function(){
	      var account=this.cells[0].innerHTML || this.cells[0].innerText;//cell［0］便是表格第一列数据 
	      //innerHTML是符合W3C标准的属性，而innerText只适用于IE浏览器
	      if(account in chat_windows){	      
		if(chat_windows[account].isMinimized())//窗口最小化 
		  //chat_windows[account].showIcon();	  
		  chat_windows[account].restore();
	      } else { 
		newChatWindow(account,false);//////创建新的私人聊天窗口并注册其中的事件
	      }
	    }
	}
      }
}
//当注册页面加载完毕时运行的js函数
function register_page_loaded(){
   //创建新用户
  $('#create_account').click(function(){ 
      var user_name= $('#user_name').val();
      var password=$('#user_pw').val();
      var true_name=$('#true_name').val();
      var email= $('#email').val();
      if(user_name=='' || password=='' || true_name=='' || email==''){
        $('#noti_content').html('用户名、密码、姓名、邮箱四者均不能为空！');
        return false;
      } 
      var account=user_name;
      if(account.indexOf("<")>=0 || account.indexOf(">")>=0 ||account.indexOf("&")>=0) {
        $('#noti_content').html('用户名不能够包含html标签！');
        return false;
      } 
      if(true_name.indexOf("<")>=0 || true_name.indexOf(">")>=0 ||true_name.indexOf("&")>=0) {
        $('#noti_content').html('真实姓名不能够包含html标签！');
        return false;
      }       
      if(email.indexOf("<")>=0 || email.indexOf(">")>=0 ||email.indexOf("&")>=0) {
        $('#noti_content').html('邮箱地址不能够包含html标签！');
        return false;
      }     
      if(account.replace(/[^\x00-\xff]/g,"xx").length>=15 || true_name.replace(/[^\x00-\xff]/g,"xx").length>=15) {
        $('#noti_content').html('你一定在开玩笑，你的名字怎么会那么长！');
        return false;
      }
      if(email.replace(/[^\x00-\xff]/g,"xx").length>=30) {
        $('#noti_content').html('你一定在开玩笑，你的邮箱怎么会那么长！');
        return false;
      }
      if (email.search(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/) == -1) {
        $('#noti_content').html('你的email格式不正确！');
        return false;
      }
      $('#chat_main').html('<img width="36" height="36" src="/static/img/loading.gif" border="0" alt="正在加载...">');
      $('#chat_main').load('/chat/register',{'account': account,'password':$('#user_pw').val(),'name':true_name,"email":email});
      return false;
  }); 
  //返回登录界面
  $('#return2login').click(function(){ 
      $('#chat_main').html('<img width="36" height="36" src="/static/img/loading.gif" border="0" alt="正在加载...">');
      $('#chat_main').load('/chat/login');
      return false;
  }); 
}

//当登录页面加载完毕时运行的js函数
function login_page_loaded(){
   //登录
  $('#login_submit').click(function(){ 
      var user_name= $('#user_name').val();
      var password=$('#user_pw').val();
      if(user_name=='' || password==''){
        $('#noti_content').html('用户名或密码不能为空！');
        return false;
      }
      $('#chat_main').html('<img width="36" height="36" src="/static/img/loading.gif" border="0" alt="正在加载...">');
      $('#chat_main').load('/chat/login',{'account': user_name,'password':password});
      return false;
  }); 
  //忘记密码
  $('#forgot_password').click(function(){ 
     $('#noti_content').html('忘记密码请发送邮件到osclubofcas@gmail.com向网站管理员索取密码！'); 
     return false;
  }); 
  //注册新用户
  $('#register').click(function(){
     $('#chat_main').html('<img width="36" height="36" src="/static/img/loading.gif" border="0" alt="正在加载...">');    
     $('#chat_main').load('/chat/register');
     return false;
  }); 
}
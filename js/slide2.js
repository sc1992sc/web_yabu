/**
 * Created by Administrator on 2016/6/6.
 */
jQuery(function($){
    var w=$(window).width();
    var m= $("#navTwo");
    var L= m.children(".nt").length;
    if(m.children(".nt").css("margin")=="0px"){
        m.css("width",w *.33*L)


    var t=0;
    var slider = {
        //判断设备是否支持touch事件
        touch:('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
        slider:document.getElementById('navTwo'),

        //事件
        events:{
            index:0,     //显示元素的索引
            slider:this.slider,     //this为slider对象
            handleEvent:function(event){
                var self = this;     //this指events对象
                if(event.type == 'touchstart'){
                    self.start(event);
                }else if(event.type == 'touchmove'){
                    self.move(event);
                }else if(event.type == 'touchend'){
                    self.end(event);
                }
            },
            //滑动开始
            start:function(event){
                var touch = event.targetTouches[0];     //touches数组对象获得屏幕上所有的touch，取第一个touch
                startPos = {x:touch.pageX,y:touch.pageY,time:+new Date};    //取第一个touch的坐标值
                endPos = null;
                isScrolling = 0;   //这个参数判断是垂直滚动还是水平滚动
                document.getElementById('navTwo').addEventListener('touchmove',this,false);
                document.getElementById('navTwo').addEventListener('touchend',this,false);
            },
            //移动
            move:function(event){
                //event.preventDefault();
                //当屏幕有多个touch或者页面被缩放过，就不执行move操作
                if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
                var touch = event.targetTouches[0];
                endPos = {x:touch.pageX - startPos.x,y:touch.pageY - startPos.y};
            },
            //滑动释放
            end:function(event){
                isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1:0;    //isScrolling为1时，表示纵向滑动，0为横向滑动
                var duration = +new Date - startPos.time;    //滑动的持续时间
                if(isScrolling === 0) {
                    if (Number(duration) > 10) {
                        //判断是左移还是右移，当偏移量大于10时执行
                        if (endPos.x > 50) {
                            event.preventDefault();      //阻止触摸事件的默认行为，即阻止滚屏
                            t-=1;
                            if(t<0){t=0}
                            document.getElementById('navTwo').style.marginLeft = -t*6.3+"rem";
                        } else if (endPos.x < -50) {
                            event.preventDefault();      //阻止触摸事件的默认行为，即阻止滚屏
                            t+=1;
                            if(t>Math.ceil(L/3)-1){t=Math.ceil(L/3)-1}
                            document.getElementById('navTwo').style.marginLeft = -t * 6.3 + 'rem';
                        }
                    }
                }
                //解绑事件
                document.getElementById('navTwo').removeEventListener('touchmove',this,false);
                document.getElementById('navTwo').removeEventListener('touchend',this,false);
            }
        },

        //初始化
        init:function(){
            var self = this;     //this指slider对象
            if(!!self.touch) self.slider.addEventListener('touchstart',self.events,false);    //addEventListener第二个参数可以传一个对象，会调用该对象的handleEvent属性
        }
    };
    slider.init();
    }

    (function(){
        var control=navigator.control ||{}
        if(control.gesture){
            control.gesture(false);
        }
    })()//禁用浏览器翻页
})

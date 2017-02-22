/**
 * Created by Administrator on 2016/11/22.
 */
jQuery(function($){
    var m=$("#shopList");
    var wrap= m.find(".shopWrap");
    var li= wrap.find(".shop_item");
    var nav= m.find(".shopNav");
    var L=li.length;
    var num=Math.ceil(L/2);
    wrap.css("width",num*4.88+"rem")

    for(var i=0;i<num;i++){
        nav.append("<span></span>")
    }
    var nspan=nav.children("span")
    nspan.eq(0).addClass("on")

    nspan.mouseenter(function(){
        $(this).addClass("on").siblings().removeClass("on")
        var z=$(this).index()
        wrap.animate({"marginLeft":-4.88*z+"rem"},500)
    })
})
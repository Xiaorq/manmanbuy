var shangpin;
$(function(){
   shangpin = new Shangpin();
//    mui的左右的初始化
   shangpin.initialize();
})
var Shangpin = function(){

}
Shangpin.prototype ={
// 左右移动的初始化
initialize:function(){
    mui.init({
        swipeBack: false
    });
    mui('.mui-scroll-wrapper').scroll({
        indicators: true //是否显示滚动条
    });
},

}
var easyBuy;
var tileid=0;
var i=0;
$(function(){
    easyBuy=new EasyBuy();
    easyBuy.sliderAuto();
    easyBuy.titleList();
    easyBuy.getProductList(tileid); 
})

var EasyBuy=function(){};
EasyBuy.prototype={
    //自动轮播
    sliderAuto:function(){
        var slider = mui(".mui-slider");
        slider.slider({
            interval: 1000         //每隔5秒调用一次
        }); 
    },
    //获取标题列表的数据
    titleList:function(){
        $('.cat').click(function(){
            $.ajax({
                url:'http://mmb.ittun.com/api/getbaicaijiatitle',
                type:'get',
                success:function(data){
                //   console.log(data);
                //调用模板
                var html=template('titleListTmp',data);
                //添加到页面
                $('#menu-count .mui-row').html(html);
                // tileid=$('.menulist').data('titleid');
                //给每个标题添加点击事件
                $('.menulist').click(function(){
                    //点击每个标题获取他们的id值
                    tileid=$(this).data('titleid');
                    easyBuy.getProductList(tileid);
                })
                }
            })
        })
    },
    
    //商品列表
    getProductList:function(titleId){
       $.ajax({
           url:'http://mmb.ittun.com/api/getbaicaijiaproduct?',
           type:'get',
           data:{titleid:titleId},
           success:function(data){
            console.log("#bar_"+i);
            i++;
            console.log(i);
            var html=template('productListTmp',data);
            console.log(html);
            // for()
            //添加到页面
            $('#reduced-price .mui-row').html(html);            
            
            // mui(".mui-progressbar").progressbar().show();
            for(var i=0;i<100;i++){
                mui("#bar_"+i).progressbar({progress:20}).show();
                // mui("#bar_"+i).progressbar().setProgress(50);
            }
           }
       })
    },
}
//回滚
 //获取第一屏的尺寸
 var dheight=$(window).height();
 window.onscroll=function(){
     //网页被滚出的高度
     gheight=$(window).scrollTop();
     if(dheight/2<=gheight){
         $('#gotop').show();
         $('#gotop').click(function(){
            //  $('html,body').animate({scrollTop:0},500);
            $('html,body').scrollTop(0);
         });
     }else{
        $('#gotop').hide();
     }
 }
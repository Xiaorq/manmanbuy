var shangpin;
// id的全局变量
var productid;
var  firstName;
$(function(){
   shangpin = new Shangpin();
   productid  = shangpin.getQueryString("productid");
//    mui的左右的初始化
   shangpin.initialize();
   shangpin.precedence();
   shangpin.ff();
   shangpin.template();

  firstName= shangpin.getQueryString("proName");
   
   
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
getQueryString: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    }
    return null;
},
template:function(){
    $.ajax({
        url:'http://mmb.ittun.com/api/getproduct',
        type:'get',
        data:{productid:productid},
        success:function(data){
            console.log(data);
            var html = template('navTmp',data);
            $(".detail-head").html(html);
            var html = template('particularsTmp',data);
            $(".price").html(html);
            var proName = data.result[0].productName.split(" ")[0];
            data.firstName = firstName;
            var html = template('fenleiTmp',data);
            $('.nav').append(html);
            data.proName = proName;
            var html = template('secTmp',data);
            $('.nav').append(html);
        }
    })
},
precedence:function(){
    $.ajax({
        url:'http://mmb.ittun.com/api/getproductcom',
        data:{productid:productid},
        success:function(data){
            // console.log(data);
            var html = template('priorityTmp',data);
            $(".c-network").html(html);
            
        }
    })
},
ff:function(){
    $('button').click(function(){
        var index = $(this).index();
        $('.content').eq(index).show().addClass('active').siblings().removeClass('active').hide();
      });

}
}
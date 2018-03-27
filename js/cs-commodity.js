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
   shangpin.comment();
//    mui的警告框

//   获取二级的导航的名字
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
// 通过上一层发过来的数据连接
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
            // 渲染模版导航栏
            var html = template('navTmp',data);
            $(".detail-head").html(html);
            var html = template('particularsTmp',data);
            $(".price").html(html);
            //截取当前面包屑导三层的数据
            var proName = data.result[0].productName.split(" ")[0];
            //   接收面包屑导三层
            data.firstName = firstName;
            // 面包屑导航二层 
            var html = template('fenleiTmp',data);   
            // append是行到最后一位   
            $('.nav').append(html);
            // 面包屑导三层
            data.proName = proName;
            var html = template('secTmp',data);
            $('.nav').append(html);
            shangpin.mui();
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

},
// mui的警告框
mui:function(){
    $("#confirmBtn").on('click', function() {
        console.log(1111)
        var btnArray = ['是', '否'];
        mui.confirm('是否确定要收藏？', '温馨提示', btnArray, function(e) {
            if (e.index == 1) { 
                //否 就啥也不干
            } else {

                //确定就跳转页面
                window.location.href = 'http://m.manmanbuy.com/login.aspx?tourl=http%3A//m.manmanbuy.com/bijia.aspx%3Fid%3D567342';
            }
        })
});
},
comment:function(){
   $('.icons').on('tap','i',function(){
        var index = parseInt(this.getAttribute("data-index"));
        var parent = this.parentNode;
        var children = parent.children;
        if(this.classList.contains("mui-icon-star")){    //点击的那个之前如果由空心的星星变成实心的
            for(var i=0;i<index;i++){
                children[i].classList.remove('mui-icon-star');   //star是空心的星星
                children[i].classList.add('mui-icon-star-filled');  //filled是实心的黄色星星
            }
        }else{
            for (var i = index; i < 5; i++) {  //点击的那个之后由实心的星星变成空心的
                children[i].classList.add('mui-icon-star')
                children[i].classList.remove('mui-icon-star-filled')
            }
        }
//打了几颗星呢
    console.log(index);
});
}

}
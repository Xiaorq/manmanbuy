var mmb;
var shopid=0;
var areaid=0;
var priceid=2;
var search;
$(function () {
    mmb = new Mmb();
    mmb.popbox();
    // mmb.productList();
    // mmb.getPriceSelect();
  
    mmb.getShopId();
    mmb.getAreaId();
    mmb.getPriceId();
    mmb.searchProduct();
    mmb.queryProduct();
});

var Mmb = function () {

}

Mmb.prototype = {
    popbox: function () {
        // $(".filter>ul>li").on('click',function(){
        // $(".popbox").addClass("popsort");
        // $(".popbox").css("display", "block");
        // .siblings().removeClass("popsort");
        // $(".popbox").show().siblings().hide();
        //});
        $(".shop").click(function () {
            $.ajax({
                url: 'http://mmb.ittun.com/api/getgsshop',
                success: function (data) {
                    console.log(data);
                    var html = template("popbox-tem", data);
                    $(".shop1").siblings().removeClass("on");
                    $(".shop1").html(html).toggleClass("on");
                }
            })
        })

        $(".area").click(function () {
            $.ajax({
                url: 'http://mmb.ittun.com/api/getgsshoparea',
                success: function (data) {
                    //  console.log(data);
                    var html = template('getgsshoparea', data);
                    $(".area1").siblings().removeClass("on");
                    $(".area1").html(html).toggleClass("on"); //动态生成下拉列表 并且看有没有on这个类  有就不添加  没有就添加

                }
            })
        })

        $(".price2").click(function () {
            $(".price1").siblings().removeClass("on");
            $(".price1").toggleClass("on");
        });

        $(".selectbar").click(function () {
            $(".search-select").toggleClass("on");;

            // psproduct.aTagInit();
            // console.log("kk");

        });

      
    },

    //获取商品id刷新
    getShopId:function(){
      $(".shop1").on("click","li",function(){
       console.log($(this));

        shopid=$(this).data('shop-id');

        // console.log(shopid);
      

        $(".shop a").html($(this).html());
        // console.log($(this).html());
        mmb.queryProduct();
        
        //获取完了之后就关闭下拉菜单  重新渲染页面
        $(".container>div").removeClass("on");

      })  
    },

    //获取区域id刷新页面
    getAreaId:function(){
        $(".area1").on("click","li",function(){
        // console.log($(this));
            
            areaid=$(this).data('area-id');
            // console.log(areaid);

            //改变下拉框的值
            $(".area a").html($(this).find("a").html());
            mmb.queryProduct();
            
            //获取完了之后就关闭下拉菜单  重新渲染页面
        $(".container>div").removeClass("on");

            
        })
    },

        // 价格id获取
    getPriceId:function() {
        $(".price1").on("click","li",function(){
            priceid=$(this).data("price-id");

            console.log(priceid);
            //改变下拉框的值
            $(".price2 a").html($(this).find("a").html());

            // console.log($(this).find("a").html());

            $(".container>div").removeClass("on"); 
            mmb.queryProduct();
            
            // 当筛选完了需要关闭下拉菜单

        })
    },

    //搜索商品名称
    searchProduct:function(){
        // 点击搜索按钮 
        $(".btn-search").click(function(){
            //获取用户输入的值
            search=$(".search-select .title input").val();
            console.log(search);
            //点击搜索按钮 后将之前添加的on这个类删除 就相当于下拉框隐藏
            $(".search-select").removeClass("on");
            mmb.queryProduct();

        })
    },
    // 查询商品渲染
    queryProduct:function(){
        $.ajax({
            url:'http://mmb.ittun.com/api/getgsproduct',
            data:{
                shopid: shopid,
                areaid: areaid
            },
            // dateType:'JSON',
            success:function(data){
                // console.log(data);
               

                //价格
                var result=[];

                for(var i=0;i<data.result.length;i++){
                    var price=Number(data.result[i].productPrice.replace("¥",""));

                    if(priceid==2) {
                        result=data.result;
                        // console.log(result);
                    }
                    if(priceid==0&&price>0&&price<=0.5) {
                        result.push(data.result[i]);
                    }

                    if(priceid==1&&price>0.4&&price<=1){
                        result.push(data.result[i]);
                    }
                }

                //筛选名称---筛选价格的数组
                if (search) {


                    for (var i = 0, len = result.length; i < len; i++) {
                        var productName = result[i].productName;
                        // console.log(productName);
                        if ((productName.indexOf(search)) < 0) {
                            result[i] = "";
                        }

                    };



                }
                search="";


                data = {
                    result: result
                }

                var html=template("getgsproduct",data);

                // console.log(html);
                $(".bd .container").html(html);
            }
        })
    }







   
}


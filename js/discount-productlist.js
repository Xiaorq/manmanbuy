var productList;
var page = 0;
var size = 10;
$(function(){
    productList = new ProductList();
   // productList.getProduct();
    $('.content').dropload({
        scrollArea : window,
       
        domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多-自定义内容</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中-自定义内容...</div>',
            domNoData  : '<div class="dropload-noData">暂无数据-自定义内容</div>'
        },
       
        loadDownFn : function(me){
            page++;
            // 拼接HTML
            var result = '';
            $.ajax({
                type: 'GET',
                url: 'http://mmb.ittun.com/api/getinlanddiscount?page='+page+'&size='+size,
                dataType: 'json',
                success: function(data){
                    var arrLen = data.length;
                    if(arrLen > 0){
                           //console.log(data);
                var html = template('productList',data);
                $(".product").html(html);
                //给产品添加点击事件，获取id，
                $(".product").on('click','.jump',function(){
                    window.location.href = 'discount-detail.html?productId='+$(this).data('id');
                })
                       /* for(var i=0; i<arrLen; i++){
                            result +=   '<a class="item opacity" href="'+data[i].link+'">'
                                            +'<img src="'+data[i].pic+'" alt="">'
                                            +'<h3>'+data[i].title+'</h3>'
                                            +'<span class="date">'+data[i].date+'</span>'
                                        +'</a>';
                        }*/
                    // 如果没有数据
                    }else{
                        // 锁定
                        me.lock();
                        // 无数据
                        me.noData();
                    }
                    // 为了测试，延迟1秒加载
                    setTimeout(function(){
                        // 插入数据到页面，放到最后面
                        $('.lists').append(result);
                        // 每次数据插入，必须重置
                        me.resetload();
                    },1000);
                },
                error: function(xhr, type){
                    alert('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
        },
        threshold : 50
    });
})
var ProductList = function(){

};
ProductList.prototype = {
    getProduct:function(){
        $.ajax({
            url:'http://mmb.ittun.com/api/getinlanddiscount',
            dataType:'json',
            success:function(data){
                //console.log(data);
                var html = template('productList',data);
                $(".product").html(html);
                //给产品添加点击事件，获取id，
                $(".product").on('click','.jump',function(){
                    window.location.href = 'discount-detail.html?productId='+$(this).data('id');
                })
            }
        })
    },
    
    

}
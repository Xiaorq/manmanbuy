var productList;
var ProductList = function(){};
$(function(){
    productList = new ProductList();
    productList.getProduct();
})
var page;
var size;
ProductList.prototype = {
    getProduct:function(){
        $.ajax({
            url:'http://mmb.ittun.com/api/getinlanddiscount',
            dataType:'json',
            success:function(data){
                var html = template('productList',data);
                $(".product").html(html);
                //给产品添加点击事件，获取id，
                $(".product").on('click','.jump',function(){
                    window.location.href = 'discount-detail.html?productId='+$(this).data('id');
                })
            }
        })
    }
}
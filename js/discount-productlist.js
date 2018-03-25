var productList;
$(function(){
    productList = new ProductList();
    productList.getProduct(); 
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
            }
        })
    }
}
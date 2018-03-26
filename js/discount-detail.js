var Detail = function(){};
var detail;
var id;
$(function(){
    detail = new Detail();
    id = getQueryString('productId');
    detail.getProductDetail(id);
    detail.getPinlunDetail(id);
    
})

Detail.prototype = {
    getProductDetail:function(id){
        $.ajax({
            url:'http://mmb.ittun.com/api/getdiscountproduct',
            dataType:'json',
            data:{productid:id},
            success:function(data){
                //console.log(data);
                var html = template('discountDetail',data)
                $(".conter").html(html);
                
            }
        })
    },
    getPinlunDetail:function(id){
        $.ajax({
            url:'http://mmb.ittun.com/api/getdiscountproduct',
            dataType:'json',
            data:{productid:id},
            success:function(data){
                console.log(data);
                var html = template('pinlundetail',data)
                $(".new-pinlun").html(html);
                
            }
        })
    }
   

}
 //获取url地址栏的参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    console.log(decodeURI(r[2]));
    if (r != null) return decodeURI(r[2]);
    return null;
}
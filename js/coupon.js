
$(function(){
   var coupon = new Coupon();
});
var Coupon = function(){
   this.hadCoupon();
}
Coupon.prototype = {
    // 查询拥有的购物券
    hadCoupon:function(){
        $.ajax({
            url:'http://mmb.ittun.com/api/getcoupon',
            success:function(data){
            var html=template("hadCouponTmp",data);
            $('.had-coupon ul').html(html);
            }
        })
    }
}

$(function(){
    var coupondetail = new Coupondetail();
});
var Coupondetail = function(){
   this.getThisCoupon();
}
Coupondetail.prototype = {
    getId:function (name) {
        const str = window.location.search;
        if (str) {
            const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            const res = decodeURI(str)
                .substr(1)
                .match(reg)[2];
            return res;
        }
    },
    // 获取该品牌的优惠券
    getThisCoupon:function(){
        // console.log(this.getId("id"));
        
        $.ajax({
            url:'http://mmb.ittun.com/api/getcouponproduct',
            data:{couponid: this.getId("id")},
            success:function(data){
                console.log(data);
                
                var html = template("getHadCouponTmp",data);
                $('#main ul').html(html);
                var img = template("getImg",data);
                // console.log(img);

                $('.swiper-wrapper').html(img);
               
                $("#gen").on("click",'a',function(){
                    const id = $(this).data("imgid");
                    // console.log(id);
                    // $("#mask").removeclass("mask");
                    $("#mask").css('display','block');
                    // console.log(id);
                    var swiper = new Swiper('.swiper-container', {
                        // initialSlide:,
                        // autoplay: 1000,//可选选项，自动滑动
                        
                    });
                     swiper.slideTo(id,0);
                     
                     $(".swiper-container").css ({
                        top: 200,
                    })
                    
                });
                $("#mask").click(function(){
                    $(this).css('display','none');
                })
            }
        })
    }
}
var Img = [];

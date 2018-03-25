var Manmanbuy;
$(function(){
    Manmanbuy = new Manmanbuy();
    Manmanbuy.getSounds();
})
var Manmanbuy = function () {

}

Manmanbuy.prototype = {
    getSounds:function(){
        // 1.向服务器发送一天请求数据
        $.ajax({
            dataType:'json',
            url:'http://mmb.ittun.com/api/getmoneyctrl?pageid=1&pagesize=10',
            success:function(data){
                console.log(data);
                var html = template('getSoundsTmp',data);
                $('#main .sounds').html(html);
            }
        })
    }
}

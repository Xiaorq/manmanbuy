$(function(){
    var manbuy = new Manbuy();
    // 调用获取商品的方法
    manbuy.queryPro();
    manbuy.querySecPro();
})

var Manbuy = function(){

} 
Manbuy.prototype = {
    //获取比价商品
    queryPro:function(){
        $.ajax({
            url: 'http://mmb.ittun.com/api/getcategorytitle',
            success:function(data){
                var html = template('catTitleTmp',data);
                $('.mui-table-view').html(html);
                console.log(html);
                
            }
        })
    },
    //获取二级商品
    querySecPro:function(){
        //点击获取
        $('.mui-table-view').on('tap', '.mui-table-view-cell', function () {
            var titleId = $(this).data('titleid');
            $.ajax({
                url: 'http://mmb.ittun.com/api/getcategory',
                data:{
                    titleid:titleId
                },
                success:function(data){
                    var html =template('secTmp',data);
                    var selector = "ul[data-titleid=\""+titleId+"\"]";
                    $(selector).html(html);
                    
                }
            })
            
            
        })
    }
}
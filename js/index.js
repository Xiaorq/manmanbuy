var mmbuy;
$(function () {  
    mmbuy = new Mmbuy();
    mmbuy.getNav();
    mmbuy.getProduct();
    // mmbuy.getScroll();
    // mmbuy.getZhekou();
})
var Mmbuy = function () {  

}

Mmbuy.prototype = {
    getNav:function () {  
        $.ajax({
            type:'get',
            url:'http://mmb.ittun.com/api/getindexmenu',
            dataType:'json',
            success:function (data) {  
                // 调用模板引擎的方法渲染页面
                // console.log(data);
                var html = template('navTmp',data);
                $('#nav .mui-container .mui-row').html(html);
                $("div[data-id='1']>a").attr('href','./html/SaveMoney.html');
                $("div[data-id='8']").hide();
                $("div[data-id='9']").hide();
                $("div[data-id='10']").hide();
                $("div[data-id='11']").hide();
                $("div[data-id='7']").on('click',function (event) {
                    event.preventDefault();  
                    $("div[data-id='8']").toggle();
                    $("div[data-id='9']").toggle();
                    $("div[data-id='10']").toggle();
                    $("div[data-id='11']").toggle();
                })
                
            }
        })
        
    },
    getProduct:function () {  
      $.ajax({
          type:'get',
          url:'http://mmb.ittun.com/api/getmoneyctrl',
          dataType:'json',
          success:function (data) {  
            var html = template('productTmp',data);
            $('#product .mui-container').html(html);
          }
      })  
    },
    // getZhekou:function () {  
    //     $('#product .mui-container  ').on('click','.mui-row',function (e) {
    //         console.log(1);
    //         e.preventDefault();  
    //         window.location.href='html/discount-detail.html';
    //     })
    // }
  
}

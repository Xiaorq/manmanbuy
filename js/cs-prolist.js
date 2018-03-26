var manbuy;
var categoryid;
var pageid=1;
var totalCount;
$(function () {
    manbuy = new Manbuy();
    categoryid = manbuy.getQueryString("categoryid");
    // 调用获取商品的方法
    manbuy.queryPro();
    // 点击侧滑
    manbuy.clickOffset();
    
    
})

var Manbuy = function () {

}
Manbuy.prototype = {
    //获取比价商品& 显示分页
    queryPro: function () {
        $.ajax({
            url: 'http://mmb.ittun.com/api/getproductlist',
            data:{
                categoryid:categoryid,
                pageid:pageid,
            },
            success: function (data) {
                //分类标题模板
                var html = template('catTitleTmp', data);
                $('.pro-list ul').html(html);
                //分页的模板
                //计算共有多少页
                var pageNum = Math.ceil(data.totalCount/10);
                //根据有多少页 生成页码数组
                var pageNumArr = [];
                for(var i=1;i<=pageNum;i++){
                    pageNumArr.push(i);
                }
                var html1 = template('pageTmp', {pageNum:pageNum,pageNumArr:pageNumArr});

                $('select.form-control').html(html1);
            }
        })
    },
    //获取UTL中的键  这里可以再研究下 顺便复习下正则表达式!!!!!
    getQueryString: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    },
    //单纯获取页面数据的方法
    queryProOnly:function(){
        $.ajax({
            url: 'http://mmb.ittun.com/api/getproductlist',
            data: {
                categoryid: categoryid,
                pageid: pageid,
            },
            success: function (data) {
                //分类标题模板
                var html = template('catTitleTmp', data);
                $('.pro-list ul').html(html);
            }
        })
    },
    //解决侧滑菜单的漏洞
    clickOffset:function(){
        //委托点击事件
        mui('.mui-inner-wrap').on('tap', 'a.product-list', function () {
            // console.log(111);
            var productid =$(this).data('productid');
            window.location.href = "http://mmb.ittun.com/api/getproduct?productid=" + productid;
            
        });
        //给span添加tap监听事件
        mui('.mui-inner-wrap').on('tap', 'span.fa-filter', function () {
            mui('.mui-off-canvas-wrap').offCanvas("toggle");
        });
        //给page按钮添加监听事件 
        mui('.mui-inner-wrap').on('tap', 'select>option', function () {
            //获取点击的option,的值并转为Number类型
            pageid = Number($(this).html().split('/')[0]);
            console.log(pageid);
            // 调用获取商品的方法
            manbuy.queryProOnly();
            $("option").prop("selected", 'false');
            $(this).prop("selected",'true');
             
            
        });
        //让页面可以滚动 否则无法用手指滑动
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    }

    
}
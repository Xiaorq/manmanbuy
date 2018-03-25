/**
 * Created by hz on 2018/3/25.
 */

$(()=>{
    const brandList = new BrandList();
});

const BrandList = (()=>{
    function Constructor () {
        this.init();

    }
    Constructor.prototype = {
        // 初始化
        init: function () {
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005,
                indicators: false,
            });
            $('span.brand-title').html(this.getKeyword('title').match(/^(.*)十大品牌$/)[1]);
            this.getBrandList();
            this.getProductList();
        },
        // 获取品牌列表
        getBrandList: function () {
            $.ajax({
                url: 'http://mmb.ittun.com/api/getbrand',
                data: {brandtitleid: this.getKeyword('id')},
                success: data => {
                    const element = template('brandItemTemp',data);
                    $('.brand-sortList').append(element);
                }
            });
        },
        // 获取商品列表
        getProductList: function () {
            $.ajax({
                url: 'http://mmb.ittun.com/api/getbrandproductlist',
                data: {brandtitleid: this.getKeyword('id'),
                    pagesize: 4},
                success: data => {
                    const element = template('productItemTemp',data);
                    $('.product-sortList').append(element);
                }
            });
        },
        // 获取URL中信息
        getKeyword: function (name) {
            const str = window.location.search;
            if (str) {
                const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                const res = decodeURI(str)
                    .substr(1)
                    .match(reg)[2];
                return res;
            }
        },
    };
    return Constructor;
})();
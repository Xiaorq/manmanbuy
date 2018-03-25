/**
 * Created by hz on 2018/3/25.
 */

$(() => {
    const brand = new Brand();
});

const Brand = (() => {
    function Constructor() {
        this.init();
    }
    Constructor.prototype = {
        init: function () {
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005,
                indicators: false,
            });
            $.ajax({
                url: 'http://mmb.ittun.com/api/getbrandtitle',
                dataType: 'json',
                success: data => {
                    // render
                    const element = template('brandCategoryTemp',data);
                    $('.brand-list').append(element);
                }
            });
        },
    };
    return Constructor;
})();
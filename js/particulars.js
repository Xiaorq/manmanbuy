var particulars;
var id;

$(function(){
    particulars = new Particulars();
    particulars.comment();
    // console.log(id);

})
var Particulars = function () {
    this.id=getQueryString('id');
}

Particulars.prototype = {
    comment:function(){
        $.ajax({
            url:'http://mmb.ittun.com/api/getmoneyctrlproduct',
            data:{productid:this.id},
            dataType:'json',
            success:function(data){
                console.log(data);
                var html = template('particularsTmp',data);
                $('.numM').html(html);
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


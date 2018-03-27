var Manmanbuy;
var res;
$(function(){
    Manmanbuy = new Manmanbuy();
    Manmanbuy.getSounds();
    Manmanbuy.particulars();   
})

var Manmanbuy = function () {
    this.pageid = 1;
}

Manmanbuy.prototype = {
    getSounds:function(){
        // 1.向服务器发送一天请求数据
        $.ajax({
            dataType:'json',
            url:'http://mmb.ittun.com/api/getmoneyctrl',
            data:{
                pageid:1,
                pagesize:10,
            },
            success:(data)=>{
                console.log(data);
                var html = template('getSoundsTmp',data);
                $('#main .sounds').html(html);
                res = $("#main .sounds .comment .left").data('num');
                // console.log(res);
                // var num = res.split(",");
                // console.log(num);
                // var r = Number(num.replace(/[^0-9]/ig,""));
                
                // 分页效果
                function page() {
                    const that = this;
                    var totalCount = data.totalCount;
                    var totalPage = Math.ceil(totalCount/10);
                    // console.log(totalPage);
                    var arrPage=[];
                    // console.log(totalPage);
                    for(var i=1;i<=totalPage;i++){
                        arrPage.push(i);
                    };
                    data.arrPage = arrPage;
                    data.totalPage = totalPage;
                    var html = template('optionTmp',data);
                    // console.log(html);
                    $('#center').html(html);
                
                    // 分页功能
                    $('#center').change(function(){
                        var value = $(this).val();
                        var pageid = value.split('/')[0];
                        $.ajax({
                            url:'http://mmb.ittun.com/api/getmoneyctrl',
                            data:{
                                pageid:pageid,
                                pagesize:10,
                            },
                            success:function(data){
                                console.log(data);
                                var html = template('getSoundsTmp',data);
                                $('#main .sounds').html(html);
                                that.pageid = pageid;
                            }
                        })
                    })
                }
                page();

                this.pageup();
                
            }
        })
    },
    // 上一页下一页
    pageup:function () {
        var that = this;               
        var value = $("#center").val();
        var totalPage = Number(value.split('/')[1]); 
        var totalPageup;
        // console.log(totalPage);
        // previous page
        $("#footer .pager .left a").on("click",function(){
            // 计算页数
            // 计算上一页
            that.pageid = that.pageid <= 1? totalPage:that.pageid-1;
            
            // 渲染
            // console.log(that.pageid);  
            $.ajax({
                dataType:'json',
                url:'http://mmb.ittun.com/api/getmoneyctrl',
                data:{
                    pageid:that.pageid,
                    pagesize:10,
                },
                success:function(data){
                    console.log(data);
                    var html = template('getSoundsTmp',data);
                    $('#main .sounds').html(html);
                    $('#center').val(that.pageid);
                    
                }
            })                      
        });
        // previous page
        $("#footer .pager .right a").on("click",function(){
            // 计算页数
            // 计算下一页
            that.pageid = that.pageid >= 15? 1:that.pageid+1;
            
            
            // 渲染
            // console.log(that.pageid);
            $.ajax({
                dataType:'json',
                url:'http://mmb.ittun.com/api/getmoneyctrl',
                data:{
                    pageid:that.pageid,
                    pagesize:10,
                },
                success:function(data){
                    console.log(data);
                    console.log(that.pageid);
                    var html = template('getSoundsTmp',data);
                    $('#main .sounds').html(html);
                    $('#center').val(that.pageid);
                    
                }
            }) 
        });
    },
    particulars:function(){
        $("#main .sounds").on('click','.mui-slider-handle',function(){
            window.location.href = "particulars.html?id="+$(this).data("id");
        })
    },
}








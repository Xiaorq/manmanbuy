
    // 入口函数
 $(function(){

        // 接口地址 :"./api/getdata.php"
        // 发送方式 : "post";
        // 发送的数据: themes: 

        // ajax 是一种在无需重新加载整个网页的情况下,更新部分网页的技术.
$.ajax({
    url:"http://mmb.ittun.com/api/getsitenav",
    success: function(backdata){
        //console.log(backdata);
       var content = template("web",backdata) 
       $("#main").html(content)
}}
)}
)
        // 一开始默认拿到"P"的数据展示页面
        // $.ajax({
        //     url: "./api/getdata.php",
        //     type: "post",
        //     data: {
        //         themes: "P",
        //     },
        //     success: function(backdata){
        //         var data = JSON.parse(backdata);
        //         console.log(data);
        //         // console.log(backdata);
            //     var content = template("photo",data)

               //  $(".photo ul").html(content);
        //     },

        // })


        // 移动li标签拿到对应的数据渲染页面
        // $(".lei li").mouseenter(function(){

        //     // css样式变化
        //     $(".lei li").css({"color":"#000" , "background":"#fff"});
        //     $(this).css({"color": "#fff" , "background":"#e65d4a"});
        //     $(".photo ul li").css("animation","");            
            

            // 请求数据
            // $.ajax({
            //     url: "./api/getdata.php",
            //     type: "post",
            //     data: {
            //         themes: $(this).attr("type"),
            //     },
            // success: function(backdata){

            //     var data = JSON.parse(backdata);
            //     console.log(data);

            //     var content = template("photo",data)

            //     $(".photo ul").html(content);

            //     $(".photo ul li").css("animation","xuanzhuan 2s forwards");

            // },

            // })


            
    //     })

    // }

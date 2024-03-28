// JavaScript Document
//宸︿晶瀵艰埅閫変腑js
$(function () {
    $(".nav-content ul li").click(function () {
        var dataname = $(this).attr("dataname");
        //鎵撳紑鏂伴〉闈㈢殑鍦版柟涓嶉渶瑕佹枃浠剁偣鍑昏繃鍘�
        var openType =  $(this).attr("openType");
        if (dataname != "tk" && dataname != "bjexpand2" && dataname != "bjexpand1" && dataname != "bjexpand3" && openType != 1) {
            $(".nav-content ul li").removeClass("curNav");
            $(this).addClass("curNav");
        }
    })
    // $(".name").hover(function () {
    //     $(".loginCon").show();
    //     $(".loginCon").animate({"height": "98px", "opacity": "1"}, 400);
    // }, function () {
    //     $(".loginCon").animate({"height": "0", "opacity": "0"}, 400);
    //     $(".loginCon").hide();
    // })
})

	  $(function(){
		 	 var het =$(window).height();
		 	 var lefthet = het-52;
			 $(".sideCon").css("height",lefthet+"px");
		  })
	  window.onresize = function(){
 		 	var het =$(window).height();
		 	var lefthet = het-52;
			$(".sideCon").css("height",lefthet+"px");
        }

  $(document).ready(function() {
    $("#boxscrollleft").niceScroll({cursorborder:"",cursorwidth:"8px", cursorcolor:"#E6ECF5",boxzoom:false}); // First scrollable DIV
    $("#boxscrollRight").niceScroll({cursorborder:"",cursorwidth:"8px", cursorcolor:"#CfD8E6",boxzoom:false}); // First scrollable DIV
  });


//璁＄畻鍙虫祴楂樺害
var het = $(window).innerHeight();
var conhet = het -112;
var mainhet = $(".main").css("min-height",conhet)


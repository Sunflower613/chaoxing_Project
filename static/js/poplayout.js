
var PopLayout = {
    bodyMargin: [30,30,30,30],
    init: function(top,right,bottom,left){
        this.bodyMargin = [top, right, bottom, left];
    },
    changeMargin: function(top,right,bottom,left){
        var d = $(document.body);
        var m = this.bodyMargin;
        d.css("margin", (m[0]+top)+"px "+(m[1]+right)+"px "+(m[2]+bottom)+"px "+(m[3]+left)+"px");
    },
};
(function($){
    $.fn.extend({
        fullFadeIn:function(t,e,n,r){
        	window.BODY_ORIGIN_BACKGROUND = $(document.body).css('background') || '';
            $(document.body).css('background', 'transparent');
            setTimeout(function(){
                top.postMessage('{"cmd":1,"toggle":true}', "*");
            },50);
            return this.fadeIn(t,e,n,r);
        },
        fullFadeOut:function(t,e,n,r){
            setTimeout(function(){
                top.postMessage('{"cmd":1,"toggle":false}', "*");
            	if(window.BODY_ORIGIN_BACKGROUND){
            		$(document.body).css('background', window.BODY_ORIGIN_BACKGROUND);
            	}
            },400);
            //top.postMessage('{"cmd":1,"toggle":false}', "*");
            return this.fadeOut(t,e,n,r)
        }
    });
})(jQuery);

$(function(){
    var d = $(document.body);

    // 濡傛灉鏈〉闈㈡槸宓屽叆鐨勯〉闈紝璋冩暣椤甸潰甯冨眬
    if($('.Header').length==0 && $('.nav_side').length==0){

        $('head').append('<style>.clearfix:after{content: " ";display: block;height: 0px;clear: both;}</style>');
        // body閫忔槑锛屼笌鐖剁骇椤甸潰閰嶅悎锛屽嚭鐜伴伄缃╁眰灞呬腑寮圭獥
        //d.css('background', 'transparent');
        // 娓呴櫎娴姩绐楀彛
        d.children(":first").addClass('clearfix');
    }

    // 璁板綍鐢ㄦ埛鍘熷body杈硅窛
    PopLayout.init(parseInt(d.css("margin-top")), parseInt(d.css("margin-right")), parseInt(d.css("margin-bottom")), parseInt(d.css("margin-left")));

    //鐩戝惉鐖剁骇椤甸潰甯冨眬鍙樺寲
    window.addEventListener("message", function(event) {
        try {
            var msgJson = JSON.parse(event.data);
        }catch(e){
            return;
        }
        if(msgJson==null){
            return ;
        }
        switch(msgJson.cmd){
            case 1001: //淇敼椤佃竟妗�
                PopLayout.changeMargin(msgJson.top, msgJson.right, msgJson.bottom, msgJson.left);
                break;
        }

    });
});
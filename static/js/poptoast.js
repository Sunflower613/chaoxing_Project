/**
 * Created by zhegxiaofang on 2019/7/22.
 * 寮规鎻掍欢
 */
(function ($) {
    /**
     *鍐呭,纭畾鎸夐挳鐨勭偣鍑讳簨浠�,鍙栨秷鎸夐挳鐨勭偣鍑讳簨浠�
     * @param title
     * @param width
     * @param sureEvent
     * @param cancleEvent
     */
    $.selectDialog = function (options) {
        var defaults = {
            title: '',
            content: '',
            contentDiv:'',
            contentDivClass:'',
            sureText: "",
            cancleText: "",
            customBtn:'',
            width: 'wid440',
            baseUrl:"../../",
            closeFull:true,
            sureEvent: function () {
            },
            cancleEvent: function () {
            }
        };
        var sets = $.extend(defaults, options || {});

        // 鑷畾涔夊脊妗嗙殑鍐呭
        var content=sets.contentDiv?sets.contentDiv:'';

        if(sets.content){
            content='<p class="popWord fs16 colorIn">' + sets.content + '</p>'+content;
        }

        // 鑷畾涔夋寜閽殑涓暟
        var btns=sets.customBtn?sets.customBtn:'';
        if(sets.sureText){
            btns+= '<a href="javascript:;" class="jb_btn jb_btn_92 fr fs14 dialog_affrim">' + sets.sureText + '</a>' ;
        }
        if(sets.cancleText){
            btns+= '<a href="javascript:;" class="btnBlue btn_92_cancel fr fs14 dialog_cancle">' + sets.cancleText + '</a>';
        }
        if(btns){
            btns='<div class="popBottom shadowBox">'+btns+ '</div><div class="het72"></div>';
        }

        var selectDialog = '<div class="maskDiv"  id="popDiv1"><div class="popDiv ' + sets.width + '">' +
            '<div class="popHead">' +
            '<a href="javascript:;" class="popClose fr"><img src="/mooc2-ans/images/popClose.png"></a>' +
            '<p class="fl fs18 colorDeep">' + sets.title +
            '</p>' +
            '</div>' +
            '<div class="het62"></div>' + content + btns+
            '</div></div>';


        $("body").append(selectDialog);
        $('#popDiv1').fullFadeIn();
        unScroll();

        //鐐瑰嚮纭畾璋冪敤鐨勪簨浠�
        $('#popDiv1').on('click', '.dialog_affrim', function () {
            if(sets.closeFull){
                $('#popDiv1').fullFadeOut(1000);
            }else{
                $('#popDiv1').fadeOut(1000);
            }
            setTimeout(function(){
                $('#popDiv1').off('click').remove();
            },300)
            if ($.isFunction(sets.cancleEvent)) {
                removeUnScroll();
                sets.cancleEvent();
            }
            return false;
        });
        // 鐐瑰嚮鍙栨秷璋冪敤鐨勪簨浠�
        $('#popDiv1').show().on('click', '.dialog_cancle', function () {
            if(sets.closeFull){
                $('#popDiv1').fullFadeOut(1000);
            }else{
                $('#popDiv1').fadeOut(1000);
            }
            setTimeout(function(){
                $('#popDiv1').off('click').remove();
            },300);
            if ($.isFunction(sets.sureEvent)) {
                removeUnScroll();
                sets.sureEvent();
            }
            return true;
        });
        // 鐐瑰嚮鍏抽棴鎸夐挳璋冪敤鐨勪簨浠�
        $("#popDiv1 .popClose").on("click", function () {
            if(sets.closeFull){
                removeUnScroll();
                $('#popDiv1').fullFadeOut();
            }else{
                $('#popDiv1').fadeOut();
            }
            setTimeout(function(){
                $('#popDiv1').off('click').remove();
            },300)

        })
    };

    /**
     *鍐呭,纭畾鎸夐挳鐨勭偣鍑讳簨浠�,鍙栨秷鎸夐挳鐨勭偣鍑讳簨浠�
     * @param title
     * @param time
     */
    $.toast = function (options) {
        var defaults = {
            content: "鎿嶄綔鎴愬姛",
            time: 1500,
            type: '',
            baseUrl: '',
            top: '180px',
            left:'45%'
        };
        var sets = $.extend(defaults, options || {});
        var iconUrl = '';
        if (sets.type === 'success') {
            iconUrl ='/mooc2-ans/images/right.png';
        } else if (sets.type === 'failure') {
            iconUrl = '/mooc2-ans/images/wrong.png';
        } else if (sets.type === 'loading') {
            iconUrl = '/mooc2-ans/images/round.png';
        }else if (sets.type === 'notice') {
            iconUrl = '/mooc2-ans/images/tips_pop.png';
        }
        iconUrl = sets.baseUrl + iconUrl;
        var iconTop = sets.top;
        var iconLeft = sets.left;

        var toast = iconUrl ? '<div class="toolTipBox"  style="top:'+ iconTop +';left:'+ iconLeft +';" id="dialogToast"><i class="popicon"><img src="' + iconUrl + '" /></i>' + sets.content + '</div>' : '<div class="toolTipBox" id="dialogToast">' + sets.content + '</div>';

        $("#dialogToast").remove();
        $("body").append(toast);
        $("#dialogToast").fadeIn();

        // 鑷姩鎺ㄥ嚭
        if(sets.time > 0){
	        setTimeout(function () {
	            $("#dialogToast").fadeOut();
	        }, sets.time);
	        setTimeout(function(){
	            $("#dialogToast").remove();
	        },sets.time+3000)
        }else{
        	return function closeHanlde(){
        		$("#dialogToast").remove();
        	};
        }
    };
})(window.jQuery);
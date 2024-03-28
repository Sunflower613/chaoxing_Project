// 鐢ㄤ簬涓€浜涘叕鍏辨柟娉曪紝鍙橀噺

// 缇庡寲婊氬姩鏉＄殑璁剧疆鍙傛暟
var customScroll = {
    cursorborder: "",
    cursorwidth: 8,
    cursorcolor: "#CAD5E6",
    boxzoom: false,
    autohidemode: true,
    railpadding: {top: 0, right: 2, left: 0, bottom: 0}
};

$.loading = {
    start: function () {
        var html = "<div class=\"pop-loading\">\n" +
            "    <img class=\"img-loading\" src=\"../../images/common/loading.gif\" alt=\"\">\n" +
            "</div>";
        $('body').append(html);
        $('body').addClass('popOverflow');
    },
    end: function () {
        $('.pop-loading').remove();
        $('body').removeClass('popOverflow');
    }
}


//绂佹婊氬姩鏉℃粴鍔�
function unScroll() {
    $('body').addClass('popOverflow');
    // var top = $(document).scrollTop();
    // $(document).on('scroll.unable', function (e) {
    //     $(document).scrollTop(top);
    // })
}

//绉婚櫎绂佹
function removeUnScroll() {
    // $(document).unbind("scroll.unable");
    $('body').removeClass('popOverflow');
}


// 鍏抽棴寮规
function closePop() {
    $(".popClose,.closePop").on("click", function () {
        // 鎺掗櫎鎺夋煇浜涚寮€闇€瑕佹彁绀虹殑鍏抽棴
        if (!$(this).parents(".popDiv").hasClass("custom-close")) {
            $(this).parents(".maskDiv").fadeOut();
            removeUnScroll();
        }
    })
}

//鏄剧ず寮规
function showPop(node) {
    $(node).fadeIn();
    unScroll();
}

//鍏抽棴寮规2
function closePop2(node) {
    $(node).fadeOut();
    removeUnScroll();
}

//tab鍒囨崲
function initTab(parent, changeBack, x) {
    var _index = x || 1;
    $(parent).find('.tab-head .tab-t').removeClass('current');
    $(parent).find('.tab-head .tab-t').eq(_index - 1).addClass('current');
    $(parent).find('.tab-list').hide();
    $(parent).find('.tab-list').eq(_index - 1).show();

    $(parent).on('click', '.tab-head .tab-t', function () {
        $(this).siblings().removeClass('current');
        $(this).addClass('current');
        $(parent).find('.tab-list').hide();
        var index = $(this).index();
        $(parent).find('.tab-list').eq(index).show();
        if (changeBack) {
            changeBack();
        }
    })

}

// 鐐瑰嚮寮规鍖哄煙澶栵紝鍏抽棴寮规
function clickBesideClose(triggerObj, popObj) {
    $(document).on("click", function (event) {
        if (triggerObj[0] && !triggerObj[0].contains(event.target)) {
            popObj.slideUp();
        }
    })
}

// 璁剧疆main鐨勬渶灏忛珮搴�
function setMainHeight(options) {
    var defaults = {
        target: $(".main"),
        height: 112 // 112涓簃ain涓婁笅鐨刴argin鐨勯珮搴�
    };
    var sets = $.extend(defaults, options || {});
    var windowH = $(window).height();
    var height = windowH - sets.height;
    sets.target.css("min-height", height);

    // 绐楀彛resize,鍐呭楂樺害浼樺寲
    $(window).resize(function () {
        setTimeout(function () {
            windowH = $(window).height();
            height = windowH - sets.height; // 112涓簃ain涓婁笅鐨刴argin鐨勯珮搴�
            sets.target.css("min-height", height);
        }, 50);
    });
}

// 璁剧疆x 鐨勬渶澶ч珮搴�
function setHeight(options) {
    var defaults = {
        type: 'height',
        target: $(".main"),
        height: 112 // 112涓簃ain涓婁笅鐨刴argin鐨勯珮搴�
    };
    var sets = $.extend(defaults, options || {});
    var windowH = $(window).height();
    var height = windowH - sets.height;
    sets.target.css(sets.type, height);

    // 绐楀彛resize,鍐呭楂樺害浼樺寲
    $(window).resize(function () {
        setTimeout(function () {
            windowH = $(window).height();
            height = windowH - sets.height; // 112涓簃ain涓婁笅鐨刴argin鐨勯珮搴�
            sets.target.css(sets.type, height);
            sets.target.getNiceScroll().resize()
        }, 50);
    });
}

//鏌ョ湅澶у浘
function initLookBigImg(box,touchObj,touchBox) {
    addBtnWrap();
    var imgObj;
    // 澶勭悊涓嶆槸鐐瑰嚮鍦ㄥ浘鐗囦笂杩涜鏀惧ぇ鐨勬儏鍐�
    if(touchObj){
        imgObj= touchObj;
    }else{
        imgObj= box + ' img'
    }
    $('body').on('click', imgObj , function () {
        var _index = touchObj? 0 : $(this).index();
        var boxObj=touchObj? touchBox:box;
        $(boxObj).viewer({
            navbar: false,
            url: 'data-original',
            title: false,
            toolbar: false,
            keyboard:false,
            inline:false
        });
        viewer = $(this).parents(boxObj).data('viewer');
        viewer.index = _index;
        viewer.show();
        $('.viewBtnWrap').fadeIn();
        unactiveViewBtn();
    })
    //    涓婁竴寮�
    $("#viewPrev").on("click", function () {
        viewer.prev();
        unactiveViewBtn()
    })
    //    涓嬩竴寮�
    $("#viewNext").on("click", function () {
        viewer.next();
        unactiveViewBtn()
    })
    //    鏀惧ぇ
    $("#viewZoomIn").on("click", function () {
        viewer.zoom(0.1);
    })
    // 缂╁皬
    $("#viewZoomOut").on("click", function () {
        viewer.zoom(-0.1);
    })
    //    鏃嬭浆
    $("#viewFlip").on("click", function () {
        viewer.rotate(-90);
    });
    //    鍏抽棴
    $("body").on("click",".viewer-container",function(){
        viewer.hide();
        $('.viewBtnWrap').fadeOut();
    });
    $("#viewClose").on("click", function () {
        viewer.hide();
        $('.viewBtnWrap').fadeOut();
    })
}

//鏈€鍚庝竴寮犲浘鐗囧彸閿ご涓嶅彲鐐癸紝绗竴寮犲浘鐗囧乏绠ご涓嶅彲鐐�
function unactiveViewBtn() {
    $('#viewPrev').removeClass('unactive');
    $('#viewNext').removeClass('unactive');
    if (viewer.index == 0) {
        $('#viewPrev').addClass('unactive');
    } else if (viewer.index == (viewer.length - 1)) {
        $('#viewNext').addClass('unactive');
    }
}

function addBtnWrap() {
    var btnWrap = "<div class=\"viewBtnWrap\">\n" +
        "    <div id=\"viewPrev\"></div>\n" +
        "    <div id=\"viewNext\"></div>\n" +
        "    <div class=\"viewBtn\" id=\"viewZoomIn\"></div>\n" +
        "    <div class=\"viewBtn\" id=\"viewZoomOut\"></div>\n" +
        "    <div class=\"viewBtn\" id=\"viewFlip\"></div>\n" +
        "    <div class=\"viewSplit\"></div>\n" +
        "    <div class=\"viewBtn\" id=\"viewClose\"></div>\n" +
        "</div>";
    $('body').append(btnWrap);
}

//鏌ョ湅澶у浘 end


// 璁剧疆toast鐨勪綅缃�
function setDialogTop(popDiv){
    var dialogToastH=$("#dialogToast").height();
    var popH=popDiv.outerHeight();
    var top= popDiv.offset().top+popH*0.3-dialogToastH/2;
    $("#dialogToast").css({
        top: top+'px'
    })
}
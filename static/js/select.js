// 用于项目中下拉列表的使用
// 依赖插件 jquery  jquery.nicesroll.js 做美化滚动条
(function ($) {
    $.zSelect = function (options) {
        var deflaults = {
            ele: '',  //触发下拉列表的元素，只支持ID
            selectedId: undefined,  // 选中�?
            direction: 'left',
            hasSearchMin: 5,  // 大于当前数量显示输入�?
            hasSearch: false,  // 是否带搜索框,触发元素不能输入的情况下才生�?
            placeholder: '请输�?',  //搜索框的占位�?
            hasClassify: false,  // 是否带分类，目前只支持一级分�?
            id: 'id',   // 数据ID的别�?
            text: 'text', // 数据text的别�?
            children: 'children', // 数据children的别�?
            data: [],
            title:'',
            scrollAreaClose:'',  //滚动当前区域关闭下拉�?
            maxheight:350, // 朢�大高�?,列表滚动区域的高度，如：不包括搜索框
            selected: function () {
            }  // 选中后的回调
        };

        var sets = $.extend(deflaults, options || {});
        var datas = sets.data;
        var select = '', lists = '', exSearch = '', searchVal = '',title='';

        $("#zSelect").remove();
        // 添加搜索�?
        if (sets.hasSearch && $(sets.ele).attr('readonly') && sets.data.length > sets.hasSearchMin) {
            exSearch = '<div class="select-search"><input type="text" value="' + searchVal + '" placeholder="' + sets.placeholder + '"/><span class="icon icon-search"></span></div>'
        }

        // 添加顶部title
        if(sets.title.length>0){
            title = '<div id="selectTitle">'+sets.title+'</div>'
        }

        // 下拉选项的渲�?
        function readerData() {
            select = '';
            renderLi();
            $("#zSelect").remove();
            if(sets.direction =='left'){
                select = '<div id="zSelect" class="select-list">' +title+ exSearch + '<ul class="select-lists" style="max-height:'+sets.maxheight+'px">' + lists + '</ul></div>';
            }else{
                select = '<div id="zSelect" class="select-list select-list-r">' +title+ exSearch + '<ul class="select-lists" style="max-height:'+sets.maxheight+'px">' + lists + '</ul></div>';
            }
            // $(sets.ele).after(select);
            $('body').append(select);
            $("#zSelect .select-item[data-id=" + sets.selectedId + "]").addClass("select-active");
            setPosition();
            selectItem();
            scrollInit();
            selectItemTitle();
        }

        // 数据渲染
        function renderLi() {
            lists = '';
            if (datas.length > 0) {
                if (datas[0].hasOwnProperty(sets.children)) { // 有分类的下拉列表
                    for (var j = 0; j < datas.length; j++) {
                        var childLi = '';
                        for (var k = 0; k < datas[j][sets.children].length; k++) {
                        	var s = datas[j][sets.children][k];
                            childLi += '<li class="select-item" data-id="' + datas[j][sets.children][k][sets.id] + '">' + datas[j][sets.children][k][sets.text] + '</li>';
                        }
                        lists += '<li><p class="classify-name">' + datas[j][sets.text] + '</p><ul>' + childLi + '</ul></li>';
                    }

                } else {  //没有分类的下拉列�?
                    for (var i = 0; i < datas.length; i++) {
                        lists += '<li class="select-item" data-id="' + datas[i][sets.id] + '">' + datas[i][sets.text] + '</li>'
                    }
                }
            } else {
                lists += '<li class="fs12 no-data">无搜索结�?</li>'
            }
        }

        // 美化下拉滚动�?
        function scrollInit() {
            $(".select-lists").niceScroll({
                cursorborder: "",
                cursorwidth: 8,
                cursorcolor: "#CAD5E6",
                boxzoom: false,
                autohidemode: true,
                railpadding: { top: 0, right: 2, left: 0, bottom: 0 }
            });
        }

        // 判断下拉框加载的位置
        function setPosition(ele) {
            var thisEle=ele||$(sets.ele);
            var top = thisEle.offset().top + thisEle.outerHeight() + 4;
            var width = thisEle.outerWidth(true);
            var left = thisEle.offset().left;
            var docWidth=$('html').outerWidth();
            var right=docWidth-left-width;
            if(ele){
                if( $("#zSelect").hasClass("top-auto")){
                    var bottom = $(document).height()-thisEle.offset().top+4;
                    $("#zSelect").css({
                        bottom: bottom+ 'px',
                        top:'auto',
                        right:right+'px',
                        width: width,
                        "z-index": 1001
                    })
                }else{
                    $("#zSelect").css({
                        top: top + 'px',
                        right:right+'px',
                        bottom:'auto',
                        width: width,
                        "z-index": 1001
                    })
                }
            }else{
                // 判断滚动条是放在上面还是下面  第一次才做此操作
                if(top+$("#zSelect").outerHeight()>$(document).height()){
                    var bottom = $(document).height()-thisEle.offset().top+4;
                    $("#zSelect").addClass("top-auto");
                    $("#zSelect").css({
                        bottom: bottom+ 'px',
                        top:'auto',
                        right:right+'px',
                        width: width,
                        "z-index": 1001
                    })
                }else{
                    $("#zSelect").css({
                        top: top + 'px',
                        right:right+'px',
                        bottom:'auto',
                        width: width,
                        "z-index": 1001
                    })
                }
            }
        }
//        // 窗口缩放的时候改变列表的位置
//        $(window).resize(function(){
//            if($(".select-wrap .expanded").length>0){
//                var $ele=$(".select-wrap .expanded");
//            }
//            // setTimeout(function(){
//                setPosition($ele);
//            // })
//
//        });
        // 滚动当前区域，关闭下拉框
        $(sets.scrollAreaClose).on("scroll",function(){
            if($(".select-wrap .expanded").length>0){
                var $ele=$(".select-wrap .expanded");
                $ele.blur();
                $ele.removeClass("expanded");
                removeSelect();
            }
        });
        // 点击title,回到顶部
         function selectItemTitle() {
		       $("#selectTitle").off("click").on("click", function () {
		            $(".select-inp.expanded").val('');
		            $(".expanded").removeClass("expanded");
		            $("#zSelect").slideUp(100);
		            var selectedData = {text: sets.title, id: 0 };
		            sets.selected(selectedData);
		            setTimeout(function () {
		                $("#zSelect").remove();
		            }, 100)
		        });
		   }

        // 点击输入框，展示下拉列表
        $(document).off("click",sets.ele).on("click",sets.ele, function () {
            if (!$(this).hasClass("expanded")) {
                datas = sets.data;
                $(".expanded").removeClass("expanded");
                $(this).addClass("expanded");
                readerData();
                setTimeout(function(){
                    $("#zSelect").slideDown(200);
                },50);
            } else {
                $(this).removeClass("expanded");
                removeSelect();
            }
        });

        $(document).off("click",".select-wrap .icon").on("click",".select-wrap .icon", function () {
            var inp=$(this).parents(".select-wrap").find(".select-inp");
            inp.click();
            $(this).parents(".select-wrap").find(".z-select-btn").click();
            moveEnd(inp[0]);
        });

        function moveEnd(obj) {
            obj.focus();
            var len = obj.value.length;
            if (document.selection) {
                var sel = obj.createTextRange();
                sel.moveStart('character', len);
                sel.collapse();
                sel.select();
            } else if (typeof obj.selectionStart == 'number'
                && typeof obj.selectionEnd == 'number') {
                obj.selectionStart = obj.selectionEnd = len;
            }
        }

        // 点击其他区域，关闭下拉列�?
        $(document).on("click", function (event) {
            if($("#zSelect").length>0){
                var selectLists = $(".select-wrap");
                var flag = false;
                for (var i = 0; i < selectLists.length; i++) {
                    if (selectLists[i].contains(event.target)) {
                        flag = true;
                    }
                }
                if (!flag && !$("#zSelect")[0].contains(event.target)) {
                    $(".expanded").removeClass("expanded");
                    removeSelect();
                }
            }
        });

        // 移除下拉
        function removeSelect() {
            // $("#zSelect").fadeOut(300);
            $("#zSelect").slideUp(100);
            setTimeout(function () {
                $("#zSelect").remove();
                $(sets.ele).blur();
            }, 100)
        }

        // 获取选中
        function selectItem() {
            $(".select-item").off("click").on("click", function () {
                var selectedData;
                var thisId = $(this).attr("data-id");
                sets.selectedId = thisId;
                $("this").addClass("select-active");
                for (var i = 0; i < sets.data.length; i++) {
                    if (sets.data[i].hasOwnProperty('id') && sets.data[i][sets.id] == thisId) {
                        selectedData = sets.data[i];
                    } else if (sets.data[i].hasOwnProperty('children')) {
                        for (var j = 0; j < sets.data[i][sets.children].length; j++) {
                            if (sets.data[i][sets.children][j].hasOwnProperty('id') && sets.data[i][sets.children][j].id == thisId) {
                                selectedData = sets.data[i][sets.children][j];
                            }
                        }
                    }
                }
                $(".expanded").removeClass("expanded");
                removeSelect();
                // 将获取到的��返回给前台
                if ($.isFunction(sets.selected)) {
                    sets.selected(selectedData);
                    var selectInp=$(sets.ele).parents(".select-wrap").find(".select-inp");
                    if(selectInp.length>0){
                        $(sets.ele).parents(".select-wrap").find(".select-inp").val($(this).text());
                    }else{
                        $(sets.ele).parents(".select-wrap").find(".z-select-btn").html($(this).text());
                    }

                }
            });
        }

        // 实时搜索
        var searchBox;
        if (exSearch.length > 0) {
            searchBox = "#zSelect .select-search>input";
        } else {
            searchBox = sets.ele;
        }
        $(document).on("input propertychange", searchBox, function (event) {
            var val = $(this).val();
            searchVal = val;
            datas = [];
            if (val.length > 0) {
                for (var i = 0; i < sets.data.length; i++) {
                    if (sets.data[i].hasOwnProperty(sets.text) &&
                        !sets.data[i].hasOwnProperty(sets.children) &&
                        sets.data[i][sets.text].indexOf(val) !== -1) {

                        var thisData={};
                        var text=sets.data[i][sets.text];
                        var $index=text.indexOf(val);
                        text=text.substr(0,$index)+"<em>"+val+"</em>"+text.substr($index+val.length);

                        thisData[sets.id]=sets.data[i][sets.id];
                        thisData[sets.text]=text;

                        datas.push(thisData);

                    } else if (sets.data[i].hasOwnProperty(sets.children)) {

                        var li = [];
                        for (var j = 0; j < sets.data[i][sets.children].length; j++) {
                            if (sets.data[i][sets.children][j].hasOwnProperty(sets.text) &&
                                sets.data[i][sets.children][j][sets.text].indexOf(val) !== -1) {

                                var thisChildData={};
                                var text=sets.data[i][sets.children][j][sets.text];
                                var $index=text.indexOf(val);
                                text=text.substr(0,$index)+"<em>"+val+"</em>"+text.substr($index+val.length);

                                thisChildData[sets.id]=sets.data[i][sets.children][j][sets.id];
                                thisChildData[sets.text]=text;


                                li.push(thisChildData);
                            }
                        }
                        if (li.length > 0) {
                            var currData = {};
                            currData[sets.text] = sets.data[i][sets.text];
                            currData[sets.children] = li;
                            datas.push(currData);
                        }
                    }
                }
            } else {
                datas = sets.data;
            }
            renderLi();
            $(".select-lists").html(lists);
            selectItem();
            selectItemTitle();
        });
    }
})(window.jQuery);

var wrongGatherFunc = {
    init: function () {
        var that = this;
        that.loadDatas();
        // that.remarkStatus();
        // that.deleteTopic();
    },

    exportType: [
        {
            "id": 0,
            "word": "Ti鏍煎紡"
        }, {
            "id": 1,
            "word": "Word鏍煎紡"
        }, {
            "id": 2,
            "word": "Excel鏍煎紡"
        }, {
            "id": 3,
            "word": "PDF鏍煎紡"
        }
    ],
    /*娲诲姩淇濆瓨*/

    loadDatas: function () {
        //涓嬫媺妗�
        $.zSelect({
            ele: '#getType',
            hasSearch: false,
            placeholder: '',
            hasClassify: true,
            selectedId: -1,
            text: 'word',
            maxheight: 252,
            selected: function (data) {
                var topicArr = $('#topicArr').val();
                $("#queType").val(data.id)

                try {
                    var microTopicId = $("#microTopicId").val();
                    if(typeof microTopicId != "undefined" && parseInt(microTopicId) > 0 ){
                        topicArr =  microTopicId;
                    }
                } catch (ex) {
                    console.log(ex)
                }

                $.ajax({
                    type: "get",
                    url : "/mooc2-ans/wrongque/data",
                    data: {
                        clazzid: $('#clazzid').val(),
                        courseid: $('#courseid').val(),
                        cpi: $('#cpi').val(),
                        keyWord: $('#searchQueKeyWord').val(),
                        topicArr: topicArr,
                        type: data.id
                    },
                    success: function (data) {
                        $('.wrong-topic-lists').empty();
                        $('.wrong-topic-lists').html(data);
                        wrongGatherFunc.deleteTopic();
                        wrongGatherFunc.remarkStatus();
                        $("#loading").empty();
                        $(".topicBtn").click(function (){
                            var topicId= $(this).attr("topicId")
                            var stat2Domain= $('#stat2Domain').val()
                            var url = stat2Domain + "/study-knowledge/detail?courseid="+$('#courseid').val()+"&clazzid="+$('#clazzid').val()+"&cpi="+$('#cpi').val()+"&ut=s&topicId="+topicId;
                            window.open(url);
                        })
                    }
                })
            },
            data: wrongGatherFunc.subType,
            // scrollAreaClose: window,  //婊氬姩褰撳墠鍖哄煙鍏抽棴涓嬫媺妗�

        });
        // 瀵煎嚭 涓嬫媺妗�
        $.zSelect({
            ele: '#export',
            hasSearch: false,
            placeholder: '',
            hasClassify: true,
            selectedId: 0,
            text: 'word',
            maxheight: 252,
            selected: function (data) {
            },
            data: wrongGatherFunc.exportType,
            // scrollAreaClose: window,  //婊氬姩褰撳墠鍖哄煙鍏抽棴涓嬫媺妗�
        });


    },
    //    澶囨敞鍒囨崲鐘舵€�
    remarkStatus: function () {
        $(".topic-remark .topic-remark1").click(function () {
            $(this).parent().addClass("isRemark");
            $(this).parents(".topic-remark").find("textarea").focus();
        })
        $(".topic-remark .topic-remark-icon").click(function () {
            $(this).parents(".topic-remark").removeClass("marked").addClass("isRemark");
            $(this).parents(".topic-remark").find("textarea").focus();
        })
        //杈撳叆妗嗛珮搴﹀彉鍖�
        $('.topic-remark-input').each(function () {
            this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;');
        }).on('input', function () {
            if ($(this).val().length > 1) {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            } else {
                this.style.height = '40px';
            }
        });
        $('.topic-remark-input').each(function () {
            this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;');
        }).on('blur', function () {
            //    澶卞幓鐒︾偣
            var remarkKeyLen = $(this).val().length;
            console.log(remarkKeyLen)
            if (remarkKeyLen < 1) {
                $(this).parents(".topic-remark").removeClass("isRemark").removeClass("marked");
            } else {
                $(this).parents(".topic-remark").addClass("marked").removeClass("isRemark");
            }
        });
        $('.topic-remark-input').each(function () {
            this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;');
        }).on('keydown', function () {
            //鍥炶溅鍒ゆ柇鐘舵€�
            var remarkKeyLen = $(this).val().length;
            if (event.keyCode === 13) {
                if (remarkKeyLen > 0) {
                    //鏄剧ず宸茬紪杈戣繃鐨�
                    $(this).parents(".topic-remark").removeClass("isRemark").addClass("marked");
                } else if (remarkKeyLen === 0) {
                    //鏄剧ず鏈紪杈戠殑鐘舵€�
                    $(this).parents(".topic-remark").removeClass("isRemark").removeClass("marked");
                }
            }
        });

    },
    //    鍒犻櫎棰樼洰
    deleteTopic: function () {
        $(".delete-con").on('click', function () {
            var id = $(this).attr('recordid');
            $.selectDialog({
                title: I18N_Config.Tip,
                content: I18N_Config.deleteWrongQue,
                width: 'wid440',
                sureText: I18N_Config.delete,  //纭畾鎸夐挳鐨勬枃鏈�
                cancleText: I18N_Config.cancle,  //鍙栨秷鎸夐挳鐨勬枃鏈�
                sureEvent: function () {
                },
                cancleEvent: function () {
                    delWrongQue(id);
                }
            });
        })
    },
};
getWrongQueList(1);

var wrongQueLoading = false;
var firstLoad = true
function getWrongQueList(pageNum) {
    if(wrongQueLoading){
        return;
    }
    wrongQueLoading=true;
    var type = $('#queType').val();
    var index = $('#index').val();
    var keyWord = $('#searchQueKeyWord').val();
    var topicArr = $('#topicArr').val();
    if (pageNum == 1) {
        index = 0;
    }

    try {
        var microTopicId = $("#microTopicId").val();
        if(typeof microTopicId != "undefined" && parseInt(microTopicId) > 0 ){
            topicArr =  microTopicId;
        }
    } catch (ex) {
        console.log(ex)
    }

    $.ajax({
        type: "get",
        url : "/mooc2-ans/wrongque/data",
        data: {
            clazzid: $('#clazzid').val(),
            courseid: $('#courseid').val(),
            cpi: $('#cpi').val(),
            type: type,
            pageNum: pageNum,
            keyWord: keyWord,
            topicArr: topicArr,
            index: index
        },
        success: function (data) {
            // $('.wrong-topic-lists').empty();
            if ($(data).hasClass("empty-date") && firstLoad) {
                $(".wrongQuestionSelfTest").hide();
            }
            $("#loading").empty();
            $("#pageNum").val(pageNum + 1)
            if (pageNum == 1) {
                $('.wrong-topic-lists').empty()
            }
            $('.wrong-topic-lists').append(data);
            wrongGatherFunc.remarkStatus();
            wrongGatherFunc.deleteTopic();
            isLoading = false;
            $(".topicBtn").click(function (){
                var topicId= $(this).attr("topicId")
                var stat2Domain= $('#stat2Domain').val()
                var url = stat2Domain + "/study-knowledge/detail?courseid="+$('#courseid').val()+"&clazzid="+$('#clazzid').val()+"&cpi="+$('#cpi').val()+"&ut=s&topicId="+topicId;
                window.open(url);
            })
        },complete:function (){
            wrongQueLoading=false;
            firstLoad = false;
        },
    })
}

function delWrongQue(id) {
    // $(".cx_alert-txt").html("鍒犻櫎鍚庡皢鏃犳硶鎭㈠锛�");
    // $("#okBtn").html("鍒犻櫎");
    // $(".cx_alert").css("display", "block");
    // $(".cx_alert-box").css("display", "block");
    // $("#okBtn").unbind();
    // $("#cancelBtn").unbind();
    var courseid = $("#courseid").val()
    var clazzid = $("#clazzid").val()
    var cpi = $("#cpi").val()
    $.ajax({
        type: "get",
        url : "/mooc2-ans/wrongque/delete",
        dataType: "json",
        data: {
            "id": id,
            "courseid": courseid,
            "clazzid": clazzid,
            "cpi": cpi
        },
        success: function (data) {
            if (data.status == 1) {
                $.toast({type: 'success', content: data.msg});
                getWrongQueList(1);
            } else {
                $.toast({type: 'failure', content: data.msg});

            }
        }
    });
}

function pactureFun() {
    //鎸変笅esc鍙栨秷鍥剧墖棰勮
    $(window).keydown(function (event) {
        if (event.keyCode == 27) {
            $('.viewBtnWrap').fullFadeOut();
        }
    });

    document.getElementById('viewZoomIn').onclick = function () {
        viewer.zoom(0.1);
    };
    document.getElementById('viewZoomOut').onclick = function () {
        viewer.zoom(-0.1);
    };
    document.getElementById('viewFlip').onclick = function () {
        viewer.rotate(-90);
    };
    document.getElementById('viewClose').onclick = function () {
        viewer.hide();
        $('.viewBtnWrap').fullFadeOut();
    };
}

var viewer;

function openPreviewPictureDiv() {
    $('.viewBtnWrap').fullFadeIn();
    var picturePreview = $("#picturePreview");
    picturePreview.viewer({
        navbar: false,
        url: 'data-orignal',
        title: false,
        toolbar: false
    });
    viewer = picturePreview.data('viewer');
    viewer.show();
}

function pictureView(src) {
    $("#picturePreview img").attr("src", src);
    openPreviewPictureDiv();
}

function showEmpty() {
    workPop(I18N_Config.clearWrongQueNotic, I18N_Config.clear, I18N_Config.cancle, function() {
        emptyWrongQuestion();
    });
}

function showEmpty1() {
    if(event.keyCode == 13  && !event.shiftKey){
        workPop(I18N_Config.clearWrongQueNotic, I18N_Config.clear, I18N_Config.cancle, function() {
            emptyWrongQuestion();
        });
    }
}

var emptyLock = 0;
function emptyWrongQuestion() {

    if(emptyLock == 1) {
        return;
    }
    emptyLock = 1;

    $.toast({
        type : "loading",
        time : 0,
        content : "姝ｅ湪娓呯┖..."
    });

    var courseid = $("#courseid").val();
    var clazzid = $("#clazzid").val();
    var cpi = $("#cpi").val();
    var isAccessibleCustomFid = $("#isAccessibleCustomFid").val();
    if (isAccessibleCustomFid && isAccessibleCustomFid == "1") {
        $("#tabindexWrongFirst").focus();
    }

    $.ajax({
        type: "get",
        url : "/mooc2-ans/wrongque/empty",
        dataType: "json",
        data: {
            "courseid": courseid,
            "clazzid": clazzid,
            "cpi": cpi
        },
        success: function (data) {
            if (data.status) {
                $.toast({
                    type : 'success',
                    content : "澶勭悊瀹屾瘯"
                });
            } else {
                $.toast({
                    type : 'failure',
                    content : data.msg
                });
            }
            setTimeout(function() {
                location.reload();
            }, 500);
        }
    });
}

function wrongQuestionSelfTest() {
    initPopStatus();
    $('#createExamId').fullFadeIn();
}

function initPopStatus() {
    var courseid = $("#courseid").val();
    var clazzid = $("#clazzid").val();
    var cpi = $("#cpi").val();
    $.ajax({
        type: "get",
        dataType: "json",
        url: "/mooc2-ans/wrongque/init-self-test",
        data: {
            "courseId" : courseid,
            "classId" : clazzid,
            "cpi" : cpi
        },
        success: function (json) {
            if(json.status){
                if (json.hasSelfTest && json.examRelationId > 0) {
                    $("#lastExamId").val(json.examRelationId)
                    $("#noLastExamTips").hide();
                    $("#hasLastExamTips").show();
                    $("#noLastExamBtnGroup").hide();
                    $("#hasLastExamBtnGroup").show();
                }
            }
        }
    });
}

function createSelfExam () {
    var groupCount = $("#groupCount").val() || 0;
    var courseid = $("#courseid").val();
    var clazzid = $("#clazzid").val();
    var cpi = $("#cpi").val();

    $.ajax({
        type: "post",
        dataType: "json",
        url: "/mooc2-ans/wrongque/create-self-test",
        data: {
            "courseId": courseid,
            "classId" : clazzid,
            "cpi" : cpi,
            "createType":1,
            "limitTime": 0,
            "questionNum" :groupCount,
            "selectType":0,
            "selftestMode":1
        },

        success: function (json) {
            if(json.status){
                // hideCreateDiv();
                $("#createExamId").hide();
                setTimeout(function(){
                    var taskId = json.taskId;
                    $('#taskId').val(taskId);
                    showTaskPop(taskId);
                },200);
            }else {
                $.toast({type: 'failure', content: json.msg});
                $('#createSelfTestPop').fullFadeOut();
            }
        },
        error:function () {
            $.toast({type: 'failure', content: '鍒涘缓澶辫触'});
        }
    });
}

function openLastExam () {
    $("#createExamId").fullFadeOut();
    var courseId = $("#courseid").val();
    var classId = $("#clazzid").val();
    var lastExamId = $("#lastExamId").val();
    var cpi = $("#cpi").val();
    var mooc1Domain = $("#mooc1Domain").val();
    window.open(mooc1Domain + '/mooc-ans/exam/test/examcode/examnotes?courseId=' + courseId + '&classId=' + classId + '&examId=' + lastExamId + '&cpi=' + cpi);
}
var selfTest_AutoTaskInterval;
var rate = 0;
var  selfTest_rotation_limit= 200;
function showTaskPop(taskId) {
	$("#stuSelfTestAutoPaper").fullFadeIn();
	//MoveFixed();
	rate = 1;
	callSelfTestTaskStatus(taskId);
}

function updateSelfTestTaskPop() {
	rate += Math.round(Math.random()* 30);
	if(rate >= 100){
		rate = 99;
	}
	$(".taskStatusShowHide .barCon").css("width",rate + "%");
	$("#taskrate").html( rate + "%");
}

function hideSelfTestTaskPop() {
	clearAutoTaskInterval();
	$("#stuSelfTestAutoPaper").fullFadeOut();
}

function clearAutoTaskInterval() {
	window.clearInterval(selfTest_AutoTaskInterval);
}

function callSelfTestTaskStatus(taskId,times) {
	var _interval = times || 3000;
	updateSelfTestTaskPop();
	selfTest_AutoTaskInterval = setTimeout('selfTestTaskStatus(' + taskId + ');', _interval);
}

function selfTestTaskStatus(taskId) {
	selfTest_rotation_limit--;
	if(selfTest_rotation_limit <= 0){
		return;
	}
    var courseId =$("#courseid").val();
    var classId =$("#clazzid").val();
    var cpi = $("#cpi").val();

	var url = "/mooc2-ans/wrongque/selftest-autopapertask-status?courseId=" + courseId + "&classId=" + classId  + "&cpi=" + cpi + "&taskId=" + taskId;
	$.ajax({
		type: 'get',
		url: url,
		dataType: 'json',
		success: function (data) {
			if (data.status) {
				if (data.taskStatus=='ok') {
					var mooc1Domain = $("#mooc1Domain").val();
					clearAutoTaskInterval();
					$(".taskStatusShowHide .barInfo span").html("100%");
					$(".taskStatusShowHide .barCon").css("width","100%");
					//$("#taskCancle").hide();
					//$("#taskOkKnown").show();
					$.toast({type: 'success', content: I18N_Config.createSucc});
					setTimeout(function(){
						hideSelfTestTaskPop();
						window.open(mooc1Domain + '/mooc-ans/exam/test/examcode/examnotes?courseId=' + courseId + '&classId=' + classId + '&examId=' + data.examRelationId + '&cpi=' + cpi);
					},500);
				} else if (data.taskStatus=='invalid') {
					hideSelfTestTaskPop();
					$.toast({type: 'failure', content: I18N_Config.invalidAction});
				} else if (data.taskStatus=='fail') {
					hideSelfTestTaskPop();
					$.toast({type: 'failure', content: I18N_Config.selfTestFailed});
				} else if (data.taskStatus=='running') {
					callSelfTestTaskStatus(taskId,5000);
				} else if (data.taskStatus=='busy') {
					//
					// var info = $(".taskStatusShowHide .barInfo");
					// info.html(info.html()+",浠诲姟绻佸繖绋嶅悗鍐嶆潵鐪嬬湅");
					callSelfTestTaskStatus(taskId,10000);
				} else {
					hideSelfTestTaskPop();
					$.toast({type: 'failure', content: I18N_Config.selfTestFailed});
				}
			}else{
				//澶辫触
				hideSelfTestTaskPop();
				$.toast({type: 'failure', content: I18N_Config.selfTestFailed});
			}

		},
		error: function () {
			//callSelfTestTaskStatus();
		}
	});
	return;
}

$(function() {
	$('#stuSelfTestAutoPaper').on('click', '.popClose',function() {
		hideSelfTestTaskPop();
	})
})
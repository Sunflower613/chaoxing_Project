//
//  CXJSBridge.js
//  CXJSBridge
//
//  Created by Chao Xing on 12-3-1.
//  Copyright (c) 2012骞� Chao Xing Technology Co., Ltd. All rights reserved.
//

(function(context){
    function bridgeCall(src,callback) {
        iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = src;
        var cleanFn = function(state){
            console.log(state)
            try {
                iframe.parentNode.removeChild(iframe);
            } catch (error) {}
            if(callback) callback();
        };
        iframe.onload = cleanFn;
        document.documentElement.appendChild(iframe);
    }

    function JSBridge()
    {
        this.initDevice();
        this.callbackDict = {};
        this.notificationIdCount = 0;
        this.notificationDict = {};

        var that = this;
        context.document.addEventListener('DOMContentLoaded',function(){
            bridgeCall('jsbridge://NotificationReady',that.trigger('jsBridgeReady',{}));
        },false);
    }

    JSBridge.prototype = {
        constructor: JSBridge,
        initDevice: function () {
            if (!this.device) {
                try {
                    var ua = navigator.userAgent;
                    if (!!ua) {
                        if (ua.indexOf("Android ") > 0) {
                            this.device = 'android';
                        } else if (ua.indexOf("iPad ") > 0 || ua.indexOf("iPhone ") > 0) {
                            this.device = 'ios';
                        } else if (ua.indexOf("Mac OS X ") > 0) {
                            this.device = 'macos';
                        } else if (ua.indexOf("Windows ") > 0) {
                            this.device = 'windows';
                        }
                    }
                } catch (e) { }
            }
        },
        //send notification to WebView
        postNotification: function(name, userInfo){
            this.initDevice();

            if(this.device == 'android'){
                androidjsbridge.postNotification(name, JSON.stringify(userInfo));
            } else if(this.device == 'windows'){
                windowsjsbridge.postNotification(name, userInfo);
            } else if(this.device == 'macos'){
                macosjsbridge.postNotification(name, userInfo);
            } else {
                this.notificationIdCount++;

                this.notificationDict[this.notificationIdCount] = {name:name, userInfo:userInfo};

                bridgeCall('jsbridge://PostNotificationWithId-' + this.notificationIdCount);
            }
        },
        //pop the notification in the cache
        popNotificationObject: function(notificationId){
            var result = JSON.stringify(this.notificationDict[notificationId]);
            delete this.notificationDict[notificationId];
            try{
                var ifs = context.document.getElementsByName('iframe');
                for(f in ifs){
                    if(f.src=='jsbridge://PostNotificationWithId-' + notificationId){
                        f.parentNode.removeChild(f);
                    }
                }
            }catch(e){}
            return result;
        },
        //trigger the js event
        trigger: function(name, userInfo) {
            if(this.callbackDict[name]){
                var callList = this.callbackDict[name];

                for(var i=0,len=callList.length;i<len;i++){
                    callList[i](userInfo);
                }
            }
        },
        setDevice:function(device){ //ios
            this.device = device;
            try{context._jsBridgeReady();}catch(e){}
        },
        //bind js event
        bind: function (name, callback) {
            this.initDevice();
            if (!this.callbackDict[name]) {
                //create the array
                this.callbackDict[name] = [];
            }
            this.callbackDict[name].push(callback);
            var __jsbridge;
            if (this.device == 'windows') {
                __jsbridge = windowsjsbridge;
            } else if (this.device == 'macos') {
                __jsbridge = macosjsbridge;
            }

            if (__jsbridge && !__jsbridge.isBind(name)) {
                __jsbridge.bind(name, (value) => {
                    this.trigger(name, value)
                })
            }
        },
        //unbind js event
        unbind: function (name, callback) {
            this.initDevice();
            if (arguments.length == 1) {
                delete this.callbackDict[name];
            } else if (arguments.length > 1) {
                if (this.callbackDict[name]) {
                    var callList = this.callbackDict[name];

                    for (var i = 0, len = callList.length; i < len; i++) {
                        if (callList[i] == callback) {
                            callList.splice(i, 1);
                            break;
                        }
                    }
                }
                if (this.callbackDict[name].length == 0) {
                    delete this.callbackDict[name];
                }
            }
            var __jsbridge;
            if (this.device == 'windows') {
                __jsbridge = windowsjsbridge;
            } else if (this.device == 'macos') {
                __jsbridge = macosjsbridge;
            }
            if (__jsbridge && __jsbridge.isBind(name) && (!this.callbackDict[name] || this.callbackDict[name].length == 0)) {
                __jsbridge.unbind(name);
            }
        }
    };

    context.jsBridge = new JSBridge();

})(window);
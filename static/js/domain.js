var host = window.location.host,
		splitDomainConfig = function(num,domainHost){
			var arr = domainHost.split("."),
				len = arr.length,
				array = [];

			if(num>len) return;

			for(var i = 0;i < num; i++){
				 array.push(arr[len-(i+1)]);
			 }
			return array.reverse().join('.');
		},

		getTopDomain = function(domainHost){
			if(!domainHost) return ;
			var domain = domainHost.substring(domainHost.lastIndexOf(".")+1, domainHost.length);
			if(!domain) return;
			var arr = domainHost.split(".");
			var len = arr.length;
			if(domain == 'cn'){
				return domainHost.substring(domainHost.indexOf(".") + 1);
			}else if(domainHost == 'mooc1.lxyy.libsou.com'){
				return splitDomainConfig(3,domainHost);
			}else{
				return splitDomainConfig(2,domainHost);
			}
		};

	try{

		if(window.parent==window){
			document.domain = getTopDomain(host);
		}else if(window.top.document.domain){

			//console.log(">>>>>>",window.top.document.domain);
		}
	}catch(e){
		var domain=getTopDomain(host);
		//console.log(">>>>>>",domain);
		document.domain =domain ;
	}
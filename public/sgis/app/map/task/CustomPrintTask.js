dojo.declare("ash.map.task.CustomPrintTask", null, {
	map:null,
	mapDivId:null,
	arcServerUrl:null,
	
	constructor:function(map, divId, url) {
		var me = this;
		me.map = map;
		me.mapDivId = divId;
		me.arcServerUrl = url;
	},
	
	onComplete:function(arg){
		
	},
	
	print:function(){
		var me = this;
		me.execute("print");
	},
	
	capture:function(){
		var me = this;
		me.execute("capture");
	},
	
	execute:function(mode){
		var me = this;
		var svgInfo = $('#'+me.mapDivId+' svg').parent().html();
		var layerIds = me.map.layerIds;
		var imageInfos = [];
		for(var i=0; i<layerIds.length; i++){	
			if($('#'+me.mapDivId+'_'+layerIds[i]).css('display')=="none"){
				continue;
			}	
			
			var div = $('#'+me.mapDivId+'_'+layerIds[i]);
			var pTranslateInfo = {};
			
			if(isNaN(parseInt(div.css('left')))){
				if(div.css('transform')){
					var arr = div.css('transform').split(',');
					if(arr.length>11){
						pTranslateInfo.translateX = parseInt(arr[12]);
						pTranslateInfo.translateY = parseInt(arr[13]);
					}else{
						pTranslateInfo.translateX = parseInt(arr[4]);
						pTranslateInfo.translateY = parseInt(arr[5]);
					}
				}else if(div.css('-webkit-transform')){
					var arr = div.css('-webkit-transform').split(',');
					pTranslateInfo.translateX = parseInt(arr[4]);
					pTranslateInfo.translateY = parseInt(arr[5]);
				}
			}else{
				pTranslateInfo.translateX = parseInt(div.css('left'));
				pTranslateInfo.translateY = parseInt(div.css('top'));
			}
			
			var imgs = $('#'+me.mapDivId+'_'+layerIds[i]+' img');
			for(var k=0; k<imgs.length; k++){	
				imageInfos.push(me.imageInfoExtract($(imgs[k]), pTranslateInfo));
			}
		}
		
		me.convertImgToBase64Exe(imageInfos, function(){
			var obj = {imageInfos:JSON.stringify(imageInfos), svgInfo:svgInfo, width:$('#'+me.mapDivId).width(), height:$('#'+me.mapDivId).height()};
			$.post(esri.config.defaults.io.proxyUrl + "?" + me.arcServerUrl +"/customPrintTask.jsp", obj, function(data){
				if(mode=="print"){
					var popup = window.open(esri.config.defaults.io.proxyUrl+'?'+data.url+'&print=Y', 'newWindow', "width=1000,height=700");
					popup.focus(); //required for IE
					popup.print();
				}else if(mode=="capture"){
					$('#__fileDownloadIframe__').remove();
					$('body').append('<iframe src='+esri.config.defaults.io.proxyUrl+'?'+data.url+' id="__fileDownloadIframe__" name="__fileDownloadIframe__" width="0" height="0" style="display:none;"/>');
				}
				
				me.onComplete("complete");
	   		},"json").error(function(){
	   		});
		})
	},
	
	imageInfoExtract:function(img, pTranslateInfo){
		var info = {};
		if(img.attr('src')){
			info.src = img.attr('src');
		}
		info.width = img.width();
		info.height = img.height();
		info.opacity = img.parent().css('opacity');
		
		var translateInfo = null;
		if(isNaN(parseInt(img.css('left')))){
			if(translateInfo = img.css('transform')){
				var arr = translateInfo.split(',');
				if(arr.length>11){
					info.translateX = parseInt(arr[12]) + pTranslateInfo.translateX;
					info.translateY = parseInt(arr[13]) + pTranslateInfo.translateY;
				}else{
					info.translateX = parseInt(arr[4]) + pTranslateInfo.translateX;
					info.translateY = parseInt(arr[5]) + pTranslateInfo.translateY;
				}
			}else if(translateInfo = img.css('-webkit-transform')){
				var arr = translateInfo.split(',');
				info.translateX = parseInt(arr[4]) + pTranslateInfo.translateX;
				info.translateY = parseInt(arr[5]) + pTranslateInfo.translateY;
			}
		}else{
			info.translateX = parseInt(img.css('left')) + pTranslateInfo.translateX;
			info.translateY = parseInt(img.css('top')) + pTranslateInfo.translateY;
		}
		return info;
	},
	
	convertImgToBase64Exe:function(imageInfos, callback){
		var me = this;
		var loadCnt = 0;
		var imageInfosCnt = imageInfos.length;
		for(var i=0; i<imageInfosCnt; i++){	
			me.convertImgToBase64(imageInfos[i], function(base64Img, imageInfo){
				imageInfo.base64 = base64Img;
				loadCnt++;
			});
		}
		var timerId = window.setInterval(function(){
			if(loadCnt == imageInfosCnt){
				callback.call(this);
				window.clearInterval(timerId);
			}
		}, 1000);
	},
	
	convertImgToBase64:function(imageInfo, callback, outputFormat){
		var canvas = document.createElement('CANVAS');
		var ctx = canvas.getContext('2d');
		var img = new Image;
		img.crossOrigin = 'Anonymous';
		img.onload = function(){
			canvas.height = img.height;
			canvas.width = img.width;
			ctx.drawImage(img,0,0);
			var dataURL = canvas.toDataURL(outputFormat || 'image/png');
			callback.call(this, dataURL, imageInfo);
			canvas = null; 
		};
		img.src = imageInfo.src;
	}
});
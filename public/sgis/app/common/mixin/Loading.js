Ext.require('Cmm.view.LoadingPopup');

Ext.define('Cmm.mixin.Loading', function() {
	window.XMLHttpRequest.prototype.customAbort = function(){
		if(this.readyState!=0 && this.readyState!=4){
			this.abort();
		}
	}
	
	window.XMLHttpRequest.prototype._open = window.XMLHttpRequest.prototype.open;
	window.XMLHttpRequest.prototype.open = function(method,url,async){ 
		this._url = url;
		this._open(method,url,async);
	};
	
	var _orgXMLHttpRequest = window.XMLHttpRequest;
	window.XMLHttpRequest = function(){
		var obj = new _orgXMLHttpRequest();
		try{
			Sgis.getApplication().addListener('abortFinishMode', obj.customAbort, obj);
		}catch(e){}
		return obj;
	}
	
	var _executeCount = 0;
	var _loadingPopup = null;
	function execute() {
		_executeCount++;
		if(!_loadingPopup){
			_loadingPopup = Ext.create('Cmm.view.LoadingPopup');
		}
		Sgis.getApplication().fireEvent('executeMode', null);
		_loadingPopup.customShow();
	}
	
	function finish() {
		if(_executeCount==0){
			_loadingPopup.customHide();
			return;
		}
		_executeCount--;
		if(_executeCount<=0){
			_loadingPopup.customHide();
			_executeCount == 0;
			Sgis.getApplication().fireEvent('finishMode', null);
		}	
	}

	function abortFinish() {
		_executeCount == 0;
		Sgis.getApplication().fireEvent('abortFinishMode', null);
	}
	return {
		loading : {
			execute : execute,
			finish : finish,
			abortFinish : abortFinish
		}
	};
}());
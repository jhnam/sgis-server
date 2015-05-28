Ext.define('Cmm.view.LoadingPopupController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.cmm_loadingPopup',

	control: {
		
	},
	
	executeCancelClick: function(){
		SGIS.loading.abortFinish();
		this.getView().customHide();
	}
});

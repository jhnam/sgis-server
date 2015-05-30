Ext.define('Cmm.view.LoadingPopup', {
	
	extend: 'Ext.window.Window',
	
	requires : ['Cmm.view.LoadingPopupController'],
	
	xtype: 'cmm_loadingPopup',

	height: 180,
	
	width: 200,
	
	customStatus:false,
	
	controller: 'cmm_loadingPopup',
	
	config: {
	    modal: true,
	    header: false,
       	border: false,
       	closable: false,
       	draggable: false
	},
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	listeners: {
        show:function() {
        	Ext.defer(function() {
    			if(!this.customStatus){
    				this.hide();
    			}
    		}, 1000, this);
        }
    },
	
	items: [{
		xtype: 'image',
		flex: 1,
		margin: '25 45 0 45',
		bind: {
			src: 'resources/images/loader.gif'
		}
	}, {
		id: 'executeCancel',
		xtype: 'button',
		text: '실행중지',
		margin: '25 35 25 35',
		handler: 'executeCancelClick'
	}],
	
	customShow: function(){
		var me = this;
		me.customStatus = true;
		Ext.defer(function() {
			if(me.customStatus){
				me.show();
			}
		}, 1500, this);
	},
	
	customHide: function(){
		var me = this;
		me.customStatus = false;
		me.hide();
	}
});
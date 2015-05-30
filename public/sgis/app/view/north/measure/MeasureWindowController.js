/**
* MeasureWindow Controller
*/
Ext.define('Sgis.view.north.MeasureWindowController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.app-measurewindow',

	control: {	
		'#areaBtn': {
			click: 'areaBtnClick'
		}
	},
	
	areaBtnClick:function(){
		var me = this;
		var areaUnit = Ext.getCmp('areaUnit');
		Ext.getCmp('areaResult').setText('');
		Sgis.getApplication().coreMap.areaMeasureReady(areaUnit.selection.data.value, me.areaMeasureCallback, me);
	},
	
	areaMeasureCallback:function(result){
		console.log(result);
		Ext.getCmp('areaResult').setText(result.areas[0]);
	}
});

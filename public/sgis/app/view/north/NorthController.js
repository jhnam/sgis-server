/**
* North Controller
*/
Ext.define('Sgis.view.north.NorthController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.app-north',

	control: {
		'#mapmode': {
			change: 'onMapModeChange'
		}
	},
	
	requires: [ 
	   		'Sgis.view.north.measure.MeasureWindow'
	],
	
	onClickAll: function () {
		Sgis.getApplication().coreMap.fullExtentMove();
	},
	
	onClickPrev: function () {
		Sgis.getApplication().coreMap.prevExtentMove()
	},
	
	onClickNext: function () {
		Sgis.getApplication().coreMap.nextExtentMove();
	},
	
	onClickMeasure: function (button, e) {
		SGIS.popup('Sgis.view.north.measure.MeasureWindow', null, {modal:false, x:e.pageX-30, y:e.pageY+20});
	},
	
	onClickPrint: function () {
		Sgis.getApplication().coreMap.printTask.print();
	},
	
	onClickSave: function () {
		Sgis.getApplication().coreMap.printTask.capture();
	},
	
	onClickGray: function (button) {
		Sgis.getApplication().coreMap.baseMapGray(button.pressed);
	},

	onClickMapMode: function (button, e) {
		SGIS.msg.alert('맵 모드 ' + button.text + ' Clicked!');
	},
	
	onMapModeChange: function(button, item, eOpts) {
		SGIS.msg.alert('맵 모드 ' + button.text + ' Clicked!');
	}
});

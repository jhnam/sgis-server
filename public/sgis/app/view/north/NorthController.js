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
	
	onClickAll: function () {
		SGIS.msg.alert('전체 Clicked!');
	},
	
	onClickMove: function () {
		SGIS.msg.alert('이동 Clicked!');
	},
	
	onClickZoomIn: function () {
		SGIS.msg.alert('확대 Clicked!');
	},
	
	onClickZoomOut: function () {
		SGIS.msg.alert('축소 Clicked!');
	},
	
	onClickPrev: function () {
		SGIS.msg.alert('이전 Clicked!');
	},
	
	onClickNext: function () {
		SGIS.msg.alert('다음 Clicked!');
	},
	
	onClickDelete: function () {
		SGIS.msg.alert('삭제 Clicked!');
	},
	
	onClickMeasure: function () {
		SGIS.msg.alert('측정 Clicked!');
	},
	
	onClickPrint: function () {
		SGIS.msg.alert('인쇄 Clicked!');
	},
	
	onClickPrev: function () {
		SGIS.msg.alert('이전 Clicked!');
	},
	
	onClickSave: function () {
		SGIS.msg.alert('저장 Clicked!');
	},
	
	onClickMapMode: function (button, e) {
		SGIS.msg.alert('맵 모드 ' + button.text + ' Clicked!');
	},
	
	onMapModeChange: function(button, item, eOpts) {
		SGIS.msg.alert('맵 모드 ' + button.text + ' Clicked!');
	}
});

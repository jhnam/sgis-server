/**
* West Controller
*/
Ext.define('Sgis.view.west.WestController', {
	
	extend: 'Ext.app.ViewController',
	
	requires: [ 
		'Sgis.view.west.LayerInfoPopupGrid',
		'Sgis.view.west.ScaleInfoPopupGrid'
	],

	alias: 'controller.app-west',
	
	control:{
		'app-west': {
			tabchange: 'tabchangeHandler'
		}
	},

	onClickWestLayer: function() {
		SGIS.popup('Sgis.view.west.LayerInfoPopupGrid');
	},
	
	onClickWestScale: function() {
		SGIS.popup('Sgis.view.west.ScaleInfoPopupGrid');
	},
	
	tabchangeHandler: function(tabPanel, newCard, oldCard, eOpts){
		Sgis.getApplication().fireEvent('leftTabChange', newCard.xtype); //레이어탭 app-west-tab1 //자료검색탭활 app-west-tab2
	}
});

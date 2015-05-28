Ext.define('Sgis.view.west.WestTab1', {
	
	extend: 'Ext.container.Container',
	
	requires: [
		'Sgis.view.west.WestTab1Controller'
	],
	
	xtype: 'app-west-tab1',

	title: '레이어',

	bodyPadding: 10,
	
	autoScroll: true,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	items: [{
		xtype: 'treepanel',
		controller: 'app-west-tab1',
		rootVisible: false,
		useArrows: true,
		bufferedRenderer: false,
		store : Ext.create('Sgis.store.LayerTreeStore')
	}]
});
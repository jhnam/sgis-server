Ext.define('Sgis.view.center.Content', {
	
	extend: 'Ext.panel.Panel',
	
	requires: [
	   	'Sgis.view.center.ContentController',
	   	'Sgis.map.CoreMap'
	],
	
	region: 'center',
	
	id: 'content',
		
	xtype: 'app-content',
	
	controller: 'app-content',
	
	items: [{
		xtype: 'app-map-coreMap',
		width: '100%',
		height: '100%'
	}]
});
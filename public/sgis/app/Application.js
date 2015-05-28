Ext.Loader.setConfig({
	enabled : true,
	paths : {
		'Cmm' : 'app/common'
	}
});

Ext.require(['Sgis.CommonModule']);

/**
* The main application class. An instance of this class is created by app.js when it calls
* Ext.application(). This is the ideal place to handle application launch and initialization
* details.
*/
Ext.define('Sgis.Application', {
	extend: 'Ext.app.Application',

	name: 'Sgis',

	stores: [
		'Sgis.store.LayerTreeStore',
		'Sgis.store.Layer2TreeStore',
		'Sgis.store.Area1Store',
		'Sgis.store.Area2Store',
		'Sgis.store.Area3Store',
		'Sgis.store.LayerInfoStore',
		'Sgis.store.ScaleInfoStore'
	],
	
	views : [
		'Sgis.view.main.Main',
		'Sgis.view.north.North',
		'Sgis.view.west.West',
		'Sgis.view.east.East',
		'Sgis.view.south.South',
		'Sgis.view.center.Center'
	],
	
	//manifest때문에 적어놈.
	eventType:[
	    'dynamicLayerOnOff',
	    'searchLayerOnOff',
	    'searchBtnClick',
	    'drawComplte',
	    'searchComplte',
	    'executeMode',
	    'finishMode',
	    'abortFinishMode',
	    'leftTabChange', //왼쪽에 탭변경시 발생.
	    'areaSelect' //지역을 선택시 발생.
	],

	launch: function () {
		var main = Ext.widget('app-main');
		
		main.add({
			region: 'north',
			xtype : 'app-north'
		});
		
		main.add({
			region: 'west',
			xtype : 'app-west'
		});
	}
});
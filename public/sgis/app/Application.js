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
	
	coreMap:null,
	browser:null,
	

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
		this.browserCheck();
	},
	
	browserCheck:function(){
		var me = this;
		var _ua = navigator.userAgent;
        var rv = -1;
         
        //IE 11,10,9,8
        var trident = _ua.match(/Trident\/(\d.\d)/i);
        if( trident != null )
        {
            if( trident[1] == "7.0" ) me.browser = "IE" + 11 ;
            if( trident[1] == "6.0" ) me.browser = "IE" + 10;
            if( trident[1] == "5.0" ) me.browser = "IE" + 9;
            if( trident[1] == "4.0" ) me.browser = "IE" + 8;
        }
         
        //IE 7...
        if( navigator.appName == 'Microsoft Internet Explorer' ) me.browser = "IE" + 7;
         
        /*
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if(re.exec(_ua) != null) rv = parseFloat(RegExp.$1);
        if( rv == 7 ) me.browser = "IE" + 7;
        */
         
        //other
        var agt = _ua.toLowerCase();
        if (agt.indexOf("chrome") != -1) me.browser = 'Chrome';
        else if (agt.indexOf("opera") != -1) me.browser = 'Opera'; 
        else if (agt.indexOf("staroffice") != -1) me.browser = 'Star Office'; 
        else if (agt.indexOf("webtv") != -1) me.browser = 'WebTV'; 
        else if (agt.indexOf("beonex") != -1) me.browser = 'Beonex'; 
        else if (agt.indexOf("chimera") != -1) me.browser = 'Chimera'; 
        else if (agt.indexOf("netpositive") != -1) me.browser = 'NetPositive'; 
        else if (agt.indexOf("phoenix") != -1) me.browser = 'Phoenix'; 
        else if (agt.indexOf("firefox") != -1) me.browser = 'Firefox'; 
        else if (agt.indexOf("safari") != -1) me.browser = 'Safari'; 
        else if (agt.indexOf("skipstone") != -1) me.browser = 'SkipStone'; 
        else if (agt.indexOf("netscape") != -1) me.browser = 'Netscape'; 
        else if (agt.indexOf("mozilla/5.0") != -1) me.browser = 'Mozilla';
	}
});
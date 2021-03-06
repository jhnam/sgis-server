Ext.define('Sgis.map.CoreMap', {
	extend: 'Ext.Component',
	
	xtype: 'app-map-coreMap',
	
	html: "<div id='_mapDiv_' style='height:100%; width:100%;background-color: #ffffff;'></div>",
	
	requires: [
	    'Sgis.map.DynamicLayerAdmin',
	    'Sgis.map.SearchLayerAdmin'
	],
	
	map:null,
	dynamicLayerAdmin:null,
	geometryService:null,
	unit:null,
	measureCallback:null,
	measureScope:null,
	smpLineSymbol:null, 
	simpleFillSymbol:null,
	fullExtent:null,
	extentReg:[],
	extentRegAble:true,
	extentUnReIdx:0,
	printTask:null,
	backAndWhite:false,
	
//	initComponent: function() {
//		this.callParent();
//	},
	
	onRender: function(){
		this.callParent(arguments);
		this.mapRendered();
	},
	
	mapRendered: function(p){
        var me = this;
        
        require(["dojo/dom",
  		         "dojo/dom-attr",
  		         "dojo/_base/array",
  		         "esri/Color",
  		         "dojo/number",
  		         "dojo/parser",
  		         "dijit/registry",
  		         "esri/config",
  		         "esri/map",
  		         "esri/graphic",
  		         "esri/tasks/GeometryService",
  		         "esri/tasks/BufferParameters",
  		         "esri/toolbars/draw",
  		         "esri/symbols/SimpleMarkerSymbol",
  		         "esri/symbols/SimpleLineSymbol",
  		         "esri/symbols/SimpleFillSymbol",
  		         "esri/symbols/PictureMarkerSymbol",
  		         "esri/symbols/Font",
  		         "esri/symbols/TextSymbol",
  		         "esri/tasks/AreasAndLengthsParameters",
  		         "dijit/layout/BorderContainer",
  		         "dijit/layout/ContentPane",
  		         "dojox/uuid/generateRandomUuid"],  
  		         function() {
		        	esri.config.defaults.io.proxyUrl = "http://" + window.location.hostname + ":8080/proxy/proxy.jsp";
		    		esri.config.defaults.io.alwaysUseProxy = true;
		        	me.map = new esri.Map('_mapDiv_', {
		        		isDoubleClickZoom:false,
		    	     	isPan:true,
		    	 		logo:false,
		    	 		slider: true,
		    	 		autoResize: true
		        	});
		        	me.baseMapInit();
		        	me.map.setLevel(1+6);
		        	me.geometryService = new esri.tasks.GeometryService("http://cetech.iptime.org:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer");
		        	
		        	Ext.Loader.loadScript({url:'app/map/toolbar/CustomDraw.js', onLoad:function(){
		        		me.dynamicLayerAdmin = Ext.create('Sgis.map.DynamicLayerAdmin', me.map);
			        	me.searchLayerAdmin = Ext.create('Sgis.map.SearchLayerAdmin', me.map);
		        		me.toolbar = new ash.map.toolbar.CustomDraw(me.map, {showTooltips:false}, true, me.map.graphics);
			        	dojo.connect(me.toolbar, "onDrawEnd", function(event){
			    			me.map.setMapCursor("default");
			    			me.measure(event);
			    		});
		        	}, onError:function(){}});
		        	
		        	Ext.Loader.loadScript({url:'app/map/task/CustomPrintTask.js', onLoad:function(){
		        		me.printTask = new ash.map.task.CustomPrintTask(me.map, "_mapDiv_", "http://cetech.iptime.org:6080/arcgis");
		        	}, onError:function(){}});
		        	
		        	me.smpLineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0,0,255,0.8]), 2);
		    		me.simpleFillSymbol= new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, me.smpLineSymbol, new dojo.Color([0,0,255,0.1]));
		    		me.mapEventDefine()
		        	Sgis.getApplication().coreMap = me;
        });
    },
    
    mapEventDefine:function(){
    	var me = this;
    	dojo.connect(this.map, "onExtentChange", function(extent){
    		if(me.extentRegAble){
    			if(me.extentReg.length>30){
        			me.extentReg.splice(0, 1);
        		}
        		me.extentReg.push(extent);
        		me.extentUnReIdx = me.extentReg.length-1;
    		}
    		me.extentRegAble = true;
    		if(me.backAndWhite && Sgis.getApplication().browser!='Chrome' && Sgis.getApplication().browser!='Opera'){
    			me.baseMapGrayExtentChange();
    		}
		});
    },
    
    baseMapInit: function(){
		var me = this;
		dojo.declare('CustomMapsLayer', esri.layers.TiledMapServiceLayer, {
		    constructor: function(opts) {
		      opts = opts || {};
		      this.spatialReference = new esri.SpatialReference({wkid: 102100});
		      this.tileInfo = new esri.layers.TileInfo({
		        rows: 256, cols: 256, dpi: 96,
		        origin: {x: -20037508.342787, y: 20037508.342787},
		        spatialReference: {wkid: 102100},
		        lods: [
						{level:0, resolution:156543.033928,    scale:591657527.591555},
						{level:1, resolution:78271.5169639999, scale:295828763.795777},
						{level:2, resolution:39135.7584820001, scale:147914381.897889},
						{level:3, resolution:19567.8792409999, scale:73957190.948944},
						{level:4, resolution:9783.93962049996, scale:36978595.474472},
						{level:5, resolution:4891.96981024998, scale:18489297.737236},
						{level:6, resolution:2445.98490512499, scale:9244648.868618},
						{level:7, resolution:1222.99245256249, scale:4622324.434309}, //start
						{level:8, resolution:611.49622628138,  scale:2311162.217155},
						{level:9, resolution:305.748113140558, scale:1155581.108577},
						{level:10,resolution:152.874056570411, scale:577790.554289},
						{level:11,resolution:76.4370282850732, scale:288895.277144},
						{level:12,resolution:38.2185141425366, scale:144447.638572},
						{level:13,resolution:19.1092570712683, scale:72223.819286},
						{level:14,resolution:9.55462853563415, scale:36111.909643},
						{level:15,resolution:4.77731426794937, scale:18055.954822},
						{level:16,resolution:2.38865713397468, scale:9027.977411},
						{level:17,resolution:1.19432856685505, scale:4513.988705},
						{level:18,resolution:0.597164283559817,scale:2256.994353}, //end
						{level:19,resolution:0.298582141647617,scale:1128.497176}
		          ]
		      });
		      
		      me.fullExtent = this.fullExtent = new esri.geometry.Extent({
		    	  xmin: 12728905.446270483,
		    	  ymin: 3409091.461517964,
		    	  xmax: 15766818.698435722,
		    	  ymax: 5441704.9176768325,
		          spatialReference: {
		        	  wkid: 102100
		          }
		      });
		      this.initialExtent = new esri.geometry.Extent({
		    	  xmin: 12728905.446270483,
		    	  ymin: 3409091.461517964,
		    	  xmax: 15766818.698435722,
		    	  ymax: 5441704.9176768325,
		          spatialReference: {
		        	  wkid: 102100
		          }
		      });
		      this.loaded = true;
		      this.onLoad(this);
		    },
		    getTileUrl: function(level, row, col) {
		    	var newrow = row + (Math.pow(2, level) * 47);
      			var newcol = col + (Math.pow(2, level) * 107);
		    	return esri.config.defaults.io.proxyUrl + "?http://xdworld.vworld.kr:8080/2d/Base/201301/" + level + "/" + col + "/" + row + ".png";
		    }	
		  });
		var baseMap = new CustomMapsLayer();
		this.map.addLayer(baseMap);
	},
	
	mapReisze:function(){
		var me  = this;
		if(this.map){
			var xmin = this.map.extent.xmin;
			var ymin = this.map.extent.ymin;
			var xmax = this.map.extent.xmax;
			var ymax = this.map.extent.ymax;
			var extent = new esri.geometry.Extent(xmin, ymin, xmax, ymax, new esri.SpatialReference({wkid: 102100}));
			var handler = dojo.connect(this.map, "onExtentChange", function(eve){
				me.map.centerAt(extent.getCenter());
				dojo.disconnect(handler);  
			});
			this.map.resize();	
		}
	},
	
	areaMeasureReady:function(unit, callback, scope){
		var me = this;
		me.map.graphics.clear();
		me.unit = unit;
		me.measureCallback = callback;
		me.measureScope = scope;
		me.toolbar.activate('polygon');
		me.map.setMapCursor("default");
		me.map.isPan = false;
	},
	
	measure:function(event){
		var me = this;
		me.toolbar.deactivate();
		me.map.isPan = true;
		
		var polygon = new esri.geometry.Polygon(event);
		var graphic = new esri.Graphic(polygon, me.simpleFillSymbol);
		
		me.map.graphics.add(graphic);
		dojo.connect(me.map.graphics, "onClick", function(event){
        	if(event.graphic.img && event.graphic.img =='btn_close' && event.graphic.geometry.uuid){
        		me.map.graphics.clear();
        	}
		});
		
		var symbol = new esri.symbol.PictureMarkerSymbol('resources/images/btn_close.png' , 16, 16);
        var point = null;
        if(event.type=='polygon'){
        	var finalRing = event.rings[0][event.rings[0].length-1];
    		point = new esri.geometry.Point(finalRing[0], finalRing[1], new esri.SpatialReference({"wkid":102100}));
        }else{
    		point = new esri.geometry.Point(event.xmax, event.ymax, new esri.SpatialReference({"wkid":102100}));
        }
		point.uuid = dojo.dojox.uuid.generateRandomUuid();
		var delGraphic = new esri.Graphic(point, symbol);
		delGraphic.img = 'btn_close'; 
		me.map.graphics.add(delGraphic);
		
		
		var params = new esri.tasks.AreasAndLengthsParameters();
	    params.polygons  = [ polygon ]
	    params.areaUnit = esri.tasks.GeometryService[me.unit]
	    
	    me.geometryService.areasAndLengths(params, function(result){
	    	me.measureCallback.apply(me.measureScope, [result]);
	  	});
	},
	
	baseMapGrayExtentChange:function(){
		var me = this;
		if(me.backAndWhite && Sgis.getApplication().browser!='Chrome' && Sgis.getApplication().browser!='Opera'){
			var imgs = Ext.query('.layerTile');
			for(var i=0; i<imgs.length; i++){
				imgs[i].src = me.grayImage(imgs[i]);
			}
		}
	},
	
	
	baseMapGray:function(mode){
		var me = this;
		me.backAndWhite = mode;
		if(Sgis.getApplication().browser=='Chrome' || Sgis.getApplication().browser=='Opera'){
			if(mode){
				document.getElementById("_mapDiv__layer0").style['-webkit-filter']="grayscale(100%)";
			}else{
				document.getElementById("_mapDiv__layer0").style['-webkit-filter']="";
			}
		}else{
			if(mode){
				var imgs = Ext.query('.layerTile');
				for(var i=0; i<imgs.length; i++){
					imgs[i].src = me.grayImage(imgs[i]);
				}
			}else{
				var level = me.map.getLevel();
				var deferred = me.map.setLevel(1);
				deferred.then(function(value){
					me.map.setLevel(level);
				},function(error){
				});
			}
		}
	},
	
	fullExtentMove:function(){
		var me = this;
		var deferred = me.map.setExtent(me.fullExtent, true);
		deferred.then(function(value){
			me.map.setLevel(1+6);
		},function(error){
		});
	},
	
	grayImage:function(imgObj){
		var canvas = document.createElement('canvas');
	    var canvasContext = canvas.getContext('2d');
	    console.log("xxxx")
	    var imgW = imgObj.width;
	    var imgH = imgObj.height;
	    canvas.width = imgW;
	    canvas.height = imgH;
	     
	    canvasContext.drawImage(imgObj, 0, 0);
	    var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);
	     
	    for(var y = 0; y < imgPixels.height; y++){
	        for(var x = 0; x < imgPixels.width; x++){
	            var i = (y * 4) * imgPixels.width + x * 4;
	            var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
	            imgPixels.data[i] = avg; 
	            imgPixels.data[i + 1] = avg; 
	            imgPixels.data[i + 2] = avg;
	        }
	    }
	    
	    canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
	    return canvas.toDataURL();
	},
	
	prevExtentMove:function(){
		var me = this;
		me.extentRegAble = false;
		me.extentUnReIdx--;
		if(me.extentUnReIdx > -1){
			me.map.setExtent(me.extentReg[me.extentUnReIdx], true);
		}else{
			me.extentUnReIdx == 0;
		}
	},
	
	nextExtentMove:function(){
		var me = this;
		me.extentRegAble = false;
		me.extentUnReIdx++;
		if(me.extentUnReIdx < me.extentReg.length){
			me.map.setExtent(me.extentReg[me.extentUnReIdx], true);
		}else{
			me.extentUnReIdx = me.extentReg.length - 1;
		}
	}
});
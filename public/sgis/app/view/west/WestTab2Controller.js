/**
* West Tab2 Controller
*/
Ext.define('Sgis.view.west.WestTab2Controller', {
	
	extend: 'Ext.app.ViewController',
	
	requires: ['Sgis.view.south.LayerDynamicGrid'],
	
	alias: 'controller.app-west-tab2',
	
	control: {
		'#cmbArea1': {
			select: 'onArea1Change'
		},
		'#cmbArea2': {
			select: 'onArea2Change'
		},
		'#cmbArea3': {
			select: 'onArea3Change'
		},
		'treepanel': {
			checkchange: 'onCheckChanged'
		}		
	},
	
	constructor: function(map) {
		var me = this;
		me.callParent();
		Sgis.getApplication().addListener('drawComplte', me.drawComplteHandler, me);
    },
	
	onArea1Change: function(combo, record, eOpts) {
		Sgis.getApplication().fireEvent('areaSelect', {admCd:record.data.id, layerId:'22'});
		var view2 = Ext.getCmp('cmbArea2');
		var view3 = Ext.getCmp('cmbArea3')
		var store2 = view2.getStore();
		store2.clearFilter();
		store2.filter(function(item){
			if(item.id=='_cancel_'){
				return true;
			}
			return (item.id+"").substring(0,2) == record.data.id;
		})		
		view2.reset();
		view2.setDisabled(false);
		view3.setDisabled(true);
	},
	
	onArea2Change: function(combo, record, eOpts) {
		var view3 = Ext.getCmp('cmbArea3')
		var store3 = view3.getStore();
		var admCd = record.data.id;
		if(admCd!='_cancel_'){
			Sgis.getApplication().fireEvent('areaSelect', {admCd:record.data.id, layerId:'23'});
			view3.setDisabled(false);
		}else{
			admCd = Ext.getCmp('cmbArea1').getSelection().data.id;
			Sgis.getApplication().fireEvent('areaSelect', {admCd:admCd, layerId:'22'});
			view3.setDisabled(true);
		}
		
		store3.clearFilter();
		store3.filter(function(item){
			try{
				if(item.id=='_cancel_'){
					return true;
				}
				return (item.id+"").substring(0,4) == record.data.id.substring(0,4);
			}catch(e){
				return false;
			}
			
		})
		
		view3.reset();
	},
	
	onArea3Change: function(combo, record, eOpts) {
		var admCd = record.data.id;
		if(admCd!='_cancel_'){
			Sgis.getApplication().fireEvent('areaSelect', {admCd:admCd, layerId:'24'});
		}else{
			admCd = Ext.getCmp('cmbArea2').getSelection().data.id;
			Sgis.getApplication().fireEvent('areaSelect', {admCd:admCd, layerId:'23'});
		}
	},

	onAreaCircleClick: function(button, e) {
		Sgis.getApplication().fireEvent('searchBtnClick', {drawType:'CIRCLE', state:button.pressed});
	},
	
	onAreaRectClick: function(button, e) {
		Sgis.getApplication().fireEvent('searchBtnClick', {drawType:'EXTENT', state:button.pressed});
	},
	
	onAreaPolygonClick: function(button, e) {
		Sgis.getApplication().fireEvent('searchBtnClick', {drawType:'POLYGON', state:button.pressed});
	},
	
	onAreaRadiusClick: function(button, e) {
		Sgis.getApplication().fireEvent('searchBtnClick', {drawType:'POINT', state:button.pressed});
	},
	
	drawComplteHandler: function(){
		var btnAr  = Ext.getCmp('btnHBox').items.items;
		Ext.each(btnAr, function(btn, index) {
			btn.setPressed(false);
		});
	},
	
	onCheckChanged: function(node, checked, eOpts) {
		if(!node.get('leaf')) {
			this.checkAllChildren(node, checked);
		} else {
			var view = Ext.getCmp("layerTree2");
			if(view.xtype == 'treepanel') {
				Sgis.getApplication().fireEvent('searchLayerOnOff', view.getChecked());
				this.searchLayerData(node, checked);
			}
		}
	},
	
	checkAllChildren: function(node, checked) {		
		var me = this;
		var children = node.childNodes;
		
		Ext.each(children, function(child, index) {
			child.set('checked', checked);
			me.searchLayerData(child, checked);
			
			if(index == children.length - 1) {
				var view = Ext.getCmp("layerTree2");
				if(view.xtype == 'treepanel') {
					Sgis.getApplication().fireEvent('searchLayerOnOff', view.getChecked());
				}
			}
		});
	},
	
	searchLayerData: function(node, checked) {
		var nodeIdStr = node.get('id');
		var nodeId = parseInt(nodeIdStr);
		
		if(!isNaN(nodeId)) {
			var viewName = 'Sgis.view.south.LayerDynamicGrid';
			if(checked) {
				SGIS.addSearchGrid(viewName, { node : node }, { layerId : nodeIdStr, title : node.get('text') });
			} else {
				SGIS.removeSearchGrid(nodeIdStr);
			}
		}
	}
});

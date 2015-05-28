Ext.define('Sgis.view.south.LayerDynamicGrid', {

	extend : 'Ext.grid.Panel',
	
	requires : [
		'Ext.ux.data.PagingMemoryProxy',
		'Sgis.store.LayerDynamicStore',
		'Sgis.view.south.LayerDynamicGridController'
	],
	
	xtype : 'layer_dynamic_grid',
	
	layerId : '0',
	
	controller : 'layer_dynamic_grid',

	title : '',
	
	store : Ext.create('Ext.data.Store'),

	flex : 1,
		
	autoScroll : true,
		
	rowLines : true,
		
	columnLines : true,
	
	columns : [ { 
		dataIndex : 'id',
		width : 30,
		text : ''
	} ],
	
	tbar : {
		xtype : 'toolbar',
		items : [{
			xtype : 'label',
			text : '연도',
			padding : '0 10 0 10'
		}, {
			itemId : 'btnYear',
			xtype : 'cycle',
			showText : true,
			menu : {
				items : [{
					text : '2010',
					checked : true
				}, {
					text : '2011'
				}, {
					text : '2012'
				}, {
					text : '2013'
				}, {
					text : '2014'
				}]
			}
		}, {
			xtype : 'label',
			text : '분기',
			padding : '0 10 0 30'
		}, {
			itemId : 'btnQuarter',
			xtype : 'cycle',
			showText : true,
			menu : {
				items : [{
					text : '전체',
					checked : true
				}, {
					text : '상반기'
				}, {
					text : '하반기'
				}]
			}
		}, '->', {
			xtype : 'label',
			text : '페이지 당 데이터 개수',
			padding : '0 10 0 00'
		}, {
			itemId : 'btnCountPerPage',
			xtype : 'cycle',
			showText : true,
			menu : {
				items : [{
					text : '15',
					checked : true
				}, {
					text : '30'
				}, {
					text : '50'
				}]
			}
		}]
	},
	
	bbar : {
		xtype : 'pagingtoolbar',
		cls : 'pagingToolbar',
		store : this.store,
		displayInfo: true,
		displayMsg: '{0} - {1} of {2}',
		emptyMsg: '데이터가 없습니다.'
	},
	
	reconfigureDynamicGrid : function(headers, dataList) {
		var columns = [];
		
		for(var i = 0 ; i < headers.length ; i++) {
			columns.push({
				text : headers[i].text,
				dataIndex : headers[i].dataIndex,
				flex : 1
			})
		}
		
		var store = this.createDynamicStore(columns, dataList);
		
		if(columns) {
			this.reconfigure(store, columns);
		} else {
			store.read();
		}
		
		Ext.resumeLayouts(true);
	},
	
	createDynamicStore : function(headers, dataList) {

		var store = this.getStore();
		var pageSize = this.getPageSize();
		
		if(store == null || !store.fields) {
			var fields = [];

			for(var i = 0 ; i < headers.length ; i++) {
				fields.push(headers[i].dataIndex);	
			}
		
			store = Ext.create('Sgis.store.LayerDynamicStore', {
				fields: fields,
				data: dataList
			});
		}

		store.setPageSize(pageSize);
		store.getProxy().setData(dataList);
		this.setStore(store);
		this.bindPagingToolbar(store);
		return store;
	},
	
	getPageSize : function() {
		var toolbar = this.down(' toolbar');
		var pageSize = toolbar.down('#btnCountPerPage').getText();
		return parseInt(pageSize);		
	},
	
	bindPagingToolbar : function(store) {
		var pagingtoolbar = this.down(' pagingtoolbar');
		pagingtoolbar.bindStore(store);
	}
});

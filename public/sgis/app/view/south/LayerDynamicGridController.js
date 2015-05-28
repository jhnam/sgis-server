/**
* LayerDynamicGridController
*/
Ext.define('Sgis.view.south.LayerDynamicGridController', {
	
	extend: 'Ext.app.ViewController',
	
	alias: 'controller.layer_dynamic_grid',
	
	control: {
		'toolbar cycle': {
			change: 'reloadGrid'
		}
	},
	
	constructor: function(map) {
		var me = this;
		me.callParent();
		Sgis.getApplication().addListener('searchComplte', me.searchComplteHandler, me);
    },
    
	reloadGrid: function(btn) {
		if(btn.itemId == 'btnCountPerPage') {
			var pageSize = btn.getText();
			pageSize = parseInt(pageSize);
			this.getView().getStore().setPageSize(pageSize);
			this.getView().getStore().load();
			
		} else {
			// TODO Local Filter
			var toolbar = this.getView().down(' toolbar');
			var year = toolbar.down('#btnYear').getText();
			var quarter = toolbar.down('#btnQuarter').getText();
		
			var params = {
				layerId : this.getView().layerId,
				year : year,
				quarter : quarter
			};
		
			console.log(params);
		
			// TODO 확인 필요 
			Sgis.getApplication().fireEvent('searchParameters', params.layerId, params);			
		}
	},
	
    searchComplteHandler: function(results) {
		if(!results || results.length == 0) {
			return;
		}
		
		for(var i = 0 ; i < results.length ; i++) {
			var result = results[i];
			var grid = this.getView();
			
			// grid 인스턴스 마다 자기 레이어 데이터만 처리함 
			if(grid.layerId == result.layerId) {
				var store = grid.getStore();
				if(store == null || !store.fields) {
					var data = this.getLayerDataAll(result);
					if(data && data[0] && data[1]) {
						grid.reconfigureDynamicGrid(data[0], data[1]);
					} else {
						console.log('Result is invalid : ');
						console.log(result);
					}
				} else {
					var data = this.getLayerData(result);
					if(data) {
						store.getProxy().setData(data);
						store.read();
					}
				}
			}			
		}
    },
	
	getLayerDataAll : function(result) {
		if(result) {
			var headers = this.getLayerMetadata(result);
			var dataList = this.getLayerData(result);
			return [headers, dataList];			
		} else {
			return null;
		}
	},
	
	/**
	 * Get Layer Columns Information
	 */
	getLayerMetadata : function(result) {
		var fields = result.field;
		if(!fields) {
			console.log('Field is null : ');
			console.log(result);
			return null;
		}
		
		var headers = [];
		
		for(var i = 0 ; i < fields.length ; i++) {
			var header = {
				text: fields[i].fnm,
				dataIndex: fields[i].fid,
				hidden: (fields[i].flag === false) ? true : false
			};
			
			headers.push(header);
		}
		
		return headers;
	},
	
	/**
	 * Get Layer Data
	 */
	getLayerData : function(result) {
		var headers = result.field;
		if(!headers) {
			console.log('Field is null - ');
			console.log(result);
			return null;
		}
		
		var datum = result.datas;
		if(!datum) {
			console.log('Datas is null - ');
			console.log(result);
			return null;
		}
		
		var dataList = [];
		
		for(var i = 0 ; i < datum.length ; i++) {
			var data = {};
			
			for(var j = 0 ; j < headers.length ; j++) {
				data[headers[j].fid] = datum[i][headers[j].fid];
			}
			
			dataList.push(data);
		}
		
		return dataList;
	},
	
	reconfigureSearchForm : function() {
		// TODO
	}
});

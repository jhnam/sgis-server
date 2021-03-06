Ext.define('Sgis.store.Area3Store', {
	
	extend: 'Ext.data.Store',

	fields: ['id', 'name'],

	autoLoad: true,

	remoteSort: true,
	
	listeners: {
		beforeload: function(store) {
			Ext.defer(function() {
				var queryTask = new esri.tasks.QueryTask("http://cetech.iptime.org:6080/arcgis/rest/services/Layer2/MapServer/24"); //법정동
				var query = new esri.tasks.Query();
				query.returnGeometry = false;
				query.where = '1=1';
				query.outFields = ['ADM_CD', 'DONG_NM'];
				queryTask.execute(query,  function(results){
					var data = results.features;
					data.sort(function(a,b){
						if(a.attributes.DONG_NM > b.attributes.DONG_NM){
							return 1;
						}else if(a.attributes.DONG_NM < b.attributes.DONG_NM){
							return -1;
						}else{
							return 0;
						}
					});
					var receiveData = [{id:'_cancel_', name:'--선택해제--'}];
					Ext.each(data, function(media, index) {
						receiveData.push({id:media.attributes.ADM_CD, name:media.attributes.DONG_NM})
		   				if(data.length==index+1){
		   					store.setData(receiveData);
		   				}
					});
				});
				dojo.connect(queryTask, "onError", function(err) {
					alert(err);
				});
			}, 1, this);
        }
    }
});

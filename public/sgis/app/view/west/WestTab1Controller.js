/**
* West Tab1 Tree Controller
*/
Ext.define('Sgis.view.west.WestTab1Controller', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.app-west-tab1',

	control: {
		'treepanel': {
			checkchange: 'onCheckChanged'
		}
	},
	
	onCheckChanged: function(node, checked, eOpts) {
		if(!node.get('leaf')) {
			this.checkAllChildren(node, checked);
		}else{
			Sgis.getApplication().fireEvent('dynamicLayerOnOff', this.getView().getChecked());
		}
	},
	
	checkAllChildren: function(node, checked) {
		var me = this;
		var children = node.childNodes;
		Ext.each(children, function(child, index) {
			child.set('checked', checked);
			if(index==children.length-1){
				Sgis.getApplication().fireEvent('dynamicLayerOnOff', me.getView().getChecked());
			}
		});
	}
});

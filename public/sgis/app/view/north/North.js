Ext.define('Sgis.view.north.North', {
	
	extend: 'Ext.panel.Panel',
	
	requires: ['Sgis.view.north.NorthController'],
	
	xtype: 'app-north',
	
	controller: 'app-north',
	
	padding: 10,
	
	height: 50,
	
	padding: 0,
	
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	
	items: [{
		xtype: 'image',
		width: 300,
		padding: '5 10 5 10',
		bind: {
			src: '{brand_image}'
		}
	}, {
		xtype: 'container',
		width: 200
	}, {
		xtype: 'container',
		flex: 1,
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		defaults: {
			border: 0,
			style: 'background-color:white;background-image:none;'
		},		
		items: [{
			xtype: 'toolbar',
			border: 0,
			flex: 1,
			items: [{
				xtype: 'button',
				text: '전체',
				handler: 'onClickAll'
			}, {
				xtype: 'button',
				text: '이동',
				handler: 'onClickMove'
			}, {
				xtype: 'button',
				text: '확대',
				handler: 'onClickZoomIn'
			}, {
				xtype: 'button',
				text: '축소',
				handler: 'onClickZoomOut'
			}, {
				xtype: 'button',
				text: '이전',
				handler: 'onClickPrev'
			}, {
				xtype: 'button',
				text: '다음',
				handler: 'onClickNext'
			}, {
				xtype: 'button',
				text: '삭제',
				handler: 'onClickDelete'
			}, {
				xtype: 'button',
				text: '측정',
				handler: 'onClickMeasure'
			}, {
				xtype: 'button',
				text: '인쇄',
				handler: 'onClickPrint'
			}, {
				xtype: 'button',
				text: '저장',
				handler: 'onClickSave'
			}, '->', {
				id: 'mapmode',
				xtype: 'cycle',
				showText: true,
				menu : {
					items: [{
						text: '위성',
						checked: true
					}, {
						text: '단색'
					}]
				},
				handler: 'onClickMapMode'
			}, '->']
		}]
	}]
  
});
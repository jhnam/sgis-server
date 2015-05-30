Ext.define('Sgis.view.north.measure.MeasureWindow', {
    extend: 'Ext.window.Window',
    xtype: 'app-measureWindow',

    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Sgis.view.north.MeasureWindowController'
    ],

    controller: 'app-measurewindow',
    
    height: 200,
    width: 300,
    bodyPadding: 0,
    title: '측정',
    items: [
        {
            xtype: 'tabpanel',
            activeTab: 0,
            bodyPadding: 6,
            items: [
                {
                    xtype: 'panel',
                    bodyBorder: false,
                    title: '면적',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: '단위',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center',
                                padding: '4 4 4 4'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    id: 'areaUnit',
                                	store: new Ext.data.SimpleStore({
                                		data: [
											['NIT_ACRES' , '에이커'],
											['UNIT_SQUARE_MILES' , '평방마일'],
											['UNIT_SQUARE_KILOMETERS' , '평방킬로미터'],
											['UNIT_SQUARE_METERS' , '평방미터'],
											['UNIT_HECTARES' , '평방헥타르'],
											['UNIT_SQUARE_YARDS' , '평방야드'],
											['UNIT_FOOT' , '평방피트']
                                		],
                                		id: 0,
                                		fields: ['value', 'text']
                                	})
                                },
                                {
                                	xtype: 'tbspacer', width: 10
                                },
                                {
                                    xtype: 'button',
                                    flex: 0.3,
                                    text: '측정',
                                    itemId: 'areaBtn'
                                }
                            ]
                        },
                        {
                        	xtype: 'fieldset',
                        	title: '결과',
                        	height: 45,
                        	layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center',
                                padding: '0 4 4 4'
                            },
                            items: [
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        id:'areaResult',
                                        text: ''
                                    }
                                ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: '거리'
                },
                {
                    xtype: 'panel',
                    title: '위치'
                }
            ]
        }
    ]

});
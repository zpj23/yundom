
var zhendata ={
		
    init : function(param_url,param_id,maintile,subtitle,liangci){ 
    
    
          var dataArray = [], columnNameArray=[];
		    $.ajax({
				  url:param_url,
				  type:'post',
				  async:false,
				  dataType:'json',
				  success:function(data){
					/* $.each(data, function(k,v){
						 columnNameArray.push(v.ORG_NAME);
						 var obj ={y:v.GROUP_COUNT, color:colors[k]};
						 dataArray.push(obj);
					 })*/
					 
					  columnNameArray = data.x;//['1月','2月','3月','4月','5月','6月'];
					  colorsArray = data.colordata;
					  dataArray = data.sourcedata;/*[{
				            name: '特别重大',
				            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
				        },{
				            name: '重大',
				            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
				        }, {
				            name: '较大',
				            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
				        }, {
				            name: '一般',
				            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
				        }];*/
				  }
			  })
    
            
		    $('#'+param_id).highcharts({
		       
		        title: {
		            text: maintile,   // 主标题
		            x: -20 //center
		        },
		        subtitle: {
		            text: subtitle,   //子标题
		            x: -20
		        },
		        xAxis: {
		            categories: columnNameArray //['一月', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']    //横坐标栏
		        },
		        yAxis: {
		            title: {
		                text: ''     //纵坐标说明
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        tooltip: {
		            valueSuffix: liangci               //单位
		        },		        
			    credits:{
			    	enabled:false
			    },
		        colors :  colorsArray,//['#FF0000', '#EE9A00', '#EEEE00', '#0000EE'],
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        series: dataArray,
		        exporting: {
			        enabled: false   // 导出
			    }
		        
		    });
        }
}

var projectin ={
		
    init : function(param_url,param_id,maintile,subtitle,liangci){
          var dataArray = [], columnNameArray=[];
		    $.ajax({
				  url:param_url,
				  type:"post",
				  async:false,
				  dataType:"json",
				  success:function(data){
					  columnNameArray =data.x; 
					  // colorsArray = data.colordata;
					  dataArray = data.sourcedata;
				  }
			  })
		    $("#"+param_id).highcharts({		       
		        title: {
		            text: maintile,   // 主标题
		            x: -20 //center
		        },
		        subtitle: {
		            text: subtitle,   //子标题
		            x: -20
		        },
		        xAxis: {
		            categories: columnNameArray  //横坐标栏  
		        },
		        yAxis: {
		            title: {
		                text: ""     //纵坐标说明
		            },
		            min: 0, 
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: "#808080"
		            }]
		        },
		        tooltip: {
		            valueSuffix: liangci               //单位
		        },		        
			    credits:{
			    	enabled:false
			    },
		        colors :  ['#FF0000', '#EE9A00', '#EEEE00', '#0000EE'],   // colorsArray,
		        
		        series: dataArray,
		        exporting: {
			        enabled: false   // 导出
			    }		        
		    });
        }
}

var projectnature ={
		
    init : function(param_url,param_id,maintile,subtitle,liangci){
          var dataArray = [], columnNameArray=[];
		    $.ajax({
				  url:param_url,
				  type:'post',
				  async:false,
				  dataType:'json',
				  success:function(data){
					  columnNameArray =data.x; 
					  // colorsArray = data.colordata;
					  dataArray = data.sourcedata;
				  }
			  })
			  
			$("#"+param_id).highcharts({
		        chart: {
		            type: 'column',
		            margin: [ 50, 50, 100, 80]
		        },
		        title: {
		            text: maintile
		        },
		        xAxis: {
		            categories: columnNameArray,
		            allowDecimals:false,
		            labels: {
		                rotation: -45,
		                align: 'right',
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif'
		                }
		            }
		        },
		        yAxis: {
		            min: 0,
		            allowDecimals:false,
		            title: {
		                text: liangci
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        legend: {
		            enabled: false
		        },
		        tooltip: {
		            pointFormat: '{point.y:.1}'+liangci,
		        },
		        series: [{
		            name: 'Population',
		            data: dataArray,
		            dataLabels: {
		                enabled: true,
		                rotation: -90,
		                color: '#FFFFFF',
		                align: 'right',
		                x: 4,
		                y: 10,
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif',
		                    textShadow: '0 0 3px black'
		                }
		            },
		            cursor: 'pointer',
		            events: {
		                click: function(e) {
				         alert(1);    
		                //location.href = e.point.url;
				                    //上面是当前页跳转，如果是要跳出新页面，那就用
				                    //window.open(e.point.url);
				                    //这里的url要后面的data里给出
				            }
		                }
		            

		        }],
		        exporting: {
			        enabled: false   // 导出
			    },
			    credits:{
			    	enabled:false
			    },		        
		    });
        }
}
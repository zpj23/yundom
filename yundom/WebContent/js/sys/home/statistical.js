var statistical={
	statisId:'',
	
	categories:'',
	
	data:'',
	
	init:function(param_url, param_id){
	  var colors = Highcharts.getOptions().colors;
	  var dataArray = [], columnNameArray=[];
	  $.ajax({
		  url:param_url,
		  type:'post',
		  async:false,
		  dataType:'json',
		  success:function(data){
			 $.each(data, function(k,v){
				 columnNameArray.push(v.ORG_NAME);
				 var obj ={y:v.GROUP_COUNT, color:colors[k]};
				 dataArray.push(obj);
			 })
		  }
	  })
	  this.statisId = param_id;
	  this.categories = columnNameArray;
	  this.data = dataArray;
	  
	  this.showHighChart();
	},
	
	showHighChart:function(){
		var chart = $(this.statisId).highcharts({
		    chart: {
		        type: 'column',
		        options3d: {
	                enabled: true,
	                alpha: 15,
	                beta: 15,
	                depth: 50,
	                viewDistance: 25
	            }
		    },
		    title: {
		        text: ''
		    },
		    xAxis:{
		    	categories : this.categories
		    },
		    yAxis: {
		        title: {
		            text: ''
		        }
		    },
		    plotOptions: {
		    	series: {
		            showInLegend: false
		        }
		    },
		    credits:{
		    	enabled:false
		    },
		    tooltip: {
		        formatter: function() {
		            s = '<b>'+this.x +':'+ this.y +'件</b>';
		            return s;
		        }
		    },
		    series: [{
		        data: this.data,
		        color: 'white'
		    }],
		    exporting: {
		        enabled: false
		    }
		}).highcharts();
		chart.options.chart.options3d.alpha = 10;
		chart.options.chart.options3d.beta = 0;
		chart.redraw(false);
	}
	
}


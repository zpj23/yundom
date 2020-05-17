
var projectnature ={
		
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
				        chart: {
				            plotBackgroundColor: null,
				            plotBorderWidth: null,
				            plotShadow: false
				        },
				        title: {
				            text: maintile
				        },
				        tooltip: {
				        	allowDecimals:false,
				    	    pointFormat: "{point.y:1}"+liangci+"</b>"
				        },
				        plotOptions: {
				            pie: {
				                allowPointSelect: true,
				                allowDecimals:false,
				                cursor: "pointer",
				                dataLabels: {
				                    enabled: true,
				                    color: "#000000",
				                    connectorColor: "#000000",
				                    formatter: function() {
				                        return "<b>"+ this.point.name +"</b>: "+this.point.y+liangci;
				                    }
				                }
				            },
					        series: {
						        cursor: "pointer",
						        events: {
						            click: function(e) {
						        	var deptcode = e.point.url;
						        	var title = e.point.name+"统计";
						        	
						        	var randomnum=""; 
						        	for(var i=0;i<6;i++) 
						        	{ 
						        	   randomnum+=Math.floor(Math.random()*10); 
						        	}
						        	var naturetype = $("#naturetype").val();
						        	if(naturetype=="0"){
						        		naturetype = "ZDJC";
						        	}else if(naturetype=="1"){
						        		naturetype = "ZDZC";
						        	}else if(naturetype=="2"){
						        		naturetype = "ZDXM";
						        	}
						        	var url_= "HnAction_showListIndex?deptcode="+deptcode+"&naturetype="+naturetype;						        	
						        	parent.parent.Home.addTab(randomnum, title, "", url_, "href",true);
						            
						        //location.href = e.point.url;
						                //上面是当前页跳转，如果是要跳出新页面，那就用
						                //window.open(e.point.url);
						                //这里的url要后面的data里给出
						        }
						    },
						    }
				        },
				        series: [{
				            type: "pie",
				            name: "",
				            data: dataArray 
				        }],
				        exporting: {
					        enabled: false   // 导出
					    },
					    credits:{
					    	enabled:false
					    }
				    });
        }
}
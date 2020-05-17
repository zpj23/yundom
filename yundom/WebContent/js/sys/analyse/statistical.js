// 类型数据
var charTypeObj={
	columnChart:{
		// 环比
		MOM_:'C_MOM',
		// 普通
		GEN_:'C_GEN',
	},
	pieChart:{
		// 环比
		MOM_:'P_MOM',
		// 普通
		GEN_:'P_GEN',
	}
}

// 图表动态数据
var charSeriesData={
    init:{
    	columnChart:function(param_type, param_data){
    		if(param_type==charTypeObj.columnChart.MOM_){
    			charSeriesData.columnChart.MOM_(param_data);
    		}
    		if(param_type==charTypeObj.columnChart.GEN_){
    			charSeriesData.columnChart.GEN_(param_data);
    		}
    	},
    	pieChart:function(param_type, param_data){
    		if(param_type==charTypeObj.pieChart.GEN_){
    			charSeriesData.pieChart.GEN_(param_data);
    		}
    	}
	},
	
	columnChart:{
		// 环比
		MOM_:function(param){
			var newObjCount=[];
	  		$.each(param, function(k,v){
	  			var obj=[];
	  			$.each(v, function(ck,cv){
	  				statistical.categories.push('<font style="font-size:12px;">'+cv.NAME_+'</font>');
	  				obj.push({y:cv.COUNT_,value:cv.VALUE_,code:cv.CODE_});
	  			});
	  			newObjCount.push(obj);
			});
			statistical.data_.push({name:new Date().getMonth()+"月", data:newObjCount[0], color:'#7CB5EC'});
			statistical.data_.push({name:new Date().getMonth()+1+"月", data:newObjCount[1], color:'#F9AD6B'});
			
			statistical.showHighChart();
		},
		// 普通
		GEN_:function(param){
			var tempArray = [];
			 $.each(param, function (k,v){
				 statistical.categories.push( '<font style="font-size:12px;">' +v.NAME_+ '</font>');
                 var obj ={name:'<font style="font-size:12px;">' +v.NAME_+ '</font>',
                            y:v.COUNT_,
                            color:statistical.yColor(v.NAME_, k),
                            value:v.VALUE_,
                            code:v.CODE_};
                 tempArray.push(obj);
			 })
			  
           statistical.data_.push({ showInLegend: false , data: tempArray});
           statistical.showHighChart();
		},
	},
	pieChart:{
		// 普通
		GEN_:function(param){
			var tempArray = [];
			 $.each(param, function (k,v){
				 statistical.categories.push( '<font style="font-size:12px;">' +v.NAME_+ '</font>');
                 var obj ={name:'<font style="font-size:12px;">' +v.NAME_+ '</font>',
                            y:v.COUNT_,
                            color:statistical.yColor(v.NAME_, k),
                            value:v.VALUE_,
                            code:v.CODE_};
                 tempArray.push(obj);
			 })
           statistical.data_.push({ type:'pie', name:'', data: tempArray});
           statistical.pieHighChart();
		}
	}          
}

var statistical={
    // 请求地址            
	dataUrl:'',
	// 元素ID
	statisId:'',
	// 图表名称
	titleName:'',
	// 单击跳转地址
	clickUrl:'',
	// X轴名称
	categories:[],
	// 图表数据
	data_:[],
	
	init:function(objArray){
		$.each(objArray, function(k, v) {
			
			statistical.dataUrl = v.url_;
			statistical.statisId = v.id_;
			statistical.titleName = v.titleName_;
			statistical.clickUrl = v.clickUrl_;
			$.ajax({
				  url:v.url_,
				  type:'post',
				  async:false,
				  data:v.paramData_,
				  dataType:'json',
				  success:function(data){
				  	charSeriesData.init.columnChart(v.charType_, data);
				  	charSeriesData.init.pieChart(v.charType_, data);
				  	statistical.charDestroy();
				  }
			})
			
			
		});
	},
	
	yColor:function(param, param_k){
		if(param.indexOf('红色')==0){
			return '#F15C80';
		}if(param.indexOf('橙色')==0){
			return '#F7A35C';
		}if(param.indexOf('黄色')==0){
			return '#E4D354';
		}if(param.indexOf('蓝色')==0){
			return '#7CB5EC';
		}
		return Highcharts.getOptions().colors[param_k];
	},
	
	charDestroy:function(){
		statistical.categories = [];
		statistical.data_ = [];
	},
	
	showHighChart:function(){
	var newObj = $.extend(true, {}, statistical);
	var chart = new Highcharts.Chart({
        chart: {
            renderTo: newObj.statisId,
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 0,
                beta: 12,
                depth: 50,
                viewDistance: 25
            }
        },
		xAxis: {
			categories: newObj.categories
		},
		yAxis: {
			title: {
				text: ''
			}
		},
        title: {
            text: newObj.titleName
        },
        subtitle: {
            text: ''
        },
        plotOptions: {
            series: {
				cursor: 'pointer',
				point: {
					events: {
						click: function(event){
							window.location.href=newObj.clickUrl+'?mainOrgid='+event.point.value+'&itemCode='+event.point.code;
						}
					}
				}
			}
        },
        series: newObj.data_,
		tooltip: {
			formatter: function(){
				return this.x+":"+this.y+"件";
			}
		},
		exporting: {
			enabled: false
		},
		credits: {
			text: ""
		}
    });
	},
	pieHighChart:function(){
		var newObj = $.extend(true, {}, statistical);
		$('#'+newObj.statisId).highcharts({
			chart: {
			    type: 'pie',
			    options3d: {
			        enabled: true,
			        alpha: 45,
			        beta: 0
			    }
			},
			title: {
			    text: newObj.titleName
			},
			tooltip: {
			    pointFormat: '<b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
			    pie: {
			        allowPointSelect: true,
			        cursor: 'pointer',
			        depth: 35,
			        dataLabels: {
			            enabled: false,
			            format: '{point.name}'
			        },
			        showInLegend: true
			    }
			},
			series: newObj.data_,
			exporting: {
				enabled: false
			},
			credits: {
				text: ""
			}
		});
	}
}




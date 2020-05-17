var fchar ={
     //类型，数据url，id，主标题，副标题，单位量词，x轴名称，y轴名称，前缀描述           
    init : function(type,url,id,width,height,title,subtitle,dangwei,xaxisname,yaxisname,numberprefix,fontsize){
    	 if(fontsize == undefined ){
    		 fontsize = 12;	 //默认字体
    	 }
	       var data_=""; 
	        var swfUrl = '';
		  if(type=='bing'){
			  swfUrl = "js/FusionCharts3.2/Pie2D.swf?ChartNoDataText=无数据显示";
		  }else if(type=='line'){
			  swfUrl = "js/FusionCharts3.2/Line.swf?ChartNoDataText=无数据显示";
		  }else if(type=='zhu'){
			  swfUrl = "js/FusionCharts3.2/Column3D.swf?ChartNoDataText=无数据显示";
		  }
          $.ajax({
			  url:url,
			  type:"post",
			  async:false,
			  dataType:"json",
			  success:function(data){	      
			      if(type=='bing'){
					  data_ += '<chart  canvasbordercolor="666666" bgcolor="ffffff" caption="'+title+'" baseFontSize="'+fontsize+'" formatnumberscale="0" showborder="0">';
					  var obj = data.sourcedata;
					  for(var i=0;i<data.listnum;i++){
						  data_+='<set label="'+obj[i].name+'" value="'+obj[i].num+'" />';
					  }
					  data_+='</chart>';
			      }else if(type=='line'){
			    	  data_ += '<chart  caption="'+title+'" subcaption="" xaxisname="'+xaxisname+'" yaxisname="'+yaxisname+'" numberprefix="'+numberprefix
			    	  +'" showlabels="1" showalternatehgridcolor="1" alternatehgridcolor="ff5904" divlinecolor="ff5904" divlinealpha="20" alternatehgridalpha="5" canvasbordercolor="666666" canvasborderthickness="1" basefontcolor="666666" baseFontSize="'+fontsize+'" linecolor="FF5904" linealpha="85" showvalues="1" rotatevalues="0" valueposition="auto" canvaspadding="10"  bgcolor="ffffff" valuepadding="5" showborder="0">';
			    	  var obj = data.sourcedata;
					  for(var i=0;i<data.listnum;i++){
						  data_+='<set label="'+obj[i].name+'" value="'+obj[i].num+'" />';							  
					  }
					  data_+='</chart>';
			      }else if(type=='zhu'){
			    	  /*data_ += '<chart  caption="'+title+'"  bgAlpha="1" numberSuffix="'+dangwei+'"  subcaption="" xaxisname="'+xaxisname+'" yaxisname="'+yaxisname+'" numberprefix="'+numberprefix
			    	  +'" showlabels="1" showalternatehgridcolor="1" rotateLabels="1" labelDisplay="STAGGER"  alternatehgridcolor="ff5904" divlinecolor="ff5904" divlinealpha="20" alternatehgridalpha="5" canvasbordercolor="666666" canvasborderthickness="1" basefontcolor="666666" baseFontSize="'+fontsize+'" linecolor="FF5904" linealpha="85" showvalues="1" rotatevalues="0" valueposition="no" canvaspadding="10"  bgcolor="ffffff" valuepadding="0" showborder="0">';
			    	  */
			    	  data_ += '<chart  caption="'+title+'" canvasBgColor="red" canvasBgAlpha="10" numberSuffix="'+dangwei+'"  subcaption="" xaxisname="'+xaxisname+'" yaxisname="'+yaxisname+'" numberprefix="'+numberprefix
			    	  +'"  baseFontSize="'+fontsize+'"   bgcolor="ffffff"   showLimits="0" decimalPresion="0" formatNumberScale="0" >';
			    	  
			    	  var obj = data.sourcedata;
					  for(var i=0;i<data.listnum;i++){
						  data_+='<set label="'+obj[i].name+'" value="'+obj[i].num+'" />';							  
					  }
					  data_+='</chart>';
			      }
			      
			  }
		  });
          		  
		  var chart_SalesByYear = new FusionCharts({ 
			"swfUrl" : swfUrl,
			"width" : width,    //650
			"height" : height,   //220
			"renderAt" : id,
			"dataFormat" : "xml",
			"id" : id+"_",
			"wmode" : "opaque",
		    "baseFontSize":"22",
			"dataSource" : data_			
			}).render();
		  
			
            //"bgAlpha ":"0",
			//"bgColor":"red",
		    //"canvasBgColor":"red",
         

    }






}

var fchar ={
     //类型，数据url，id，主标题，副标题，单位量词，x轴名称，y轴名称，前缀描述           
    init : function(type,url,id,width,height,type2,title,subtitle,dangwei,xaxisname,yaxisname,numberprefix,fontsize){
    	 if(fontsize == undefined ){
    		 fontsize = 12;	 //默认字体
    	 }
	       var data_="";  
          $.ajax({
			  url:url,
			  type:"post",
			  async:false,
			  dataType:"json",
			  success:function(data){       	      
			      if(type=='bing'){
					  data_ += '<chart  canvasBgAlpha="0" bgcolor="cfdef2" caption="'+title+'" baseFontSize="'+fontsize+'" formatnumberscale="0" showborder="0">';
					  var obj = data.sourcedata;
					  for(var i=0;i<data.listnum;i++){
						  data_+='<set label="'+obj[i].name+'" value="'+obj[i].num+'" />';
					  }
					  data_+='</chart>';
			      }else if(type=='line'){
			    	  data_ += '<chart  caption="'+title+'" subcaption="" bgcolor="cfdef2" xaxisname="'+xaxisname+'" yaxisname="'+yaxisname+'" numberprefix="'+numberprefix
			    	  +'" showlabels="1" showalternatehgridcolor="1" alternatehgridcolor="ff5904" divlinecolor="ff5904" divlinealpha="20" alternatehgridalpha="5" canvasbordercolor="666666" canvasborderthickness="1" basefontcolor="666666" baseFontSize="'+fontsize+'" linecolor="FF5904" linealpha="85" showvalues="1" rotatevalues="0" valueposition="auto" canvaspadding="10" valuepadding="5" showborder="0">';
			    	  var obj = data.sourcedata;
					  for(var i=0;i<data.listnum;i++){
						  data_+='<set label="'+obj[i].name+'" value="'+obj[i].num+'" />';							  
					  }
					  data_+='</chart>';
			      }else if(type =='column'){
			    	  data_ += '<chart  caption="'+title+'" bgcolor="E6EEF8" showLimits="0" numDivLines="0" canvasBgColor="ffffff" canvasBgAlpha="30" basefontcolor="666666" baseFontSize="'+fontsize+'" subcaption="" xaxisname="'+xaxisname+'" yaxisname="'+yaxisname+'" showName="1" decimalPresion="0" formatNumberScale="0">';
			    	  if(type2 == "XMXZ"){
			    		  var obj = data.sourcedata;
			    		  for(var i=0;i<3;i++){
							  data_+='<set name="'+obj[i].name+'" value="'+obj[i].num+'" />';							  
						  }
			    	  }
			    	  if(type2 == "XMJG"){
			    		  var obj = data.sourcedata;
			    		  for(var i=3;i<6;i++){
							  data_+='<set name="'+obj[i].name+'" value="'+obj[i].num+'" />';							  
						  }
			    	  }else if(type2==""){
			    		  var obj = data.sourcedata;
						  for(var i=0;i<data.listnum;i++){
							  data_+='<set label="'+obj[i].name+'" value="'+obj[i].num+'" />';
						  } 
			    	  }else if(type2=="KHPM"){//考评排名的柱状图
			    		  var obj = data.sourcedata;
			    		  var arr =obj;
			    		  for(var m=0;m<data.listnum-1;m++){
			    			  for(var n=m+1;n<data.listnum;n++){
			    				  if(parseInt(arr[m].num)>parseInt(arr[n].num)){
			    					  var num=arr[m];
			    					  arr[m]=arr[n];
			    					  arr[n]=num;
			    				  }
			    			  }
			    		  }
						  for(var i=data.listnum-1;i>=0;i--){
							  data_+='<set label="'+arr[i].name+'" value="'+arr[i].num+'" />';
						  } 
			    	  }
			    	  data_+='</chart>';
			      }
			      
			  }
		  });
          
		  var swfUrl = '';
		  if(type=='bing'){
			  swfUrl = "js/FusionCharts3.2/Pie2D.swf?ChartNoDataText=无数据显示";
		  }else if(type=='line'){
			  swfUrl = "js/FusionCharts3.2/Line.swf?ChartNoDataText=无数据显示";
		  }else if(type == 'column'){
			  swfUrl = "js/FusionCharts3.2/Column3D.swf?ChartNoDataText=无数据显示";
	      }
		  
		  
		  
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

<%@ page language="java" errorPage="/error.jsp" pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<html>
<head>
<title></title>
<script type="text/javascript">
$(function() {
	userform = $('#userform').form();
	datagrid = $('#datagrid');

	$('#datagrid').datagrid({
		url : 'HnAction_toRiskJson',
		queryParams : {
			projectid : '${proinfo.id}'
		},
		idField : 'id',
		frozenColumns : [ [ {
			title : 'id',
			field : 'id',
			width : 50,
			hidden :true
		} ] ],
		columns : [ [ {
			field : 'name',
			title : '涉事名称',
			width : 200,
			formatter: function(value, rowData, rowIndex){
				return "<a href=\"javascript:viewinfo('"+rowData.id+"')\">"+value+"</a>";				 
			}
		},{
			field : 'methods',
			title : '风险调查方式',
			width : 100
		},{
			field : 'levels',
			title : '项目风险等级',
			width : 100
		},{
			field : 'time',
			title : '发生时间',
			width : 100
		}  ] ],
		onClickRow:function(row){
		    //显示关联人员
            var rowData =  datagrid.datagrid('getSelected');	           
		  }
	});
});

function importWord(projectid){
	form2.action ="HnAction_importWord?projectid="+projectid;
    form2.submit();
}

function viewinfo(id){
	form1.action="HnAction_toViewRisk?id="+id;
	form1.submit();
}
</script>
</head>
<body>
<div class="easyui-layout" data-options="fit:true">
		<div data-options="region:'center',border:false" style="padding-top:3px;background-color:#E6EEF8;">
	<div id="tt" class="easyui-tabs" data-options="fit:true,border:false">
		<div title="稳评项目报备" style="background-color:#E6EEF8;">
			<jsp:include page="../hnfxpglc/baobei/toSee.jsp"></jsp:include>
		</div>

		<div title="制定评估方案" style="background-color:#E6EEF8;">
			<c:if test="${groupList ne null }">
		       <jsp:include page="../hnfxpglc/view/pingguxiaozu.jsp"></jsp:include>
		    </c:if>
		    
		    <c:if test="${proinfo.assessModule ne null }">
		       <jsp:include page="../hnfxpglc/view/pinggufangan.jsp"></jsp:include>
			</c:if>
		</div>

		<div title="公示评估项目" style="background-color:#E6EEF8;">
			<c:if test="${gongshi ne null }">
			   <jsp:include page="../hnfxpglc/view/gongshi.jsp"></jsp:include>
			</c:if>
		</div>
			
		<div title="开展风险调查" style="background-color:#E6EEF8;">
			<c:if test="${fn:contains(proinfo.assessModule, 'FX1602')}">
			  <c:if test="${mycp ne null }">
		        <jsp:include page="../hnfxpglc/view/minyiceping.jsp"></jsp:include>
		      </c:if>
		    </c:if>
		      <c:if test="${fn:contains(proinfo.assessModule, 'FX1603')}">
		     <c:if test="${wjdc ne null }"> 
		      <jsp:include page="../hnfxpglc/view/wenjuandiaocha.jsp"></jsp:include>
		     </c:if>  
		   </c:if>
		      
		   <c:if test="${fn:contains(proinfo.assessModule, 'FX1604')}">
		     <c:if test="${zth ne null }">
		      <jsp:include page="../hnfxpglc/view/zuotanhui.jsp"></jsp:include> 
		     </c:if>
		   </c:if>
		   
		   <c:if test="${fn:contains(proinfo.assessModule, 'FX1605')}">	
		     <c:if test="${zdzf ne null }">
		      <jsp:include page="../hnfxpglc/view/zhongdianzoufang.jsp"></jsp:include>
		     </c:if> 
		   </c:if>
		   
		   <c:if test="${fn:contains(proinfo.assessModule, 'FX1606')}">	
		     <jsp:include page="../hnfxpglc/view/tingzhenghui.jsp"></jsp:include> 
		   </c:if>
		   
		    <c:if test="${fn:contains(proinfo.assessModule, 'FX1607')}">	
		     <jsp:include page="../hnfxpglc/view/bumen.jsp"></jsp:include> 
		   </c:if>
		   
		   <c:if test="${fn:contains(proinfo.assessModule, 'FX1608')}">	
		     <jsp:include page="../hnfxpglc/view/wangluoyuqing.jsp"></jsp:include> 
		   </c:if>
		</div>
			
		<div title="全面分析论证" style="background-color:#E6EEF8;">
		    <c:if test="${riskList ne null }">
				<table id="datagrid" fit="false" fitColumns="true"
					style="height: auto; width: auto;" toolbar="#wu-toolbar-2"
					title="项目涉稳风险" pageSize="${ipagesize}" pageList="${ipagelist}"
					queryParams={name: ''} idField="id" border="true" rownumbers="false"
					singleSelect="true" pagination="true">
				</table>
			</c:if>
		</div>
			
		<div title="编制评估报告" style="background-color:#E6EEF8;">
		    <c:if test="${report ne null }">
			<jsp:include page="../hnfxpglc/baobei/toSee.jsp"></jsp:include>
			<c:if test="${groupList ne null }">
		       <jsp:include page="../hnfxpglc/view/pingguxiaozu.jsp"></jsp:include>
		    </c:if>
		    
		    <c:if test="${proinfo.assessModule ne null }">
		       <jsp:include page="../hnfxpglc/view/pinggufangan.jsp"></jsp:include>
			</c:if>
			
			<c:if test="${gongshi ne null }">
			   <jsp:include page="../hnfxpglc/view/gongshi.jsp"></jsp:include>
			</c:if>
			
			<c:if test="${fn:contains(proinfo.assessModule, 'FX1602')}">
			  <c:if test="${mycp ne null }">
		        <jsp:include page="../hnfxpglc/view/minyiceping.jsp"></jsp:include>
		      </c:if>
		    </c:if>
		   
		   <c:if test="${fn:contains(proinfo.assessModule, 'FX1603')}">
		     <c:if test="${wjdc ne null }"> 
		      <jsp:include page="../hnfxpglc/view/wenjuandiaocha.jsp"></jsp:include>
		     </c:if>  
		   </c:if>
		      
		   <c:if test="${fn:contains(proinfo.assessModule, 'FX1604')}">
		     <c:if test="${zth ne null }">
		      <jsp:include page="../hnfxpglc/view/zuotanhui.jsp"></jsp:include> 
		     </c:if>
		   </c:if>
		   
		   <c:if test="${fn:contains(proinfo.assessModule, 'FX1605')}">	
		     <c:if test="${zdzf ne null }">
		      <jsp:include page="../hnfxpglc/view/zhongdianzoufang.jsp"></jsp:include>
		     </c:if> 
		   </c:if>
		   
		   <c:if test="${fn:contains(proinfo.assessModule, 'FX1606')}">	
		     <jsp:include page="../hnfxpglc/view/tingzhenghui.jsp"></jsp:include> 
		   </c:if>
		   
		    <c:if test="${fn:contains(proinfo.assessModule, 'FX1607')}">	
		     <jsp:include page="../hnfxpglc/view/bumen.jsp"></jsp:include> 
		   </c:if>
		   
		   <c:if test="${fn:contains(proinfo.assessModule, 'FX1608')}">	
		     <jsp:include page="../hnfxpglc/view/wangluoyuqing.jsp"></jsp:include> 
		   </c:if>
			
			<div style="clear:both;"></div>
			<c:if test="${riskList ne null }">		
				&nbsp;<div id="fxlzdiv">
			       <form action="" method="post" id="form1">
				        <table id="datagrid" fit="false" fitColumns="true"
							style="height: auto; width: auto;" toolbar="#wu-toolbar-2"
							title="项目涉稳风险" pageSize="${ipagesize}" pageList="${ipagelist}"
							queryParams={name: ''} idField="id" border="true" rownumbers="false"
							singleSelect="true" pagination="true">
						</table>
					</form>
			    </div>&nbsp;
			</c:if>
			
			   <jsp:include page="../hnfxpglc/view/bianzhibaogao.jsp"></jsp:include>
			</c:if>
			<%-- <form action="" method="post" id="form2">
				<div align="center">
				   <input type="button" name="BtnSend" value="生成评估报告" id="BtnSend" onclick="importWord('${id}')" class="BigButton">
				</div>
			</form> --%>
		</div>
			
		<div title="评估结论备案" style="background-color:#E6EEF8;">			
			<c:if test="${proinfo.result ne null }">
			   <jsp:include page="../hnfxpglc/view/pinggujieguo.jsp"></jsp:include>
			</c:if>
		</div>
	</div>
</div>
</div>
</body>
</html>








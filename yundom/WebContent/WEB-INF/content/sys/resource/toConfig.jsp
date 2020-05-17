<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Insert title here</title>
		<link rel="stylesheet" href="css/Default.css" type="text/css" />
		<link rel="stylesheet" href="js/ztree/css/demo.css" type="text/css">
		<link rel="stylesheet" href="js/ztree/css/zTreeStyle/zTreeStyle.css"
			type="text/css">
		<script type="text/javascript" src="js/ztree/js/jquery-1.4.4.min.js"></script>
		<script type="text/javascript"
			src="js/ztree/js/jquery.ztree.core-3.5.js"></script>
		<script type="text/javascript"
			src="js/ztree/js/jquery.ztree.excheck-3.5.js"></script>
		<script type="text/javascript"
			src="js/ztree/js/jquery.ztree.exedit-3.5.js"></script>
		<script language="JavaScript" src="js/jquery/jquery.validate.js"></script>
		<script language="JavaScript" src="js/jquery/messages_cn.js"></script>
		<script type='text/javascript' src='dwr/engine.js'></script>
		<script type='text/javascript' src='dwr/util.js'></script>
		<script type='text/javascript' src='dwr/interface/resourceDwr.js'></script>
		<script type="text/javascript" src="js/sys/resource/resource.js"></script>
		<script type="text/javascript" src="js/comm/jsstyle_form.js"></script>
		<script type="text/javascript">
	var setting = {
		data : {
			simpleData : {
				enable : true
			}
		}
	};

	var zNodes = ${resourcejson};
	
	/**$(document).ready(function() {
		$.fn.zTree.init($("#treeDiv"), setting, zNodes);
	});*/
	window.onload = function() {
		$.fn.zTree.init($("#treeDiv"), setting, zNodes);
	};
</script>


	</head>
	<body style="height: 100%;">
		<div class="LeftConter" id="LeftConter">
			<div class="Menu_1">
				<div class="Title">
					<span><img src="Img/ICO/1.png" /> </span>
					<label>
						字典管理
					</label>
				</div>
				<div class="Main">
				</div>
			</div>
		</div>

		<div class="RightConter" id="RightConter">
			<div class="Form">
				<form action="" method="post" id="form1"
					enctype="multipart/form-data">
					<div class="FormTitle">
						<div class="Left"></div>
						<div class="Right">
							<a href="javascript:back();">返回</a>						
						</div>
					</div>

					<div class="FormMain" id="FormMain">
						<div class="content_wrap">							
							<div class="zTreeDemoBackground left">
								<ul id="treeDiv" class="ztree"></ul>
							</div>
							<div class="right">
								<table width="100%" border="0" cellpadding="0" cellspacing="1">
									<tr>
										<td colspan="2">
											<input type="button" onclick="toAddRoot()" value="新增根结点" class="ListButton" />
											<input type="button" onclick="toAddItem()" value="新增子项" class="ListButton" />
											<input type="button" onclick="delItem()" value="删除本字典项" class="ListButton" />
										</td>
									</tr>

									<tr>
										<th align="right">
											父结点：
										</th>
										<td>
											<input type="text" name="parentName" id="parentName"
												readonly="readonly" class="text_1" />
										</td>
									</tr>

									<tr>
										<th align="right">
											代码：
										</th>
										<td>
											<input type="text" name="itemCode" id="itemCode"
												maxlength="50" class="text_1" />
										</td>
									</tr>

									<tr>
										<th align="right">
											名称：
										</th>
										<td>
											<input type="text" name="itemName" id="itemName"
												maxlength="50" class="text_1" />
										</td>
									</tr>

									<tr>
										<th align="right">
											排序：
										</th>
										<td>
											<input type="text" name="itemOrder" id="itemOrder"
												maxlength="50" class="text_1" />
										</td>
									</tr>

									<tr>
										<th align="right">
											备注：
										</th>
										<td>
											<textarea rows="4" cols="40" name="remark" id="remark" class="textarea_1"></textarea>
										</td>
									</tr>
									</table>
                                  
                                 <table border="0" cellpadding="0" cellspacing="0"> 
									<tr>
									   <td></td>
										<td >
											<input type="hidden" id="pid" value="${pid}" />
											<input type="hidden" id="id" />
											<input type="hidden" id="parentItemid" />
											<input type="button" onclick="dealItem(form1)" value="保存" class="submit_1"/>											
										</td>
									</tr>

								</table>
							</div>
						</div>
					</div>

				</form>
			</div>
		</div>

	</body>
</html>
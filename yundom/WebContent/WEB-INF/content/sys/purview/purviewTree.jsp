<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title></title>
		<link rel="stylesheet" href="css/Default.css" type="text/css" />
		<link rel="stylesheet" href="js/ztree/css/demo.css" type="text/css">
		<link rel="stylesheet" href="js/ztree/css/zTreeStyle/zTreeStyle.css"
			type="text/css">
		<link rel="stylesheet" href="css/dialog/jquery_dialog.css"
			type="text/css" />
		<script type="text/javascript" src="js/ztree/js/jquery-1.4.4.min.js"></script>
		<script type="text/javascript"
			src="js/ztree/js/jquery.ztree.core-3.5.js"></script>
		<script type="text/javascript" src="js/dialog/jquery_dialog.js"></script>
		<script type='text/javascript' src='dwr/engine.js'></script>
		<script type='text/javascript' src='dwr/util.js'></script>
		<script type='text/javascript' src='dwr/interface/purviewDwr.js'></script>
		<script type="text/javascript" src="js/sys/purview/purview.js"></script>
		<script type="text/javascript" src="js/comm/jsstyle_form.js"></script>
		<script type="text/javascript">
	var setting = {
		data : {
			simpleData : {
				enable : true
			}
		}
	};

	var zNodes = ${functionjson};
	

	/*$(document).ready(function() {
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
						功能权限
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
							<!--<a href="javascript:window.location.reload(true);">返回</a>
						-->
						</div>
					</div>

					<div class="FormMain" id="FormMain">
						<div class="content_wrap">							
							<div class="zTreeDemoBackground left">
								<ul id="treeDiv" class="ztree"></ul>
							</div>
							<div class="right">
								<table border="0" cellpadding="0" cellspacing="0">
									<tr>
										<td rowspan="10" width="100px">
											操作：
											<br>
											<ul id="treeOperateDiv" class="ztree"></ul>

										</td>
										<td>
											系统角色：
										</td>
									</tr>
									<tr>
										<td>
											<textarea rows="5" cols="70" id="rolenames" name="rolenames"
												readonly class="textarea_1"></textarea>
											<input type="hidden" id="roleids" name="roleids" />
											<input type="button" onclick="chooseRoles()" value="新增" class="ListButton"/>
										</td>
									</tr>
									<tr>
										<td>
											<input type="button" onclick="saveRoles()" value="保存角色" class="submit_1" />
										</td>
									</tr>

									<tr>
										<td>
											部门：
										</td>
									</tr>
									<tr>
										<td>
											<textarea rows="5" cols="40" id="parentDeptname"
												name="orgnames" readonly class="textarea_1" ></textarea>
											<input type="hidden" id="parentDeptid" name="orgids" />
											<input type="button" onclick="chooseOrgs()" value="新增" class="ListButton"/>
										</td>
									</tr>
									<tr>
										<td>
											<input type="button" onclick="saveOrgs()" value="保存机构" class="submit_1" />
										</td>
									</tr>

									<tr>
										<td>
											用户：
										</td>
									</tr>
									<tr>
										<td>
											<textarea rows="5" cols="40" id="usernames" name="usernames"
												readonly class="textarea_1" ></textarea>
											<input type="hidden" id="userids" name="userids" />
											<input type="button"
												onclick="chooseUsers('userids','usernames','many')"
												value="新增" class="ListButton"/>
										</td>
									</tr>
									<tr>
										<td>
											<input type="button" onclick="saveUsers()" value="保存用户" class="submit_1" />
										</td>
									</tr>

									<tr>
										<td>
											<input type="button" onclick="saveAll()" value="保存全部" class="submit_1" />
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
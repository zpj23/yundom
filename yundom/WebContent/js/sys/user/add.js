
//新增用户保存方法
function baocun(){
	alert(111);
	form1.action="jlUserInfoAction_saveUser";
	form1.submit();
	var index = parent.layer.getFrameIndex(window.name);
	parent.$('.btn-refresh').click();
	parent.layer.close(index);
}

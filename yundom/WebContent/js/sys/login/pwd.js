
function savePwd(aa){	
	$(aa).validate({  
		rules : { 
			"pwd1" : {
				required : [ "新密码" ],
				minlength:6
			},
			"pwd2" : {
				required : [ "重复密码" ],
				equalTo : "#pwd1"
			}			
		},  
		// 验证通过时的处理
		success : function() { 
		},
		errorPlacement : function(error, element) { 
			error.appendTo(element.parent());
		},
		focusInvalid : false,
		onkeyup : false
	});	
	var isSubmit = $(aa).validate().form();  	
	if(isSubmit){	
		var pwd = $("#pwd1").val();
		$.post("userAction_dealModifyPwd",
				{pwd:pwd},
			     function(data) {     
			       window.close();
				});		
	}
}


function closeWindow(){	
	window.close();
}
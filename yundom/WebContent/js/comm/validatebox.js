$.extend($.fn.validatebox.defaults.rules, {
	CHS:{   
		validator:function(value,param){
			return /^[\u0391-\uFFE5]+$/.test(value);
		},   
		message:'只能输入中文'  
	},
	strLengthTwoH:{   
		validator:function(value){
			return value.length < 200;
		},
		message:"字符长度超出范围"
	},
	strLengthFifty:{   
		validator:function(value){
			return value.length < 50;
		},
		message:"字符长度超出范围"
	},
	strLengthTwinty:{   
		validator:function(value){
			return value.length < 15;
		},
		message:"字符长度超出范围"
	},
	strLengthOneH:{   
		validator:function(value){
			return value.length < 100;
		},
		message:"字符长度超出范围"
	},
	strLengthThird:{   
		validator:function(value){
			return value.length < 4;
		},
		message:"字符长度超出范围"
	},
	stringCheck:{   
		validator:function(value){
			return /^[\u0391-\uFFE5\w]+$/.test(value);
		},
		message:"只能包括中文字、英文字母、数字和下划线"
	},
	stringCheckSub:{   
		validator:function(value){
			return /^[a-zA-Z0-9\u4E00-\u9FA5]+$/.test(value);
		},
		message:"只能包括中文字、英文字母、数字"
	},
	englishCheckSub:{   
		validator:function(value){
			return /^[a-zA-Z0-9]+$/.test(value);
		},
		message:"只能包括英文字母、数字" 
	},
	numberCheckSub:{   
		validator:function(value){
			return /^[0-9]+$/.test(value);
		},
		message:"只能输入数字" 
	},
	mobile:{    
		validator:function(value){
			var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;				
			return value.length == 11 && reg.test(value);
		},
		message:"请正确填写您的手机号码"
	},
	telephone:{   
		validator:function(value){
			//电话号码格式010-12345678
			var reg = /^\d{3,4}?\d{7,8}$/;				
			return reg.test(value);
		},
		message:"请正确填写您的电话号码"
	},
	mobileTelephone:{   
		validator:function(value){
			var cmccMobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			var tel = /^\d{3,4}?\d{7,8}$/;
			return tel.test(value) || (value.length == 11 && cmccMobile.test(value));
		},
		message:"请正确填写您的联系电话"  
	},
	isphone:{   
		validator:function(value){
			var cmccMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			var tel = /^(\d{3,4}-)?\d{8}$/;
			return tel.test(value) || (value.length == 11 && cmccMobile.test(value));
		},
		message:"请正确填写您的联系电话"  
	},
	email:{   
		validator:function(value){
			var reg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/;
			return reg.test(value) ;
		},
		message:"请正确填写您的邮箱"  
	},
	zipCode:{   
		validator:function(value){
			var reg = /^[1-9]\d{5}$/;
			return reg.test(value);
		},
		message:"邮编必须长短0开端的6位数字"
	},
	ybhm:{   
		validator:function(value){
			var reg = /^[0-9]\d{5}$/;
			return reg.test(value);
		},
		message:"邮编为6位数字"
	},
	idCardNo:{   
		validator:function(value){
			return IdentityCodeValid(value);
		},
		message:"请正确输入您的身份证号码"
	},
	selectValue: {  
		validator: function(value,param){  
			if(value!="------请选择------"){
				return true;  
			}
			return false;  
		},  
		message: '请选择下拉项'  
	}
})


 function IdentityCodeValid(code) {
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var tip = "";
    var pass= true;
    
    if(code.length!=15&&code.length!=18){
    	 tip = "身份证号格式错误";
         pass = false;
    }
    
    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
        tip = "身份证号格式错误";
        pass = false;
    }
    
   else if(!city[code.substr(0,2)]){
        tip = "地址编码错误";
        pass = false;
    }
    else{
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
                tip = "校验位错误";
                pass =false;
            }
        }
    }
    if(!pass)  $.fn.validatebox.defaults.rules.idCardNo.message = tip;
    return pass;
}
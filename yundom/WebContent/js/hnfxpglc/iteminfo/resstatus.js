var RESSTATUS=[{cname:"暂存",ename:"ZC"},
               {cname:"报送中",ename:"BSZ"},
               {cname:"确认中",ename:"QRZ"},
               {cname:"已办结",ename:"YBJ"},
               {cname:"市上报",ename:"SSB"},
               {cname:"省报送中",ename:"SBSZ"},
               {cname:"省确认中",ename:"SQRZ"},
               {cname:"省已办结",ename:"SYBJ"}];


function translateName(returnStr,flag){
	for(var i=0;i<RESSTATUS.length;i++){
		if(flag=="1"){//字母转中文
			if(returnStr==RESSTATUS[i].ename){
				returnStr=RESSTATUS[i].cname;
				break;
			}
		}else{//中文转字母
			if(returnStr==RESSTATUS[i].cname){
				returnStr=RESSTATUS[i].ename;
				break;
			}
		}
	}
	return 	returnStr;
}
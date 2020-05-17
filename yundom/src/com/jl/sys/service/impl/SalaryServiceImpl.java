package com.jl.sys.service.impl;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jl.common.ExcelUtils;
import com.jl.sys.dao.SalaryDao;
import com.jl.sys.pojo.SalaryInfo;
import com.jl.sys.pojo.UserInfo;
import com.jl.sys.service.SalaryService;
import com.jl.util.DateHelper;
@Service
public class SalaryServiceImpl implements SalaryService {
	@Autowired
	private SalaryDao salaryDao;
	
	@Override
	public Map findList(UserInfo user, int page, int rows, Map<String, String> param) {
		List<Map> list=salaryDao.findList(user,page,rows,param);
		double wzgs=0;
		double advance=0;
		for(int i=0,length=list.size();i<length;i++){
			advance=0;
			Object str=((Map)(list.get(i))).get("advance");
			if(null==str||str.toString().equalsIgnoreCase("")){
				continue;
			}else{
				advance=Double.valueOf(str.toString());
			}
			wzgs+=advance;
		}
		int count=salaryDao.findCount(user,param); 
		Map map=new HashMap();
		map.put("list", list);
		map.put("count", count);
		map.put("wzgs", wzgs);
		return map;
	}
	
	public static void main(String[] args) {
		InputStream inputStream;
		try {
			inputStream = new FileInputStream("D://预付工资表2019-1月份.xls");
			List list = ExcelUtils.getInstance().readExcel(inputStream);
			new SalaryServiceImpl().importExcel(list,"jl_salary_info",null);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public void importExcel(List list,String table,UserInfo user ){
		StringBuffer insertsql = new StringBuffer(1000);
		StringBuffer sql=new StringBuffer(1000);
		StringBuffer cols = new StringBuffer(1000)
				.append("id,orderNum,userName,bankName,bankCard,advance,remark,year,createTime");
		Map<String, String> titleMap = (Map<String, String>) list.get(0);
		Map<String, String> contentMap = (Map<String, String>) list.get(1);
		StringBuilder title=new StringBuilder(100);
		StringBuilder year=new StringBuilder(10);
		titleMap.forEach((k,v)->{
			title.append(v);
		});
		String ti=title.toString().trim();
		Date date=DateHelper.getDateFromString(ti.substring(ti.indexOf("20")), "yyyy年MM月dd日");
		year.append(DateHelper.getDateString(date, "yyyy-MM-dd"));
		
		insertsql.append(" insert into "+table+" (").append(cols.toString()).append(") values ");
		contentMap.forEach((k,v)->{
			StringBuilder temp=null;
			
			temp=new StringBuilder(500).append(
					v.trim().substring(1, v.length()-1));
			String[] arr= temp.toString().split(",");
			if(null!=arr[1]&&!(arr[1].trim()).equalsIgnoreCase("")&&!(arr[1].trim()).equalsIgnoreCase("姓名")){
				insertsql.append(" (UUID(),");
				for(int m=0;m<arr.length;m++){
					String value=arr[m].toString().replace(" ", "");
					if(m==0){
						if(null!=value&&!value.equalsIgnoreCase("")){
							insertsql.append("'").append(value).append("',");
						}else{
							insertsql.append("'").append(0).append("',");
						}
					}else{
						insertsql.append("'").append(value).append("',");
					}
					
					
				}
//				if(arr.length==6){
				insertsql.append("'"+year+"'"+",now()").append(" ) ,");
//				}else if(arr.length==5){
//					insertsql.append("'',"+"'"+year+"'"+",now()").append(" ) ,");
//				}
			}
			
		});
		sql.append(insertsql.substring(0, insertsql.length()-1));
		try{
			salaryDao.insertSql(sql.toString());
		}catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
	}
	
	public SalaryInfo findById(String id){
		return salaryDao.findById(id);
	}
	public void saveInfo(SalaryInfo sInfo){
		salaryDao.saveInfo(sInfo);
	}
	
	public void delInfo(String id){
		salaryDao.delInfo(id);
	}
	
}

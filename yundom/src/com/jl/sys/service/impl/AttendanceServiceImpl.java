package com.jl.sys.service.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.jl.sys.dao.AttendanceInfoDao;
import com.jl.sys.pojo.UserInfo;
import com.jl.sys.service.AttendanceInfoService;
import com.jl.util.ExcelUtil;
import com.jl.util.PingyinTool;
@Service
@Component("jlAttendanceInfoService")
public class AttendanceServiceImpl implements AttendanceInfoService {
	@Autowired
	private AttendanceInfoDao jlAttendanceInfoDao;
	
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param){
		List list=jlAttendanceInfoDao.findList(user,page,rows,param);
		int count=jlAttendanceInfoDao.findCount(user,param); 
		Map map=new HashMap();
		map.put("list", list);
		map.put("count", count);
		return map;
	}
	/**
	 * 汇总信息获取详细数组数据
	 * @Title getDetailRowInfo
	 * @param list
	 * @return
	 * @author zpj
	 * @time 2017-5-18 下午3:37:30
	 */
	public List<Object[]> getDetailRowInfo(List<HSSFRow> list){
		List<Object[]> hzArray=new ArrayList<Object[]>();
		for(int i=4;i<list.size();i++){
			Object[] item=new Object[23];
			HSSFRow hr=list.get(i);
			for (int j = 0; j < hr.getLastCellNum(); j++) {
				 String value = ExcelUtil.getCellValue(hr.getCell(j));
				 if (!value.equals("")) {
					 item[j]=value;
				 }else{
					 item[j]="";
				 }
			 }
			hzArray.add(item);
		}
		return hzArray;
	}
	public void insertTotalInfo(List<HSSFRow> list){
			List<Object[]> hzArray=getDetailRowInfo(list);
			
			StringBuffer sb=new StringBuffer(5000);
			StringBuffer fieldStr=new StringBuffer(1000);
			
			Object[] fields={"userid","username","departmentname",
					"gzsx_bz","gzsx_sj","cd_cs","cd_fzs","zt_cs","zt_fzs","jb_zc","jb_jr","cqts","cc","kg","qj","jbgz_bz","jbgz_jb","jbgz_jt","jxgz_cdzt","jxgz_qj","jxgz_kk","sjgz","bz"};
			//"id","departmentcode"
			//		fieldStr.append("id");
			for(int m=0;m<fields.length;m++){
				if(m>0){
					fieldStr.append(",");
				}
				fieldStr.append(fields[m]);
			}
			fieldStr.append(",id,departmentcode");
			sb.append("insert into jl_attendance_total_info ( "+fieldStr+" ) values ");
			for(int n=0;n<hzArray.size();n++){
				StringBuffer valueStr=new StringBuffer(2000);
				if(n>0){
					valueStr.append(",");
				}
				Object[] obj=hzArray.get(n);
				valueStr.append(" ( ");
				for(int j=0;j<23;j++){
					if(j>0){
						valueStr.append(",");
					}
					valueStr.append("'"+obj[j]+"'");
				}
				valueStr.append(",'"+UUID.randomUUID().toString()+"','"+PingyinTool.cn2FirstSpell((String)obj[2])+"' ");
				valueStr.append(" ) ");
//				System.out.println(valueStr.toString());
				sb.append(valueStr);
			}
			
			sb.append(";");
//			System.out.println(sb.toString());
			jlAttendanceInfoDao.insertDatas(sb.toString());
	}
	
	/**
	 * 打卡记录获取详细数组数据
	 * @Title getDetailRegInfo
	 * @param list
	 * @return
	 * @author zpj
	 * @time 2017-5-18 下午3:37:11
	 */
	public List<Object[]> getDetailRegInfo(List<HSSFRow> list){
		List<Object[]> hzArray=new ArrayList<Object[]>();
		for(int i=4;i<list.size();i++){
			Object[] item=new Object[31];
			HSSFRow hr=list.get(i);
			for (int j = 0; j < hr.getLastCellNum(); j++) {
				 String value = ExcelUtil.getCellValue(hr.getCell(j));
				 System.out.println("第"+(i+1)+"行，第"+(j+1)+"列>>>>值:"+value);
				 
				 if (!value.equals("")) {
					 item[j]=value;
				 }else{
					 item[j]="";
				 }
			 }
			hzArray.add(item);
		}
		return hzArray;
	} 
	
	public void insertRegInfo(List<HSSFRow> list){
			List<Object[]> hzArray=getDetailRegInfo(list);
			StringBuffer sb=new StringBuffer(5000);
			StringBuffer fieldStr=new StringBuffer(1000);
			
			Object[] fields={"userid","username","departmentname",
					"gzsx_bz","gzsx_sj","cd_cs","cd_fzs","zt_cs","zt_fzs","jb_zc","jb_jr","cqts","cc","kg","qj","jbgz_bz","jbgz_jb","jbgz_jt","jxgz_cdzt","jxgz_qj","jxgz_kk","sjgz","bz"};
			//"id","departmentcode"
			//		fieldStr.append("id");
			for(int m=0;m<fields.length;m++){
				if(m>0){
					fieldStr.append(",");
				}
				fieldStr.append(fields[m]);
			}
			fieldStr.append(",id,departmentcode");
			sb.append("insert into jl_attendance_total_info ( "+fieldStr+" ) values ");
			for(int n=0;n<hzArray.size();n++){
				StringBuffer valueStr=new StringBuffer(2000);
				if(n>0){
					valueStr.append(",");
				}
				Object[] obj=hzArray.get(n);
				valueStr.append(" ( ");
				for(int j=0;j<23;j++){
					if(j>0){
						valueStr.append(",");
					}
					valueStr.append("'"+obj[j]+"'");
				}
				valueStr.append(",'"+UUID.randomUUID().toString()+"','"+PingyinTool.cn2FirstSpell((String)obj[2])+"' ");
				valueStr.append(" ) ");
//				System.out.println(valueStr.toString());
				sb.append(valueStr);
			}
			
			sb.append(";");
//			System.out.println(sb.toString());
			jlAttendanceInfoDao.insertDatas(sb.toString());
		
	}
	@Override
	public void fileAnalysis(File file) {
		try {
			ExcelUtil eu = new ExcelUtil(file);
			System.out.println("\n=======测试Excel 读取一个sheet==汇总表======");  
	        eu.setSelectedSheetIdx(0);
	        List<HSSFRow> list=eu.readExcel(); 
	      	insertTotalInfo(list);
//	        System.out.println("\n=======测试Excel 读取二个sheet==打卡记录======");  
//	        eu.setSelectedSheetIdx(1);  
//	        List<HSSFRow> list=eu.readExcel();  
//	        insertRegInfo(list);
//	        System.out.println("\n=======测试Excel 读取三个sheet==异常表======");  
//	        eu.setSelectedSheetIdx(2);  
//	        eu.readExcel();  
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
		
	}
}

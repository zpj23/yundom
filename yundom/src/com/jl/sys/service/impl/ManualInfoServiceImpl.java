package com.jl.sys.service.impl;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jl.common.BaseService.MethodLog2;
import com.jl.sys.dao.HistoryStaffNameDao;
import com.jl.sys.dao.ManualInfoDao;
import com.jl.sys.dao.PayrollDao;
import com.jl.sys.dao.SgxmDao;
import com.jl.sys.pojo.CheckInfo;
import com.jl.sys.pojo.HistoryStaffname;
import com.jl.sys.pojo.LogInfo;
import com.jl.sys.pojo.PayrollInfo;
import com.jl.sys.pojo.UserInfo;
import com.jl.sys.service.LogInfoService;
import com.jl.sys.service.ManualInfoService;
import com.jl.sys.service.PayrollService;
import com.jl.util.DateHelper;
@Service
public class ManualInfoServiceImpl implements ManualInfoService {
	@Autowired
	private ManualInfoDao mDao;
	@Autowired
	private HistoryStaffNameDao hsDao;
	@Autowired
	private PayrollDao payrollDao; 
	@Autowired
	public LogInfoService jlLogInfoService;
	
	
	
	@MethodLog2(remark="保存考勤信息",type="新增/编辑")
	public void saveInfo(CheckInfo cInfo){
		try{
			cInfo.setStaffname(cInfo.getStaffname().trim());
			mDao.saveInfo(cInfo);
		}catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();  
		}
		HistoryStaffname hs=new HistoryStaffname();
		hs.setId(UUID.randomUUID().toString());
		hs.setStaffName(cInfo.getStaffname());
		hs.setUserId(cInfo.getCreateuserid());
		hs.setCreateTime(new Date());
		hsDao.saveHistoryStaffName(hs);
	}
	
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param){
		List<Map> list=null;
		if(null!=param.get("cfsj")&&param.get("cfsj").equalsIgnoreCase("1")){
			list=mDao.findRepeatList(user,page,rows,param);
		}else{
			list=mDao.findList(user,page,rows,param);
		}
//		double wzgs=0;
//		double ozgs=0;
//		double workduringtime=0;
//		double overtime=0;
//		for(int i=0,length=list.size();i<length;i++){
//			workduringtime=0;
//			overtime=0;
//			list.get(i).put("workdate", ((Map)(list.get(i))).get("workdate").toString().substring(0, 10));
//			Object str=((Map)(list.get(i))).get("workduringtime");
//			workduringtime=Double.valueOf(str.toString());
//			overtime=Double.valueOf(((Map)(list.get(i))).get("overtime").toString());
//			wzgs+=workduringtime;
//			ozgs+=overtime;
//		}
//		System.out.println(zgs+">>>>>>>循环数组");
//		System.out.println(System.currentTimeMillis());
		int count=0;
		if(null!=param.get("cfsj")&&param.get("cfsj").equalsIgnoreCase("1")){
			count=mDao.findRepeatCount(user,param);
		}else{
			count =mDao.findCount(user,param);
		}
		Map map=new HashMap();
		map.put("list", list);
		map.put("count", count);
		//查询出勤和加班各自统计及两个求和
		List mapList=mDao.findThreeSum(user,param,page,rows);
		if(mapList!=null&&mapList.size()>0){
			Map total=(Map)mapList.get(0);
			total.get("wdt");
			total.get("ot");
			map.put("wzgs", total.get("wdt"));
			map.put("ozgs", total.get("ot"));
			map.put("zgs", (Double)total.get("wdt")+(Double)total.get("ot"));
		}
		return map;
	}
	
	public List findStaffNameList(UserInfo user){
		return hsDao.findStaffNameList(user.getId());
	}
	
	
	public CheckInfo findById(String id){
		return mDao.findById(id);
	}
	@MethodLog2(remark="删除考勤信息",type="删除")
	public void delInfo(String id){
		try{
			mDao.delInfo(id);
		}catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();  
		}
	}
	@MethodLog2(remark="导出考勤",type="导出")
	public void exportExcel(Map<String,String> param,HttpServletRequest request, HttpServletResponse response,UserInfo user){
		String str="施工日期,施工人员,所属区域,施工项目,施工区域,工作内容,出勤时间,加班时间,备注";
		List list=mDao.findListObjectArray(user,param);
		HSSFWorkbook wb = new HSSFWorkbook();
		// 生成Excel的sheet
		HSSFSheet sheet1 = wb.createSheet("考勤信息");
		HSSFCellStyle cellStyle = wb.createCellStyle();
		cellStyle.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);
		cellStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		String[] title=str.split(",");
		// Create a row and put some cells in it. Rows are 0 based.
		HSSFRow row1 = sheet1.createRow((short) 0);
		HSSFCell cell0=null;
		for(int m=0;m<title.length;m++){
			if(title[m].equalsIgnoreCase(""))
				sheet1.setColumnWidth(m,10* 512);
			sheet1.setDefaultColumnWidth(15);  
			sheet1.setDefaultRowHeight((short) (2 * 256)); //设置默认行高，表示2个字符的高度
			cell0=null;
			cell0 = row1.createCell((short) m);		
			cell0.setCellStyle(cellStyle);
			cell0.setCellValue(title[m]);
		}
		HSSFRow row2=null;
		HSSFCell cell=null;
		for (int j = 1; j <= list.size(); j++) {
			row2=null;
		    row2 = sheet1.createRow((short) j);
		    for (int i = 0; i < title.length; i++) {
		    	cell=null;
		    	cell = row2.createCell((short) i);	
//		    	if(title[i].equalsIgnoreCase("性别")||title[i].equalsIgnoreCase("民族")||title[i].equalsIgnoreCase("政治面貌")||title[i].equalsIgnoreCase("专家类别")){
//		    		cell.setCellValue(String.valueOf(((Object[])list.get(j-1))[i].toString()));
//		    	}else{
		    		if(null!=((Object[])list.get(j-1))[i]){
		    			cell.setCellValue(String.valueOf(((Object[])list.get(j-1))[i]));
		    		}else{
		    			cell.setCellValue("");
		    		}
//		    	}
		    }
		}
		OutputStream  output=null;
		try {
		    response.reset();
		    response.setContentType("application/vnd.ms-excel;charset=utf-8");
		    response.setHeader("Content-Disposition", "attachment;filename="
			    + new String(("考勤信息表"+".xls").getBytes(), "iso-8859-1"));
		    output = response.getOutputStream();
		    wb.write(output);
		    output.flush();
		    
		} catch (Exception e) {
		    e.printStackTrace();

		}finally{
			if(output!=null){
				try {
					output.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	public List findChartByUser(Map param){
		boolean isYF=false;
		if(null!=param.get("yuefen")&&!"".equalsIgnoreCase(param.get("yuefen").toString())){
			isYF=true;
		}
		if(isYF){
			return mDao.findChartByDay(param);
		}else{
			return mDao.findChartByUser(param);
		}
		
	}
	
	public int getWshNum(UserInfo user){
		return mDao.getWshNum(user);
	}
	@MethodLog2(remark="审核考勤",type="审核")
	public int saveShenhe(String ids,UserInfo user) throws RuntimeException{
		String[] ids1=ids.split(",");
		StringBuilder str=new StringBuilder(500);
		for(int m=0;m<ids1.length;m++){
			if(m>0){
				str.append(",");
			}
			str.append("'"+ids1[m]+"'");
		}
		try{
			int ret=mDao.saveShenhe(str.toString());
			List<Map> list=mDao.findListByIds(str.toString());
			Set<Map> tempSet=new HashSet<Map>();
			if(null!=list&&list.size()>0){
				for(int n=0;n<list.size();n++){
					tempSet.add(list.get(n));
				}
				tempSet.forEach((tmp)->{
					calculateInfo(tmp.get("xm").toString(),tmp.get("yf").toString(),user);
				});
			}
			return ret;
		}catch (RuntimeException e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
		
	}
	
	
	
	
	/**
	 * 工资单信息
	 * @Title calculateInfo
	 * @param username
	 * @param yuefen
	 * @param user
	 * @throws RuntimeException
	 * @author zpj
	 * @time 2019年6月24日 下午2:39:35
	 */
	public synchronized void calculateInfo(String username,String yuefen,UserInfo user) throws RuntimeException{
		List<PayrollInfo> list =payrollDao.findByYFAndXM(yuefen,username);
		try{
			if(list.size()==0){
				//判断没有存在对应人员对应月份的数据，需要新增（统计当前月份当前人员的考勤数据）
				payrollDao.insertPayrollData(yuefen,username);
				insertLog(user,"新增工资单信息","审核完成后，自动“新增”工资单对应的数据(没有当前月的数据的时候新增)"+"月份："+yuefen+"，人员："+username);
				
			}else if(list.size()==1){
				//有且仅有1一条对应人员对应月份的数据，需要编辑（重新统计当前月份当前人员的考勤数据）
				payrollDao.updatePayrollData(yuefen,username);
				insertLog(user,"修改工资单信息","审核完成后，自动“更新”工资单对应的数据(有当前月的数据的时候更新)"+"月份："+yuefen+"，人员："+username);
			}else if(list.size()>1){
				//说明有重复的数据
				insertLog(user,"工资单信息问题",yuefen+"月份"+username+"信息有"+list.size()+"条");
			}
		}catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
	}
	
	public void insertLog(UserInfo user,String type,String description){
		LogInfo loginfo=new LogInfo();
		loginfo.setId(UUID.randomUUID().toString());
		loginfo.setCreatetime(new Date());
		loginfo.setType(type);
		loginfo.setDescription(description);
		loginfo.setUserid(user.getId());
		loginfo.setUsername(user.getUsername());
		jlLogInfoService.logInfo(loginfo);
	}
	
}

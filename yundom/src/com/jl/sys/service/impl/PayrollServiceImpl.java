package com.jl.sys.service.impl;

import java.awt.Font;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.management.RuntimeErrorException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jl.common.BaseService.MethodLog2;
import com.jl.sys.dao.PayrollDao;
import com.jl.sys.dao.SgxmDao;
import com.jl.sys.pojo.LogInfo;
import com.jl.sys.pojo.PayrollInfo;
import com.jl.sys.pojo.UserInfo;
import com.jl.sys.service.LogInfoService;
import com.jl.sys.service.PayrollService;
@Service
public class PayrollServiceImpl implements PayrollService{
		
	@Autowired
	private PayrollDao payrollDao; 
	@Autowired
	private SgxmDao sgxmDao;
	
	@Autowired
	public LogInfoService jlLogInfoService;
	
	public void saveInfo(PayrollInfo pi){
		
		calculateSgxmInfo(pi);
		payrollDao.saveInfo(pi);
	}
	
	/**
	 * 施工项目的造价信息
	 * @Title calculateSgxmInfo
	 * @author zpj
	 * @time 2019年6月24日 下午2:34:50
	 */
	public synchronized void calculateSgxmInfo(PayrollInfo pi){
		
		try{
			sgxmDao.updateMultiInfo(pi);
		}catch (Exception e) {
			throw new RuntimeException();
		}
		
	}
	
	
	public PayrollInfo findById(String id){
		return payrollDao.findById(id);
	}
	public void delInfo(String id){
		payrollDao.delInfo(id);
	}
	
	public Map findList(int page,int rows,Map<String,String> param){
		List<Map> list=payrollDao.findList(page,rows,param);
		Map countMap=payrollDao.findCount(param); 
		Map map=new HashMap();
		map.put("list", list);
		map.put("count", countMap.get("zs"));//总数
		map.put("chuqin", countMap.get("cq"));//出勤和
		map.put("jiaban", countMap.get("jb"));//加班和
		map.put("zonggongshi", countMap.get("zgs"));//总工时和
		map.put("total_zgz", countMap.get("zgz"));//总工资
		map.put("total_yfgzy", countMap.get("yfgzy"));//预发工资
		map.put("total_yfgz", countMap.get("yfgz"));//应发工资
		map.put("total_sygz", countMap.get("sygz"));//剩余工资
		return map;
	}
	public List findListByYf(String yf){
		List<PayrollInfo> list=payrollDao.findListByYf(yf);
		return list;
	}
	public boolean updateSgxmListByYf(String yf){
		boolean flag=false;
		try {
			List<PayrollInfo> list=payrollDao.findListByYf(yf);
			if(null!=list&&list.size()>0){
				for(int m=0;m<list.size();m++){
					calculateSgxmInfo(list.get(m));
				}
			}
			flag =true;
		} catch (Exception e) {
			e.printStackTrace();
			flag =false;
			throw new RuntimeException();
		}
		return flag;
	}
	
	
	
	
	public Map calculateInfo(String yuefen,String username,UserInfo user){
		Map retMap=new HashMap();
		return retMap;
	}
	
	@MethodLog2(remark="导出工资单汇总信息",type="导出")
	public void exportExcel(Map<String,String> param,HttpServletRequest request, HttpServletResponse response){
		String str="姓名,月份,工地,出勤（小时）,加班（小时）,总工时（小时）,工价包月,基本工资,加班工资和奖金,应发工资,劳护补贴,费用补贴,满勤,其他扣款,总工资,预发工资,剩余工资,签字,备注";
//		List list=payrollDao.findListByGroupUser("2019");
		List list=payrollDao.findList(param);
		Map countMap=payrollDao.findCount(param); 
		
		
		HSSFWorkbook wb = new HSSFWorkbook();
		// 生成Excel的sheet
		HSSFSheet sheet1 = wb.createSheet("汇总信息");
		HSSFCellStyle cellStyle = wb.createCellStyle();
		cellStyle.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);
		cellStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		HSSFFont hf=wb.createFont();
//		hf.setColor(hf.COLOR_RED);
		hf.setFontHeightInPoints((short)10);
		hf.setFontName("宋体");
		cellStyle.setFont(hf);
		//合并单元格的实现
//		CellRangeAddress cellRange1 = new CellRangeAddress(0, 0, (short) 0, (short) 10);
//        sheet.addMergedRegion(cellRange1);
//        CellRangeAddress

		
		String[] title=str.split(",");
		// Create a row and put some cells in it. Rows are 0 based.
		HSSFRow row1 = sheet1.createRow((short) 0);
		HSSFCell cell0=null;
		for(int m=0;m<title.length;m++){
			sheet1.setColumnWidth(m,10*512);
			sheet1.setDefaultColumnWidth(10000);  
			sheet1.setDefaultRowHeight((short) (3 * 256)); //设置默认行高，表示2个字符的高度
			sheet1.setDefaultRowHeightInPoints(30);
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
		//总计汇总求和  暂不做
		row2=null;
		row2 = sheet1.createRow((short) list.size()+1);
		for (int i = 0; i < title.length; i++) {
			cell=null;
			cell = row2.createCell((short) i);
			if(i==0){
				cell.setCellValue("合计");
			}else if(i==14){
				cell.setCellValue(String.valueOf(countMap.get("zgz")));
			}else if(i==15){
				cell.setCellValue(String.valueOf(countMap.get("yfgzy")));
			}else if(i==16){
				cell.setCellValue(String.valueOf(countMap.get("sygz")));
			}else{
				cell.setCellValue("");
			}
		}
		OutputStream  output=null;
		try {
			String title1=param.get("username")+"-"+param.get("yuefen")+"-";//String.valueOf(((Object[])list.get(0))[0]);
		    response.reset();
		    response.setContentType("application/vnd.ms-excel;charset=utf-8");
		    response.setHeader("Content-Disposition", "attachment;filename="
			    + new String((title1+"年度汇总表"+".xls").getBytes(), "iso-8859-1"));
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
}

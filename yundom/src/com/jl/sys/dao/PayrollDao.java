package com.jl.sys.dao;

import java.util.List;
import java.util.Map;

import com.jl.sys.pojo.PayrollInfo;

public interface PayrollDao {
	
	public void saveInfo(PayrollInfo pi);
	
	
	/**
	 * 工资单列表查询展示分页
	 * @Title findList
	 * @param page
	 * @param rows
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2020年1月10日 下午3:33:19
	 */
	public List findList(int page,int rows,Map<String,String> param);
	
	public Map findCount(Map<String,String> param);
	/**
	 * 工资单中导出excel使用，不用分页信息
	 * @Title findList
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2020年1月10日 下午3:32:53
	 */
	public List findList(Map<String,String> param);
	
	
	public PayrollInfo findById(String id);
	
	public void delInfo(String id);
	
	public List<PayrollInfo> findByYFAndXM(String yuefen,String xm);
	
	public void insertPayrollData(String yuefen,String xm);
	
	
	public void updatePayrollData(String yuefen,String xm);
	
	public List<PayrollInfo> findListByYf(String yf);
	
	
	/**
	 * 根据人员分类汇总信息
	 * @Title findListByGroupUser
	 * @return
	 * @author zpj
	 * @time 2019年9月18日 下午1:38:30
	 */
	public List<Map> findListByGroupUser(String nianfen);

}

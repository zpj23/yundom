package com.jl.material.service;

import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.jl.material.pojo.RecordInfo;
import com.jl.material.pojo.RecordInfoDetail;
import com.jl.sys.pojo.UserInfo;

public interface RecordService {

	
	/**
	 * 详细信息列表
	 * @Title findRecordsDetailList
	 * @param user
	 * @param page
	 * @param rows
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2018年8月30日 下午3:33:28
	 */
	public Map findRecordsDetailList(UserInfo user,int page,int rows,Map<String,String> param);
	
	
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	public RecordInfo findById(String id);
	
	public int saveRecord(RecordInfo goods);
	
	/**
	 * 保存详细信息
	 * @Title saveDetail
	 * @param rid
	 * @return
	 * @author zpj
	 * @time 2018年8月30日 下午4:50:55
	 */
	public int saveDetail(RecordInfoDetail rid);
	
	public int delRecord(String id);
	
	
	/**
	 * 删除关联表的信息
	 * @Title delRecordDetailByRecordId
	 * @param recordId
	 * @author zpj
	 * @time 2018年8月31日 下午3:38:04
	 */
	public void delRecordDetailByRecordId(String recordId);
	
}

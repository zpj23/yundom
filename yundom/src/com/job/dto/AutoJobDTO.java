package com.job.dto;

/**
 * @Description: 这里用一句话描述这个类的作用
 * @ClassName: AutoJobDTO
 * @author zpj 
 * @date 2016-8-3 下午4:57:21
 *
 */
public class AutoJobDTO {
	
	private String job_id;
	private String job_name;
	private String job_group;
	private String job_time;//运行时间表达式
	private int job_status=0;//0禁用 1启用 2删除
	private String job_descr;//
	private int job_intervalInSeconds=0;//访问间隔
	private int job_repeatCount=0;//访问次数
	
	public String getJob_id() {
		return job_id;
	}
	public void setJob_id(String job_id) {
		this.job_id = job_id;
	}
	public String getJob_name() {
		return job_name;
	}
	public void setJob_name(String job_name) {
		this.job_name = job_name;
	}
	public String getJob_group() {
		return job_group;
	}
	public void setJob_group(String job_group) {
		this.job_group = job_group;
	}
	public String getJob_time() {
		return job_time;
	}
	public void setJob_time(String job_time) {
		this.job_time = job_time;
	}
	public String getJob_descr() {
		return job_descr;
	}
	public void setJob_descr(String job_descr) {
		this.job_descr = job_descr;
	}
	public int getJob_status() {
		return job_status;
	}
	public void setJob_status(int job_status) {
		this.job_status = job_status;
	}
	public int getJob_intervalInSeconds() {
		return job_intervalInSeconds;
	}
	public void setJob_intervalInSeconds(int job_intervalInSeconds) {
		this.job_intervalInSeconds = job_intervalInSeconds;
	}
	public int getJob_repeatCount() {
		return job_repeatCount;
	}
	public void setJob_repeatCount(int job_repeatCount) {
		this.job_repeatCount = job_repeatCount;
	}
	
	
	
	
	

}

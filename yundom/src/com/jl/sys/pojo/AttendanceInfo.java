package com.jl.sys.pojo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "jl_attendance_info")
public class AttendanceInfo implements java.io.Serializable{
	
	
	private String id;//主键
	
	
	private int userid;//用户id
	
	
	private Date intime;//上班打卡时间
	
	
	private Date outtime;//下班打卡时间
	
	public AttendanceInfo(){
		
	}
	
	
	public AttendanceInfo(String id, int userid, Date intime, Date outtime) {
		super();
		this.id = id;
		this.userid = userid;
		this.intime = intime;
		this.outtime = outtime;
	}


	@Id
	@Column(name = "id", nullable = false, length=50)
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	@Column(name = "userid",  precision = 22, scale = 0)
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "intime", length=7)
	public Date getIntime() {
		return intime;
	}
	public void setIntime(Date intime) {
		this.intime = intime;
	}
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "outtime", length=7)
	public Date getOuttime() {
		return outtime;
	}
	public void setOuttime(Date outtime) {
		this.outtime = outtime;
	}
	
	
}

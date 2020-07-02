package com.jl.sys.pojo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "jl_check_info")
public class CheckInfo implements java.io.Serializable{
	private String id;
	private String staffname;//员工名
	private Date workdate;//工作日期；
	private double workduringtime=8;//工作时长
	private String departmentname;//工作地点 对应车间
	private String departmentcode;//对应车间 编码 字典
	private String workcontent;//工作内容
	private Date adddate;//创建时间
	private double overtime;//加班时长
	private int createuserid;//创建人id (理论上是组长id)
	private int reportcjzrid;//组长上报的责任车间主任id
	private String remark;//备注
	private String shenhe;//车间主任角色审核功能  0待审核，1已审核
	private Date shenheTime;//车间主任角色审核的时间
	private int shenherenId;//车间主任审核人员id
	private String shenhe2;//人事角色审核功能 查询字典 0待审核，1已审核
	private Date shenhe2Time;//人事角色角色审核的时间
	private int shenheren2Id;//人事审核人员id
	private String sgxm;//address字段分出来的施工项目
	private String sgqy;//address字段分出来的施工区域
	private String gx;//工序（字典）
	
	@Id
	@Column(name = "id", nullable = false, length=50)
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	@Column(name = "staffname", nullable = false, length=50)
	public String getStaffname() {
		return staffname;
	}
	public void setStaffname(String staffname) {
		this.staffname = staffname;
	}
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "workdate", length=7)
	public Date getWorkdate() {
		return workdate;
	}
	public void setWorkdate(Date workdate) {
		this.workdate = workdate;
	}
	@Lob 
	@Type(type = "org.hibernate.type.StringClobType") 
	@Column(name="workcontent", columnDefinition="text", nullable=true)
	public String getWorkcontent() {
		return workcontent;
	}
	public void setWorkcontent(String workcontent) {
		this.workcontent = workcontent;
	}
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "adddate", length=7)
	public Date getAdddate() {
		return adddate;
	}
	public void setAdddate(Date adddate) {
		this.adddate = adddate;
	}
	@Column(name = "workduringtime", precision=12 ,scale=2)
	public double getWorkduringtime() {
		return workduringtime;
	}
	public void setWorkduringtime(double workduringtime) {
		this.workduringtime = workduringtime;
	}
	@Column(name = "departmentname",  length=50)
	public String getDepartmentname() {
		return departmentname;
	}
	public void setDepartmentname(String departmentname) {
		this.departmentname = departmentname;
	}
	@Column(name = "departmentcode",  length=50)
	public String getDepartmentcode() {
		return departmentcode;
	}
	public void setDepartmentcode(String departmentcode) {
		this.departmentcode = departmentcode;
	}
	
	
	@Column(name = "overtime", precision=12 ,scale=2)
	public double getOvertime() {
		return overtime;
	}
	public void setOvertime(double overtime) {
		this.overtime = overtime;
	}
	
	@Lob 
	@Type(type = "org.hibernate.type.StringClobType") 
	@Column(name="remark", columnDefinition="text", nullable=true)
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	
	@Column(name = "createuserid", precision=12 ,scale=2)
	public int getCreateuserid() {
		return createuserid;
	}
	public void setCreateuserid(int createuserid) {
		this.createuserid = createuserid;
	}
	@Column(name = "shenhe",  length=10)
	public String getShenhe() {
		return shenhe;
	}
	public void setShenhe(String shenhe) {
		this.shenhe = shenhe;
	}
	
	@Column(name = "sgxm",  length=100)
	public String getSgxm() {
		return sgxm;
	}
	public void setSgxm(String sgxm) {
		this.sgxm = sgxm;
	}
	@Column(name = "sgqy",  length=100)
	public String getSgqy() {
		return sgqy;
	}
	public void setSgqy(String sgqy) {
		this.sgqy = sgqy;
	}
	
	public String getGx() {
		return gx;
	}
	public void setGx(String gx) {
		this.gx = gx;
	}
	public String getShenhe2() {
		return shenhe2;
	}
	public void setShenhe2(String shenhe2) {
		this.shenhe2 = shenhe2;
	}
	public Date getShenheTime() {
		return shenheTime;
	}
	public void setShenheTime(Date shenheTime) {
		this.shenheTime = shenheTime;
	}
	public Date getShenhe2Time() {
		return shenhe2Time;
	}
	public void setShenhe2Time(Date shenhe2Time) {
		this.shenhe2Time = shenhe2Time;
	}
	public int getShenherenId() {
		return shenherenId;
	}
	public void setShenherenId(int shenherenId) {
		this.shenherenId = shenherenId;
	}
	public int getShenheren2Id() {
		return shenheren2Id;
	}
	public void setShenheren2Id(int shenheren2Id) {
		this.shenheren2Id = shenheren2Id;
	}
	
	public int getReportcjzrid() {
		return reportcjzrid;
	}
	public void setReportcjzrid(int reportcjzrid) {
		this.reportcjzrid = reportcjzrid;
	}
	
	
}

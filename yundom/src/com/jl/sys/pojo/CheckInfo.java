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
	private String departmentname;//工作地点 对应部门 
	private String departmentcode;//对应部门 编码
	private String workcontent;//工作内容
	private Date adddate;//创建时间
	private String address;//施工项目及区域
	private double overtime;//加班时长
	private int createuserid;//创建人id
	private String remark;//备注
	private String shenhe;//审核功能 0待审核，1已审核
	private String sgxm;//address字段分出来的施工项目
	private String sgqy;//address字段分出来的施工区域
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
	
	@Lob 
	@Type(type = "org.hibernate.type.StringClobType") 
	@Column(name="address", columnDefinition="text", nullable=true)
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
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
	
	
	
	
}

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
@Table(name = "jl_attendance_abnormal_info")
public class AttendaceAbnormalInfo {
	private String id;//主键
	private int userid;//用户id;
	private int username;
	private String departmentname;//部门名称
	private String  departmentcode;//部门编码
	private Date riqi;
	private String sw_sbdk;//上午上班打卡
	private String sw_xbdk;//上午下班打卡
	private String xw_sbdk;//下午上班打卡
	private String xw_xbdk;//下午下班打卡
	private String cdsj;//查到时间（分钟数）
	private String ztsj;//早退时间（分钟数）
	private String hjsj;//合计时间（分钟数）
	private String bz;//备注
	
	
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
	@Column(name = "username", length = 50)
	public int getUsername() {
		return username;
	}
	public void setUsername(int username) {
		this.username = username;
	}
	@Column(name = "departmentname", length = 50)
	public String getDepartmentname() {
		return departmentname;
	}
	public void setDepartmentname(String departmentname) {
		this.departmentname = departmentname;
	}
	@Column(name = "departmentcode", length = 50)
	public String getDepartmentcode() {
		return departmentcode;
	}
	public void setDepartmentcode(String departmentcode) {
		this.departmentcode = departmentcode;
	}
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "riqi", length=7)
	public Date getRiqi() {
		return riqi;
	}
	public void setRiqi(Date riqi) {
		this.riqi = riqi;
	}
	@Column(name = "sw_sbdk", length = 50)
	public String getSw_sbdk() {
		return sw_sbdk;
	}
	public void setSw_sbdk(String sw_sbdk) {
		this.sw_sbdk = sw_sbdk;
	}
	@Column(name = "sw_xbdk", length = 50)
	public String getSw_xbdk() {
		return sw_xbdk;
	}
	public void setSw_xbdk(String sw_xbdk) {
		this.sw_xbdk = sw_xbdk;
	}
	@Column(name = "xw_sbdk", length = 50)
	public String getXw_sbdk() {
		return xw_sbdk;
	}
	public void setXw_sbdk(String xw_sbdk) {
		this.xw_sbdk = xw_sbdk;
	}
	@Column(name = "xw_xbdk", length = 50)
	public String getXw_xbdk() {
		return xw_xbdk;
	}
	public void setXw_xbdk(String xw_xbdk) {
		this.xw_xbdk = xw_xbdk;
	}
	@Column(name = "cdsj", length = 50)
	public String getCdsj() {
		return cdsj;
	}
	public void setCdsj(String cdsj) {
		this.cdsj = cdsj;
	}
	@Column(name = "ztsj", length = 50)
	public String getZtsj() {
		return ztsj;
	}
	public void setZtsj(String ztsj) {
		this.ztsj = ztsj;
	}
	@Column(name = "hjsj", length = 50)
	public String getHjsj() {
		return hjsj;
	}
	public void setHjsj(String hjsj) {
		this.hjsj = hjsj;
	}
	@Lob
	@Type(type = "org.hibernate.type.StringClobType") 
	@Column(name = "bz", columnDefinition="text", nullable=true)
	public String getBz() {
		return bz;
	}
	public void setBz(String bz) {
		this.bz = bz;
	}

	
	
}

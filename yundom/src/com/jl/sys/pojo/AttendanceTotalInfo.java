package com.jl.sys.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "jl_attendance_total_info")
public class AttendanceTotalInfo implements java.io.Serializable{
	
	private String id;//主键
	private int userid;//用户id;
	private String username;
	private String departmentname;//部门名称
	private String  departmentcode;//部门编码
	private String gzsx_bz;//工作时效——标准
	private String gzsx_sj;//工作时效--实际
	private String cd_cs; //迟到次数
	private String cd_fzs;//迟到分钟数
	private String zt_cs;//早退次数
	private String zt_fzs;//早退分钟数
	private String jb_zc;//加班正常
	private String jb_jr;//加班假日
	private String cqts;//出勤天数
	private String cc;//出差
	private String kg;//矿工
	private String qj;//请假
	private String jbgz_bz;//加班工资--标注
	private String jbgz_jb;//加班工资--加班
	private String jbgz_jt;//加班工资--津贴
	private String jxgz_cdzt;//减项工资--迟到早退
	private String jxgz_qj;//减项工资--请假
	private String jxgz_kk;//减项工资--扣款
	private String sjgz;//实际工资
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
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
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
	@Column(name = "gzsx_bz", length = 50)
	public String getGzsx_bz() {
		return gzsx_bz;
	}
	public void setGzsx_bz(String gzsx_bz) {
		this.gzsx_bz = gzsx_bz;
	}
	@Column(name = "gzsx_sj", length = 50)
	public String getGzsx_sj() {
		return gzsx_sj;
	}
	public void setGzsx_sj(String gzsx_sj) {
		this.gzsx_sj = gzsx_sj;
	}
	@Column(name = "cd_cs", length = 50)
	public String getCd_cs() {
		return cd_cs;
	}
	public void setCd_cs(String cd_cs) {
		this.cd_cs = cd_cs;
	}
	@Column(name = "cd_fzs", length = 50)
	public String getCd_fzs() {
		return cd_fzs;
	}
	public void setCd_fzs(String cd_fzs) {
		this.cd_fzs = cd_fzs;
	}
	@Column(name = "zt_cs", length = 50)
	public String getZt_cs() {
		return zt_cs;
	}
	public void setZt_cs(String zt_cs) {
		this.zt_cs = zt_cs;
	}
	@Column(name = "zt_fzs", length = 50)
	public String getZt_fzs() {
		return zt_fzs;
	}
	public void setZt_fzs(String zt_fzs) {
		this.zt_fzs = zt_fzs;
	}
	@Column(name = "jb_zc", length = 50)
	public String getJb_zc() {
		return jb_zc;
	}
	public void setJb_zc(String jb_zc) {
		this.jb_zc = jb_zc;
	}
	@Column(name = "jb_jr", length = 50)
	public String getJb_jr() {
		return jb_jr;
	}
	public void setJb_jr(String jb_jr) {
		this.jb_jr = jb_jr;
	}
	@Column(name = "cqts", length = 50)
	public String getCqts() {
		return cqts;
	}
	public void setCqts(String cqts) {
		this.cqts = cqts;
	}
	@Column(name = "cc", length = 50)
	public String getCc() {
		return cc;
	}
	public void setCc(String cc) {
		this.cc = cc;
	}
	@Column(name = "kg", length = 50)
	public String getKg() {
		return kg;
	}
	public void setKg(String kg) {
		this.kg = kg;
	}
	@Column(name = "qj", length = 50)
	public String getQj() {
		return qj;
	}
	public void setQj(String qj) {
		this.qj = qj;
	}
	@Column(name = "jbgz_bz", length = 50)
	public String getJbgz_bz() {
		return jbgz_bz;
	}
	public void setJbgz_bz(String jbgz_bz) {
		this.jbgz_bz = jbgz_bz;
	}
	@Column(name = "jbgz_jb", length = 50)
	public String getJbgz_jb() {
		return jbgz_jb;
	}
	public void setJbgz_jb(String jbgz_jb) {
		this.jbgz_jb = jbgz_jb;
	}
	@Column(name = "jbgz_jt", length = 50)
	public String getJbgz_jt() {
		return jbgz_jt;
	}
	public void setJbgz_jt(String jbgz_jt) {
		this.jbgz_jt = jbgz_jt;
	}
	@Column(name = "jxgz_cdzt", length = 50)
	public String getJxgz_cdzt() {
		return jxgz_cdzt;
	}
	public void setJxgz_cdzt(String jxgz_cdzt) {
		this.jxgz_cdzt = jxgz_cdzt;
	}
	@Column(name = "jxgz_qj", length = 50)
	public String getJxgz_qj() {
		return jxgz_qj;
	}
	public void setJxgz_qj(String jxgz_qj) {
		this.jxgz_qj = jxgz_qj;
	}
	@Column(name = "jxgz_kk", length = 50)
	public String getJxgz_kk() {
		return jxgz_kk;
	}
	public void setJxgz_kk(String jxgz_kk) {
		this.jxgz_kk = jxgz_kk;
	}
	@Column(name = "sjgz", length = 50)
	public String getSjgz() {
		return sjgz;
	}
	public void setSjgz(String sjgz) {
		this.sjgz = sjgz;
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

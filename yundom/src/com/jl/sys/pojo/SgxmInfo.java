package com.jl.sys.pojo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "jl_sgxm_tj_info")
public class SgxmInfo implements java.io.Serializable{
	private String id;//主键
	private String xm;//姓名
	private String yf;//月份
	private String gd;//工地
	private String gjby;//工价/包月
	private String jbgz;//基本工资
	private String jbgzhjj;//加班工资和奖金
	private String yfgz;//应发工资
	private String lhbt;//劳护补贴
	private String fybt;//费用补贴
	private String mq;//满勤
	private String qtkk;//其他扣款
	private String zgz;//总工资（元）
	private String yfgzy;//预付工资（元）
	private String sygz;//剩余工资（元）
	private String qz;//签字
	private String bz;//备注
	private String chuqin;//出勤
	private String jiaban;//加班
	private String zonggongshi;//总工时
	
	private String sgxm;//施工项目
 	
	private Date createtime;//记录时间

	@Id
	@Column(name = "id", nullable = false, length=50)
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getXm() {
		return xm;
	}

	public void setXm(String xm) {
		this.xm = xm;
	}

	public String getYf() {
		return yf;
	}

	public void setYf(String yf) {
		this.yf = yf;
	}

	public String getGd() {
		return gd;
	}

	public void setGd(String gd) {
		this.gd = gd;
	}

	public String getGjby() {
		return gjby;
	}

	public void setGjby(String gjby) {
		this.gjby = gjby;
	}

	public String getJbgz() {
		return jbgz;
	}

	public void setJbgz(String jbgz) {
		this.jbgz = jbgz;
	}

	public String getJbgzhjj() {
		return jbgzhjj;
	}

	public void setJbgzhjj(String jbgzhjj) {
		this.jbgzhjj = jbgzhjj;
	}

	public String getYfgz() {
		return yfgz;
	}

	public void setYfgz(String yfgz) {
		this.yfgz = yfgz;
	}

	public String getLhbt() {
		return lhbt;
	}

	public void setLhbt(String lhbt) {
		this.lhbt = lhbt;
	}

	public String getFybt() {
		return fybt;
	}

	public void setFybt(String fybt) {
		this.fybt = fybt;
	}

	public String getMq() {
		return mq;
	}

	public void setMq(String mq) {
		this.mq = mq;
	}

	public String getQtkk() {
		return qtkk;
	}

	public void setQtkk(String qtkk) {
		this.qtkk = qtkk;
	}

	public String getZgz() {
		return zgz;
	}

	public void setZgz(String zgz) {
		this.zgz = zgz;
	}

	public String getYfgzy() {
		return yfgzy;
	}

	public void setYfgzy(String yfgzy) {
		this.yfgzy = yfgzy;
	}

	public String getSygz() {
		return sygz;
	}

	public void setSygz(String sygz) {
		this.sygz = sygz;
	}

	public String getQz() {
		return qz;
	}

	public void setQz(String qz) {
		this.qz = qz;
	}

	public String getBz() {
		return bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

	public String getChuqin() {
		return chuqin;
	}

	public void setChuqin(String chuqin) {
		this.chuqin = chuqin;
	}

	public String getJiaban() {
		return jiaban;
	}

	public void setJiaban(String jiaban) {
		this.jiaban = jiaban;
	}

	public String getZonggongshi() {
		return zonggongshi;
	}

	public void setZonggongshi(String zonggongshi) {
		this.zonggongshi = zonggongshi;
	}

	public String getSgxm() {
		return sgxm;
	}

	public void setSgxm(String sgxm) {
		this.sgxm = sgxm;
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}
	
}

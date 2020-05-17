package com.jl.sys.pojo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "jl_location_info")
public class LocationInfo implements java.io.Serializable{
	private String id;//主键id
	private int userid;//用户id;
	private String zuobiao;//坐标
	private Date updatetime;//更新时间
	private String address;//地址
	
	@Id
	@Column(name = "id", nullable = false, length=50)
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	@Column(name = "userid", precision = 22, scale = 0)
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	@Column(name = "zuobiao",  length=50)
	public String getZuobiao() {
		return zuobiao;
	}
	public void setZuobiao(String zuobiao) {
		this.zuobiao = zuobiao;
	}
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updatetime", length=7)
	public Date getUpdatetime() {
		return updatetime;
	}
	public void setUpdatetime(Date updatetime) {
		this.updatetime = updatetime;
	}
	@Column(name = "address",  length=500)
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	
	
	
}

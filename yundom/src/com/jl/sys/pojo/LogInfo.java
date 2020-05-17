package com.jl.sys.pojo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "jl_log_info")
public class LogInfo implements java.io.Serializable{
	private String id;//主键
	private Date createtime;//记录时间
	private String description;//描述
	private String type;//操作的类型   登陆，查询，编辑
	private int userid;//操作人id
	private String username;//操作人名称
	
	@Id
	@Column(name = "id", nullable = false, length=50)
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "createtime", length=7)
	public Date getCreatetime() {
		return createtime;
	}
	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}
	@Column(name = "description",  length=4000)
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	@Column(name = "type",  length=100)
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	@Column(name = "userid", precision = 22, scale = 0)
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	@Column(name = "username",  length=100)
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	
}

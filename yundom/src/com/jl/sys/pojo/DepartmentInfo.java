package com.jl.sys.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "jl_department_info")
public class DepartmentInfo  implements java.io.Serializable{
	private int id;//主键id
	private String name;//部门名称
	private String code;//部门编码
	private String parent_name;//上级部门名称
	private String parent_code;//上级部门编码
//	private String parent_id;//上级部门id
	private int userid;//部门管理员id
	private String username;//部门管理员姓名;
	private String remark;//部门说明
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	@Column(name = "id",  nullable = false, precision = 22, scale = 0)
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	@Column(name = "name", length = 100)
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Column(name = "code", length = 100)
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	@Column(name = "parent_name", length = 100)
	public String getParent_name() {
		return parent_name;
	}
	public void setParent_name(String parent_name) {
		this.parent_name = parent_name;
	}
	@Column(name = "parent_code", length = 100)
	public String getParent_code() {
		return parent_code;
	}
	public void setParent_code(String parent_code) {
		this.parent_code = parent_code;
	}
	
	@Column(name = "userid",  precision = 22, scale = 0)
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	@Column(name = "username", length = 100)
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
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
	

}

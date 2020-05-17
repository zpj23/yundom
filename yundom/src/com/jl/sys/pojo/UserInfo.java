package com.jl.sys.pojo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "jl_user_info")
public class UserInfo implements java.io.Serializable{
	private int id;//主键id
	private String loginname;//登陆名
	private String username;//用户姓名
	private String password;//密码
	private String sex;//性别
	private String departmentcode;//部门编码;
	private String departmentname;//部门名称;
//	private int departmentid;//部门名称;
	private String address;//地址;
	private String telephone;//电话;
	private Date createtime;//创建时间
	private int createuserid;//创建人id
	private Date updatetime;//更新时间；
	private int updateuserid;//更新人id；
	private int isdel;//是否注销  默认0，1是已注销
	private String email;//电子邮箱
	private String remark;//备注
	private Date lastlogintime;//上次登陆时间
	private String lastloginip;//上次登陆ip
	private String isAdmin;//1是，0不是
	private String openid;//微信上用的
	
	//precision意为“精密度、精确”，在这里就表示该字段的有效数字位数了。 
	//scale意为“刻度、数值范围”，那就是该字段的小数位数
	public UserInfo(){}
	
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	@Column(name = "id",  nullable = false, precision = 22, scale = 0)
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
//	@Column(name = "deparmentid",  nullable = false, precision = 22, scale = 0)
//	public int getDepartmentid() {
//		return departmentid;
//	}
//
//	public void setDepartmentid(int departmentid) {
//		this.departmentid = departmentid;
//	}
	
	@Column(name = "loginname", length = 100)
	public String getLoginname() {
		return loginname;
	}




	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}
	
	@Column(name = "username", length = 100)
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	@Column(name = "password", length = 100)
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	@Column(name = "sex", length = 10)
	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}



	@Column(name = "departmentcode", length = 100)
	public String getDepartmentcode() {
		return departmentcode;
	}

	public void setDepartmentcode(String departmentcode) {
		this.departmentcode = departmentcode;
	}

	@Column(name = "departmentname", length = 100)
	public String getDepartmentname() {
		return departmentname;
	}
	
	public void setDepartmentname(String departmentname) {
		this.departmentname = departmentname;
	}
	@Column(name = "address", length = 1000)
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	@Column(name = "telephone", length = 20)
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "createtime", length=7)
	public Date getCreatetime() {
		return createtime;
	}
	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}
	@Column(name = "createuserid", precision = 22, scale = 0)
	public int getCreateuserid() {
		return createuserid;
	}
	public void setCreateuserid(int createuserid) {
		this.createuserid = createuserid;
	}
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updatetime", length=7)
	public Date getUpdatetime() {
		return updatetime;
	}
	public void setUpdatetime(Date updatetime) {
		this.updatetime = updatetime;
	}
	@Column(name = "updateuserid", precision = 22, scale = 0)
	public int getUpdateuserid() {
		return updateuserid;
	}
	public void setUpdateuserid(int updateuserid) {
		this.updateuserid = updateuserid;
	}
	@Column(name = "isdel", precision = 10, scale = 0)
	public int getIsdel() {
		return isdel;
	}
	public void setIsdel(int isdel) {
		this.isdel = isdel;
	}
	@Column(name = "email", length = 100)
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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


	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "lastlogintime", length=7)
	public Date getLastlogintime() {
		return lastlogintime;
	}

	public void setLastlogintime(Date lastlogintime) {
		this.lastlogintime = lastlogintime;
	}


	@Column(name = "lastloginip", length = 100)
	public String getLastloginip() {
		return lastloginip;
	}

	public void setLastloginip(String lastloginip) {
		this.lastloginip = lastloginip;
	}

	
	

	public String getOpenid() {
		return openid;
	}



	public void setOpenid(String openid) {
		this.openid = openid;
	}



	@Transient
	public String getIsAdmin() {
		return isAdmin;
	}

	public void setIsAdmin(String isAdmin) {
		this.isAdmin = isAdmin;
	}
	
	
}

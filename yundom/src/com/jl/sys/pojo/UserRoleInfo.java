package com.jl.sys.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @Description: 用户角色关联表
 * @ClassName: UserRoleInfo
 * @author zpj 
 * @date 2016-4-19 下午1:49:41
 *
 */
@Entity
@Table(name = "jl_user_role_info")
public class UserRoleInfo implements java.io.Serializable {
	private int id;//主键
	private int userid;//用户id
	private int roleid;//角色id；
	
	
	
	
	public UserRoleInfo(int id, int userid, int roleid) {
		super();
		this.id = id;
		this.userid = userid;
		this.roleid = roleid;
	}
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	@Column(name = "id",  nullable = false, precision = 22, scale = 0)
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	@Column(name = "userid",  nullable = false, precision = 22, scale = 0)
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	
	@Column(name = "roleid",  nullable = false, precision = 22, scale = 0)
	public int getRoleid() {
		return roleid;
	}
	public void setRoleid(int roleid) {
		this.roleid = roleid;
	}
	
}

package com.jl.sys.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "jl_menu_role_info")
public class MenuRoleInfo implements java.io.Serializable {
	private int id;//主键
	private int menuid;//菜单id
	private int roleid;//角色id；
	
	
	
	public MenuRoleInfo(int id, int menuid, int roleid) {
		super();
		this.id = id;
		this.menuid = menuid;
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
	@Column(name = "menuid",  nullable = false, precision = 22, scale = 0)
	public int getMenuid() {
		return menuid;
	}
	public void setMenuid(int menuid) {
		this.menuid = menuid;
	}
	@Column(name = "roleid",  nullable = false, precision = 22, scale = 0)
	public int getRoleid() {
		return roleid;
	}
	public void setRoleid(int roleid) {
		this.roleid = roleid;
	}
	
	

}

package com.jl.sys.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "jl_department_role_info")
public class DepartmentRoleInfo implements java.io.Serializable  {
	private int id;//主键
	private int departmentid;//部门id
	private int roleid;//角色id；
	
	
	
	
	public DepartmentRoleInfo(int id, int departmentid, int roleid) {
		super();
		this.id = id;
		this.departmentid = departmentid;
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
	@Column(name = "departmentid",  nullable = false, precision = 22, scale = 0)
	public int getDepartmentid() {
		return departmentid;
	}
	public void setDepartmentid(int departmentid) {
		this.departmentid = departmentid;
	}
	@Column(name = "roleid",  nullable = false, precision = 22, scale = 0)
	public int getRoleid() {
		return roleid;
	}
	public void setRoleid(int roleid) {
		this.roleid = roleid;
	}

	
	
}

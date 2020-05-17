package com.jl.material.pojo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "jl_material_record_info")
public class RecordInfo implements java.io.Serializable{
	private String id;//主键
	private String lyr;//领用人姓名
	private Date createtime;//领用时间
	private String departmentcode;//领用部门编码
	private String departmentname;//领用部门名称
	private String remark;//备注
	
	@Id
	@Column(name = "id",  nullable = false ,length=36)
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	@Column(name = "lyr", length = 100)
	public String getLyr() {
		return lyr;
	}
	public void setLyr(String lyr) {
		this.lyr = lyr;
	}
	
	@Column(name = "remark", length = 500)
	public String getRemark() {
		return remark;
	}
	
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "createtime", length=7)
	public Date getCreatetime() {
		return createtime;
	}
	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}
	@Column(name = "departmentcode", length = 20)
	public String getDepartmentcode() {
		return departmentcode;
	}
	public void setDepartmentcode(String departmentcode) {
		this.departmentcode = departmentcode;
	}
	@Column(name = "departmentname", length = 20)
	public String getDepartmentname() {
		return departmentname;
	}
	public void setDepartmentname(String departmentname) {
		this.departmentname = departmentname;
	}
	
	

}

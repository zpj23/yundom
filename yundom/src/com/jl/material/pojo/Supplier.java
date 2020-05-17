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

import org.hibernate.annotations.GenericGenerator;

/**
 * @Description: 供应商对象
 * @ClassName: Supplier
 * @author zpj 
 * @date 2016-4-8 上午11:45:22
 *
 */
/**
 * @Description: 供应商表
 * @ClassName: Supplier
 * @author zpj 
 * @date 2016-4-9 下午3:28:14
 *
 */
@Entity
@Table(name = "jl_material_supplier_info")
public class Supplier implements java.io.Serializable{
	private int id;//表的主键id
	private String name;//供应商名称（店名、公司名、厂名）(包含维修商)
	private String address;//地址
	private String contactname;//联系人姓名
	private String phone;//电话号码
	private String remark;//备注
	private String state="1";//供应商"1"或维修商"2" 
	private Date createtime=new Date();//创建时间
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	@Column(name = "id",  nullable = false, precision = 22, scale = 0)
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	@Column(name = "name", length = 500)
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Column(name = "address", length = 500)
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	@Column(name = "contactname", length = 10)
	public String getContactname() {
		return contactname;
	}
	public void setContactname(String contactname) {
		this.contactname = contactname;
	}
	
	
	@Column(name = "state", length = 10)
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	@Column(name = "phone", length = 20)
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	@Column(name = "remark", length = 100)
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
	
}

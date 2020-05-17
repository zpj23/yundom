package com.jl.sys.pojo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "jl_shopping_info")
public class ShoppingInfo implements java.io.Serializable{
	
	private int id;//主键
	private String name; //物资名称
	private String type;//规格型号
	private double price=0;//单价
	private int count=0;//数量
	private String supplier;//供应商
	private String receiver;//领用人
	private String bm;//领用部门
	private Date createtime=new Date();//创建时间
	private String remark;//备注
	
	@Id
	@Column(name = "id", nullable = false, length=50)
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	@Column(name = "name", nullable = false, length=50)
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Column(name = "type",  length=50)
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	@Column(name = "price", precision=12 ,scale=2)
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	@Column(name = "count", precision=12 ,scale=2)
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	@Column(name = "supplier",  length=50)
	public String getSupplier() {
		return supplier;
	}
	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}
	@Column(name = "receiver",  length=50)
	public String getReceiver() {
		return receiver;
	}
	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
	@Column(name = "bm",  length=50)
	public String getBm() {
		return bm;
	}
	public void setBm(String bm) {
		this.bm = bm;
	}
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "createtime", length=7)
	public Date getCreatetime() {
		return createtime;
	}
	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}
	@Column(name = "remark", length = 100)
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	
	
	
}

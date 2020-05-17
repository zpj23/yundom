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


/**
 * @Description: 报损维修表
 * @ClassName: Maintain
 * @author zpj 
 * @date 2016-4-11 上午9:39:22
 *
 */
@Entity
@Table(name = "jl_material_maintain_info")
public class Maintain implements java.io.Serializable{
	private int id;//主键
	private int goodsid;//物资id
	private int supplierid;//供应商id
	private int maintainid;//维修商id(存于供应商表中)
	private int departmentid;//部门id
	private String chargename;//负责人修人
	private double num=0;//报修数量
	private double price =0;//维修费用 
	private String damagestate="";//是否申请报废（1报废，2维修）
	private String examinestate="";//申请的审核状态（1已申请，2已审核，3待定）
	private String remark;//备注
	private Date createtime;//创建时间
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	@Column(name = "id",  nullable = false, precision = 22, scale = 0)
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	@Column(name = "goodsid", precision = 22, scale = 0)
	public int getGoodsid() {
		return goodsid;
	}
	public void setGoodsid(int goodsid) {
		this.goodsid = goodsid;
	}
	@Column(name = "supplierid", precision = 22, scale = 0)
	public int getSupplierid() {
		return supplierid;
	}
	public void setSupplierid(int supplierid) {
		this.supplierid = supplierid;
	}
	@Column(name = "maintainid", precision = 22, scale = 0)
	public int getMaintainid() {
		return maintainid;
	}
	public void setMaintainid(int maintainid) {
		this.maintainid = maintainid;
	}
	@Column(name = "departmentid", precision = 22, scale = 0)
	public int getDepartmentid() {
		return departmentid;
	}
	public void setDepartmentid(int departmentid) {
		this.departmentid = departmentid;
	}
	@Column(name = "chargename", length = 100)
	public String getChargename() {
		return chargename;
	}
	public void setChargename(String chargename) {
		this.chargename = chargename;
	}
	@Column(name = "num", precision=12 ,scale=2)
	public double getNum() {
		return num;
	}
	public void setNum(double num) {
		this.num = num;
	}
	@Column(name = "price", precision=12 ,scale=2)
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	@Column(name = "damagestate", length = 10)
	public String getDamagestate() {
		return damagestate;
	}
	public void setDamagestate(String damagestate) {
		this.damagestate = damagestate;
	}
	@Column(name = "examinestate", length = 10)
	public String getExaminestate() {
		return examinestate;
	}
	public void setExaminestate(String examinestate) {
		this.examinestate = examinestate;
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
	
	
}

package com.jl.sys.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * SysResourceItem entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "SYS_RESOURCE_ITEM" )
public class SysResourceItem implements java.io.Serializable {

	// Fields

	private Integer id;
	private String itemCode;
	private String itemName;
	private Integer typeid;
	private Integer parentItemid;
	private Integer itemOrder;
	private String remark;
	private Integer isable=1;

	// Constructors

	/** default constructor */
	public SysResourceItem() {
	}

	/** minimal constructor */
	public SysResourceItem(Integer id) {
		this.id = id;
	}

	/** full constructor */
	public SysResourceItem(Integer id, String itemCode, String itemName,
			Integer typeid, Integer parentItemid,Integer itemOrder, String remark,Integer isable) {
		this.id = id;
		this.itemCode = itemCode;
		this.itemName = itemName;
		this.typeid = typeid;
		this.parentItemid = parentItemid;
		this.itemOrder = itemOrder;
		this.remark = remark;
		this.isable =isable;
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	@Column(name = "ID",unique=true, nullable = false, precision = 22, scale = 0)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "ITEM_CODE", length = 50)
	public String getItemCode() {
		return this.itemCode;
	}

	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}

	@Column(name = "ITEM_NAME", length = 50)
	public String getItemName() {
		return this.itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	@Column(name = "TYPEID", precision = 22, scale = 0)
	public Integer getTypeid() {
		return this.typeid;
	}

	public void setTypeid(Integer typeid) {
		this.typeid = typeid;
	}

	@Column(name = "PARENT_ITEMID", precision = 22, scale = 0)
	public Integer getParentItemid() {
		return this.parentItemid;
	}

	public void setParentItemid(Integer parentItemid) {
		this.parentItemid = parentItemid;
	}
	
	@Column(name = "ITEM_ORDER", precision = 22, scale = 0)
	public Integer getItemOrder() {
		return itemOrder;
	}

	public void setItemOrder(Integer itemOrder) {
		this.itemOrder = itemOrder;
	}

	
	@Column(name = "REMARK", length = 500)
	public String getRemark() {
		return this.remark;
	}	
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	
	@Column(name = "isable", precision = 2, scale = 0)
	public Integer getIsable() {
		return isable;
	}
	public void setIsable(Integer isable) {
		this.isable = isable;
	}




	/***************************************/
	private String  parentItemname;
	
	@Transient
	public String getParentItemname() {
		return parentItemname;
	}

	public void setParentItemname(String parentItemname) {
		this.parentItemname = parentItemname;
	}
	

}
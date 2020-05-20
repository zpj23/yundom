package com.jl.sys.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * SysResourceType entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "SYS_RESOURCE_TYPE")
public class SysResourceType implements java.io.Serializable {

	// Fields

	private Integer id;
	private String typeCode;
	private String typeName;
	private Integer parentTypeid=0;

	// Constructors

	/** default constructor */
	public SysResourceType() {
	}

	/** minimal constructor */
	public SysResourceType(Integer id) {
		this.id = id;
	}

	/** full constructor */
	public SysResourceType(Integer id, String typeCode, String typeName,
			Integer parentTypeid) {
		this.id = id;
		this.typeCode = typeCode;
		this.typeName = typeName;
		this.parentTypeid = parentTypeid;
	}

	// Property accessors   , precision = 22, scale = 0
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	@Column(name = "ID",unique=true, nullable = false, precision = 22, scale = 0)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "TYPE_CODE", length = 50)
	public String getTypeCode() {
		return this.typeCode;
	}

	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}

	@Column(name = "TYPE_NAME", length = 50)
	public String getTypeName() {
		return this.typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	@Column(name = "PARENT_TYPEID", columnDefinition="number(10,0) default 0 ")
	public Integer getParentTypeid() {
		return this.parentTypeid;
	}

	public void setParentTypeid(Integer parentTypeid) {
		this.parentTypeid = parentTypeid;
	}

}
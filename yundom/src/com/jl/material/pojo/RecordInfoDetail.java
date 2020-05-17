package com.jl.material.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "jl_material_record_info_detail")
public class RecordInfoDetail implements java.io.Serializable{
	private String id;
	private String recordId;//关联的record表id
	private String gName;//物品详细名称
	private String gNumber;//物品数量
	
	@Id
	@Column(name = "id",  nullable = false ,length=36)
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getRecordId() {
		return recordId;
	}
	public void setRecordId(String recordId) {
		this.recordId = recordId;
	}
	public String getgName() {
		return gName;
	}
	public void setgName(String gName) {
		this.gName = gName;
	}
	public String getgNumber() {
		return gNumber;
	}
	public void setgNumber(String gNumber) {
		this.gNumber = gNumber;
	}
	
	
	
	
}

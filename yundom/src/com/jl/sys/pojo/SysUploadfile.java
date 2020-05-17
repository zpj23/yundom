package com.jl.sys.pojo;

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
 * SysUploadfile entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "SYS_UPLOADFILE" )
public class SysUploadfile implements java.io.Serializable {

	// Fields

	private Integer id;
	private String fileName;
	private String fileDesc;
	private String fileUrl;
	private String fileType;
	private Integer fileSize;
	private Date uploadTime;
	private String moduleName;
	private String tableUuid;
	private String originalName;

	// Constructors

	/** default constructor */
	public SysUploadfile() {
	}

	/** minimal constructor */
	public SysUploadfile(Integer id) {
		this.id = id;
	}

	/** full constructor */
	public SysUploadfile(Integer id, String fileName, String fileDesc,
			String fileUrl, String fileType, Integer fileSize,
			Date uploadTime, String moduleName, String tableUuid,
			String originalName) {
		this.id = id;
		this.fileName = fileName;
		this.fileDesc = fileDesc;
		this.fileUrl = fileUrl;
		this.fileType = fileType;
		this.fileSize = fileSize;
		this.uploadTime = uploadTime;
		this.moduleName = moduleName;
		this.tableUuid = tableUuid;
		this.originalName = originalName;
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID" , nullable = false, precision = 22, scale = 0)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "FILE_NAME", length = 100)
	public String getFileName() {
		return this.fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	@Column(name = "FILE_DESC", length = 2000)
	public String getFileDesc() {
		return this.fileDesc;
	}

	public void setFileDesc(String fileDesc) {
		this.fileDesc = fileDesc;
	}

	@Column(name = "FILE_URL", length = 500)
	public String getFileUrl() {
		return this.fileUrl;
	}

	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
	}

	@Column(name = "FILE_TYPE", length = 50)
	public String getFileType() {
		return this.fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	@Column(name = "FILE_SIZE", precision = 22, scale = 0)
	public Integer getFileSize() {
		return this.fileSize;
	}

	public void setFileSize(Integer fileSize) {
		this.fileSize = fileSize;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "UPLOAD_TIME", length = 7)
	public Date getUploadTime() {
		return this.uploadTime;
	}

	public void setUploadTime(Date uploadTime) {
		this.uploadTime = uploadTime;
	}

	@Column(name = "MODULE_NAME", length = 50)
	public String getModuleName() {
		return this.moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	@Column(name = "TABLE_UUID", length = 50)
	public String getTableUuid() {
		return this.tableUuid;
	}

	public void setTableUuid(String tableUuid) {
		this.tableUuid = tableUuid;
	}

	@Column(name = "ORIGINAL_NAME", length = 200)
	public String getOriginalName() {
		return this.originalName;
	}

	public void setOriginalName(String originalName) {
		this.originalName = originalName;
	}

}
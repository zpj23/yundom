package com.jl.sys.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "jl_menu_info")
public class MenuInfo implements java.io.Serializable{
	private int id;//主键
	private String name;//菜单名称
	private String url;// 链接地址
	private int parentid;//父菜单id
	private String parentname;//父菜单名称
	private int menuorder;// 菜单序号
	private String pictureurl;//菜单前图片路径
	private String remark;//备注
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	@Column(name = "id",  nullable = false, precision = 22, scale = 0)
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	@Column(name = "name", length = 100)
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Column(name = "url", length = 100)
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	@Column(name = "parentid",  nullable = false, precision = 22, scale = 0)
	public int getParentid() {
		return parentid;
	}
	public void setParentid(int parentid) {
		this.parentid = parentid;
	}
	@Column(name = "menuorder",  nullable = false, precision = 22, scale = 0)
	public int getMenuorder() {
		return menuorder;
	}
	public void setMenuorder(int menuorder) {
		this.menuorder = menuorder;
	}
	@Column(name = "pictureurl", length = 100)
	public String getPictureurl() {
		return pictureurl;
	}
	public void setPictureurl(String pictureurl) {
		this.pictureurl = pictureurl;
	}
	@Lob 
	@Type(type = "org.hibernate.type.StringClobType") 
	@Column(name="remark", columnDefinition="text", nullable=true)
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	@Column(name = "parentname", length = 100)
	public String getParentname() {
		return parentname;
	}
	public void setParentname(String parentname) {
		this.parentname = parentname;
	}
	
	
}

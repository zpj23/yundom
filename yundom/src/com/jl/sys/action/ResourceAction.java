package com.jl.sys.action;

import java.io.IOException;
import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.jl.common.ArgsUtil;
import com.jl.common.IAction;
import com.jl.sys.pojo.SysResourceItem;
import com.jl.sys.pojo.SysResourceType;
import com.jl.sys.service.ResourceService;


@Namespace("/")
@Scope("prototype")
@Component("resourceAction")
@ParentPackage("json-default")
public class ResourceAction extends IAction{	
	@Autowired
	private ResourceService resourceService;	
	private SysResourceType restype;
	
	public SysResourceType getRestype() {
		return restype;
	}
	public void setRestype(SysResourceType restype) {
		this.restype = restype;
	}
	private String htmlValue;
	public String getHtmlValue() {
		return htmlValue;
	}
	public void setHtmlValue(String htmlValue) {
		this.htmlValue = htmlValue;
	}
	/****************************************************************************************/
		
	/**
	 * 显示item列表
	 * @Title showResourceItemJson
	 * @throws IOException
	 * @author zpj
	 * @time 2020年5月23日 下午3:39:31
	 */
	@Action(value="resourceAction_showResourceItemJson",results={
			@Result(name="success",type="json", params={"root","htmlValue"})
	})
	public void showResourceItemJson() throws IOException{
		String pid = (request.getParameter("pid") == null || "".equals(request.getParameter("pid")))? request.getParameter("id") :request.getParameter("pid");
		htmlValue = resourceService.showResourceItemJson(pid);
		response.setCharacterEncoding("utf-8");//指定为utf-8
		response.getWriter().write(htmlValue);//转化为JSOn格式
	}
	
	
	/**
	 * 数据资源1级列表
	 */
	@Action(value="resourceAction_listLevel1",results={
			@Result(name="success",location="sys/resource/list.jsp"),
			@Result(name="error",location="/error.jsp")
	})
	public String toResourceList_(){
			return "success";
	}
	@Action(value="resourceAction_toList",results={
			@Result(name="success",location="sys/resource/resourceList1.jsp"),
			@Result(name="error",location="/error.jsp")
	})
	public String listLevel2(){
		try {
			//数据字典类别树
			String typeJson = resourceService.findTypeJson();
			request.setAttribute("typeJson", typeJson);
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
	

	/**
	 * 跳转至新增页面
	 * @return
	 */
	@Action(value="resourceAction_toAddRescource",results={
			@Result(name="success",location="sys/resource/toAddResource.jsp"),
			@Result(name="error",location="/error.jsp")
	})
	public String toAddRescource(){

		try {
			String id = request.getParameter("id");
			if(id!=null&&!"".equals(id)){
				restype = resourceService.findOneResById(Integer.parseInt(id)); 
				request.setAttribute("restype", restype);				
			}
			//获取已有的一级资源数据
			List<Object[]> typeList = resourceService.findTypeLevelOne(null,null,0);
			request.setAttribute("typeList",typeList);

			String pid = request.getParameter("pid");
			request.setAttribute("pid",pid);

			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
	
	/**
	 * 新增数据     
	 * @return
	 */
	@Action(value="resourceAction_doAddRescource",results={
			@Result(name="ajax",location="/ajax.jsp"),
			@Result(name="error",location="/error.jsp")
	})
	public String doAddRescource(){
		try {			
			int mainid = resourceService.saveResourceType(restype);			
            htmlValue = "{\"result\":true,\"id\":"+mainid+"}";
		} catch (Exception e) {
			e.printStackTrace();
			htmlValue="";			
		}
		return "ajax";

	}


	/**
	 * 查看数据
	 * @return
	 */
	@Action(value="resourceAction_viewRescource",results={
			@Result(name="success",location="sys/resource/viewResource.jsp"),
			@Result(name="error",location="/error.jsp")
	})
	public String viewRescource(){
		try {
			String id = request.getParameter("id");
			restype = resourceService.findOneResById(Integer.parseInt(id)); 
			request.setAttribute("restype", restype);	

			int parentid = restype.getParentTypeid();
			if(parentid!=0){
				//二级的查出上级数据类型名称
				restype = resourceService.findOneResById(parentid);
				request.setAttribute("parentName", restype.getTypeName());
			}

			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}

	
	/**
	 * 删除数据
	 * @return
	 */
	@Action(value="resourceAction_delRescource",results={
			@Result(name="success",location="/ajax.jsp")
	})
	public String delRescource(){
		try {
			String id = request.getParameter("id");
			//该数据下是否存在下级数据
			List<Object[]> list = resourceService.checkChildData(id);
			if(list!=null&&list.size()>0){
				htmlValue="2";
			}else{
				resourceService.delRescource(id);
				htmlValue="1";
			}	
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			htmlValue="0";
			return "error";
		}
	}


	/**
	 * 数据资源2级列表
	 */
	@Action(value="resourceAction_listLevel2",results={
			@Result(name="success",location="sys/resource/resourceList2.jsp"),
			@Result(name="error",location="/error.jsp")
	})
	public String toResourceList2(){
		try {
			String selectName = request.getParameter("selectName");
			String selectCode = request.getParameter("selectCode");

			if(!"".equals(selectName)){
				request.setAttribute("selectName",selectName);
			}
			if(!"".equals(selectCode)){
				request.setAttribute("selectCode",selectCode);
			}
			String pid = request.getParameter("pid");

			String page= request.getParameter("page");
			if (page == null || page.equals("")) {
				page = "1"; // 设置为第1页
			}
			// 查询每页记录条数,从参数设定表中获取
			int pageSize = 10;
			String pagesize = request.getParameter("pageSize");
			if(pagesize!=null&&!pagesize.equals("")){
				pageSize = Integer.parseInt(pagesize);
			}else{
				pageSize = Integer.parseInt(ArgsUtil.getPageSize()); // 默认值从系统参数里读取
			}
			// 分页查询
			this.resourceService.findResourceListLvTwo(request, selectName, selectCode,pid,page, pageSize);
			request.setAttribute("pid", pid);
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}


	/**
	 * 跳转至字典配置页面
	 * @return
	 */
	@Action(value="resourceAction_toSetDetail",results={
			@Result(name="success",location="sys/resource/toConfig.jsp"),
			@Result(name="error",location="/error.jsp")
	})
	public String toSetDetail(){
		try {
			//获取2级数据的id
			String pid = request.getParameter("pid");
			//构建字典数据树
			request.setAttribute("resourcejson",resourceService.findResourceItemJson(pid));

			request.setAttribute("pid", pid);

			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}


	/**
	 * 检查code唯一
	 * @return 1-有重复
	 */
	@Action(value="resourceAction_checkSametypecode",results={
			@Result(name="ajax",location="/ajax.jsp"),
			@Result(name="error",location="/error.jsp")
	})
	public String checkSametypecode(){		
		try {
			String typeid = request.getParameter("typeid");
			String typecode = request.getParameter("typecode");

			List<Object[]> list= resourceService.checkTypeCode(typeid,typecode);
			if(list!=null&&list.size()>0){
				htmlValue="1";
			}else{
				htmlValue="0";
			}					 
			return "ajax";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}		
	}


	/**
	 * 检查是否有下级数据，有就不能删除
	 * @return  1-有; 0-没有
	 */
	@Action(value="resourceAction_checkChildData",results={
			@Result(name="ajax",location="/ajax.jsp"),
			@Result(name="error",location="/error.jsp")
	})
	public String checkChildData(){		
		try {
			String id = request.getParameter("id");

			List<Object[]> list= resourceService.checkChildData(id);
			if(list!=null&&list.size()>0){
				htmlValue="1";
			}else{
				htmlValue="0";
			}					 
			return "ajax";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}		
	}


    /**
     * 修改数据字典
     * @return
     */
	@Action(value="resourceAction_changeResource",results={
			@Result(name="ajax",location="/ajax.jsp"),
			@Result(name="error",location="/error.jsp")
	})
	public String changeArea(){
		try {
			String code = request.getParameter("code");
			htmlValue = resourceService.findAreaInfoByParentitemid(code);

			return "ajax";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
	
	
	/**
	 * 新增数据( sys_resource_item )   
	 * @return
	 */
	@Action(value="resourceAction_doAddItem",results={
			@Result(name="ajax",location="/ajax.jsp"),
			@Result(name="error",location="/error.jsp")
	})
	public String doAddItem(){
		try {
			SysResourceItem resitem = new SysResourceItem();
			String id = request.getParameter("id");
			String itemName = request.getParameter("itemName");
			String itemCode = request.getParameter("itemCode");
			String itemnum = request.getParameter("itemnum");
			String parentItemid = request.getParameter("parentItemid");
			String typeid = request.getParameter("typeid");
			String isable = request.getParameter("isable");
			
			//检查code唯一
			
			List<Object[]> checklist= resourceService.checkTypeCode(id,itemCode);
			if(checklist!=null&&checklist.size()>0){
				htmlValue = "{\"result\":false}";
			}else{			
				if(id!=null&&!"".equals(id)){
					resitem.setId(Integer.parseInt(id));
				}			
				resitem.setItemName(itemName);
				resitem.setItemCode(itemCode);
				resitem.setItemOrder(Integer.parseInt(itemnum));
				if(parentItemid!=null&&!"".equals(parentItemid)){
					resitem.setParentItemid(Integer.parseInt(parentItemid));
				}
				if(typeid!=null&&!"".equals(typeid)){
				resitem.setTypeid(Integer.parseInt(typeid));
				}
				if(isable!=null&&!"".equals(isable)){
					resitem.setIsable(Integer.parseInt(isable));
				}else{
					resitem.setIsable(1);
				}
				
				int mainid = resourceService.saveItem(resitem);			
	            htmlValue = "{\"result\":true,\"id\":"+mainid+"}";
			}
		} catch (Exception e) {
			e.printStackTrace();
			htmlValue="";			
		}
		return "ajax";
	}

	
	/**
	 * 删除数据
	 * @return
	 */
	@Action(value="resourceAction_delItem",results={
			@Result(name="success",location="/ajax.jsp")
	})
	public String delItem(){
		try {
			String id = request.getParameter("id");
			//该数据下是否存在下级数据
			List<Object[]> list = resourceService.checkChildItemData(id);
			if(list!=null&&list.size()>0){
				htmlValue="2";
			}else{
				resourceService.delItem(id);
				htmlValue="1";
			}	
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			htmlValue="0";
			return "error";
		}
	}
	
	
	/**
	 * 获取类型下信息
	 * @throws IOException
	 */
	@Action(value="resourceAction_showItemTreeJson",results={
			@Result(name="success",type="json", params={"root","htmlValue"})
	})
	public void showItemTreeJson() throws IOException{
		String pid = request.getParameter("id");
		
		if(pid==null||"".equals(pid)){
			pid = "131"; //2465131
			StringBuffer str = new StringBuffer("");
			str.append("[{\"id\":\"").append(pid).append("\", \"text\":\"")
			.append("所有部门").append("\" ");
			str.append(", \"state\" : \"closed\",\"checked\":true}]");
			htmlValue = str.toString();
		}else{		
		  htmlValue = resourceService.showItemTreeJson(pid);
		}
		
		response.setCharacterEncoding("utf-8");//指定为utf-8
		response.getWriter().write(htmlValue);//转化为JSOn格式
	}

}

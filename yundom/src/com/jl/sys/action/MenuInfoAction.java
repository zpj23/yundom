package com.jl.sys.action;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.jl.common.IAction;
import com.jl.sys.pojo.DepartmentInfo;
import com.jl.sys.pojo.MenuInfo;
import com.jl.sys.service.MenuInfoService;

@Namespace("/")
@Scope("prototype")
@Component("jlMenuInfoAction")
@ParentPackage("json-default")
public class MenuInfoAction extends IAction {
	
	public MenuInfo menu;
	
	@Autowired
	public MenuInfoService jlMenuInfoService;
	
	
	public MenuInfo getMenu() {
		return menu;
	}

	public void setMenu(MenuInfo menu) {
		this.menu = menu;
	}

	/**
	 * 菜单展示
	 * @Title toList
	 * @return
	 * @author zpj
	 * @time 2016-6-15 下午4:40:29
	 */
	@Action(value="jlMenuInfoAction_toList",results={
			@Result(name="success",location="sys/menu/list.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toList(){
		return "success";
	}
	
	@Action(value="jlMenuInfoAction_toiframe",results={
			@Result(name="success",location="sys/menu/list_iframe.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String toiframe(){
		return "success";
	}
	
	
	/**
	 * 跳转新增
	 * @Title toAdd
	 * @return
	 * @author zpj
	 * @time 2016-4-22 下午1:31:30
	 */
	@Action(value="jlMenuInfoAction_toAdd",results={
			@Result(name="success",location="sys/menu/add.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String toAdd(){
		String id=request.getParameter("id");//当前节点id
		String pid=request.getParameter("pid");//父节点id
		menu=null;
		if(null!=id&&!"".equalsIgnoreCase(id)){//判断是否是新增还是编辑
			menu=jlMenuInfoService.findById(Integer.parseInt(id));
		}
		if(menu==null){//进则是新增
			menu=new MenuInfo();
			if(null!=pid&&!"".equalsIgnoreCase(pid)){
				MenuInfo d=jlMenuInfoService.findById(Integer.parseInt(pid));
				menu.setParentid(d.getId());
				menu.setParentname(d.getName());
			}
		}
		return "success";
	}
	
	/**
	 * 保存菜单信息(新增编辑都进)
	 * @Title saveMenu
	 * @return
	 * @author zpj
	 * @time 2016-4-22 下午2:22:20
	 */
	@Action(value="jlMenuInfoAction_saveMenu",
			results={
			@Result(type="json", params={"root","jsonData"})}
	)
	public void saveMenu(){
		int t=jlMenuInfoService.saveMenu(menu);
		try {
			this.jsonWrite(t);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 删除菜单
	 * @Title doRemove
	 * @author zpj
	 * @time 2016-4-22 下午2:26:23
	 */
	@Action(value="jlMenuInfoAction_doRemove",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void doRemove(){
		String id=request.getParameter("id");
		int t=0;
		if(id!=null&&!id.equalsIgnoreCase("")){
			MenuInfo dp=jlMenuInfoService.findById(Integer.parseInt(id));
			if(dp!=null){
				t=jlMenuInfoService.remove(dp);
			}
		}
		try {
			this.jsonWrite(t);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 查询子菜单
	 * @Title showChildNode
	 * @author zpj
	 * @time 2016-4-22 下午2:28:05
	 */
	@Action(value="jlMenuInfoAction_showChildNode",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void showChildNode(){
		String id=request.getParameter("id");
		String name = request.getParameter("name");
		Map<String,String> param=new HashMap<String,String>();
		param.put("name", name);
		param.put("id", id);
		if(id!=null&&!id.equalsIgnoreCase("")){
			this.jsonData = jlMenuInfoService.findJson(param);
		}else{
			this.jsonData=jlMenuInfoService.findTopJson();
		}
		try {
			this.jsonWrite(jsonData);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	@Action(value="jlMenuInfoAction_showCheckTree",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void showCheckTree(){
		String checkids=request.getParameter("checkids");
		Map<String,String> param=new HashMap<String,String>();
		param.put("checkids", checkids);
		this.jsonData=jlMenuInfoService.findAllJson(checkids);
		try {
			this.jsonWrite(jsonData);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	@Action(value="jlMenuInfoAction_toChoosePic",results={
			@Result(name="success",location="sys/menu/pic.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String jlMenuInfoAction_toChoosePic(){
		
		return "success";
	}
	
}

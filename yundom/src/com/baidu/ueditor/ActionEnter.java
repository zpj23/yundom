package com.baidu.ueditor;

import com.baidu.ueditor.define.ActionMap;
import com.baidu.ueditor.define.BaseState;
import com.baidu.ueditor.define.State;
import com.baidu.ueditor.hunter.FileManager;
import com.baidu.ueditor.hunter.ImageHunter;
import com.baidu.ueditor.upload.Uploader;
import com.jl.util.DBManager;
import com.jl.util.DateHelper;

import java.util.Map;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

public class ActionEnter 
{
  private HttpServletRequest request = null;

  private String rootPath = null;
  private String contextPath = null;

  private String actionType = null;

  private ConfigManager configManager = null;
   
//  @Autowired
//  private UploadfileHibernate uploadfileDao;
  
  private DBManager DbaObj;
    
  public ActionEnter(HttpServletRequest request, String rootPath)
  {
    this.request = request;
    this.rootPath = rootPath;
    this.actionType = request.getParameter("action");
    if("uploadfile".equals(actionType)){
    	 this.contextPath = request.getContextPath(); // "/sdww/uploadfileAction_uploadFile";
    }else{
    this.contextPath = request.getContextPath();
    }
    this.configManager = ConfigManager.getInstance(this.rootPath, this.contextPath, request.getRequestURI());
  }

  public String exec()
  {
    String callbackName = this.request.getParameter("callback");

    if (callbackName != null)
    {
      if (!validCallbackName(callbackName)) {
        return new BaseState(false, 401).toJSONString();
      }

      return callbackName + "(" + invoke() + ");";
    }

    return invoke();
  }

  public String invoke()
  {
    if ((this.actionType == null) || (!ActionMap.mapping.containsKey(this.actionType))) {
      return new BaseState(false, 101).toJSONString();
    }

    if ((this.configManager == null) || (!this.configManager.valid())) {
      return new BaseState(false, 102).toJSONString();
    }

    State state = null;

    int actionCode = ActionMap.getType(this.actionType);

    Map conf = null;

    switch (actionCode)
    {
    case 0:
      return this.configManager.getAllConfig().toString();
    case 1:
    case 2:
    case 3:
    case 4:
		try {
			conf = this.configManager.getConfig(actionCode);
		} catch (JSONException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
      state = new Uploader(this.request, conf).doExec();
      //插入数据库
      
      try {
    	  JSONObject a = new JSONObject(state.toString());    	  
    	  String tableid = request.getParameter("fileid");  //关联表主键
//    	  保存数据到数据库    	 
    	  DbaObj = new DBManager();    	 
    	  if(DbaObj.OpenConnection()){    		 
    	  String Sql = "insert into sys_uploadfile (FILE_NAME,ORIGINAL_NAME,FILE_TYPE,FILE_URL,FILE_SIZE,UPLOAD_TIME,TABLE_UUID) values (?,?,?,?,?,?,?)";
    	  PreparedStatement prestmt = null;
    	  prestmt = DbaObj.Conn.prepareStatement(Sql);
          prestmt.setString(1, a.get("title").toString());
          prestmt.setString(2, a.get("original").toString());
          prestmt.setString(3, a.get("type").toString().substring(1));//去除"."
          prestmt.setString(4, a.get("url").toString().substring(1));
          prestmt.setInt(5, Integer.parseInt(a.get("size").toString()));
          prestmt.setString(6,DateHelper.getToday("yyyy-MM-dd HH:mm:ss"));//DbaObj.GetDate()
          prestmt.setString(7, tableid);
          //prestmt.setInt(8, index);
          DbaObj.Conn.setAutoCommit(false);
          prestmt.execute();
          DbaObj.Conn.commit();
          prestmt.close();
    	  }
    	 
		} catch (Exception e) {
			e.printStackTrace();
		}
         finally {
	        DbaObj.CloseConnection();
	      }
      
      break;
    case 5:
		try {
			conf = this.configManager.getConfig(actionCode);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
      String[] list = this.request.getParameterValues((String)conf.get("fieldName"));
      state = new ImageHunter(conf).capture(list);
      break;
    case 6:
    case 7:
		try {
			conf = this.configManager.getConfig(actionCode);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
      int start = getStartIndex();
      state = new FileManager(conf).listFile(start);
    }

    return state.toJSONString();
  }

  public int getStartIndex()
  {
    String start = this.request.getParameter("start");
    try
    {
      return Integer.parseInt(start); } catch (Exception e) {
    }
    return 0;
  }

  public boolean validCallbackName(String name)
  {
    if (name.matches("^[a-zA-Z_]+[\\w0-9_]*$")) {
      return true;
    }

    return false;
  }
}
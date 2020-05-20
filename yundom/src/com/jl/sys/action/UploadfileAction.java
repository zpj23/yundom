package com.jl.sys.action;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.jl.common.ArgsUtil;
import com.jl.common.FileHelper;
import com.jl.common.IAction;
import com.jl.sys.pojo.SysUploadfile;
import com.jl.sys.service.UploadfileService;

@Namespace("/")
@Scope("prototype")
@Component("uploadfileAction")
@ParentPackage("json-default")
public class UploadfileAction extends IAction{     
	@Autowired
	private UploadfileService uploadfileService;	
		
	private File file;
	private String fileFileName;
	private String downName;
	private String downPath;

	public String getDownName() {
		return downName;
	}
	public void setDownName(String downName) {
		this.downName = downName;
	}
	public String getDownPath() {
		return downPath;
	}
	public void setDownPath(String downPath) {
		this.downPath = downPath;
	}
	public String getFileFileName() {
		return fileFileName;
	}
	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}
	public File getFile() {
		return file;
	}
	public void setFile(File file) {
		this.file = file;
	}
	private SysUploadfile uploadfile;

	public SysUploadfile getUploadfile() {
		return uploadfile;
	}
	public void setUploadfile(SysUploadfile uploadfile) {
		this.uploadfile = uploadfile;
	}
	private String htmlValue;	

	public String getHtmlValue() {
		return htmlValue;
	}
	public void setHtmlValue(String htmlValue) {
		this.htmlValue = htmlValue;
	}	
	
	/*********************************************************************************/
    /**
     * 上传页面
     */
	@Action(value="uploadfileAction_toUploadFile",results={
			@Result(name="success",location="sys/function/file2.jsp"),
			@Result(name="error",location="/error.jsp")
	})
	public String toUploadFile(){
		try {
			String modulename = request.getParameter("modulename");
			request.setAttribute("modulename",modulename);
			String tableuuid = request.getParameter("tableuuid");
			if(tableuuid==null||"".equals(tableuuid)){
				tableuuid = UUID.randomUUID().toString();
			}
			request.setAttribute("tableuuid",tableuuid);
			List<Object[]> fileList = uploadfileService.findCurFiles(tableuuid);
			fileList = changeFileList(fileList);

			request.setAttribute("fileList",fileList);

			//查看
			String isView = request.getParameter("isView");
			request.setAttribute("isView",isView);
			
			String imgurl= request.getParameter("imgurl");
			if(StringUtils.isEmpty(imgurl)){
				imgurl="js/EasyUI/EasyUI1.3.6/css/icons/application_side_tree.png";
				request.setAttribute("hide", true);
			}
			request.setAttribute("imgurl",imgurl);
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}

	
	/**
     * 上传页面
     */
	@Action(value="uploadfileAction_toUploadFile2",results={
			@Result(name="success",location="/file.jsp"),
			@Result(name="error",location="/error.jsp")
	})
	public String toUploadFile2(){
		try {
			String modulename = request.getParameter("modulename");
			request.setAttribute("modulename",modulename);
			String tableuuid = request.getParameter("tableuuid");
			if(tableuuid==null||"".equals(tableuuid)){
				tableuuid = UUID.randomUUID().toString();
			}
			request.setAttribute("tableuuid",tableuuid);			
			List<Object[]> fileList = uploadfileService.findCurFiles(tableuuid);
			fileList = changeFileList(fileList);

			request.setAttribute("fileList",fileList);

			//查看
			String isView = request.getParameter("isView");
			request.setAttribute("isView",isView);
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}


	/**
	 * 上传附件(菜单)
	 * @return
	 */
	@Action(value="uploadfileAction_uploadFileMenu",results={
			@Result(name="success",location="sys/function/file3.jsp"),
			@Result(name="error",location="/error.jsp")
	})
	public String uploadFileMenu(){
		//模块类型
		String modulename = "menuimg";
		//业务表与附件表相关联的字段有系统自动生成的uuid
		/*String tableuuid = uploadfile.getTableUuid();
		request.setAttribute("modulename",modulename);
		request.setAttribute("tableUuid",tableuuid);*/
		try {   		 
			String fileurl = uploadfileService.uploadFile(request, file, fileFileName, modulename, null/*tableuuid*/);   		 
			/*List<Object[]> fileList = uploadfileService.findCurFiles(tableuuid);
			fileList = changeFileList(fileList);
			request.setAttribute("fileList",fileList);*/
			request.setAttribute("pictureurl", fileurl);
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}


	@Action(value="uploadfileAction_uploadFile",results={
			@Result(name="success",type="json", params={"root","htmlValue"})
	})
	public String uploadFile(){
		try {
			String mode = request.getParameter("mode");
			String moduleType = request.getParameter("moduleType");
			String moduleID = request.getParameter("moduleID");
			
			uploadfileService.saveFile(request, uploadify, mode, moduleType, moduleID,this.uploadifyFileName,this.uploadifyContentType);
			
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
	
	
	@Action(value="uploadfileAction_uploadFileImportdata",results={
			@Result(name="success",type="json", params={"root","jsonData"})
	})
	public void uploadFileImportdata(){
		try {
			String mode = request.getParameter("mode");
			String moduleType = request.getParameter("moduleType");
			String moduleID = request.getParameter("moduleID");
			
			jsonData =uploadfileService.saveFile(request, uploadify, mode, moduleType, moduleID,this.uploadifyFileName,this.uploadifyContentType);
			this.jsonWrite(jsonData);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Action(value="uploadfileAction_getFiles",results={
			@Result(name="success",type="json", params={"root","htmlValue"})
	})
	public String getFiles(){
		try {
			String mode = request.getParameter("mode");
			String moduleType = request.getParameter("moduleType");
			String moduleID = request.getParameter("moduleID");
			if(moduleID==null||"".equals(moduleID)){
				htmlValue="[]";
			}else{
			List<SysUploadfile>  listFiles = uploadfileService.getFiles(moduleType, moduleID);

			Gson gson = new Gson();
			htmlValue = gson.toJson(listFiles);
			}
			response.setCharacterEncoding("utf-8");//指定为utf-8
			//response.getWriter().write(htmlValue);//转化为JSOn格式
			//this.jsonWrite(listFiles);
			
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
	
	@Action(value="uploadfileAction_getAttFiles",results={
			@Result(name="success",type="json", params={"root","htmlValue"})
	})
	public String getAttFiles(){
		try {
			String mode = request.getParameter("mode");
			String moduleType = request.getParameter("moduleType");
			String moduleID = request.getParameter("moduleID");
			if(moduleID==null||"".equals(moduleID)){
				htmlValue="[]";
			}else{
			List<SysUploadfile>  listFiles = uploadfileService.getFiles(moduleType, moduleID);
			List<SysUploadfile> attfiles = new ArrayList<SysUploadfile>();
			for(SysUploadfile file  : listFiles){
				if(!uploadfileService.checkIsImage(file.getFileUrl())){
					attfiles.add(file);
				}
			}
			Gson gson = new Gson();
			htmlValue = gson.toJson(attfiles);
			}
			response.setCharacterEncoding("utf-8");//指定为utf-8
			//response.getWriter().write(htmlValue);//转化为JSOn格式
			//this.jsonWrite(listFiles);
			
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
	

	// 获得工程发布路径
	public static String getFileBasePath() {
		return ServletActionContext.getServletContext().getRealPath("/").replaceAll("\\\\", "/");
	}


	// 附件下载
	/*@Action(value="uploadfileAction_downLoadFile")
	public void downLoadFile() {
		request.setAttribute("uploadfile", uploadfile);
		String path = getFileBasePath() + uploadfile.getFileUrl();
		FileHelper.downloadFile(path, uploadfile.getOriginalName(), response);
	}*/
	
	@Action(value="uploadfileAction_downLoadFile")
	public void downLoadFile() {
		//request.setAttribute("uploadfile", uploadfile);
		String id = request.getParameter("id");
		SysUploadfile file = uploadfileService.getFile(Integer.parseInt(id.trim()));
		String path = ArgsUtil.getUploadPath()+ file.getFileUrl();
//		String path = getFileBasePath()+ file.getFileUrl();
		
		//path = path.replaceAll("", "/");
		FileHelper.downloadFile(path, file.getOriginalName(), response);
	}


	// 附件删除
	@Action(value="uploadfileAction_delFile",results={
			@Result(name="success",type="json", params={"root","htmlValue"})
	})
	public String delFile() {
		try {
			String id = request.getParameter("id");
			uploadfileService.deleteFile(Integer.parseInt(id));
			
			//String names = request.getParameter("dfile");
			//String[] str = names.split(",");
			/*String filePathAndName = getFileBasePath() + uploadfile.getFileUrl();
			int i = uploadfileService.deleteFile(uploadfile.getId());

			boolean bea = false;

			String filePath = filePathAndName;
			File myDelFile = new File(filePath);
			if (myDelFile.exists()) {
				myDelFile.delete();
				bea = true;
			} else {
				bea = false;
			}

			List<Object[]> fileList = uploadfileService.findCurFiles(uploadfile.getTableUuid());
			fileList = changeFileList(fileList);
			request.setAttribute("fileList",fileList);

			String modulename = uploadfile.getModuleName();			
			String tableuuid = uploadfile.getTableUuid();
			request.setAttribute("modulename",modulename);
			request.setAttribute("tableuuid",tableuuid);*/
			
			htmlValue = "1";
			response.setCharacterEncoding("utf-8");//指定为utf-8
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}


	/**
	 * 获取一个uuid
	 * @return
	 */
	@Action(value="uploadfileAction_findUuid",results={
			@Result(name="ajax",location="/ajax.jsp"),
			@Result(name="error",location="/error.jsp")
	})
	public String findUuid(){
		try {			
			htmlValue = UUID.randomUUID().toString();			
			return "ajax";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}


	public List<Object[]> changeFileList(List<Object[]> fileList){
		if(fileList!=null&&fileList.size()>0){
			for(int i=0;i<fileList.size();i++){
				if( fileList.get(i)[2].toString().endsWith(".png")||
						fileList.get(i)[2].toString().endsWith(".jpeg")||
						fileList.get(i)[2].toString().endsWith(".jpg")||
						fileList.get(i)[2].toString().endsWith(".gif")||
						fileList.get(i)[2].toString().endsWith(".bmp")){

				}
				else if(fileList.get(i)[2].toString().endsWith(".doc")||
						fileList.get(i)[2].toString().endsWith(".docx")){
					fileList.get(i)[5]="images/file/Word.png";
				}
				else if(fileList.get(i)[2].toString().endsWith(".ppt")||
						fileList.get(i)[2].toString().endsWith(".pptx")){
					fileList.get(i)[5]="images/file/PowerPoint.png";
				}
				else if(fileList.get(i)[2].toString().endsWith(".xls")||
						fileList.get(i)[2].toString().endsWith(".xlsx")){
					fileList.get(i)[5]="images/file/Excel.png";
				}
				else if(fileList.get(i)[2].toString().endsWith(".rar")||
						fileList.get(i)[2].toString().endsWith(".zip")){
					fileList.get(i)[5]="images/file/rar.ico";
				}else{
					fileList.get(i)[5]="images/file/default.png";
				}
			}
		}		
		return fileList;
	}
	
	/**
	 * 图片预览
	* @Description: TODO(这里用一句话描述这个方法的作用)
	* @param @return    id
	* @return String    返回类型
	* @throws
	 */
	@Action(value="uploadfileAction_viewImages")
	public String viewImages() {
		String id = request.getParameter("id");
		SysUploadfile file = uploadfileService.getFile(Integer.parseInt(id.trim()));
		String path = ArgsUtil.getUploadPath()+ file.getFileUrl();
//		String path = getFileBasePath()+ file.getFileUrl();
		
        HttpServletResponse response = null;
        ServletOutputStream out = null;
        try {
            response = ServletActionContext.getResponse();
            response.setContentType("multipart/form-data");
            out = response.getOutputStream();
            
            File ff = new File(path);
            if(ff.exists()){
	    		FileInputStream fips = new FileInputStream(ff);  
	            byte[] btImg = readStream(fips);  
	            
	            out.write(btImg);
            }
            out.flush();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (out != null) {
                try {
                    out.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            if (response != null) {
                try {
                    //response.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

        }
        return null;
    }
	
	
	@Action(value="uploadfileAction_getFilesUrl",results={
			@Result(name="success",type="json", params={"root","htmlValue"})
	})
	public String getFilesUrl(){
		try {
			String mode = request.getParameter("mode");
			String moduleType = request.getParameter("moduleType");
			String moduleID = request.getParameter("moduleID");
			if(moduleID==null||"".equals(moduleID)){
				htmlValue="[]";
			}else{
				htmlValue = uploadfileService.getFilesUrl(request, moduleID);
			}
			response.setCharacterEncoding("utf-8");//指定为utf-8
			//response.getWriter().write(htmlValue);//转化为JSOn格式
			//this.jsonWrite(listFiles);
			
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
	
	/** 
     * 读取管道中的流数据 
     */  
    private byte[] readStream(InputStream inStream) {  
        ByteArrayOutputStream bops = new ByteArrayOutputStream();  
        int data = -1;  
        try {  
            while((data = inStream.read()) != -1){  
                bops.write(data);  
            }  
            return bops.toByteArray();  
        }catch(Exception e){  
            return null;  
        }  
    }  
	
	public File getUploadify() {
		return uploadify;
	}
	public void setUploadify(File uploadify) {
		this.uploadify = uploadify;
	}
	public String getUploadifyFileName() {
		return uploadifyFileName;
	}
	public void setUploadifyFileName(String uploadifyFileName) {
		this.uploadifyFileName = uploadifyFileName;
	}
	public String getUploadifyContentType() {
		return uploadifyContentType;
	}
	public void setUploadifyContentType(String uploadifyContentType) {
		this.uploadifyContentType = uploadifyContentType;
	}
	
	private File uploadify;
	private String uploadifyFileName;
	private String uploadifyContentType;

	
	
	
	
	
	
	
	
	/****************************************附件管理******************************************************/
	
//	@Action(value="uploadfileAction_toFileJson",results={
//			@Result(name="success",type="json", params={"root","htmlValue"})
//	})
//	public void toFileJson() throws IOException{	
//		String filename =request.getParameter("filename");
//		String modelname = request.getParameter("modelname");
//		String pageIndex = request.getParameter("page");
//		if (pageIndex == null || pageIndex.equals("")) {
//			page = 1; // 设置为第1页
//		}
//		htmlValue = uploadfileService.findFileJson(filename,modelname,page,rows);
//		response.setCharacterEncoding("utf-8");//指定为utf-8
//		response.getWriter().write(htmlValue);//转化为JSOn格式
//	}
	
	
	/**
	 * 用户信息列表
	 */
	@Action(value="uploadfileAction_toList",results={
			@Result(name="success",location="sys/file/fileList.jsp"),
			@Result(name="error",location="/error.jsp")
	})
	public String toList() throws Exception{
			return "success";
	}
	
	/**
	 * 用户信息列表
	 */
	@Action(value="uploadfileAction_toView",results={
			@Result(name="success",location="sys/file/viewFile.jsp"),
			@Result(name="error",location="/error.jsp")
	})
	public String toView() throws Exception{
		String id = request.getParameter("id");		
		request.setAttribute("id",id);
		return "success";
	}
	
	
	
}

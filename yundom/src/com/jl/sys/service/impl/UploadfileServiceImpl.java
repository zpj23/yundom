package com.jl.sys.service.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.jl.common.BaseService;
import com.jl.common.FileHelper;
import com.jl.sys.dao.UploadfileHibernate;
import com.jl.sys.pojo.SysUploadfile;
import com.jl.sys.service.UploadfileService;


@Service
@Component("uploadfileService")
public class UploadfileServiceImpl extends BaseService<SysUploadfile> implements UploadfileService{
	@Autowired
	private UploadfileHibernate uploadfileDao;
	public UploadfileServiceImpl() {
		super();
	}
	
	/**************************************************************************************************/

	/**
	 * 上传
	 */
	@Override
	public String uploadFile(HttpServletRequest request,File file,String fileFileName,String modulename,String tableuuid){
		try{
			//上传文件
			FileHelper fileHelper = new FileHelper();
			String paths = ServletActionContext.getServletContext().getRealPath("/images")+"/"+"/"+modulename+"/";

			String fileUrl = "";
			int fileSize=0;

			if (file != null) {
				File fpath = new File( paths);
				if(!fpath.exists() && !fpath.isDirectory()){
					fileHelper.createfiles(paths);
					fileUrl ="images/"+"/"+"/"+modulename+"/"+ fileFileName;
				}else {
					fileUrl ="images/"+"/"+"/"+modulename+"/"+ fileFileName;
				}
				fileSize =FileHelper.copyFile(file, request.getSession().getServletContext().getRealPath(fileUrl));

			}
			String fileurl = "images"+"/"+modulename+"/"+ fileFileName;

			/*SysUploadfile fi = new SysUploadfile();
			fi.setOriginalName(fileFileName); //文件原始名称
			fi.setFileUrl(fileUrl);
			fi.setFileSize(fileSize); //文件大小
			fi.setFileType(fileFileName.substring(fileFileName.lastIndexOf(".")+1)); //文件类型
			fi.setTableUuid(tableuuid);
			fi.setModuleName(modulename);
			fi.setUploadTime(new Date());
			uploadfileDao.save(fi);*/

			return fileurl;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}


	@Override
	public String uploadFile2(HttpServletRequest request,File file,String fileFileName,String modulename){
		try{
			//上传文件
			FileHelper fileHelper = new FileHelper();
			String paths = ServletActionContext.getServletContext().getRealPath("/upload")+"/"+"/"+modulename+"/";

			String fileUrl = "";
			int fileSize=0;

			if (file != null) {
				File fpath = new File( paths);
				if(!fpath.exists() && !fpath.isDirectory()){
					fileHelper.createfiles(paths);
					fileUrl ="upload/"+"/"+"/"+modulename+"/"+ fileFileName;
				}else {
					fileUrl ="upload/"+"/"+"/"+modulename+"/"+ fileFileName;
				}
				fileSize =FileHelper.copyFile(file, request.getSession().getServletContext().getRealPath(fileUrl));

			}
			String fileurl = "upload"+"/"+modulename+"/"+ fileFileName;

			return fileurl;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public String saveFile(HttpServletRequest request,File file,String mode,String moduleType,String moduleID,String fileName,String contentType) throws Exception{

		String saveFilePath = "";
		String filePath = "";
		/*String UploadUrl = ArgsUtil.getUploadPath();//从配置文件读取		
		//构建目录
        if (!FileUploadUtils.isFilePathExist(UploadUrl + FormatDateTime.toYear(new Date())))
        {
        	FileUploadUtils.mkDirectory(UploadUrl + FormatDateTime.toYear(new Date()));
        }
        if(!FileUploadUtils.isFilePathExist(UploadUrl + FormatDateTime.toYear(new Date())+ "/" + FormatDateTime.toMonth(new Date())))
        {
        	FileUploadUtils.mkDirectory(UploadUrl + FormatDateTime.toYear(new Date())+ "/" + FormatDateTime.toMonth(new Date()));
        }        
        if(!FileUploadUtils.isFilePathExist(UploadUrl + FormatDateTime.toYear(new Date()) + "/"+ FormatDateTime.toMonth(new Date())+ "/" + FormatDateTime.toDay(new Date()) ))
        {
        	FileUploadUtils.mkDirectory(UploadUrl + FormatDateTime.toYear(new Date())+ "/" + FormatDateTime.toMonth(new Date()) + "/" + FormatDateTime.toDay(new Date()) );
        }
        filePath = FormatDateTime.toYear(new Date())+ "/" + FormatDateTime.toMonth(new Date()) + "/" + FormatDateTime.toDay(new Date())+ "/";
        saveFilePath = UploadUrl +filePath;*/
		FileHelper fileHelper = new FileHelper();
		String paths = ServletActionContext.getServletContext().getRealPath("/upload") + "/" + "/" + moduleType + "/";
		String fileUrl = "";
		int fileSize = 0;			
		if (file != null) {
			File fpath = new File(paths);
			if (!fpath.exists() && !fpath.isDirectory()) {
				fileHelper.createfiles(paths);
				fileUrl = "upload/" + "/" + "/" + moduleType + "/"+fileName;
						//+ FileHelper.getToFileName(fileName);
			} else {
				fileUrl = "upload/" + "/" + "/" + moduleType + "/"+fileName;
						//+ FileHelper.getToFileName(fileName);
			}
		}
        saveFilePath = fileUrl;
        
		//上传到目录 
        //FileUploadUtils.upload(fileName, saveFilePath, file);
        fileSize = FileHelper.copyFile(file, request.getSession()
				.getServletContext().getRealPath(fileUrl));
        
		//保存到数据库
        SysUploadfile fi = new SysUploadfile();
		fi.setOriginalName(fileName); //文件原始名称
		//fi.setFileUrl(filePath+fileName);
		//fi.setFileSize(Integer.parseInt(FileUploadUtils.getFileSizes(file)+"")); //文件大小
		
		fi.setFileUrl(saveFilePath);
		fi.setFileSize(fileSize);
		
		if(fileName.contains(".")){
			fi.setFileType(fileName.substring(fileName.lastIndexOf(".")+1)); //文件类型
		}
		fi.setTableUuid(moduleID);
		fi.setModuleName(moduleType);
		fi.setUploadTime(new Date());
		uploadfileDao.save(fi);
		
		return fileUrl;
	}
	
	@Override
	public List<SysUploadfile> getFiles(String moduleType, String moduleID) {
		SysUploadfile queryModal = new SysUploadfile();
		queryModal.setModuleName(moduleType);
		queryModal.setTableUuid(moduleID);
		return uploadfileDao.getFiles(queryModal);
	}
	
	@Override
	public SysUploadfile getFile(Integer id) {
		return uploadfileDao.getEntity(id);
	}

	/**
	 * 查询当前的附件
	 * @param tableuuid
	 * @return
	 */
	@Override
	public List<Object[]> findCurFiles(String tableuuid) {	
		/*List<Object[]> list = uploadfileDao.findCurFiles(tableuuid);
		return list;*/
		return null;
	}

	public static String getFileBasePath() {
		return ServletActionContext.getServletContext().getRealPath("/")
				.replaceAll("\\\\", "/");
	}
    /**
     * 删除
     * @param id
     * @return
     */
	@Override
	public int deleteFile(Integer id) {
		//删除文件夹内容
		String UploadUrl = getFileBasePath();//ArgsUtil.getUploadPath();
		SysUploadfile uploadFile = uploadfileDao.getEntity(id);
		
		//删除数据里记录
		uploadfileDao.delete(uploadFile);
				
//		FileUploadUtils.delFile(UploadUrl+uploadFile.getFileUrl());		
		/*SysUploadfile uf;
		try {
			uf = uploadfileDao.getEntity(id);
			uploadfileDao.delete(uf);
		} catch (Exception e) {
			e.printStackTrace();
		}*/
		return 0;
	}

	

	
	@Override
	public SysUploadfile findFileByTableid(String tableid) {
		String hql= " from SysUploadfile where tableUuid = '"+tableid+"' ";
		List<SysUploadfile> list = uploadfileDao.findByHql(hql, null);
		if(list!=null&&list.size()>0){
			return list.get(0);
		}
		return null;
	}
	
	@Override
	public List<SysUploadfile> findFilesByTableid(String tableid) {
		String hql= " from SysUploadfile where tableUuid = '"+tableid+"' order by uploadTime";
		List<SysUploadfile> list = uploadfileDao.findByHql(hql, null);
		if(list!=null&&list.size()>0){
			return list;
		}
		return null;
	}


	public void saveFile(String title,String originalname,String type,String url,int size,String tableid){
		 SysUploadfile fi = new SysUploadfile();
	  		fi.setOriginalName(originalname); //文件原始名称  		
	  		fi.setFileUrl(url);
	  		fi.setFileSize(size);
	  		fi.setFileType(type); //文件类型
	  		fi.setUploadTime(new Date());
	  		fi.setTableUuid(tableid);
	  		uploadfileDao.save(fi);
	}

	@Override
	public String getFilesUrl(HttpServletRequest request, String moduleID) {
		String hql= " from SysUploadfile where tableUuid = '"+moduleID+"' order by uploadTime";
		
		StringBuilder json = new StringBuilder();
		List<SysUploadfile> list = uploadfileDao.findByHql(hql, null);
		List<SysUploadfile> imagefiles = new ArrayList<SysUploadfile>();
		if(list != null){
			for(SysUploadfile file  : list){
				if(checkIsImage(file.getFileUrl())){
					imagefiles.add(file);
				}
			}
		}
		if(imagefiles != null && imagefiles.size() > 0){
			json.append("[");
			for(SysUploadfile file : imagefiles){
					json.append("{");
					String path = "//"+ file.getFileUrl();
			        String requestUrl_ = request.getRequestURL().toString();//获取请求地址
			        String contextPath_ = request.getContextPath();//获取项目名称
			        String imgUrl_ = requestUrl_.substring(0,requestUrl_.lastIndexOf(contextPath_)) + contextPath_ + path;//拼接图片相对路径
			        json.append("\"url\":").append("\"").append(imgUrl_).append("\"");
			        json.append("},");
			}
			json.delete(json.toString().length()-1, json.toString().length());
			json.append("]");
		}
		else{
			json.append("[]");
		}
		return json.toString();
	}
	
	@Override
	public boolean checkIsImage(String fileUrl){
		if(fileUrl.endsWith(".png") || fileUrl.endsWith(".jpeg") || fileUrl.endsWith(".jpg")
				|| fileUrl.endsWith(".gif") || fileUrl.endsWith(".bmp"))
			return true;
		return false;
	}


}
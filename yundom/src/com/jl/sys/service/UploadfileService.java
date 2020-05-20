package com.jl.sys.service;

import java.io.File;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.jl.sys.pojo.SysUploadfile;


public interface UploadfileService {

	//上传
	public String uploadFile(HttpServletRequest request,File file,String fileFileName,String modulename,String tableuuid);
	
	//上传
	public String uploadFile2(HttpServletRequest request,File file,String fileFileName,String modulename);
	
	public String saveFile(HttpServletRequest request,File file,String mode,String moduleType,String moduleID,String fileName,String contentType) throws Exception;
	
	public List<SysUploadfile> getFiles(String moduleType,String moduleID);
	
	public SysUploadfile getFile(Integer id);
	
	//查询当前的附件
	public List<Object[]> findCurFiles(String tableuuid);
	
	//删除
	public int deleteFile(Integer id);

//	public String findFileJson(String filename, String modelname, Integer page,
//			Integer rows);

	public SysUploadfile findFileByTableid(String fileid);

	public List<SysUploadfile> findFilesByTableid(String fileid);

	public String getFilesUrl(HttpServletRequest request, String moduleID);
	
	public boolean checkIsImage(String fileUrl);
}

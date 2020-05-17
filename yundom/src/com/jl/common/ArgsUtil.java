package com.jl.common;

import java.util.ResourceBundle;

public class ArgsUtil {

	private static ResourceBundle rb ;
	private static ResourceBundle rb2 ;

	public static void init(){
		try {
			rb = ResourceBundle.getBundle("args");
			rb2 = ResourceBundle.getBundle("system");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static String getCodeValue(String prefix) {
		return rb.getString(prefix);
	} 
	
	public static String getCodeValue2(String prefix) {
		return rb2.getString(prefix);
	} 

	public static String getPageSize() {
		return getCodeValue("pagesize");
	}

	public static String getUploadPath(){
		return getCodeValue("uploadpath");
	}

	public static String getPageList() {
		return getCodeValue("pagelist");
	}
	
	public static String getConnUrl() {
		return getCodeValue2("jdbc.default.url");
	}
	public static String getConnDrive() {
		return getCodeValue2("jdbc.default.driverClassName");
	}
	
	public static String getConnUser() {
		return getCodeValue2("jdbc.default.username");
	}
	
	public static String getConnPwd() {
		return getCodeValue2("jdbc.default.password");
	}
	
}


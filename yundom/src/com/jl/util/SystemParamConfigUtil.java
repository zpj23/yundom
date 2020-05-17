package com.jl.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Hashtable;
import java.util.Map;
import java.util.Properties;

 
/**
 * @Description: TODO(读取properties文件)
 * @author Lee 
 * @date 2014-2-11 上午9:56:38
 */
public final class SystemParamConfigUtil {
	 
	public synchronized static String getParamValueByParam(String param){
		if (sysParamMap == null) {
			initSmsParam();
		}
		String result = sysParamMap.get(param.toUpperCase());
		return  result;
	}
	
	private SystemParamConfigUtil(){
		
	}
	
	private static Map<String,String> sysParamMap = null;
	
	private static void initSmsParam() {
		String fileName = SystemParamConfigUtil.class.getResource("/")+  "system.properties";
		int n = fileName.lastIndexOf("/");
		InputStream in = SystemParamConfigUtil.class.getResourceAsStream(fileName.substring(n));
		Properties pps = new Properties();
		
		try {
			pps.load(in);
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		Object[] obj = pps.keySet().toArray();

		sysParamMap = new Hashtable<String, String>();
		for(int i=0;i<obj.length;i++){
			String key = (String)obj[i];
			String value = (String)pps.get(obj[i]);
			sysParamMap.put(key.toUpperCase(),value);
		}
	}
}

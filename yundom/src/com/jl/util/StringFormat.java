package com.jl.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

/**
 * @Description: TODO(String类型转换)
 * @author Lee 
 * @date 2014-2-11 上午10:50:09
 */
public class StringFormat {
	public static Double toDouble(String s) {
		try {
			double d = Double.parseDouble(s);
			return new Double(d);
		} catch (Exception e) {
			return null;
		}
	}
	
	public static Float toFloat(String s) {
		try {
			float f = Float.parseFloat(s);
			return new Float(f);
		} catch (Exception e) {
			return null;
		}
	}
	
	public static Long toLong(String s) {
		try {
			long l = Long.parseLong(s);
			return new Long(l);
		} catch (Exception e) {
			return null;
		}
	}
	
	public static Integer toInteger(String s) {
		try {
			int i = Integer.parseInt(s);
			return new Integer(i);
		} catch (Exception e) {
			return null;
		}
	}
	
	public static Byte toByte(String s) {
		try {
			byte b = Byte.parseByte(s);
			return new Byte(b);
		} catch (Exception e) {
			return null;
		}
	}
	
	public static String StringFilter(String str) throws PatternSyntaxException {
       if(str!=null&&!str.equalsIgnoreCase("")){
    	   String regEx= SystemParamConfigUtil.getParamValueByParam("regString");
    	   Pattern p = Pattern.compile(regEx);
    	   Matcher m = p.matcher(str);
    	   return m.replaceAll("").trim();
       }else{
    	   return "";
       }
    }
	
	
	public static double getVersion(){
	    String lv=SystemParamConfigUtil.getParamValueByParam("APPVERSION");
	    return toDouble(lv);
	}

}

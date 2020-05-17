package com.jl.common;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * @Description: TODO(MD5加密)
 * @author Lee 
 * @date 2014-2-11 上午9:39:38
 */
public class MD5 {
	
	public static String str;

	public static String md5s(String plainText) {
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(plainText.getBytes());
			byte b[] = md.digest();

			int i;

			StringBuffer buf = new StringBuffer("");
			for (int offset = 0; offset < b.length; offset++) {
				i = b[offset];
				if (i < 0)
					i += 256;
				if (i < 16)
					buf.append("0");
				buf.append(Integer.toHexString(i));
			}
			str = buf.toString();
			//System.out.println("result: " + buf.toString());// 32位的加密
			return buf.toString();
			// System.out.println("result: " + buf.toString().substring(8,
			// 24));// 16位的加密
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			return "error";
		}
	}

}
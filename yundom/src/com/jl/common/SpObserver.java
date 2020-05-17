package com.jl.common;

/**
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Lee 
 * @date 2014-2-11 下午1:17:21
 */
public class SpObserver {
	private static ThreadLocal local = new ThreadLocal();

	public static void putSp(String sp) {
		local.set(sp);
	}

	public static String getSp() {
		return (String)local.get();
	}
}
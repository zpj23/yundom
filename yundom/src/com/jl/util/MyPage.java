package com.jl.util;

import java.util.List;

public class MyPage {

	
	public List<?> data;
	
	public int total;

	
	

	public List<?> getData() {
		return data;
	}

	public void setData(List<?> data) {
		this.data = data;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}
	public MyPage(){
		
	}
	public MyPage(List<?> data, int total) {
		super();
		this.data = data;
		this.total = total;
	}
	
	
	
}

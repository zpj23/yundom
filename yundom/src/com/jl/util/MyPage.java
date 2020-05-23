package com.jl.util;

import java.util.List;

public class MyPage {

	
	public List<?> rows;
	
	public int total;

	

	public List<?> getRows() {
		return rows;
	}

	public void setRows(List<?> rows) {
		this.rows = rows;
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
		this.rows = data;
		this.total = total;
	}
	
	
	
}

package com.jl.util;

public enum Role {
	ZUZHANG("ROLE_1464940613464"),CHEJIANZHUREN("ROLE_1591942865846"), RENSHI("ROLE_1591943568817"), ADMIN("ROLE_1462257894696");
	
	private  String role;
	private Role(String role){
		this.role=role;
	}
	public String getRole(){
		return this.role;
	}
	
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return this.role;
	}
}

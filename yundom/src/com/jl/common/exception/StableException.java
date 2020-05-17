package com.jl.common.exception;

public class StableException extends Exception{
	private static final long serialVersionUID = 1L;
	
	
	private StableCode stableCode = null;
	public enum StableCode {
		
		aa("test","系统异常"),
		mial_nosend("mosend","没有发送者");
		
		private String code; 
	    private String name;
		private StableCode(String code, String name) {  
	        this.code = code; 
	        this.name = name;  
	    }  
		
		public String getCode() {
			return code;
		}
		
		public String getName() {
			return name;
		}
	}
	
	
	
	
	/**
    * 构造函数
    * 
    * @param arg0
    *            错误类型标识
    */
   public StableException(StableCode stableCode) {
       super(getExcMessage(stableCode));
       this.stableCode = stableCode;
   }
   
   
	/**
    * 根据错误类型标识获取错误信息
    * 
    * @param emFlag
    *            错误类型标识
    * 
    * @return 错误信息
    */
   public static String getExcMessage(StableCode stableCode) {
       return stableCode.getName();
   }
	
   
	
	
	 /**
    * 构造函数
    * 
    * @param arg0
    *            错误类型标识
    *            
    * @param arg1
    *            被包含的异常对象
    */
   public StableException(StableCode stableCode, Throwable throwable) {
       super(getExcMessage(stableCode), throwable);
       setStackTrace(throwable.getStackTrace());
       this.stableCode = stableCode;
   }
   
   
   /**
    * 构造函数
    * 
    * @param arg0
    *            被包含的异常对象
    */
   public StableException(Throwable throwable) {
       super(getExcMessage(throwable.getClass() == StableException.class ? ((StableException) throwable).stableCode : StableCode.aa), throwable);
       setStackTrace(throwable.getStackTrace());
       if (throwable.getClass() == StableException.class)
       	stableCode = ((StableException) throwable).stableCode;
       else
       stableCode = StableCode.aa;
   }


	
	
	
	/*public static void main(String[] args) {
		System.out.println(test.aa.getCode());
		System.out.println(test.aa.getName());
	}*/

}

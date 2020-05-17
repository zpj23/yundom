package com.test.proxy;

public class ProxyTest {
	public static void main(String[] args) {
		Proxy proxy=new Proxy();
		proxy.request();
	}
}
interface Subject{
	void request();
}
class RealSubject implements Subject{

	@Override
	public void request() {
		System.out.println("访问真实主题方法");
	}
	
}
class Proxy implements Subject{

	private RealSubject realSubject;
	
	@Override
	public void request() {
		if(realSubject==null){
			realSubject=new RealSubject();
		}
		System.out.println("访问真实主题之前的预处理。");
		realSubject.request();
		System.out.println("访问真实主题之后的后续处理。");
		// TODO Auto-generated method stub
		
	}
	
}
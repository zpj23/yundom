package com.test.prototype;

import java.util.HashMap;
import java.util.Scanner;

public interface Shape extends Cloneable{
	public Object clone();
	public void countArea();
	
}
class Circle implements Shape{
	
	public Object clone() {
		Circle c=null;
		try {
			c=(Circle)super.clone();
		} catch (CloneNotSupportedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return c;
	}
	
	@Override
	public void countArea() {
		int r=0;
        System.out.print("这是一个圆，请输入圆的半径：");
        Scanner input=new Scanner(System.in);
        r=input.nextInt();
        System.out.println("该圆的面积="+3.1415*r*r+"\n");
	}
	
}

class Square implements Shape{

	@Override
	public void countArea() {
		int a=0;
        System.out.print("这是一个正方形，请输入它的边长：");
        Scanner input=new Scanner(System.in);
        a=input.nextInt();
        System.out.println("该正方形的面积="+a*a+"\n");
	}
	@Override
	public Object clone(){
		Square s=null;
		try {
			s=(Square)super.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		
		return s;
	}
	
}
class ProtoTypeManager{
	 private HashMap<String, Shape>ht=new HashMap<String,Shape>(); 
	 public ProtoTypeManager()
	    {
	        ht.put("Circle",new Circle());
	           ht.put("Square",new Square());
	    } 
	 public void addshape(String key,Shape obj)
	    {
	        ht.put(key,obj);
	    }
	    public Shape getShape(String key)
	    {
	        Shape temp=ht.get(key);
	        return (Shape) temp.clone();
	    }
}


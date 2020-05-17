package com.jl.util.fs;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

import org.junit.Test;

import com.jl.sys.pojo.SgxmInfo;

public class Alunbar {
	
	public String tf1="卡尔哈哈";
	public int tf2=100;
	private String tf3="卡尔呵呵";
	
	public Alunbar() {
		// TODO Auto-generated constructor stub
	}
	public Alunbar(Integer m) {
		System.out.println("通过Integer参数的构造函数创建对象");
		// TODO Auto-generated constructor stub
	}
	public Alunbar(String m) {
		System.out.println("通过String参数的构造函数创建对象");
		// TODO Auto-generated constructor stub
	}
	
	public void test1(){
		
	}
	
	private void test2(String s){
		
	}
	
	private String test3(String s){
		System.out.println("调用方法test3，参数为:"+s);
		return s;
	}
	
	public static void test4(Integer i){
		System.out.println("调用静态方法test4,参数为："+i);
	}
	
	public static void main(String[] args) throws InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException, NoSuchMethodException, SecurityException, NoSuchFieldException {
		Class alunbarclass=Alunbar.class;
		System.out.println(alunbarclass.getName());//获取全限定名（包名+类名）
		System.out.println(alunbarclass.getSimpleName());//类名
		System.out.println(alunbarclass.getModifiers());//获取类的修饰符
		System.out.println(Modifier.isPublic(alunbarclass.getModifiers()));//判断是哪种修饰符
		System.out.println(alunbarclass.getPackage());//包路径
		Class oclass=alunbarclass.getSuperclass();//获取父类class对象
//		System.out.println(oclass.getName());//获取全限定名（包名+类名）
//		System.out.println(oclass.getSimpleName());//类名
		Class[] interfaces = alunbarclass.getInterfaces();// 返回指定类所实现的接口，不包括父类实现的。
		Constructor[] c=  alunbarclass.getConstructors();//返回构造函数 的数组
		Constructor c1=alunbarclass.getConstructor(new Class[]{String.class});
		System.out.println(c1);
		Class[] paramtype=c1.getParameterTypes();
		System.out.println(paramtype);
		//通过获取的构造函数创建对应的对象
		Alunbar a=(Alunbar)(alunbarclass.getConstructor(new Class[]{String.class})).newInstance("jaldj");
		Alunbar b=(Alunbar)(alunbarclass.getConstructor(new Class[]{Integer.class})).newInstance(1);
			
		System.out.println(a);
		System.out.println(b);
		
		//获取该对象声明的成员方法public 修饰的
		Method[] m=alunbarclass.getMethods();
		System.out.println(m);
		
		//只能获取声明的成员方法，父类的不行
		//获取该对象声明的所有的成员方法 所有
		Method[] m1=alunbarclass.getDeclaredMethods();
		System.out.println(m1);
		Method m2=alunbarclass.getMethod("test1", null);
		System.out.println(m2);
		Method m3=alunbarclass.getDeclaredMethod("test2", new Class[]{String.class});
		System.out.println("返回方法的信息"+m3);
		Class[] m3c=m3.getParameterTypes();
		System.out.println("返回方法的参数信息"+m3c);
		Method m4=alunbarclass.getDeclaredMethod("test3", new Class[]{String.class});
		Class t=m4.getReturnType();
		System.out.println("返回方法返回的参数信息"+t);
		//调用方法invoke方法有两个参数，第一个参数是要调用方法的对象，上面的代码中就是Bird的对象，第二个参数是调用方法要传入的参数。如果有多个参数，则用数组。
		m4.invoke(c1.newInstance("hah1"), "今天天气真好");
		//如果调用的是static方法，invoke()方法第一个参数就用null代替
		Method m5=alunbarclass.getMethod("test4",new Class[]{Integer.class});
		m5.invoke(null, 10);
//		Alunbar.printGettersSetters(SgxmInfo.class);
		Field[] f=alunbarclass.getFields();//所有public修饰的成员变量
		Field[] f1=alunbarclass.getDeclaredFields();//所有成员变量
		System.out.println("public修饰的成员变量"+f);
		System.out.println("所有成员变量"+f1);
		Field f3=alunbarclass.getField("tf1");
		System.out.println("获取某一个成员变量"+f3);
		Field f4=alunbarclass.getDeclaredField("tf3");
		System.out.println("获取私有的某一个成员变量"+f4);
		Field f5=alunbarclass.getDeclaredField("tf2");
//		Object type=f3.getType();
//		System.out.println(type);
//		Object type1=f5.getType();
//		System.out.println(type);
//		f3.set(type, "卡尔您好");
//		System.out.println(f3.get("tf1"));
		
//		Modifier.isAbstract(int modifiers)
//		 Modifier.isFinal(int modifiers)
//		 Modifier.isInterface(int modifiers)
//		 Modifier.isNative(int modifiers)
//		 Modifier.isPrivate(int modifiers)
//		 Modifier.isProtected(int modifiers)
//		 Modifier.isPublic(int modifiers)
//		 Modifier.isStatic(int modifiers)
//		 Modifier.isStrict(int modifiers)
//		 Modifier.isSynchronized(int modifiers)
//		 Modifier.isTransient(int modifiers)
//		 Modifier.isVolatile(int modifiers)

		
	}
	//使用反射可以在运行时检查和调用类声明的成员方法，可以用来检测某个类是否有getter和setter方法。
	//getter和setter是java bean必须有的方法。
	//getter和setter方法有下面的一些规律： getter方法以get为前缀，无参，有返回值 setter方法以set为前缀，有一个参数，返回值可有可无.
	public static void printGettersSetters(Class aClass){
	  Method[] methods = aClass.getMethods();
	  for(Method method : methods){
	    if(isGetter(method)) System.out.println("getter: " + method);
	    if(isSetter(method)) System.out.println("setter: " + method);
//	    System.out.println(method);
	  }
	  System.out.println("over");
	}

	public static boolean isGetter(Method method){
	  if(!method.getName().startsWith("get"))      return false;
	  if(method.getParameterTypes().length != 0)   return false;  
	  if(void.class.equals(method.getReturnType()))  
			  return false;
	  return true;
	}

	public static boolean isSetter(Method method){
	  if(!method.getName().startsWith("set")) return false;
	  if(method.getParameterTypes().length != 1) return false;
	  return true;
	}
	
	
	
	@Test
	public void test(){
		
	}
}

package com.jl.util;

import java.sql.*;
import java.text.*;
import java.util.*;

import com.jl.common.ArgsUtil;


/**  
 * @Description: TODO(用一句话描述该文件做什么)
 * @author ljn  
 * @date 2014-4-11 下午1:02:37
 */
public class DBManager {
	public String ClassString=null;
	  public String ConnectionString=null;
	  public String UserName=null;
	  public String PassWord=null;

	  public Connection Conn;
	  public Statement Stmt;


	  public DBManager() {


	    //For ODBC
	    //ClassString="sun.jdbc.odbc.JdbcOdbcDriver";
	    //ConnectionString=("jdbc:odbc:DBDemo");
	    //UserName="dbdemo";
	    //PassWord="dbdemo";


	    //For Access Driver
	    //ClassString="sun.jdbc.odbc.JdbcOdbcDriver";
	    //ConnectionString=("jdbc:odbc:Driver={MicroSoft Access Driver (*.mdb)};DBQ=C:\\dbdemo.mdb;ImplicitCommitSync=Yes;MaxBufferSize=512;MaxScanRows=128;PageTimeout=5;SafeTransactions=0;Threads=3;UserCommitSync=Yes;").replace('\\','/');

	    //For SQLServer Driver
	    //ClassString="com.microsoft.jdbc.sqlserver.SQLServerDriver";
	    //ConnectionString="jdbc:microsoft:sqlserver://127.0.0.1:1433;DatabaseName=DBDemo;User=dbdemo;Password=dbdemo";
	    //UserName="dbdemo";
	    //PassWord="dbdemo";

	    //For Oracle Driver
	    ClassString=ArgsUtil.getConnDrive();//"oracle.jdbc.driver.OracleDriver";
	    ConnectionString= ArgsUtil.getConnUrl();//"jdbc:oracle:thin:@192.168.1.149:1521:Core";
	    UserName=ArgsUtil.getConnUser();//"goldenweb";
	    PassWord=ArgsUtil.getConnPwd(); //"1";

	    //For Oracle Driver
	    /*ClassString="oracle.jdbc.driver.OracleDriver";
	    ConnectionString="jdbc:oracle:thin:@192.168.18.200:1521:jjwl";
	    UserName="jjwl";
	    PassWord="jjwl"; */


	    //For MySQL Driver
	    //ClassString="org.gjt.mm.mysql.Driver";
	    //ConnectionString="jdbc:mysql://localhost/softforum?user=...&password=...&useUnicode=true&characterEncoding=8859_1";
	    //ClassString="com.mysql.jdbc.Driver";
	    //ConnectionString="jdbc:mysql://localhost/dbstep?user=root&password=&useUnicode=true&characterEncoding=gb2312";

	    //For Sybase Driver
	    //ClassString="com.sybase.jdbc.SybDriver";
	    //ConnectionString="jdbc:sybase:Tds:localhost:5007/tsdata"; //tsdata为你的数据库名
	    //Properties sysProps = System.getProperties();
	    //SysProps.put("user","userid");
	    //SysProps.put("password","user_password");
	    //If using Sybase then DriverManager.getConnection(ConnectionString,sysProps);
	  }

	  public boolean OpenConnection()
	  {
	   boolean mResult=true;
	   try
	   {
	     Class.forName(ClassString);
	     if ((UserName==null) && (PassWord==null))
	     {
	       Conn= DriverManager.getConnection(ConnectionString);
	     }
	     else
	     {
	       Conn= DriverManager.getConnection(ConnectionString,UserName,PassWord);
	     }

	     Stmt=Conn.createStatement();
	     mResult=true;
	   }
	   catch(Exception e)
	   {
	     System.out.println(e.toString());
	     mResult=false;
	   }
	   return (mResult);
	  }

	  //关闭数据库连接
	  public void CloseConnection()
	  {
	   try
	   {
	     Stmt.close();
	     Conn.close();
	   }
	   catch(Exception e)
	   {
	     System.out.println(e.toString());
	   }
	  }

	  public String GetDateTime()
	  {
	   Calendar cal  = Calendar.getInstance();
	   SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	   String mDateTime=formatter.format(cal.getTime());
	   return (mDateTime);
	  }

	  public  java.sql.Date  GetDate()
	  {
	    java.sql.Date mDate;
	    Calendar cal  = Calendar.getInstance();
	    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
	    String mDateTime=formatter.format(cal.getTime());
	    return (java.sql.Date.valueOf(mDateTime));
	  }	  

	  public int GetMaxID(String vTableName,String vFieldName)
	  {
	   int mResult=0;
	   String mSql=new String();
	   DBManager DbaObj=new DBManager();
	   mSql = "select max("+vFieldName+")+1 as MaxID from " + vTableName;
	   if (DbaObj.OpenConnection())
	   {
	     try
	     {
	       ResultSet result=DbaObj.ExecuteQuery(mSql);
	       if (result.next())
	       {
	         mResult=result.getInt("MaxID");
	       }
	       if (mResult==0) mResult=1;
	       //System.out.println(String.valueOf(mResult));
	       result.close();
	     }
	     catch(Exception e)
	     {
	       System.out.println(e.toString());
	     }
	     DbaObj.CloseConnection();
	   }
	   return (mResult);
	 }

	  public ResultSet ExecuteQuery(String SqlString)
	  {
	    ResultSet result=null;
	    try
	    {
	      result=Stmt.executeQuery(SqlString);
	    }
	    catch(Exception e)
	    {
	      System.out.println(e.toString());
	    }
	    return (result);
	  }

	  public int ExecuteUpdate(String SqlString)
	  {
	    int result=0;
	    try
	    {
	      result=Stmt.executeUpdate(SqlString);
	    }
	    catch(Exception e)
	    {
	      System.out.println(e.toString());
	    }
	    return (result);
	  }
}

package com.jl.common;

import com.jl.util.SystemParamConfigUtil;

/**
 * @Description: TODO(常量类)
 * @author Lee 
 * @date 2014-2-11 上午9:51:03
 */
public class Constant {
	
	/**
	 * 日期格式-年
	 */
	public static String TOYEAR = "yyyy";
	
	/**
	 * 日期格式-月
	 */
	public static String TOMONTH = "MM";
	
	/**
	 * 日期格式-日
	 */
	public static String TODAY = "dd";
	
	/**
	 * 日期格式-年月
	 */
	public static String TOYEARMONTH = "yyyy-MM";
	
	/**
	 * 日期格式-年月日
	 */
	public static String TOSHORTFORMAT = "yyyy-MM-dd";
	
	/**
	 * 日期格式-年月日时分秒
	 */
	public static String TOFULLFORMAT = "yyyy-MM-dd HH:mm:ss";
	
	/**
	 * 日期格式-月日
	 */
	public static String TOMONTHDAYFORMAT = "MM-dd";
	
	/**
	 * 日期格式-时分秒
	 */
	public static String TOTIMEFORMAT = "HH:mm:ss";

	/**
	 * 对应Map<String, Object>中的key，Step
	 */
	public static String STEP = "STEP";

	/**
	 * 对应Map<String, Object>中的key，Steps
	 */
	public static String STEPS = "STEPS";

	/**
	 * 对应Map<String, Object>中的key，Process
	 */
	public static String PROCESS = "PROCESS";

	/**
	 * 此Key对应 List<String> instanceIds
	 */
	public static String INSTANCEIDS = "INSTANCEIDS";
	
	/**
	 * 此Key对应 List<String> toUserIds
	 */
	public static String TO_USERIDS = "TO_USERIDS";

	/**
	 * 此Key对应 List<String> processIds
	 */
	public static String PROCESSIDS = "PROCESSIDS";
	
	/**
	 * session的Map<String, Object>中的key，webInfos--本user对应的List<WebInfo>
	 */
	public static String WEBINFOS = "webInfos";
	
	/**
	 * 对应Map<String, Object>中的key，userId--本user的Id
	 */
	public static String USER_ID = "userId";
	
	/**
	 * 对应Map<String, Object>中的key，userName--本user的name
	 */
	public static String USER_NAME = "userName";
	
	/**
	 * 对应Map<String, Object>中的key，logName--本user的登录名
	 */
	public static String LOG_NAME = "logName";
	
	/**
	 * 对应Map<String, Object>中的key，departmentId--本user对应的部门Id
	 */
	public static String DEPARTMENT_ID = "departmentId";
	
	/**
	 * 对应Map<String, Object>中的key，departmentName--本user对应的部门name
	 */
	public static String DEPARTMENT_NAME = "departmentName";
	
	/**
	 * 对应Map<String, Object>中的key，webIds--本user对应部门所对应的webIds
	 */
	public static String WEB_IDS = "webIds";
	
	/**
	 * 对应Map<String, Object>中的key，webId--本user对应部门所对应的webId
	 */
	public static String WEB_ID = "webId";
	
	/**
	 * 对应Map<String, Object>中的key，deparmentIds--本user对应部门所对应的webId对应的几个部门Id
	 */
	public static String DEPARMENT_IDS = "deparmentIds";
	
	/**
	 * 对应Map<String, Object>中的key，deparmentNames--本user对应部门所对应的webId对应的几个部门Name
	 */
	public static String DEPARMENT_NAMES = "deparmentNames";
	
	/**
	 * 对应Map<String, Object>中的key，deps--对应的部门,selectTreeService.getInfos方法返回中用到
	 */
	public static String DEPS = "deps";
	
	/**
	 * 对应Map<String, Object>中的key，emps--对应的人员,selectTreeService.getInfos方法返回中用到
	 */
	public static String EMPS = "emps";

	/**
	 * 本步已经处理好，用于判断一个步骤是否处理好
	 */
	public static String OVER = "OVER";

	/**
	 * 本步没有处理好，用于判断一个步骤是否处理好
	 */
	public static String NOT_OVER = "NOT_OVER";

	/**
	 * 表示是save操作
	 */
	public static String SAVE = "SAVE";

	/**
	 * 表示是update操作
	 */
	public static String UPDATE = "UPDATE";

	/**
	 * 降序排列
	 */
	public static String DESC = "DESC";

	/**
	 * 升序排列
	 */
	public static String ASC = "ASC";
	
	/**
	 * 对应Map<String, Object>中的key，doc
	 */
	public static String DOCS = "docs";

	/**
	 * Process的属性，表示本流程未结束
	 */
	public static long PROCESS_NOT_END = 0;
	
	
	/**
	 * Process的属性，流程是否为代办自动处理
	 */
	public static long PROCESS_IS_PROXY = 3;
	
	/**
	 * Process的属性，表示本流程结束
	 */
	public static long PROCESS_END = 1;
	
	/**
	 * Process的属性，表示本流程结束
	 */
	public static long PROCESS_ZUOFEI = 2;
		
	/**
	 * 待办列表
	 */
	public static String TODO_LIST = "todoList";
	
	/**
	 * 办结列表
	 */
	public static String OVER_LIST = "overList";
	
	/**
	 * 节点类型，开始
	 */
	public static long STEP_TYPE_START = 0;
	
	/**
	 * 节点类型，并行
	 */
	public static long STEP_TYPE_BINGXING = 2;
	
	/**
	 * 节点类型，竞争
	 */
	public static long STEP_TYPE_JINGZHENG = 3;

	/**
	 * 节点类型，结束
	 */
	public static long STEP_TYPE_END = 9;
	
	/**
	 * 表示所有的情况
	 */
	public static final String ALL="ALL";
	/**
	 * 成功的的情况
	 */
	public static final String SUCCESS="SUCCESS";

	/**
	 * 异常的情况
	 */
	public static final String EXCEPTION = "EXCEPTION";

	/**
	 * 失败的情况
	 */
	public static final String FAIL="FAIL";
	
	//登陆后放到session 中的用户id
	public static final String SESSION_USER_ID="userId";
	
	//登陆后放到session 中的用户名称
	public static final String SESSION_USER_NAME="userName";
	
	 
		/**
		 * @Title getSystemInfo
		 * @Description TODO(<br>确定是什么操作系统，并返回相应的后缀<br>Windows操作系统返回 WIN<br>Linux操作系统返回 LNX<br>)
		 * @return String
		 * @author Lee
		 * @time 2014-2-11 上午9:54:50
		 */
		public static String getSystemInfo() {
			String osName = System.getProperty("os.name");
			if (osName == null) {
				return "WIN";
			}
			if (osName.toLowerCase().indexOf("win") != -1) {
				// 如果是window 操作系统
				return "WIN";
			} else {
				// 如果是其他的系统
				return "LNX";
			}
		}
	 
		/**
		 * @Title getAttachmentPath
		 * @Description TODO(得到上传正文文档附件保存的基路径)
		 * @return String
		 * @author Lee
		 * @time 2014-2-11 上午9:54:37
		 */
		public static String getAttachmentPath() {
			String os = getSystemInfo();

			// 读取配置文件中的属性
			/**
			 * 在Winodows系统服务器上储存附件的基路径<br>
			 * 全部路径为：ATTACACHMENT_PATH + 附件名<br>
			 */
			String ATTACACHMENT_PATH_WIN = SystemParamConfigUtil
					.getParamValueByParam("");
			/**
			 * 在Linux系统服务器上储存附件的基路径<br>
			 * 全部路径为：ATTACACHMENT_PATH + 附件名<br>
			 */
			String ATTACACHMENT_PATH_LNX = SystemParamConfigUtil
					.getParamValueByParam("");

			if (os.equals("WIN")) {
				return ATTACACHMENT_PATH_WIN;
			} else if (os.equals("LNX")) {
				return ATTACACHMENT_PATH_LNX;
			} else {
				return ATTACACHMENT_PATH_WIN;
			}
		} 
		
		/**
		 * @Title getAttachmentExtPath
		 * @Description TODO(得到上传附件文档附件保存的基路径)
		 * @return String
		 * @author Lee
		 * @time 2014-2-11 上午9:54:16
		 */
		public static String getAttachmentExtPath() {
			String os = getSystemInfo();

			// 读取配置文件中的属性
			/**
			 * 在Winodows系统服务器上储存附件的基路径<br>
			 * 全部路径为：ATTACACHMENT_PATH + 附件名<br>
			 */
			String ATTACACHMENT_PATH_WIN = SystemParamConfigUtil
					.getParamValueByParam("");
			/**
			 * 在Linux系统服务器上储存附件的基路径<br>
			 * 全部路径为：ATTACACHMENT_PATH + 附件名<br>
			 */
			String ATTACACHMENT_PATH_LNX = SystemParamConfigUtil
					.getParamValueByParam("");

			if (os.equals("WIN")) {
				return ATTACACHMENT_PATH_WIN;
			} else if (os.equals("LNX")) {
				return ATTACACHMENT_PATH_LNX;
			} else {
				return ATTACACHMENT_PATH_WIN;
			}
		}
		
		/**
		 * 服务器操作系统的编码
		 * 
		 * @return
		 * @throws ConfigurationException
		 */
		public static String getSysEncode() {
			String os = getSystemInfo();
			/**
			 * Winodows操作系统的编码 默认为GB2312
			 */
			String SYS_ENCODE_WIN = SystemParamConfigUtil.getParamValueByParam(
					"SYS_ENCODE_WIN");
			/**
			 * Linux操作系统的编码 默认为UTF-8
			 */
			String SYS_ENCODE_LNX = SystemParamConfigUtil.getParamValueByParam(
					"SYS_ENCODE_LNX");

			if (os.equals("WIN")) {
				return SYS_ENCODE_WIN;
			} else if (os.equals("LNX")) {
				return SYS_ENCODE_LNX;
			} else {
				return SYS_ENCODE_WIN;
			}
		}
	
}

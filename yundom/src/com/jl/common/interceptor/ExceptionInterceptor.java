package com.jl.common.interceptor;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.hibernate.HibernateException;

import com.jl.common.exception.AhCustomException;
import com.jl.common.exception.AhCustomException.ExcCode;
import com.jl.common.exception.StableException;
import com.jl.common.exception.StableException.StableCode;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;
/**
 * 错误权限拦截器，在struts.xml中配置
 *
 */
public class ExceptionInterceptor extends AbstractInterceptor{
	private Logger logger=Logger.getLogger(ExceptionInterceptor.class);
	private static final long serialVersionUID = -3490533736557683231L;
	private String excMessage="";
	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		String result;
		HttpServletRequest request = ServletActionContext.getRequest();
		String uri = request.getRequestURI();
		try {
			result = invocation.invoke();
		} catch (HibernateException e) {
			e.printStackTrace();
			logger.error("异常拦截器拦截到异常:"+"<br/>"+"uri为:"+uri+"<br/>"+e);
			excMessage=AhCustomException.getExcMessage(ExcCode.DataProcessing);
			request.setAttribute("msg", excMessage);
			result=Action.ERROR;
		}catch (NullPointerException e) {
			e.printStackTrace();
			logger.error("异常拦截器拦截到异常:"+"<br/>"+"action的名称为:"+uri+"<br/>"+e);
			excMessage=AhCustomException.getExcMessage(ExcCode.IllegalData);
			request.setAttribute("msg", excMessage);
			result=Action.ERROR;
		}catch (AhCustomException e) {
			e.printStackTrace();
			logger.error("异常拦截器拦截到异常:"+"<br/>"+"action的名称为:"+uri+"<br/>"+e);
			excMessage=e.getExcMessage();
			request.setAttribute("msg", excMessage);
			result=Action.ERROR;
		}catch (StableException e) {
			e.printStackTrace();
			logger.error("催办人不存在"+e);
			excMessage=StableException.getExcMessage(StableCode.mial_nosend);
			request.setAttribute("msg", excMessage);
			result=Action.ERROR;
		}catch (Exception e) {
			e.printStackTrace();
			logger.error("异常拦截器拦截到异常:"+"<br/>"+"action的名称为:"+uri+"<br/>"+e);
			excMessage=AhCustomException.getExcMessage(ExcCode.AppError);
			request.setAttribute("msg", excMessage);
			result=Action.ERROR;
		}	
		return result;
	}

}

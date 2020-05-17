package com.jl.common;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 * @ClassName: SpringContext
 * @Description: TODO(Spring上下文)
 * @author Lee
 * @date 2014-2-10 下午3:40:16
 */
@Component
public class SpringContext implements ApplicationContextAware {

    protected static ApplicationContext context;
    
    public static JdbcTemplate jdbcTemplate = null;
    
    @Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        context = applicationContext;
    }

    public static ApplicationContext getContext() {
        return context;
    }

    public static Object getBean(String name){
        return getContext().getBean(name);
    }
}
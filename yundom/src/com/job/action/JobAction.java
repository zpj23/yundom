package com.job.action;

import java.util.Map;

import org.quartz.DisallowConcurrentExecution;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;

import com.jl.common.IAction;
import com.job.dto.AutoJobDTO;
import com.job.service.TestService;
	
@DisallowConcurrentExecution
public class JobAction extends IAction implements Job{
	public StringBuilder loginInfo=new StringBuilder(1000);
	public StringBuilder pullInfo=new StringBuilder(1000);
	@Autowired  
	private TestService testService; 
    @Override  
    public void execute(JobExecutionContext arg0) throws JobExecutionException {  
        System.out.println("任务成功运行------");  
        AutoJobDTO detailInfo = (AutoJobDTO)arg0.getMergedJobDataMap().get("scheduleJob");  
        System.out.println("任务名称 = [" + detailInfo.getJob_name()+ "]");  
    }  
	  

}

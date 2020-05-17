package com.job.utils;

import java.text.ParseException;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.job.action.JobAction;
import com.job.dto.AutoJobDTO;

@Service("JobService")
public class JobService {
	@Autowired
    private JobManager jobManager;  
      
    public JobManager getJobManager() {  
        return jobManager;  
    }  
    public void setJobManager(JobManager jobManager) {  
        this.jobManager = jobManager;  
    }  
      
    /** 
     * 初始化定时任务 
     * @throws SchedulerException  
     * @throws ParseException 
     */  
    @PostConstruct
    public void loadJobInit() throws SchedulerException, ParseException{  
            System.out.println("init---");  
            //通过分组名+任务名
            AutoJobDTO job = new AutoJobDTO();  
            job.setJob_id("Id1");  
            job.setJob_group("linGroup");  
            job.setJob_name("Name1");  
            job.setJob_time("0/50 * * * * ?");  
            job.setJob_descr("测试任务");
            job.setJob_status(0);
            job.setJob_intervalInSeconds(0);
            job.setJob_repeatCount(0);
            jobManager.addJob(job, JobAction.class);  
            jobManager.startJobs();  
    }  
}

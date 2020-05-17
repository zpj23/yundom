package com.job.utils;

import java.text.ParseException;

import javax.annotation.Resource;

import org.quartz.CronScheduleBuilder;
import org.quartz.CronTrigger;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SimpleScheduleBuilder;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.TriggerKey;
import org.springframework.stereotype.Service;

import com.job.dto.AutoJobDTO;

@Service("jobManager")
public class JobManager {
	 /* 当初我初始化的是  SchedulerFactoryBean schedulerFactoryBean；  这样是注入不进去的 报下面的错 
    nested exception is org.springframework.beans.factory.BeanNotOfRequiredTypeException: 
    Bean named 'schedulerFactoryBean' must be of  
    type [org.springframework.scheduling.quartz.SchedulerFactoryBean],  
    but was actually of type [org.quartz.impl.StdScheduler>] 
    看spring源码可以知道，其实spring得到的是一个工厂bean，得到的不是它本身，而是它负责创建的org.quartz.impl.StdScheduler对象            所以要使用Scheduler对象 
 */  
 @Resource  
 private Scheduler scheduler ;  
   
 public Scheduler getScheduler() {  
     return scheduler;  
 }  

 public void setScheduler(Scheduler scheduler) {  
     this.scheduler = scheduler;  
 }  

 /** 
  * 添加一个定时任务 
 * @throws ParseException 
  */  
 public  void addJob(AutoJobDTO job,Class classz) throws SchedulerException, ParseException  {  
       //这里获取任务信息数据  
         TriggerKey triggerKey = TriggerKey.triggerKey(job.getJob_name(), job.getJob_group());  
         CronTrigger trigger = (CronTrigger) scheduler.getTrigger(triggerKey);  
         if(trigger==null){  
             System.out.println("trigger is null----");  
             //不存在，创建一个  
             JobDetail jobDetail = JobBuilder.newJob(classz).withIdentity(job.getJob_name(), job.getJob_group()).build();  
             jobDetail.getJobDataMap().put("scheduleJob", job);  
             //表达式调度构建器  
             //按新的cronExpression表达式构建一个新的trigger  
//             if(job.getJob_repeatCount()>0){//说明要重复调用多次
//            	 Trigger te = TriggerBuilder
//                         .newTrigger()
//                         .withIdentity(job.getJob_name(), job.getJob_group())
//                         .startNow()
//                         .withSchedule(SimpleScheduleBuilder.simpleSchedule()
//                                 .withIntervalInSeconds(job.getJob_intervalInSeconds()) //时间间隔
//                                 .withRepeatCount(job.getJob_repeatCount())        //重复次数(将执行6次)
//                                 )
//                         .build();
//            	 scheduler.scheduleJob(jobDetail,te);
//             }else{
            	 CronScheduleBuilder scheduleBuilder = CronScheduleBuilder.cronSchedule(job.getJob_time());  
            	 trigger = TriggerBuilder.newTrigger().withIdentity(job.getJob_name(), job.getJob_group()).withSchedule(scheduleBuilder).build();  
            	 scheduler.scheduleJob(jobDetail,trigger);  
//             }
         }else{  
             // Trigger已存在，那么更新相应的定时设置  
             //表达式调度构建器  
             CronScheduleBuilder scheduleBuilder = CronScheduleBuilder.cronSchedule(job.getJob_time());  
             //按新的cronExpression表达式重新构建trigger  
             trigger = trigger.getTriggerBuilder().withIdentity(triggerKey).withSchedule(scheduleBuilder).build();  
             //按新的trigger重新设置job执行  
             scheduler.rescheduleJob(triggerKey, trigger);  
         }  
 }  
 /** 
  * 启动所有定时任务 
  */  
 public  void startJobs() {  
     try {  
         scheduler.start();  
     } catch (Exception e) {  
         e.printStackTrace();  
         throw new RuntimeException(e);  
     }  
 }  
}

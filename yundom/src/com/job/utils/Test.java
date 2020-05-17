package com.job.utils;

import java.util.Date;

import org.quartz.Job;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.SimpleScheduleBuilder;
import org.quartz.SimpleTrigger;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;

public class Test implements Job{
	
	
	
	public Test(){
		
	}
	
	

	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		System.out.println(arg0.getJobDetail().getKey().getName()+">>"+arg0.getScheduledFireTime());
	}
	public static void main(String args[]) throws SchedulerException {
        JobDetail jobDetail= JobBuilder.newJob(Test.class).withIdentity("testJob_1","group_1").build();

        Trigger trigger= TriggerBuilder
                .newTrigger()
                .withIdentity("trigger_1","group_1")
                .startNow()
                .withSchedule(SimpleScheduleBuilder.simpleSchedule()
                        .withIntervalInSeconds(10) //时间间隔
                        .withRepeatCount(5)        //重复次数(将执行6次)
                        )
                .build();
        SchedulerFactory sf = new StdSchedulerFactory();
        Scheduler sched = sf.getScheduler();

        sched.scheduleJob(jobDetail,trigger);

        sched.start();

    }
	
	public String test1(){
		System.out.println("这个是test1");
		return "成功";
	}
	@org.junit.Test
	public String test2(){
		System.out.println("这个是test2");
		return "成功";
	}
	public String test3(){
		System.out.println("这个是test3");
		return "成功";
	}
	@org.junit.Test
	public void test4(){
		System.out.println("这个是test4");
	}

}

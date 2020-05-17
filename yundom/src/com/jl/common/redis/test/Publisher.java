package com.jl.common.redis.test;

import java.util.Date;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang.StringUtils;

import com.jl.common.redis.RedisSource;
import com.jl.common.redis.SerializationUtil;
import com.jl.sys.pojo.LogInfo;
import com.jl.sys.pojo.UserInfo;

import redis.clients.jedis.Jedis;

public class Publisher {
	 public static final String CHANNEL_KEY = "channel:message";
	    private Jedis jedis;
	 
	    public Publisher() {
	        jedis = RedisSource.getJedis();
	    }
	 
	    public void publishMessage(String message) {
	        if(StringUtils.isBlank(message)) {
	            return;
	        }
	        jedis.publish(CHANNEL_KEY, message);
	        System.out.println("发布频道："+CHANNEL_KEY+"。发布消息："+message);
	    }
//	    public void publishMessage(LogInfo log) {
//	        if(log==null) {
//	            return;
//	        }
//	        byte[] a=SerializationUtil.serialize(log);
//	        String msg1 = a.toString();
//	        jedis.publish(CHANNEL_KEY, log.getId());
//	        System.out.println("发布频道："+CHANNEL_KEY+"。发布消息："+log.getId());
//	    }
	 
	    public static void main(String[] args) {
	        Publisher publisher = new Publisher();
	        LogInfo loginfo=new LogInfo();
			loginfo.setId(UUID.randomUUID().toString());
			loginfo.setCreatetime(new Date());
			loginfo.setType("测试类型");
			loginfo.setDescription("测试描述");
			loginfo.setUserid(1);
			loginfo.setUsername("测试用户");
			
	        for(; ;) {
	        	publisher.publishMessage("12312312321");
	        	try {
					TimeUnit.SECONDS.sleep(10);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	        }
	        
	    }
}

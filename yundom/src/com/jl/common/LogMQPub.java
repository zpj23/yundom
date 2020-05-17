package com.jl.common;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang.StringUtils;

import com.jl.common.redis.RedisSource;
import com.jl.common.redis.SerializationUtil;
import com.jl.common.redis.test.Publisher;
import com.jl.sys.pojo.LogInfo;

import redis.clients.jedis.BinaryJedis;
import redis.clients.jedis.Jedis;

public class LogMQPub {
	public static final String CHANNEL_KEY = "channel:log";
    private Jedis jedis;
 
    public LogMQPub() {
        jedis = RedisSource.getJedis();
    }
 
    public void publishMessage(LogInfo loginfo) {
        if(loginfo==null) {
            return;
        }
        
        jedis.lpush("log".getBytes(), SerializationUtil.serialize(loginfo));
//        byte[]  by=jedis.rpop("log".getBytes());
//        LogInfo li2=(LogInfo)SerializationUtil.deserialize(by);
//        List<byte[]> nlist=jedis.brpop(0,"log".getBytes());
//        LogInfo li=(LogInfo)SerializationUtil.deserialize(nlist.get(1));
        jedis.publish(CHANNEL_KEY, "log");
        System.out.println("发布频道："+CHANNEL_KEY+"。发布消息："+"log");
    }
 
    public static void main(String[] args) {
    	LogMQPub lmg=new LogMQPub();
    	
        LogInfo loginfo=new LogInfo();
		loginfo.setId(UUID.randomUUID().toString());
		loginfo.setCreatetime(new Date());
		loginfo.setType("测试类型");
		loginfo.setDescription("测试描述");
		loginfo.setUserid(1);
		loginfo.setUsername("测试用户");
		
        for(; ;) {
        	lmg.publishMessage(loginfo);
        	try {
				TimeUnit.SECONDS.sleep(30);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }
        
    }
}

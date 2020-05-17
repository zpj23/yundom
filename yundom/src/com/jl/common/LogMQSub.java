package com.jl.common;

import java.util.Arrays;
import java.util.List;


import com.jl.common.redis.RedisSource;
import com.jl.common.redis.SerializationUtil;
import com.jl.sys.pojo.LogInfo;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPubSub;

public class LogMQSub {
	private Jedis jedis;
	private Jedis ljedis;
    private static final String EXIT_COMMAND = "exit";
 
    public LogMQSub() {
        jedis = RedisSource.getJedis();
        ljedis= RedisSource.getJedis();
    }
 
    public void subscribe(String ...channel) {
        if(channel == null || channel.length <= 0) {
            return;
        }
        //消息处理,接收到消息时如何处理
        JedisPubSub jps = new JedisPubSub() {
            /**
             * JedisPubSub类是一个没有抽象方法的抽象类,里面方法都是一些空实现
             * 所以可以选择需要的方法覆盖,这儿使用的是SUBSCRIBE指令，所以覆盖了onMessage
             * 如果使用PSUBSCRIBE指令，则覆盖onPMessage方法
             * 当然也可以选择BinaryJedisPubSub,同样是抽象类，但方法参数为byte[]
             */
            @Override
            public void onMessage(String channel, String message) {
                if(LogMQPub.CHANNEL_KEY.equals(channel)) {
                    System.out.println("接收到消息: channel : " + message);
                    handleMsg(message);
                    //接收到exit消息后退出
                    if(EXIT_COMMAND.equals(message)) {
                        System.exit(0);
                    }
 
                }
            }
 
            /**
             * 订阅时
             */
            @Override
            public void onSubscribe(String channel, int subscribedChannels) {
                if(LogMQPub.CHANNEL_KEY.equals(channel)) {
                    System.out.println("订阅了频道:" + channel);
                }
            }

			@Override
			public void onPMessage(String arg0, String arg1, String arg2) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void onPSubscribe(String arg0, int arg1) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void onPUnsubscribe(String arg0, int arg1) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void onUnsubscribe(String arg0, int arg1) {
				// TODO Auto-generated method stub
				
			}
        };
        //可以订阅多个频道 当前线程会阻塞在这儿
        jedis.subscribe(jps, channel);
    }
    
    
    public void handleMsg(String message){
    	if(message.equalsIgnoreCase("log")){
        	List<byte[]>  list= ljedis.brpop(0, message.getBytes());
        	LogInfo li=(LogInfo)SerializationUtil.deserialize(list.get(1));
        	System.out.println(li);
        }
    }
 
    public static void main(String[] args) {
        LogMQSub client = new LogMQSub();
        client.subscribe(LogMQPub.CHANNEL_KEY);
        //并没有 unsubscribe方法
        //相应的也没有punsubscribe方法
    }
}

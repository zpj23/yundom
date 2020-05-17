package com.jl.common.redis.test;

import java.util.List;

import com.jl.common.redis.RedisSource;

import redis.clients.jedis.Jedis;

public class Customer extends Thread{
	private String customerName;
    private volatile int count;
    private Jedis jedis;
 
    public Customer(String name) {
        this.customerName = name;
        init();
    }
 
    private void init() {
        jedis = RedisSource.getJedis();
    }
 
    public void processMessage() {
    	 /**
         * brpop支持多个列表(队列)
         * brpop指令是支持队列优先级的，比如这个例子中MESSAGE_KEY的优先级大于testKey（顺序决定）。
         * 如果两个列表中都有元素，会优先返回优先级高的列表中的元素，所以这儿优先返回MESSAGE_KEY
         * 0表示不限制等待，会一直阻塞在这儿
         */
        List<String> messages = jedis.brpop(0, Producer.MESSAGE_KEY, "testKey");
        if(messages.size() != 0) {
            //由于该指令可以监听多个Key,所以返回的是一个列表
            //列表由2项组成，1) 列表名，2)数据
            String keyName = messages.get(0);
            //如果返回的是MESSAGE_KEY的消息
            if(Producer.MESSAGE_KEY.equals(keyName)) {
                String message = messages.get(1);
                count++;
                handle(message);
            }
     
        }
        System.out.println("=======================");
    	
//        String message = jedis.rpop(Producer.MESSAGE_KEY);
//        if(message != null) {
//            count++;
//            handle(message);
//        }
    }
 
    public void handle(String message) {
    	
        System.out.println(customerName + " 正在处理消息,消息内容是: " + message + " 这是第" + count + "条");
    }
 
    @Override
    public void run() {
        while (true) {
            processMessage();
        }
    }
 
    public static void main(String[] args) {
        Customer customer = new Customer("yamikaze");
        customer.start();
    }
}

package com.test.thread;

import java.util.Queue;
import java.util.Random;

public class Producer implements Runnable {

	public Queue<Integer> queue=null;
	public int maxSize=0;
	
	public Producer(Queue<Integer> queue,int maxs) {
		// TODO Auto-generated constructor stub
		this.queue=queue;
		this.maxSize=maxs;
	}
	
	@Override
	public void run() {
		// TODO Auto-generated method stub
		while(true){
			synchronized (queue) {
				while(queue.size()==maxSize){
					System.out.println("queue is full");
					try {
						queue.wait();
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					
				}
				Integer i=new Random().nextInt();
				System.out.println("producer:"+i);
				queue.add(i);
				queue.notifyAll();
			}
		}
	}

}

package com.test.thread;

import java.util.Queue;

public class Comsumer implements Runnable{

	public Queue<Integer> queue=null;
	public int maxSize=0;
	
	public Comsumer(Queue<Integer> queue,int maxs) {
		// TODO Auto-generated constructor stub
		this.queue=queue;
		this.maxSize=maxs;
	}
	@Override
	public void run() {
		// TODO Auto-generated method stub
		while(true){
			synchronized (queue) {
				while(queue.size()==0){
					System.out.println("queue is empty");
					try {
						queue.wait();
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
				int m=queue.remove();
				System.out.println("Consumer"+m);
				queue.notifyAll();
			}
			
		}
	}

}

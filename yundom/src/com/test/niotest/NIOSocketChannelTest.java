package com.test.niotest;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;
import java.util.concurrent.TimeUnit;



public class NIOSocketChannelTest {
	
	public static void main(String[] args) {
		client();
	}
	
	public static void client(){
		ByteBuffer buffer=ByteBuffer.allocate(1024);
		SocketChannel socketChannel=null;
		try {
			socketChannel=SocketChannel.open();
			socketChannel.configureBlocking(false);//设置非阻塞方式的信道
			socketChannel.connect(new InetSocketAddress("192.168.11.96", 8080));
			if(socketChannel.finishConnect()){
				int i=0;
				while(true){
					TimeUnit.SECONDS.sleep(1);
					String info = "I'm "+i+++"-th information from client";
					buffer.clear();
					buffer.put(info.getBytes());//先读进去，然后再写出来
					buffer.flip();
					while(buffer.hasRemaining()){
						System.out.println(buffer);
						socketChannel.write(buffer);
					}
				}
			}
		}catch (InterruptedException e) {
			// TODO: handle exception
		}
		catch (IOException  e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
				try {
					if(socketChannel!=null)
						socketChannel.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}
	}
}

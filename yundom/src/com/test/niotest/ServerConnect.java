package com.test.niotest;


import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.Iterator;

public class ServerConnect {
	private static final int BUF_SIZE=1024;
	private static final int PORT=8080;
	private static final int TIMEOUT=3000;
	
	public static void main(String[] args) {
		selector();
	}
	
	public static void selector(){
		Selector selector=null;
		ServerSocketChannel ssc=null;
		try {
			selector=Selector.open();
			ssc=ServerSocketChannel.open();//打开server端的channel
			ssc.socket().bind(new InetSocketAddress(PORT));
			ssc.configureBlocking(false);//设置非阻塞方式
			ssc.register(selector, SelectionKey.OP_ACCEPT);
			while(true){
				if(selector.select(TIMEOUT)==0){
					System.out.println("等等======");
					continue;
				}
				Iterator<SelectionKey> iter=selector.selectedKeys().iterator();
				while(iter.hasNext()){
					SelectionKey key=iter.next();
					if(key.isAcceptable()){
						//已经可以接收信息
						handleAccept(key);
					}else if(key.isReadable()){
						//可以读取信息
						handleRead(key);
					}else if(key.isWritable()&&key.isValid()){
						//可以写信息了
						handleWrite(key);
					}
					if(key.isConnectable()){
						//还连接着
						System.out.println("isConnectable = true");
					}
					iter.remove();
				}
				
			}
			
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
				try {
					if(selector!=null)
						selector.close();
					if(ssc!=null)
						ssc.close();//关闭server端的channel
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}
	}
	
	public static void handleAccept(SelectionKey key) throws IOException{
		//SelectionKey.channel()方法返回的通道需要转型成你要处理的类型，如ServerSocketChannel或SocketChannel等。
		ServerSocketChannel ssc=(ServerSocketChannel)key.channel();
		SocketChannel sc=ssc.accept();
		sc.configureBlocking(false);
		sc.register(key.selector(), SelectionKey.OP_READ,ByteBuffer.allocate(BUF_SIZE));
	}
	
	public static void handleRead(SelectionKey key) throws IOException{
		SocketChannel sc=(SocketChannel)key.channel();
		ByteBuffer buff=(ByteBuffer)key.attachment();
		long byteread=sc.read(buff);
		while(byteread>0){
			buff.flip();
			while(buff.hasRemaining()){
				System.out.print((char)buff.get());
			}
			System.out.println("正在读取数据。。");
			buff.clear();
			byteread=sc.read(buff);
		}
		if(byteread==-1){
			sc.close();
		}
	}
	
	public static void handleWrite(SelectionKey key) throws IOException{
		ByteBuffer buff=(ByteBuffer)key.attachment();
		buff.flip();
		SocketChannel sc=(SocketChannel)key.channel();
		while(buff.hasRemaining()){
			sc.write(buff);
		}
		buff.compact();
	}
}

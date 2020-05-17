package com.test.niotest;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.channels.FileChannel;
import java.nio.charset.Charset;
import java.nio.charset.CharsetDecoder;


public class NIOFileChannelTest {
	
	public static void main(String[] args) {
//		NIOFileChannelTest.methods11();
		NIOFileChannelTest.methods2();
	}
	public static void methods11(){
		File dir = new File("D://temp.txt");//指定路径
        String charset=get_charset(dir);
		FileReader fi=null;
		BufferedReader br=null;
		try {
//			BufferedReader br=new BufferedReader(new InputStreamReader(new FileInputStream(new File("D://temp.txt")),"UTF-8"));
			StringBuffer sb=new StringBuffer(200);
			if (charset == "GBK") {
                InputStreamReader reader = new InputStreamReader(
                        new FileInputStream(new File("D:\\temp.txt")), "gb2312");
                br = new BufferedReader(reader);
            }
            if (charset == "UTF-8") {
                br = new BufferedReader(new InputStreamReader(
                        new FileInputStream("D:\\temp.txt"), "UTF-8"));
            }
            String s;
            while((s = br.readLine()) != null)
                System.out.println(s);
            
			System.out.println(sb);
		}
		catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}catch (IOException e) {
			// TODO: handle exception
		}finally {
				try {
					if(fi!=null)
						fi.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}
	}
	//普通io读取数据 
	public static void methods1(){
		InputStream is=null;
		try {
			is=new BufferedInputStream(new FileInputStream("D://temp.txt"));
			byte[] buf=new byte[1024];
			int bytelength=is.read(buf);
			StringBuffer sb=new StringBuffer(500);
			while(bytelength!=-1){
				sb.append(new String(buf));
				bytelength=is.read(buf);
			}
			System.out.println(sb);
		}
		catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}catch (IOException e) {
			// TODO: handle exception
		}finally {
				try {
					if(is!=null)
						is.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}
	}
	//NIO流  FileChannel
	public static void methods2(){
		RandomAccessFile afile=null;
		try {
			afile=new RandomAccessFile("D://temp.txt", "rw");
//			new FileInputStream("D://temp.txt").getChannel();
			FileChannel fileChannel=afile.getChannel();//1、打开通道
			ByteBuffer buf=ByteBuffer.allocate(1024);//2、分配缓存buffer
			int byteread=fileChannel.read(buf);  //3、写入数据到buffer
//			System.out.println(byteread);
			StringBuffer sb=new StringBuffer(1000);
			while(byteread!=-1){
				buf.flip();//将Buffer  position设回0，并将limit设成之前的position的值。方便下面开始写数据
				
				sb.append(Charset.forName("GBK").decode(buf).toString());
//				byte[] bytes=new byte[buf.remaining()];
//				buf.get(bytes);
//				String msg=new String(bytes);
//				while(buf.hasRemaining()){
					//判断是否还有数据，读出buffer数据
//					System.out.println((char)buf.get());
//					System.out.println(buf);
					
//				}
//				System.out.println(sb);
//				CharBuffer charBuffer = charBuffer=buf.asCharBuffer();//CharBuffer.allocate(1024);
//				System.out.println(charBuffer);
//				Charset charset = Charset.forName("UTF-8");
//                CharsetDecoder decoder = charset.newDecoder();
//                decoder.decode(buf, charBuffer, true);
//                charBuffer.flip();
//                while (charBuffer.hasRemaining()){
//                    System.out.print(charBuffer.get());
//                }
//				System.out.println(buf);
//				System.out.println("====================");
//				System.out.println(Charset.forName("UTF-8").decode(buf).toString());
				buf.compact();//紧凑之前的未读数据把position移至有数据的最后一个未读元素后面
//				buf.clear();//会把position设置回0，但是数据并没有删除，重写会覆盖之前未读的数据,没有 无所谓。
//				offset = offset + byteread;
				
				byteread=fileChannel.read(buf);
				if(byteread!=-1){
					System.out.println("还有数据,又读一遍");
				}
			}
			System.out.println(">>>>>>>>>>>>>>");	
			System.out.println(sb);	
			} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}catch (IOException  e) {
			// TODO: handle exception
		}finally {
				try {
					if(afile!=null)
						afile.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}
	}
	
	public static String get_charset(File file) {
        String charset = "GBK";
        byte[] first3Bytes = new byte[3];//首先3个字节
        try {
            boolean checked = false;
            ;
            BufferedInputStream bis = new BufferedInputStream(
                    new FileInputStream(file));
            bis.mark(0);
            int read = bis.read(first3Bytes, 0, 3);
            if (read == -1)
                return charset;
            if (first3Bytes[0] == (byte) 0xFF && first3Bytes[1] == (byte) 0xFE) {
                charset = "UTF-16LE";
                checked = true;
            } else if (first3Bytes[0] == (byte) 0xFE
                    && first3Bytes[1] == (byte) 0xFF) {
                charset = "UTF-16BE";
                checked = true;
            } else if (first3Bytes[0] == (byte) 0xEF
                    && first3Bytes[1] == (byte) 0xBB
                    && first3Bytes[2] == (byte) 0xBF) {
                charset = "UTF-8";
                checked = true;
            }
            bis.reset();
            if (!checked) {
                // int len = 0;
                int loc = 0;
 
                while ((read = bis.read()) != -1) {
                    loc++;
                    if (read >= 0xF0)
                        break;
                    if (0x80 <= read && read <= 0xBF) // 单独出现BF以下的，也算是GBK
                        break;
                    if (0xC0 <= read && read <= 0xDF) {
                        read = bis.read();
                        if (0x80 <= read && read <= 0xBF) // 双字节 (0xC0 - 0xDF)
                            // (0x80
                            // - 0xBF),也可能在GB编码内
                            continue;
                        else
                            break;
                    } else if (0xE0 <= read && read <= 0xEF) {// 也有可能出错，但是几率较小
                        read = bis.read();
                        if (0x80 <= read && read <= 0xBF) {
                            read = bis.read();
                            if (0x80 <= read && read <= 0xBF) {
                                charset = "UTF-8";
                                break;
                            } else
                                break;
                        } else
                            break;
                    }
                }
 
            }
 
            bis.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
 
        return charset;
    }
	
	
}

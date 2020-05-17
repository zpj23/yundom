package com.test.order;

import java.util.Arrays;

public class OrderTest {

	public static void main(String[] args) {
		int[] arr= {1,4,84,50,49,67,32,18,2,6};
		int[] arr2=new int[]{1,4,84,50,49,67,32,18,2,6};
//		insert_order(arr,arr2);
//		xier_order(arr,arr2);
		select_order(arr,arr2);
	}
	
	/**
	 * 1. 从第一个元素开始，该元素可以认为已经被排序
     * 2. 取出下一个元素，在已经排序的元素序列中从后向前扫描
     * 3. 如果该元素（已排序）大于新元素，将该元素移到下一位置
     * 4. 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置
     * 5. 将新元素插入到该位置后
     * 6. 重复步骤2~5
     * 二分法变种，始终保证第一层循环变量参数之前是已排序的元素
	 * @Title insert_order
	 * @param arr
	 * @param arr2
	 * @author zpj
	 * @time 2019年11月11日 下午4:26:29
	 */
	public static void insert_order(int[] arr,int[] arr2){
		System.out.println("原数组");
		System.out.println(Arrays.toString(arr2));
		System.out.println("现数组");
		for(int i=0;i<arr.length-1;i++){
			for(int j=i+1;j>0;j--){
				if(arr[j]<arr[j-1]){
					int temp=arr[j];
					arr[j]=arr[j-1];
					arr[j-1]=temp;
				}
			}
		}
		
		System.out.println(Arrays.toString(arr));
		
	}
	
	
	public static void xier_order(int[] arr,int[] arr2){
		System.out.println("原数组");
		System.out.println(Arrays.toString(arr2));
		System.out.println("现数组");
	    int gap = 1, i, j, len = arr.length;
	    int temp;
	    while (gap < len / 3)
	        gap = gap * 3 + 1;      // <O(n^(3/2)) by Knuth,1973>: 1, 4, 13, 40, 121, ...
	    for (; gap > 0; gap /= 3) {
	        for (i = gap; i < len; i++) {
	            temp = arr[i];
	            for (j = i - gap; j >= 0 && arr[j] > temp; j -= gap)
	                arr[j + gap] = arr[j];
	            arr[j + gap] = temp;
	        }
	    }
	    System.out.println(Arrays.toString(arr));
	}
	
	
	/**
	 * 选择排序
	 *
	 * 1. 从待排序序列中，找到关键字最小的元素；
	 * 2. 如果最小元素不是待排序序列的第一个元素，将其和第一个元素互换；
	 * 3. 从余下的 N - 1 个元素中，找出关键字最小的元素，重复①、②步，直到排序结束。
	 *    仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。
	 * @param arr  待排序数组
	 */
	public static void select_order(int[] arr,int[] arr2){
		System.out.println("原数组");
		System.out.println(Arrays.toString(arr2));
		System.out.println("现数组");
		for(int i=0;i<arr.length-1;i++){
			for(int j=i+1;j<arr.length;j++){
				if(arr[i]>arr[j]){
					int temp=arr[j];
					arr[j]=arr[i];
					arr[i]=temp;
				}
			}
		}
		System.out.println(Arrays.toString(arr));
		
	}
	
	
}

package com.finalteam5.otisrm.dto.sr;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class main {

	static int AnswerN;
	static int N = 10;
    static int K = 10;
    static List<Integer> visited;

	public static void main(String args[]) throws Exception {
		//System.setIn(new FileInputStream("C:\sample_input.txt"));
		Scanner sc = new Scanner(System.in);

		int T = sc.nextInt();

		for(int test_case = 1; test_case <= T; test_case++) {
			AnswerN = 0;
			N = sc.nextInt();
            K = sc.nextInt();
            if (K >= N) K = N-1;
            
            List<List<Integer>> intersections = new ArrayList<>();

            //0번째 더미 리스트 추가
            intersections.add(new ArrayList<>());
            for (int i=1; i<=N; ++i) {
                intersections.add(new ArrayList<>());
            }

            for (int i=1; i<N; ++i) {
                int intersection1 = sc.nextInt();
                int intersection2 = sc.nextInt();
                intersections.get(intersection1).add(intersection2);
                intersections.get(intersection2).add(intersection1);
            }
            /*
            for (int i=1; i<N; ++i) {
                System.out.println(intersections.get(i));
            }
             */
            List<Integer> isCriminal = new ArrayList<>();
            isCriminal.add(0);
            for (int i=1; i<=N; ++i) {
                isCriminal.add(sc.nextInt());
            }

            //System.out.println();
            for (int i=1; i <= N; ++i) {
            	if (visited != null) {
            		visited.clear();
            	}
                visited = new ArrayList<Integer>(Collections.nCopies(N+1, 0));
                dfs(i, 0, intersections, isCriminal);
                //if (isCriminal.get(i) == 1) AnswerN++;
                //System.out.println();
                //System.out.println(AnswerN);
            }

            
			System.out.println("#"+test_case+" "+AnswerN);
		}
	}
	
	static void dfs(int currentNode, int depth, List<List<Integer>> intersections, List<Integer> isCriminal) {
		//System.out.print(currentNode + " ");
		
		if (isCriminal.get(currentNode) == 1 && visited.get(currentNode) == 0) {
			AnswerN++;
			visited.set(currentNode, 1);
		}
		
	    if (depth == K) {
	        return;
	    }

	    for (int neighbor : intersections.get(currentNode)) {
	    	if (visited.get(neighbor) == 0) {
	    		dfs(neighbor, depth + 1, intersections, isCriminal);
	    	}
	    }
	}
}

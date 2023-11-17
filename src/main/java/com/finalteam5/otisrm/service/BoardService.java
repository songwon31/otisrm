package com.finalteam5.otisrm.service;

import java.util.List;
import java.util.Map;

import com.finalteam5.otisrm.dto.inq.inq.Inq;
import com.finalteam5.otisrm.dto.inq.inq.InqAtch;
import com.finalteam5.otisrm.dto.inq.inq.InqSubmit;
import com.finalteam5.otisrm.dto.inq.inqAns.InqAnsAtch;
import com.finalteam5.otisrm.dto.inq.inqAns.InqAnsSubmit;
import com.finalteam5.otisrm.dto.ntc.Ntc;
import com.finalteam5.otisrm.dto.ntc.NtcAtch;
import com.finalteam5.otisrm.dto.ntc.NtcSubmit;

public interface BoardService {
	//작성자: 성유진
	//공지사항 등록폼: 공지사항 등록하기
	public int writeNtc(NtcSubmit ntcSubmit);
	
	//최근 삽입한 공지사항 PK 불러오기(첨부파일 등록을 위함)
	public String getAddNtcPk();
	
	//공지사항 등록폼: 공지사항 첨부파일 업로드
	public int uploadNtcAtch(NtcAtch ntcAtch);
	
	//공지사항 목록 불러오기: 총 행수 구하기(페이징을 위함)
	public int totalNumOfNct(Map<String,Object> map);
	
	//공지사항 목록 불러오기: 페이지에 해당하는 공지사항 목록 불러오기
	public List<Ntc> getNtcListByPage(Map<String, Object> map);
	
	//공지 목록에 해당하는 상세 정보 불러오기
	public Ntc getNtcByNtcNo(String ntcNo);
	
	//공지 상세정보에 해당하는 첨부파일 불러오기
	public List<NtcAtch> getNtcAtchByNtcNo(String ntcNo); 
		
	//공지 첨부파일 번호에 해당하는 첨부파일 가져오기(파일 다운로드를 위함)
	public NtcAtch getNtcAtchByNtcAtchNo(String ntcAtchNo);
	
	//공지 조회수 업데이트(상세보기를 했을 경우 update)
    public void addNtcInqCnt(Ntc ntc);
   
    //===================================================================
    
    //문의게시판 등록폼: 문의 등록하기
  	public int writeInq(InqSubmit inqSubmit);
  	
  	//최근 삽입한 문의 PK 불러오기(첨부파일 등록을 위함)
  	public String getAddInqPk();
  	
  	//문의게시판 등록폼: 문의게시판 첨부파일 업로드
  	public int uploadInqAtch(InqAtch inqAtch);
    
  	//문의게시판 목록 불러오기: 총 행수 구하기(페이징을 위함)
    public int totalNumOfInq(Map<String,Object> map);
    
    //문의게시판 목록 불러오기: 페이지에 해당하는 문의 목록 불러오기
  	public List<Inq> getInqListByPage(Map<String, Object> map);
  	
    //문의 목록에 해당하는 상세 정보 불러오기
  	public Inq getInqByInqNo(String inqNo);
  	
  	//문의 상세정보에 해당하는 첨부파일 불러오기
  	public List<InqAtch> getInqAtchByInqNo(String inqNo); 
  	
  	//문의 첨부파일 번호에 해당하는 첨부파일 가져오기(파일 다운로드를 위함)
  	public InqAtch getInqAtchByInqAtchNo(String inqAtchNo);
  	
    //등록한 문의 수정
  	public void updateInq(InqSubmit inqSubmit);
  	
    //문의답변 등록하기
  	public int writeInqAns(InqAnsSubmit inqSubmit);
  	
  	//최근 삽입한 문의답변 PK 불러오기(첨부파일 등록을 위함)
  	public String getAddInqAnsPk();
  		
  	//문의 답변 첨부파일 업로드
  	public int uploadInqAnsAtch(InqAnsAtch inqAnsAtch);
  	
    
	
}

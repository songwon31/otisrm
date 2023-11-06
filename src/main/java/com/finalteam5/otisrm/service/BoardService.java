package com.finalteam5.otisrm.service;

import java.util.List;
import java.util.Map;

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
	
	//공지사사항 목록 불러오기: 총 행수 구하기(페이징을 위함)
	public int totalNumOfNct(Map<String,Object> map);
	
	//공지사사항 목록 불러오기: 페이지에 해당하는 공지사항 목록 불러오기
	public List<Ntc> getNtcListByPage(Map<String, Object> map);
	
	//공지 목록에 해당하는 상세 정보 불러오기
	public Ntc getNtcByNtcNo(String ntcNo);
	
	//공지 상세정보에 해당하는 첨부파일 불러오기
	public List<NtcAtch> getNtcAtchByNtcNo(String ntcNo); 
		
	//공지 첨부파일 번호에 해당하는 첨부파일 가져오기(파일 다운로드를 위함)
	public NtcAtch getNtcAtchByNtcAtchNo(String ntcAtchNo);
	
	//공지 조회수 업데이트(상세보기를 했을 경우 update)
    public void addNtcInqCnt(Ntc ntc);
	
}

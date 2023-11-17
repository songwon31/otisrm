package com.finalteam5.otisrm.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.finalteam5.otisrm.dto.inq.inq.Inq;
import com.finalteam5.otisrm.dto.inq.inq.InqAtch;
import com.finalteam5.otisrm.dto.inq.inq.InqSubmit;
import com.finalteam5.otisrm.dto.inq.inqAns.InqAnsAtch;
import com.finalteam5.otisrm.dto.inq.inqAns.InqAnsSubmit;
import com.finalteam5.otisrm.dto.ntc.Ntc;
import com.finalteam5.otisrm.dto.ntc.NtcAtch;
import com.finalteam5.otisrm.dto.ntc.NtcSubmit;

@Mapper
public interface BoardDao {
	//작성자: 성유진
	
	//공지 등록폼: 공지사항 등록하기
	public int insertNtc(NtcSubmit ntcSubmit);
	
	//최근 삽입한 공지사항 PK 불러오기(첨부파일 등록을 위함)
	public String selectAddNtcPk();
	
	//공지 등록폼: 공지사항 첨부파일 업로드
	public int insertNtcAtch(NtcAtch ntcAtch);
	
	//공지사항 목록 불러오기: 총 행수 구하기(페이징을 위함)
	public int countNct(Map<String,Object> map);
	
	//공지사사항 목록 불러오기: 페이지에 해당하는 공지사항 목록 불러오기
	public List<Ntc> selectNtcListByPage(Map<String, Object> map);
	
	//공지 목록에 해당하는 상세 정보 불러오기
	public Ntc selectNtcByNtcNo(String ntcNo);
	
	//공지 상세정보에 해당하는 첨부파일 불러오기
	public List<NtcAtch> selectNtcAtchByNtcNo(String ntcNo); 
		
	//공지 첨부파일 번호에 해당하는 첨부파일 가져오기(파일 다운로드를 위함)
	public NtcAtch selectNtcAtchByNtcAtchNo(String ntcAtchNo);
	
	//공지 조회수 업데이트(상세보기를 했을 경우 update)
	public void updateNtcInqCnt(Ntc ntc);
	
	//=================================================================
	//문의등록폼: 문의사항 등록하기
	public int insertInq(InqSubmit inqSubmit);
	
	//최근 삽입한 공지사항 PK 불러오기(첨부파일 등록을 위함)
	public String selectAddInqPk();
		
	//문의 등록폼: 문의 첨부파일 업로드
	public int insertInqAtch(InqAtch inqAtch);
	
	//문의게시판 목록 불러오기: 총 행수 구하기(페이징을 위함)
	public int countInq(Map<String,Object> map);
	
	//문의사항 목록 불러오기: 페이지에 해당하는 공지사항 목록 불러오기
	public List<Inq> selectInqListByPage(Map<String, Object> map);
	
	//문의 목록에 해당하는 상세 정보 불러오기
	public Inq selectInqByInqNo(String inqNo);
	
	//문의 상세정보에 해당하는 첨부파일 불러오기
	public List<InqAtch> selectInqAtchByInqNo(String inqNo); 
	
	//문의 첨부파일 번호에 해당하는 첨부파일 가져오기(파일 다운로드를 위함)
	public InqAtch selectInqAtchByInqAtchNo(String inqAtchNo);
	
	//등록한 문의 수정
	public void updateInq(InqSubmit inqSubmit);
	
	//문의답변 등록하기
	public int insertInqAns(InqAnsSubmit inqSubmit);
	
	//최근 삽입한 문의답변 PK 불러오기(첨부파일 등록을 위함)
	public String selectAddInqAnsPk();
		
	//문의 답변 첨부파일 업로드
	public int insertInqAnsAtch(InqAnsAtch inqAnsAtch);
}

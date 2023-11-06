package com.finalteam5.otisrm.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

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
	
	//공지사사항 목록 불러오기: 총 행수 구하기(페이징을 위함)
	public int countNct(Map<String,Object> map);
	
	//공지사사항 목록 불러오기: 페이지에 해당하는 공지사항 목록 불러오기
	public List<Ntc> selectNtcListByPage(Map<String, Object> map);
}

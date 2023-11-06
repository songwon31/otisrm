package com.finalteam5.otisrm.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finalteam5.otisrm.dao.BoardDao;
import com.finalteam5.otisrm.dto.inq.Inq;
import com.finalteam5.otisrm.dto.inq.InqAtch;
import com.finalteam5.otisrm.dto.inq.InqSubmit;
import com.finalteam5.otisrm.dto.ntc.Ntc;
import com.finalteam5.otisrm.dto.ntc.NtcAtch;
import com.finalteam5.otisrm.dto.ntc.NtcSubmit;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BoardServiceImpl implements BoardService{
	@Autowired
	private BoardDao boardDao;
	
	//작성자: 성유진
	//공지사항 등록폼: 공지사항 등록하기
	@Override
	public int writeNtc(NtcSubmit ntcSubmit) {
		int numOfInsert = boardDao.insertNtc(ntcSubmit);
		return numOfInsert;
	}
	
	//최근 삽입한 공지사항 PK 불러오기(첨부파일 등록을 위함)
	@Override
	public String getAddNtcPk() {
		String ntcPk = boardDao.selectAddNtcPk();
		return ntcPk;
	}
	
	//공지사항 등록폼: 공지사항 첨부파일 업로드
	@Override
	public int uploadNtcAtch(NtcAtch ntcAtch) {
		int numOfInsert = boardDao.insertNtcAtch(ntcAtch);
		return numOfInsert;
	}
	
	//공지사사항 목록 불러오기: 총 행수 구하기(페이징을 위함)
	@Override
	public int totalNumOfNct(Map<String, Object> map) {
		int numOfTotalNct = boardDao.countNct(map);
		return numOfTotalNct;
	}

	@Override
	public List<Ntc> getNtcListByPage(Map<String, Object> map) {
		List<Ntc> list = boardDao.selectNtcListByPage(map);
		return list;
	}
    
	//공지 목록에 해당하는 상세 정보 불러오기
	@Override
	public Ntc getNtcByNtcNo(String ntcNo) {
		Ntc ntc = boardDao.selectNtcByNtcNo(ntcNo);
		return ntc;
	}
	
	//공지 상세정보에 해당하는 첨부파일 불러오기
	@Override
	public List<NtcAtch> getNtcAtchByNtcNo(String ntcNo) {
		List<NtcAtch> list = boardDao.selectNtcAtchByNtcNo(ntcNo);
		return list;
	}
	//첨부파일 번호에 해당하는 공지사항 첨부파일(파일 다운로드를 위함)
	@Override
	public NtcAtch getNtcAtchByNtcAtchNo(String ntcAtchNo) {
		NtcAtch ntcAtch = boardDao.selectNtcAtchByNtcAtchNo(ntcAtchNo);
		return ntcAtch;
	}
	
    //공지사항 조회수 업데이트
	@Override
	public void addNtcInqCnt(Ntc ntc) {
		boardDao.updateNtcInqCnt(ntc);
	}
    //=================================================================
	//문의게시판 등록폼: 문의 등록하기
	@Override
	public int writeInq(InqSubmit inqSubmit) {
		int numOfInsert = boardDao.insertInq(inqSubmit);
		return numOfInsert;
	}
	
	@Override
	public String getAddInqPk() {
		String inqPk = boardDao.selectAddInqPk();
		return inqPk;
	}
	
	@Override
	public int uploadInqAtch(InqAtch inqAtch) {
		int numOfInsert = boardDao.insertInqAtch(inqAtch);
		return numOfInsert;
	}
	
	//문의게시판 목록 불러오기: 총 행수 구하기(페이징을 위함)
	@Override
	public int totalNumOfInq(Map<String, Object> map) {
		int numOfTotalInq = boardDao.countInq(map);
		return numOfTotalInq;
	}
	
	//문의게시판 목록 불러오기: 페이지에 해당하는 문의 목록 불러오기
	@Override
	public List<Inq> getInqListByPage(Map<String, Object> map) {
		List<Inq> list = boardDao.selectInqListByPage(map);
		return list;
	}

	
}

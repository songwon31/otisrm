package com.finalteam5.otisrm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finalteam5.otisrm.dao.BoardDao;
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

	
}

package com.finalteam5.otisrm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finalteam5.otisrm.dao.InstDao;
import com.finalteam5.otisrm.dto.usr.Inst;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class InstServiceImpl implements InstService{
	@Autowired
	private InstDao instDao;
	
	//작성자: 이현주
	//외부업체 제외 기관목록 가져오기
	@Override
	public List<Inst> getNoOutsrcInstList() {
		return instDao.selectNoOutsrcInstList();
	}
}

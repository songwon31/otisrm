package com.finalteam5.otisrm.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.finalteam5.otisrm.dto.usr.Inst;

public interface InstService {
	//작성자: 이현주
	//외부업체 제외 기관목록 가져오기
	public List<Inst> getNoOutsrcInstList();
}

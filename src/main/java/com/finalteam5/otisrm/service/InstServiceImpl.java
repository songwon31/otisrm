package com.finalteam5.otisrm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finalteam5.otisrm.dao.InstDao;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class InstServiceImpl implements InstService{
	@Autowired
	private InstDao instDao;
	
}

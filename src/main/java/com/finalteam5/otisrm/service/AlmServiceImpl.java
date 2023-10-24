package com.finalteam5.otisrm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finalteam5.otisrm.dao.AlmDao;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AlmServiceImpl implements AlmService{
	@Autowired
	private AlmDao almDao;
	
}

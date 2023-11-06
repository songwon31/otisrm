package com.finalteam5.otisrm.validator;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.finalteam5.otisrm.dto.usr.UsrManagementSearch;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class UsrManagementSearchValidator implements Validator {
	@Override
	public boolean supports(Class<?> clazz) {
		boolean check = UsrManagementSearch.class.isAssignableFrom(clazz);
		return check;
	}
	
	@Override
	public void validate(Object target, Errors errors) {
		log.info("validate 실행");
		UsrManagementSearch usrManagementSearchForm = (UsrManagementSearch) target;
		
	}
}

package com.finalteam5.otisrm.dto.usr;

import java.util.List;

import lombok.Data;

@Data
public class UsrManagementPageConfigure {
	List<UsrAuthrt> usrAuthrtList;
	List<UsrStts> usrSttsList;
	List<Inst> instList;
	List<Dept> deptList;
	List<Usr> usrList;
}

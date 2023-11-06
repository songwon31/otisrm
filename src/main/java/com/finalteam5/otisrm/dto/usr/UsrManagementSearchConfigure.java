package com.finalteam5.otisrm.dto.usr;

import java.util.List;

import lombok.Data;

@Data
public class UsrManagementSearchConfigure {
	List<UsrAuthrt> usrAuthrtList;
	List<UsrStts> usrSttsList;
	List<Inst> instList;
	List<Usr> usrList;
}

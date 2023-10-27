package com.finalteam5.otisrm.security;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.finalteam5.otisrm.dto.usr.Usr;

public class UsrDetails extends User  {
	private Usr usr;
	
	public UsrDetails(Usr usr, List<GrantedAuthority> authorities) {
		super(usr.getUsrId(), usr.getUsrPswd(), usr.isEnabled(), true, true, true, authorities);
		this.usr = usr;
	}

	public Usr getUsr() {
		return usr;
	}
}

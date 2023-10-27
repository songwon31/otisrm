package com.finalteam5.otisrm.security;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.finalteam5.otisrm.dao.UsrDao;
import com.finalteam5.otisrm.dto.usr.Usr;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UsrDetailsService implements UserDetailsService {
	@Resource
	private UsrDao usrDao;	
	
	@Override
	public UsrDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usr usr = usrDao.selectUsrDetailsByUsrId(username);
		if(usr == null) {
			throw new UsernameNotFoundException(username);
		}
		
		if(usr.getUsrSttsNo().equals("PENDING")||usr.getUsrSttsNo().equals("WITHDRAWL")){
			usr.setEnabled(false);
		}else {
			usr.setEnabled(true);
		}
		
		//권한이 여러개일 경우 권한 테이블로부터 모든 권한을 불러와서 잘 사용해야 함.
		//List<String> listRole = member.getRole("mid");
		
		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(usr.getUsrAuthrtNo()));
		
		UsrDetails usrDetails = new UsrDetails(usr, authorities);
		
		return usrDetails;
	}
}


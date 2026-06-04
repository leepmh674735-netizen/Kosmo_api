package com.winter.app.member;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MemberService implements UserDetailsService {
    private MemberRepository memberRepository;

    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return memberRepository.findById(username).orElse(null);
    }

    //가입
    public MemberDTO join(MemberDTO memberDTO)throws  Exception{
        memberDTO.setPassword(passwordEncoder.encode(memberDTO.getPassword()));
        return memberRepository.save(memberDTO);
    }

}
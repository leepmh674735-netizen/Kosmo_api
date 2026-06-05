package com.winter.app.member;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MemberService {
    private MemberRepository memberRepository;

    private PasswordEncoder passwordEncoder;

    //가입
    public MemberDTO join(MemberDTO memberDTO)throws  Exception{
        memberDTO.setPassword(passwordEncoder.encode(memberDTO.getPassword()));
        return memberRepository.save(memberDTO);
    }

}
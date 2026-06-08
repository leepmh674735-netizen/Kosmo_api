package com.winter.aop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.winter.app.member.MemberRepository;
import com.winter.app.member.MemberDTO;

@Service
public class MemberService {
    
    @Autowired
    private MemberRepository memberRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PrintExecutionTime 
    public MemberDTO join(MemberDTO memberDTO, MultipartFile profile) throws Exception {
        memberDTO.setPassword(passwordEncoder.encode(memberDTO.getPassword()));
        
        if (profile != null && !profile.isEmpty()) {
            System.out.println("파일명: " + profile.getOriginalFilename());
            System.out.println("파일 크기: " + profile.getSize());
        }
        
        return memberRepository.save(memberDTO);
    }
}
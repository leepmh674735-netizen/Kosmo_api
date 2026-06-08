package com.winter.aop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.winter.app.member.MemberDTO;
import com.winter.app.member.MemberService;

@RestController
@RequestMapping("/member")
public class MemberController {
    
    @Autowired
    private MemberService memberService;
    
    @PostMapping("/join")
    public MemberDTO join(MemberDTO memberDTO, MultipartFile profile) throws Exception {
        
        System.out.print(memberDTO.getUsername());
        if (profile != null) {
            System.out.print(profile.getOriginalFilename());
        }
        
        memberDTO = memberService.join(memberDTO, profile);
        
        return memberDTO;
    }
}
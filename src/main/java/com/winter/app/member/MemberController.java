package com.winter.app.member;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/member/*")
@Slf4j
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("join")
    public int join(@Valid @RequestBody MemberDTO memberDTO, BindingResult bindingResult)throws  Exception{

        memberDTO = memberService.join(memberDTO);

        if(memberDTO != null){
            return 1;
        }else {
            throw new Exception();
        }

    }
}
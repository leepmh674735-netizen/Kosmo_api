package com.winter.app.member;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping; // 회원가입은 보통 POST를 사용합니다.
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid; // @Valid 임포트 필요
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/member") // URL 매핑에서 /* 는 생략하는 것이 깔끔합니다.
@Slf4j
@RequiredArgsConstructor // 의존성 주입(Service)을 위해 추가
public class MemberController {
    
    // 비즈니스 로직을 처리할 서비스 주입 필요
    private final MemberService memberService;
    
    // 데이터 생성 및 제출(회원가입)은 관례상 @GetMapping 대신 @PostMapping을 사용합니다.
    @PostMapping("/join")
    public ResponseEntity<?> join(@Valid @RequestBody MemberDTO memberDTO, BindingResult bindingResult) throws Exception {
        
        log.info("회원가입 요청 진입: {}", memberDTO);
        
        // 1. @Valid 유효성 검증 실패 시 처리
        if (bindingResult.hasErrors()) {
            log.warn("유효성 검증 실패: {}", bindingResult.getAllErrors());
            return ResponseEntity.badRequest().body("입력값이 올바르지 않습니다.");
        }
        
        // 2. 전달받은 객체가 null인지 확인 (필요한 경우)
        if (memberDTO == null) {
            throw new Exception("요청 데이터가 비어 있습니다.");
        }
        
        // 3. 실제 비즈니스 로직(회원가입) 수행
        // 컨트롤러의 목적인 '서비스 호출'이 온전히 실행되도록 순서를 배치합니다.
        int result = memberService.join(memberDTO);
        
        // 4. 성공 결과 반환 (201 Created 상태코드와 함께 결과값 전달)
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
}
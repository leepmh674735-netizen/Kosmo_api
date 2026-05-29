package com.winter.app.member;

// [수정] java.lang.reflect.Member를 지우고, 프로젝트의 실제 회원 엔티티 클래스를 임포트해야 합니다.
// (만약 MemberDTO처럼 이 패키지 안에 Member 엔티티가 같이 있다면 임포트 문을 생략해도 됩니다)
import com.winter.app.member.Member; 

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // [수정] org.springframework... 패키지를 권장합니다.

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
	
	private final MemberRepository memberRepository;
	// [수정] PasswordEcoder -> PasswordEncoder (오타 교정)
	private final PasswordEncoder passwordEncoder; 
    
	/**
	 * 회원 가입 메서드
	 */
	@Transactional // 데이터 변경(저장)이 일어나므로 readOnly = false 상태로 덮어씌웁니다.
	public Member join(MemberDTO memberDTO) throws Exception {
		
		// [수정] 조건문 내부의 열고 닫는 괄호 ( ) 개수 불일치 교정
		if (!memberDTO.getPassword().equals(memberDTO.getPasswordCheck())) {
			throw new IllegalArgumentException("비밀번호가 서로 일치하지 않습니다.");
		}
		
		// [수정] Member.member = new Member(); -> Member member = new Member(); (타입 선언 오류 교정)
		Member member = new Member();
		
		// [수정] gerUsername() -> getUsername() (오타 교정)
		member.setUsername(memberDTO.getUsername());
		member.setName(memberDTO.getName());
		member.setEmail(memberDTO.getEmail());
		
		// 비밀번호 암호화 및 세팅
		String encodedPassword = passwordEncoder.encode(memberDTO.getPassword());
		member.setPassword(encodedPassword);
        
		// 데이터베이스에 저장 후 저장된 엔티티 반환
		return memberRepository.save(member);
	}
} // [수정] 클래스 하단에 불필요하게 중복되어 있던 닫는 중괄호들(}) 제거
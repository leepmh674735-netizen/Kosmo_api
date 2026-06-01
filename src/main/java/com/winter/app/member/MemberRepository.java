package com.winter.app.member;

import org.springframework.data.jpa.repository.JpaRepository;

import com.winter.app.notice.NoticeDTO;

public interface MemberRepository extends JpaRepository<NoticeDTO, Long>{
	
}

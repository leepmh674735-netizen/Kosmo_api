package com.winter.app.notice;

import static org.junit.jupiter.api.Assertions.*;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class NoticeRepositoryTest {
	
	@Autowired
	private NoticeRepository noticeRepository;

	@Test
	void test() {
		NoticeDTO noticeDTO = new NoticeDTO();
		noticeDTO.setContent("contents");
		noticeDTO.setTitle("title");
		noticeDTO.setAuthor("writer");
		
		NoticeDTO notice = new NoticeDTO();
		notice.setContent(noticeDTO.getContent());
		notice.setTitle(noticeDTO.getTitle());
		notice.setAuthor(noticeDTO.getAuthor());
		
		NoticeDTO savedNotice = noticeRepository.save(noticeDTO);
		assertNotNull(savedNotice);
		assertNotNull(savedNotice.getId());
	}

}

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
		noticeDTO.setBoardContents("contents");
		noticeDTO.setBoardTitle("title");
		noticeDTO.setBoardWriter("writer");
		
		NoticeDTO notice = new NoticeDTO();
		notice.setBoardContents(noticeDTO.getBoardContents());
		notice.setBoardTitle(noticeDTO.getBoardTitle());
		notice.setBoardWriter(noticeDTO.getBoardWriter());
		
		NoticeDTO savedNotice = noticeRepository.save(noticeDTO);
		assertNotNull(savedNotice);
		assertNotNull(savedNotice.getBoardNum());
	}

}

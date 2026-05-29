package com.winter.app.notice;

import java.util.List;
import java.util.Optional; 
import java.util.stream.Collectors; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service 
public class NoticeService {
	
	@Autowired
	private NoticeRepository noticeRepository; 
	
	public List<NoticeDTO> getList() throws Exception {
		return noticeRepository.findAll().stream()
				.map(notice -> {
					NoticeDTO dto = new NoticeDTO();
					dto.setId(notice.getId()); 
					dto.setTitle(notice.getTitle());
					dto.setContent(notice.getContent());
					dto.setAuthor(notice.getAuthor());
					return dto;
				})
				.collect(Collectors.toList());
	}
	
	public NoticeDTO getDetail(Long id) throws Exception {
		Optional<NoticeDTO> result = noticeRepository.findById(id);
		NoticeDTO notice = result.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id=" + id));
		
		NoticeDTO noticeDTO = new NoticeDTO(); 
		noticeDTO.setId(notice.getId());
		noticeDTO.setTitle(notice.getTitle());
		noticeDTO.setContent(notice.getContent());
		noticeDTO.setAuthor(notice.getAuthor());
		
		return noticeDTO; 
	}
}
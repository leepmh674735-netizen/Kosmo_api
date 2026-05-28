package com.winter.app.notice;

import java.util.List;
import java.util.Optional; 
import java.util.stream.Collectors; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.winter.app.notice.NoticeDTO;
import com.winter.app.notice.NoticeRepository;

@Service 
public class NoticeService {
	
	@Autowired
	private NoticeRepository noticeRepository; 
	
	// 공지사항 전체 목록 조회 및 DTO 변환
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
	
	// 공지사항 단건 상세 조회 및 DTO 변환
	public NoticeDTO getDetail(Long id) throws Exception {
	    return NoticeRepository.findById(id)
	            .map(notice -> {
	                NoticeDTO dto = new NoticeDTO();
	                dto.setId(notice.getId());
	                dto.setTitle(notice.getTitle());
	                dto.setContent(notice.getContent());
	                dto.setAuthor(notice.getAuthor());
	                return dto;
	            })
	            .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id=" + id));
	}
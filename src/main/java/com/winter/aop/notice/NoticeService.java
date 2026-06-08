package com.winter.aop.notice;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

import com.winter.app.notice.NoticeRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NoticeService {
	
	private final NoticeRepository noticeRepository;
	
	public List<NoticeDTOResponseDTO> list() throws Exception {
		List<NoticeDTO> ar = noticeRepository.findAll();
		List<NoticeDTOResponseDTO> list = new ArrayList<>();
		
		for(NoticeDTO n : ar) {
			NoticeDTOResponseDTO nr = new NoticeDTOResponseDTO(
					n.getId(),
					n.getMember().getName(),
					n.getTitle(),
					n.getView(),
					n.getCreatedAt()
				);
			list.add(nr);
		}
		return list;
	}
}
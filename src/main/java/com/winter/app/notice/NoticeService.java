package com.winter.app.notice;

import java.util.List;
import java.util.Optional; 
import java.util.stream.Collectors; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; // 3. 서비스 빈 등록을 위해 추가

@Service 
public class NoticeService {
	
	@Autowired
	private NoticeRepository noticeRepository; // 5. Resitory -> Repository 오타 수정
	
	// 공지사항 전체 목록 조회 및 DTO 변환
	public List<NoticeDTO> getList() throws Exception {
		// 리포지토리가 반환한 List<Notice> 엔티티 리스트를 Stream을 통해 List<NoticeDTO>로 변환합니다.
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
		
		Optional<NoticeDTO> result = noticeRepository.findById(id);
		
		// 값이 있으면 꺼내고, 없으면 예외(Exception)를 발생시킵니다.
		NoticeDTO notice = result.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id=" + id));
		
		// 엔티티 데이터를 DTO 상자에 복사해서 채워줍니다.
		NoticeDTO noticeDTO = new NoticeDTO();
		noticeDTO.setId(notice.getId());
		noticeDTO.setTitle(notice.getTitle());
		noticeDTO.setContent(notice.getContent());
		noticeDTO.setAuthor(notice.getAuthor());
		
		return noticeDTO; // 최종 변환된 DTO 리턴
	}

}
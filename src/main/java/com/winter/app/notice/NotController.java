package com.winter.app.notice;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
public class NotController {

	private final NoticeService noticeService;

	@GetMapping("list")
	public List<NoticeDTO> list() throws Exception {
		return noticeService.getList();
	}

	@GetMapping("detail/{id}")
	public NoticeDTO detail(@PathVariable("id") Long id) throws Exception {
		return noticeService.getDetail(id);
	}

	@PostMapping("create")
	public int create(@RequestBody NoticeDTO noticeDTO) throws Exception {
		return noticeService.create(noticeDTO);
	}
}
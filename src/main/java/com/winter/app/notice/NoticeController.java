package com.winter.app.notice;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/notice/**")
@AllArgsConstructor
@Slf4j
public class NoticeController {

    private NoticeService noticeService;


    @GetMapping("list")
    public List<NoticeDTO> list() throws Exception {
        System.out.println("notice list");
        System.out.println("main brach");
        System.out.println("Study branch");
        System.out.println("github 연동");
        return noticeService.getList();
    }

    @GetMapping("detail/{id}")
    public NoticeDTO detail(@PathVariable(name = "id") Long id)throws  Exception{
        return noticeService.getDetail(id);
    }

    @PostMapping("create")
    public NoticeDTO create(@RequestBody NoticeDTO noticeDTO)throws  Exception{
        noticeDTO.setAuthor("관리자");
        return noticeService.create(noticeDTO);

    }
}
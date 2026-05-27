package com.winter.app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notice/*")
public class NoticeController {

    @GetMapping("list")
    public String list() {
        return "notice list";
    }

}

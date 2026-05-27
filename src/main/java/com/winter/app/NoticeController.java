package com.winter.app;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/notice/*")
@AllArgsConstructor
public class NoticeController {

    @GetMapping("list")
    public String list() {
        return "notice list";
    }

}

package com.example.f_chat.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/test")
public class TestController {
    @RequestMapping(value = "test_url")
    public String t_url(){
        return "testUrl";
    }

}

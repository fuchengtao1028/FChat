package com.example.f_chat.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
//页面跳转
public class PageController {
    @RequestMapping("/login")
    public String login(){
        return "login";
    }
    @RequestMapping("/index")
    public String index(){
        return "index";
    }
//    @RequestMapping("/loginerror")
//    public String longinError(){
//        return "loginerror";
//    }
}

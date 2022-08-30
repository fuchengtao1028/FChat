package com.example.f_chat.controller;


import com.example.f_chat.entity.ReturnMsg;
import com.example.f_chat.service.LoginServie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping(value = "/login")
public class LoginController {
    @Autowired
    private LoginServie loginServie;

    @RequestMapping(value = "/sendSms",method = RequestMethod.POST)
    public ReturnMsg sendSms(HttpServletRequest request, HttpServletResponse response){
        String number = request.getParameter("number");
        String templateId = request.getParameter("templateId");
        if("".equals(number)||"".equals(templateId)){
            return ReturnMsg.fail();
        }
        return loginServie.sendSms(number,templateId,request.getSession());
    }

    @RequestMapping(value = "/vMes",method = RequestMethod.POST)
    public ReturnMsg vMes(HttpServletRequest request, HttpServletResponse response){
        String number = request.getParameter("number");
        String verifyCode = request.getParameter("verifyCode");
        return loginServie.vMes(number,verifyCode,request.getSession());
    }

    @RequestMapping(value = "/selectByNumber",method = RequestMethod.POST)
    public ReturnMsg selectByNumber(HttpServletRequest request, HttpServletResponse response){
        String number = request.getParameter("number");

        return loginServie.selectByNumber(number,request.getSession());
    }

}

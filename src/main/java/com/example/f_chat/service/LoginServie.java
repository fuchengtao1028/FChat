package com.example.f_chat.service;



import com.example.f_chat.entity.ReturnMsg;

import javax.servlet.http.HttpSession;

public interface LoginServie {
    ReturnMsg sendSms(String number, String templateId, HttpSession session);
    ReturnMsg vMes(String number, String verifyCode, HttpSession session);
    ReturnMsg selectByNumber(String number, HttpSession session);
}

package com.example.f_chat.service;

import com.example.f_chat.entity.ReturnMsg;
import com.example.f_chat.entity.User;

import javax.servlet.http.HttpSession;

public interface UserService {
    ReturnMsg update(User user);
    ReturnMsg selectUser(Integer id);
    ReturnMsg selectAllUser();
    ReturnMsg selectFriends(Integer id);
    ReturnMsg selectByNumber(String number);
}

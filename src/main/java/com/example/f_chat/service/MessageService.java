package com.example.f_chat.service;

import com.example.f_chat.entity.Message;

import java.util.List;

public interface MessageService {
    Integer insert(Message message);
    List<Message> selectReqMsg(Integer id);
    List<Message> selectOfflineReqMsg(Integer id);
    List<Message> selectOfflineChatMsg(Integer id);
    Integer rejReqMsg(Integer id);
    Integer accReqMsg(Integer id,String remark);
    Message selectById(Integer id);
    Boolean isAlready(Integer id1,Integer id2);
}

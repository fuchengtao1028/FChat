package com.example.f_chat.service;

import com.example.f_chat.entity.Conversation;
import com.example.f_chat.entity.Message;

import java.util.List;

public interface ConversationService {
    Integer insert(Conversation conversation);
    List<Conversation> selectConversations(Integer id);
    Conversation selectConversationByMsgId(Integer id);
    Conversation selectConversationById(Integer id);
    Conversation selectConversation(Integer id1,Integer id2);

    Integer update(Conversation conversation);

}

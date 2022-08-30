package com.example.f_chat.service.impl;

import com.example.f_chat.dao.ConversationMapper;
import com.example.f_chat.dao.MessageMapper;
import com.example.f_chat.entity.Conversation;
import com.example.f_chat.entity.Message;
import com.example.f_chat.service.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConversationServiceImpl implements ConversationService {
    @Autowired
    private ConversationMapper conversationMapper;
    @Autowired
    private MessageMapper messageMapper;

    @Override
    public Integer insert(Conversation conversation) {
        conversationMapper.insert(conversation);
        return conversation.getId();
    }

    @Override
    public List<Conversation> selectConversations(Integer id) {
        List<Conversation> conversationList=conversationMapper.selectConversations(id).stream().sorted(Comparator.comparing(a -> a.getLastMsg().getTime())).collect(Collectors.toList());
        return conversationList;
    }

    @Override
    public Conversation selectConversationByMsgId(Integer id) {
        Message message = messageMapper.selectByPrimaryKey(id);
        return conversationMapper.selectByPrimaryKey(message.getConversationId());
    }

    @Override
    public Conversation selectConversationById(Integer id) {
        return conversationMapper.selectByPrimaryKeyPlus(id);
    }

    @Override
    public Conversation selectConversation(Integer id1, Integer id2) {
        return conversationMapper.selectConversationByUserIds(id1, id2);
    }

    @Override
    public Integer update(Conversation conversation) {
        return conversationMapper.updateByPrimaryKey(conversation);
    }
}

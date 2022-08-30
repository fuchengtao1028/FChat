package com.example.f_chat.service.impl;

import com.example.f_chat.dao.MessageMapper;
import com.example.f_chat.dao.RelationMapper;
import com.example.f_chat.entity.Message;
import com.example.f_chat.entity.Relation;
import com.example.f_chat.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageMapper messageMapper;
    @Autowired
    private RelationMapper relationMapper;

    @Override
    public Integer insert(Message message) {
        messageMapper.insert(message);
        return message.getId();
    }

    @Override
    public List<Message> selectReqMsg(Integer id) {
        return messageMapper.selectReqMsg(id);
    }

    @Override
    public List<Message> selectOfflineReqMsg(Integer id) {
        List<Message> messages=messageMapper.selectOfflineReqMsg(id);
        messageMapper.updateOfflineReqMsg(id);
        return messages;
    }

    @Override
    public List<Message> selectOfflineChatMsg(Integer id) {
        List<Message> messages=messageMapper.selectOfflineChatMsg(id);
        messageMapper.updateOfflineChatMsg(id);
        return messages;
    }

    @Override
    public Integer rejReqMsg(Integer id) {
        Message message = messageMapper.selectByPrimaryKey(id);
        message.setStatus(2);
        return messageMapper.updateByPrimaryKey(message);
    }

    @Override
    public Integer accReqMsg(Integer id, String remark) {
        Message message = messageMapper.selectByPrimaryKey(id);
        message.setStatus(1);
        String other_msg=message.getOtherMsg();
        if("".equals(other_msg)||other_msg==null){
            other_msg=null;
        }
        Relation relation1 = new Relation(null,message.getFromId(),message.getToId(),other_msg);
        Relation relation2 = new Relation(null,message.getToId(),message.getFromId(),remark);
        relationMapper.insert(relation1);
        relationMapper.insert(relation2);
        messageMapper.updateByPrimaryKey(message);
        return 1;
    }

    @Override
    public Message selectById(Integer id) {
        return messageMapper.selectByPrimaryKey(id);
    }

    @Override
    public Boolean isAlready(Integer id1, Integer id2) {
        return messageMapper.selectAlready(id1, id2).size()>0;
    }
}

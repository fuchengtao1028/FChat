package com.example.f_chat.controller;

import com.example.f_chat.entity.Conversation;
import com.example.f_chat.entity.Message;
import com.example.f_chat.entity.ReturnMsg;
import com.example.f_chat.service.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/conversation")
public class ConversationController {
    @Autowired
    private ConversationService conversationService;

    @RequestMapping(value = "/conversation/{id}",method = RequestMethod.GET)
    public ReturnMsg selectConversations(@PathVariable Integer id){
        List<Conversation> conversationList=conversationService.selectConversations(id);
        return ReturnMsg.success().add("ConversationList",conversationList);
    }

    @RequestMapping(value = "/conversation",method = RequestMethod.GET)
    public ReturnMsg selectConversationByMsg(@RequestParam Integer msg_id){
        Conversation conversation=conversationService.selectConversationByMsgId(msg_id);
        return ReturnMsg.success().add("Conversation",conversation);
    }

    @RequestMapping(value = "/conversation/plus",method = RequestMethod.GET)
    public ReturnMsg selectConversationById(@RequestParam Integer conversation_id){
        Conversation conversation=conversationService.selectConversationById(conversation_id);
        return ReturnMsg.success().add("Conversation",conversation);
    }

    @RequestMapping(value = "/conversation/{id1}/{id2}",method = RequestMethod.GET)
    public ReturnMsg selectConversation(@PathVariable Integer id1,@PathVariable Integer id2){
        Conversation conversation=conversationService.selectConversation(id1,id2);
        return ReturnMsg.success().add("Conversation",conversation);
    }

    @RequestMapping(value = "/conversation/view",method = RequestMethod.PUT)
    public ReturnMsg updateConversationViewFlag(@RequestParam Integer conversation_id,@RequestParam Integer target,@RequestParam Integer value){
        Conversation conversation=conversationService.selectConversationById(conversation_id);
        if(target==1){
            conversation.setFirstView(value);
        }else{
            conversation.setSecondView(value);
        }
        conversationService.update(conversation);
        return ReturnMsg.success();
    }
}

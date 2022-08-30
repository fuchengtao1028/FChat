package com.example.f_chat.controller;

import com.example.f_chat.entity.Message;
import com.example.f_chat.entity.ReturnMsg;
import com.example.f_chat.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/message")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @RequestMapping(value = "/reqMessage/{id}",method = RequestMethod.GET)
    public ReturnMsg selectReqMsg(@PathVariable("id") Integer id){
        List<Message> reqMsgList = messageService.selectReqMsg(id);
        return ReturnMsg.success().add("ReqMsgList",reqMsgList);
    }

    @RequestMapping(value = "/reqMessage/offline/{id}",method = RequestMethod.GET)
    public ReturnMsg selectOffLineReqMsg(@PathVariable("id") Integer id){
        List<Message> offlineReqMsgList = messageService.selectOfflineReqMsg(id);
        return ReturnMsg.success().add("OfflineReqMsgList",offlineReqMsgList);
    }

    @RequestMapping(value = "/chatMessage/offline/{id}",method = RequestMethod.GET)
    public ReturnMsg selectOffLineChatMsg(@PathVariable("id") Integer id){
        List<Message> offlineChatMsgList = messageService.selectOfflineChatMsg(id);
        return ReturnMsg.success().add("OfflineChatMsgList",offlineChatMsgList);
    }


    @RequestMapping(value = "/reqMessage/rej/{id}",method = RequestMethod.PUT)
    public ReturnMsg rejReqMsg(@PathVariable("id") Integer id){
        Integer result = messageService.rejReqMsg(id);
        if(result>0){
            return ReturnMsg.success();
        }
        return ReturnMsg.fail();
    }

    @RequestMapping(value = "/reqMessage/acc/{id}",method = RequestMethod.PUT)
    public ReturnMsg rejReqMsg(@PathVariable("id") Integer id,@RequestParam("remark") String remark){
        if("".equals(remark))remark=null;
        messageService.accReqMsg(id,remark);
        return ReturnMsg.success();
    }
}

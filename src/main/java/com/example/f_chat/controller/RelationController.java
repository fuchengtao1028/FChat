package com.example.f_chat.controller;

import com.example.f_chat.entity.Relation;
import com.example.f_chat.entity.ReturnMsg;
import com.example.f_chat.service.MessageService;
import com.example.f_chat.service.RelationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/relation")
public class RelationController {
    @Autowired
    private RelationService relationService;
    @Autowired
    private MessageService messageService;

    @RequestMapping(value = "/relation/{id1}/{id2}",method = RequestMethod.GET)
    public ReturnMsg selectRlt(@PathVariable("id1") Integer id1,@PathVariable("id2") Integer id2){
        Relation relation = relationService.selectByIds(id1, id2);
        if(relation==null){
            if(messageService.isAlready(id1, id2)){
                return ReturnMsg.success().add("msg","申请已存在，请勿重复提交");
            }
            return ReturnMsg.fail();
        }
        return ReturnMsg.success().add("msg","你们已经是好友了！");
    }

    @RequestMapping(value = "/relation/{id}",method = RequestMethod.GET)
    public ReturnMsg selectRlts(@PathVariable("id") Integer id){
        List<Relation> relations = relationService.selectByHost(id);
        return ReturnMsg.success().add("RelationList",relations);
    }

    @RequestMapping(value = "/relation",method = RequestMethod.GET)
    public ReturnMsg selectRltByIds(@RequestParam("id1") Integer id1, @RequestParam("id2") Integer id2){
        Relation relation = relationService.selectByIds(id1, id2);
        if(relation==null){
            return ReturnMsg.fail();
        }
        return ReturnMsg.success().add("Relation",relation);
    }

    @RequestMapping(value = "/relation",method = RequestMethod.PUT)
    public ReturnMsg updateRemark(@RequestParam("id1") Integer id1, @RequestParam("id2") Integer id2, @RequestParam("new_name") String new_name){
        relationService.updateRemarkByIds(id1, id2,new_name);
        return ReturnMsg.success();
    }
}

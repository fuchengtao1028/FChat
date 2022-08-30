package com.example.f_chat.controller;

import com.example.f_chat.entity.ReturnMsg;
import com.example.f_chat.service.RedisHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/redis")
public class RedisController {
    @Autowired
    private RedisHelper redisHelper;

    @RequestMapping(value = "/unread",method = RequestMethod.POST)
    public ReturnMsg addKey(String key){
        redisHelper.valuePut(key,0);
        return ReturnMsg.success();
    }

    @RequestMapping(value = "/unread",method = RequestMethod.DELETE)
    public ReturnMsg deleteKey(String key){
        redisHelper.remove(key);
        return ReturnMsg.success();
    }

    @RequestMapping(value = "/unread",method = RequestMethod.GET)
    public ReturnMsg getV(String key){
        Integer value=(Integer) redisHelper.getValue(key);
        return ReturnMsg.success().add("Value",value);
    }
}

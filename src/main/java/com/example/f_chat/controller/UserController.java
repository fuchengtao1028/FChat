package com.example.f_chat.controller;

import com.example.f_chat.entity.ReturnMsg;
import com.example.f_chat.entity.User;
import com.example.f_chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @RequestMapping(value = "/user",method = RequestMethod.PUT)
    public ReturnMsg updateUser(User user){
        return userService.update(user);
    }

    @RequestMapping(value = "/user/{id}",method = RequestMethod.GET)
    public ReturnMsg selectUser(@PathVariable Integer id){
        return userService.selectUser(id);
    }

    @RequestMapping(value = "/user",method = RequestMethod.GET)
    public ReturnMsg selectAllUser(){
        return userService.selectAllUser();
    }

    @RequestMapping(value = "/Friend",method = RequestMethod.GET)
    public ReturnMsg selectFriends(@RequestParam("id")Integer id){
        return userService.selectFriends(id);
    }

    @RequestMapping(value = "/user/number/{number}",method = RequestMethod.GET)
    public ReturnMsg selectByNumber(@PathVariable("number") String number){
        return userService.selectByNumber(number);
    }

}

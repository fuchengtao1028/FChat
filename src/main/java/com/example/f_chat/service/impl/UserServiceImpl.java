package com.example.f_chat.service.impl;

import com.example.f_chat.dao.RelationMapper;
import com.example.f_chat.dao.UserMapper;
import com.example.f_chat.entity.ReturnMsg;
import com.example.f_chat.entity.User;
import com.example.f_chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public ReturnMsg update(User user) {
        userMapper.updateByPrimaryKey(user);
        return ReturnMsg.success();
    }

    @Override
    public ReturnMsg selectUser(Integer id) {
        User user= userMapper.selectByPrimaryKey(id);
        return ReturnMsg.success().add("newUser",user);
    }

    @Override
    public ReturnMsg selectAllUser() {
        List<User> userList=userMapper.selectAll();
        return ReturnMsg.success().add("UserList",userList);
    }

    @Override
    public ReturnMsg selectFriends(Integer id) {
        List<User> friendList=userMapper.selectFriends(id);
        return ReturnMsg.success().add("FriendList",friendList);
    }

    @Override
    public ReturnMsg selectByNumber(String number) {

        User user = userMapper.selectByNumber(number);
        if(user==null){
           return ReturnMsg.fail();
        }
        return ReturnMsg.success().add("user",user);
    }
}

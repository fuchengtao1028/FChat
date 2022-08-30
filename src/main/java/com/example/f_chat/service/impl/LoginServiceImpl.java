package com.example.f_chat.service.impl;


import com.alibaba.fastjson.JSONObject;
import com.example.f_chat.dao.UserMapper;
import com.example.f_chat.entity.Config;
import com.example.f_chat.entity.ReturnMsg;
import com.example.f_chat.entity.User;
import com.example.f_chat.service.LoginServie;
import com.example.f_chat.util.SessionUtil;
import com.zhenzi.sms.ZhenziSmsClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class LoginServiceImpl implements LoginServie {
    @Autowired
    private UserMapper userMapper;


    @Override
    public ReturnMsg sendSms(String number, String templateId, HttpSession session) {
        try {

            JSONObject json = null;
            //生成6位验证码
            String verifyCode = String.valueOf(new Random().nextInt(899999) + 100000);
            //	System.out.print("验证码: "+verifyCode);
            //发送短信
            ZhenziSmsClient client = new ZhenziSmsClient(Config.apiUrl, Config.appId, Config.appSecret);
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("number", number);
            params.put("templateId", templateId);
            String[] templateParams = {verifyCode, "5分钟内有效"};
            params.put("templateParams", templateParams);
            String result = client.send(params);
            json = JSONObject.parseObject(result);
            if(json.getIntValue("code") != 0){//发送短信失败
                return ReturnMsg.fail();

            }
            //将验证码存到session中,同时存入创建时间
            SessionUtil.save(session, number, verifyCode, 5 * 60);
            return ReturnMsg.success();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ReturnMsg.fail();
    }

    @Override
    public ReturnMsg vMes(String number, String verifyCode, HttpSession session) {
        String error = SessionUtil.validate(session, number, verifyCode);
      //  System.out.println(error);
        if(!error.equals("")){
           return ReturnMsg.fail();
        }
        //其他业务代码
        return ReturnMsg.success();
    }

    @Override
    public ReturnMsg selectByNumber(String number, HttpSession session) {
        int flag=0;//0表示该用户是老用户，1表示该用户首次登陆
        User user = userMapper.selectByNumber(number);
        if(user==null){
            userMapper.insert(new User(number));
            user=userMapper.selectByNumber(number);
            flag=1;
        }
        session.setAttribute("user",user.getId());
        return ReturnMsg.success().add("user",user).add("flag",flag);
    }

}

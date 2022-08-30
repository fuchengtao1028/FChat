package com.example.f_chat.ws;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.f_chat.entity.Conversation;
import com.example.f_chat.entity.Message;
import com.example.f_chat.service.ConversationService;
import com.example.f_chat.service.MessageService;
import com.example.f_chat.service.RedisHelper;
import com.example.f_chat.util.MessageUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;


import javax.annotation.PostConstruct;
import javax.servlet.http.HttpSession;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.Map;

import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint(value = "/chat/{param}",configurator = GetHttpSessionConfigurator.class)
@Component

public class ChatEndPoint {
    @Autowired
    private MessageService messageService;
    @Autowired
    private ConversationService conversationService;
    @Autowired
    private RedisHelper redisHelper;
    private static ChatEndPoint chatEndPoint;
    //用线程安全的map来保存当前用户
    private static Map<Integer,ChatEndPoint> onLineUsers = new ConcurrentHashMap<>();
    //声明一个session对象，通过该对象可以发送消息给指定用户，不能设置为静态，每个ChatEndPoint有一个session才能区分.(websocket的session)
    private Session session;
    //保存当前登录浏览器的用户
    private HttpSession httpSession;

    @PostConstruct
    public void init() {
        chatEndPoint = this;
        // 初使化时将已静态化的configParam实例化
        chatEndPoint.messageService = this.messageService;
        chatEndPoint.conversationService=this.conversationService;
        chatEndPoint.redisHelper=this.redisHelper;
    }


    //建立连接时发送系统广播
    @OnOpen
    public void onOpen(Session session, @PathParam("param") String param){

            this.session = session;
//            HttpSession httpSession = (HttpSession) config.getUserProperties().get(HttpSession.class.getName());
//            this.httpSession = httpSession;
//            Integer userId = (Integer) httpSession.getAttribute("user");
//            if(userId !=null){
//                onLineUsers.put(userId,this);
//            }
       // System.out.println(param);
        onLineUsers.put(Integer.parseInt(param),this);

    }

    //用户之间的信息发送
    @OnMessage
    public void onMessage(String message,Session session){
        try{

            ObjectMapper mapper = new ObjectMapper();
            Message mess = mapper.readValue(message,Message.class);
            Integer toId = mess.getToId();
            if(toId!=null) {
                Integer cid=mess.getConversationId();
                System.out.println(chatEndPoint.redisHelper.getValue(toId+"-"+cid));
                if(mess.getType()!=1&&mess.getConversationId()==null){
                    cid=chatEndPoint.conversationService.insert(new Conversation(null,mess.getFromId(),mess.getToId(),1,0));
                    chatEndPoint.redisHelper.valuePut(toId+"-"+cid,0);
                    mess.setConversationId(cid);
                }
                if(mess.getType()!=1&&mess.getConversationId()!=null){
                    if(chatEndPoint.redisHelper.hasKey(toId+"-"+cid)){
                        chatEndPoint.redisHelper.valuePut(toId+"-"+cid,(Integer) chatEndPoint.redisHelper.getValue(toId+"-"+cid)+1);
                    }else{
                        chatEndPoint.redisHelper.valuePut(toId+"-"+cid,1);
                    }
                }
                if(onLineUsers.get(toId)==null){
                   // mess.setIsPush(1);
                    chatEndPoint.messageService.insert(mess);
                }else{
                    mess=chatEndPoint.messageService.selectById(chatEndPoint.messageService.insert(mess));
                    if(mess.getType()!=1){
                        Conversation conversation = chatEndPoint.conversationService.selectConversationById(mess.getConversationId());
                        if(conversation.getFirstId()== toId && conversation.getFirstView() ==1){
                            conversation.setFirstView(0);
                            chatEndPoint.conversationService.update(conversation);
                        }else if( conversation.getSecondId() == toId && conversation.getSecondView() == 1){
                            conversation.setSecondView(0);
                            chatEndPoint.conversationService.update(conversation);
                        }
                    }
                    onLineUsers.get(toId).session.getBasicRemote().sendText(mapper.writeValueAsString(mess));
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }
    //用户断开连接的断后操作
    @OnClose
    public void onClose(Session session){

        Integer userId=Integer.parseInt(session.getRequestParameterMap().get("param").get(0));
        System.out.println(userId);
//        if(httpSession==null)return;
//        Integer userId = (Integer) httpSession.getAttribute("user");
//
        if (userId != null){
            onLineUsers.remove(userId);

        }
//        httpSession.removeAttribute("user");
    }


    @OnError
    public void onError(Throwable throwable, Session session) {
        System.out.println("onError "+throwable.toString());
    }


}

package com.example.f_chat.util;


import com.example.f_chat.entity.ResultMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


//封装发送的消息内容
public class MessageUtils {
    public static String getMessage(boolean isSystemMessage,Integer fromId,Object message){
        try{
            ResultMessage resultMessage = new ResultMessage();
            resultMessage.setSystem(isSystemMessage);
            resultMessage.setMessage(message);
            if(fromId != null){
                resultMessage.setFromId(fromId);
            }
//            if(toName !=null ){
//                resultMessage.setToName(toName);
//            }
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(resultMessage);
        }catch (JsonProcessingException e){
            e.printStackTrace();
        }
        return null;
    }
}

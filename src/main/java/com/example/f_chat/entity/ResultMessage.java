package com.example.f_chat.entity;



//用户间传送的消息
public class ResultMessage {
    private boolean isSystem;
    private Integer fromId;
    //private String toName;
    private Object message;

    public boolean isSystem() {
        return isSystem;
    }

    public void setSystem(boolean system) {
        isSystem = system;
    }

    public Integer getFromId() {
        return fromId;
    }

    public void setFromId(Integer fromId) {
        this.fromId = fromId;
    }

    public Object getMessage() {
        return message;
    }

    public void setMessage(Object message) {
        this.message = message;
    }

    public ResultMessage() {
    }

    public ResultMessage(boolean isSystem, Integer fromId, Object message) {
        this.isSystem = isSystem;
        this.fromId = fromId;
        this.message = message;
    }
}

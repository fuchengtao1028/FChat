package com.example.f_chat.entity;

import java.util.HashMap;
import java.util.Map;

/**
 * 用于标识异步请求的操作结果
 */
public class ReturnMsg {
    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getTarget() {
        return target;
    }

    public  void setTarget(String target) {
        this.target = target;
    }




    public Map<String, Object> getExtend() {
        return extend;
    }
    //用户要返回的数据
    public void setExtend(Map<String, Object> extend) {
        this.extend = extend;
    }
    private String target;//网站地址
    private Integer code;//状态码100-成功，200-失败
    private String msg;//提示信息



    private Map<String,Object> extend = new HashMap<String,Object>();//需要返回的操作结果数据
    public static ReturnMsg success(){
        ReturnMsg result=new ReturnMsg();
        result.setCode(100);
        result.setMsg("操作成功！");
        return result;
    }

    public static ReturnMsg fail(){
        ReturnMsg result=new ReturnMsg();
        result.setCode(200);
        result.setMsg("操作失败！");
        return result;
    }
    public static ReturnMsg except(){
        ReturnMsg result=new ReturnMsg();
        result.setCode(300);
        result.setMsg("出现异常！");
        return result;
    }

    public ReturnMsg add(String key, Object value){
        this.getExtend().put(key,value);
        return this;
    }
}

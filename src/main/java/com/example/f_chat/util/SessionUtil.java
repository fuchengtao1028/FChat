package com.example.f_chat.util;

import javax.servlet.http.HttpSession;

public class SessionUtil {
    /**
     * 保存验证码信息
     * @param session 
     * @param mobile  手机号码
     * @param code  验证码
     * @param expire 有效时间，单位(秒)
     */
	public static void save(
			HttpSession session,
			String mobile,
			String code,
			int expire){
		session.setAttribute("zhenzisms_mobile", mobile);
		session.setAttribute("zhenzisms_code", code);
		session.setAttribute("zhenzisms_createTime", System.currentTimeMillis());
		session.setAttribute("zhenzisms_expire", expire);
	}
	/**
     * 校验验证码
     * @param session 
     * @param mobile  手机号码
     * @param code  验证码
    // * @param expire 有效时间，单位(秒)
     */
	public static String validate(
			HttpSession session,
			String mobile,
			String code){
		String sessionMobile = blank(session.getAttribute("zhenzisms_mobile"));
		String sessionCode = blank(session.getAttribute("zhenzisms_code"));
		String createTime = blank(session.getAttribute("zhenzisms_createTime"));
		String expire = blank(session.getAttribute("zhenzisms_expire"));
		if(sessionMobile.equals(""))
			return "未生成验证码";
		if(!sessionMobile.equals(mobile)){
			return "手机号错误";
		}
		if(!sessionCode.equals(code)){
			return "验证码错误";
		}
		if((System.currentTimeMillis() - Long.parseLong(createTime)) > 1000 * Integer.parseInt(expire)){
			return "验证码已过期";
		}
		save(session, "", "", 0);
		return "";
	}
	private static String blank(Object s){
		if(s == null)
			return "";
		return s.toString();
	}
}

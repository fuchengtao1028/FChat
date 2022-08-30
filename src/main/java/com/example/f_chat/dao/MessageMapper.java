package com.example.f_chat.dao;

import com.example.f_chat.entity.Message;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface MessageMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table message
     *
     * @mbg.generated Sat Jul 30 21:19:55 CST 2022
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table message
     *
     * @mbg.generated Sat Jul 30 21:19:55 CST 2022
     */
    int insert(Message record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table message
     *
     * @mbg.generated Sat Jul 30 21:19:55 CST 2022
     */
    Message selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table message
     *
     * @mbg.generated Sat Jul 30 21:19:55 CST 2022
     */
    List<Message> selectAll();
    List<Message> selectAlready(@Param("id1") Integer id1,@Param("id2") Integer id2);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table message
     *
     * @mbg.generated Sat Jul 30 21:19:55 CST 2022
     */
    int updateByPrimaryKey(Message record);

    List<Message> selectReqMsg(Integer id);

    List<Message> selectOfflineReqMsg(Integer id);

    int updateOfflineReqMsg(Integer id);

    List<Message> selectOfflineChatMsg(Integer id);

    int updateOfflineChatMsg(Integer id);

    Message selectLast(Integer id);

    List<Message> selectMsgByConversationId(Integer id);
}
package com.example.f_chat.service;

import com.example.f_chat.entity.Relation;

import java.util.List;

public interface RelationService {
    public Relation selectByIds(Integer id1,Integer id2);
    public Integer updateRemarkByIds(Integer id1,Integer id2,String new_name);
    public List<Relation> selectByHost(Integer u_host);
}

package com.example.f_chat.service.impl;

import com.example.f_chat.dao.RelationMapper;
import com.example.f_chat.entity.Relation;
import com.example.f_chat.service.RelationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RelationServiceImpl implements RelationService {
    @Autowired
    private RelationMapper relationMapper;

    @Override
    public Relation selectByIds(Integer id1, Integer id2) {
       return relationMapper.selectByIds(id1, id2);
    }

    @Override
    public Integer updateRemarkByIds(Integer id1, Integer id2,String new_name) {
        Relation relation = relationMapper.selectByIds(id1, id2);
        relation.setRemarks(new_name);
        relationMapper.updateByPrimaryKey(relation);
        return 1;
    }

    @Override
    public List<Relation> selectByHost(Integer u_host) {
        return relationMapper.selectByHost(u_host);
    }
}

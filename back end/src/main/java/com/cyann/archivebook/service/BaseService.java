package com.cyann.archivebook.service;

import com.cyann.archivebook.model.BaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.sql.Timestamp;

/**
 * @author CYann
 * @date 2018-02-26 20:48
 */

@Service
public class BaseService {
    public void delete (JpaRepository repository , BaseEntity baseEntity){
        Timestamp time =new Timestamp(new Date().getTime());
        baseEntity.setDelTime(time);
        repository.save(baseEntity);
    }
}

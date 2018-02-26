package com.cyann.archivebook.service;

import com.cyann.archivebook.respository.UserRespository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * @author CYann
 * @date 2018-02-26 20:38
 */
@Service
public class UserService {
    @Autowired
    private UserRespository userRespository;

    //增加用户
    public void add(User user){
        userRespository.save(user);
    }

    //删除用户
    @Transactional
    public void delete(User user){

    }


}

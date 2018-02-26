package com.cyann.archivebook.respository;

import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author CYann
 * @date 2018-02-26 20:43
 */


public interface UserRespository extends JpaRepository<User,String>{
}

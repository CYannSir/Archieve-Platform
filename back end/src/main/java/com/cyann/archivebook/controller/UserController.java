package com.cyann.archivebook.controller;

import com.cyann.archivebook.respository.UserRespository;
import com.cyann.archivebook.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author CYann
 * @date 2018-02-26 20:30
 */
@RestController
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

}

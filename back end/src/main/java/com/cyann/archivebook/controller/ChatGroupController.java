package com.cyann.archivebook.controller;

import com.cyann.archivebook.service.ChatGroupService;
import com.cyann.archivebook.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author CYann
 * @date 2018-04-01 19:15
 */
@RestController
@CrossOrigin
public class ChatGroupController {
    @Autowired
    private ChatGroupService chatGroupService;
    @Autowired
    private UserService userService;


}

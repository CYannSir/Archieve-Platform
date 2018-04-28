package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.CurrentUserModel;
import com.cyann.archivebook.service.CurrentUserService;
import com.cyann.archivebook.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @author CYann
 * @date 2018-04-01 19:15
 */
@RestController
@CrossOrigin
public class CurrentUserController {
    @Autowired
    private CurrentUserService currentUserService;

    //增加用户
    @PostMapping(value = "/addcurrentuser")
    public Result addUser(@RequestBody CurrentUserModel currentUserModel){
        currentUserService.add(currentUserModel);
        return Result.success();
    }





}

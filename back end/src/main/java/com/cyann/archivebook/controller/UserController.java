package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.UserModel;
import com.cyann.archivebook.service.UserService;
import com.cyann.archivebook.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    //用户更改基础信息-联系方式
    @PostMapping(value = "/changeuserinfor")
    public Result changeUserInfor(UserModel userModel){
        userService.updateInfor(userModel);
        return Result.success();
    }
    /*
    //用户修改自己的密码
    @PostMapping(value = "/changemypwd")
    public Result changeMyPwd(UserModel userModel, @RequestParam("newPwd") String newPwd){
        userService.updateMyPwd(userModel ,newPwd);
        return Result.success();
    }
    */
}

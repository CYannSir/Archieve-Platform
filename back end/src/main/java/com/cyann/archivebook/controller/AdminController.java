package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.UserModel;
import com.cyann.archivebook.service.UserService;
import com.cyann.archivebook.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author CYann
 * @date 2018-02-27 22:26
 */
@RestController
@CrossOrigin
public class AdminController {
    @Autowired
    private UserService userService;
    /*
     *所有用户操作 - Start 待添加
    */

    //增加用户
    @PostMapping(value = "/adduser")
    public Result addUser(UserModel userModel){
        userService.add(userModel);
        return Result.success();
    }

    //删除用户
    @PostMapping(value = "/deleteuser")
    public Result deletUser(UserModel userModel){
        userService.delete(userModel);
        return Result.success();
    }

    //修改用户权限
    @PostMapping(value = "/edituserpower")
    public Result editUserPower(UserModel userModel){
        userService.updatePower(userModel);
        return Result.success();
    }

    //帮助用户重置密码
    @PostMapping(value = "/edituserpwd")
    public Result editUserPwd(UserModel userModel){
        userService.updatePwd(userModel);
        return Result.success();
    }

    /*
     *所有用户操作 - End 待添加
     */



}

package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.UserModel;
import com.cyann.archivebook.service.UserService;
import com.cyann.archivebook.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author CYann
 * @date 2018-02-26 20:30
 */
@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    //用户信息展示
    @PostMapping(value = "/listuserinfor")
    public Result listUserInfor(UserModel userModel){
        userService.findById(userModel.getObjectId());
        return Result.success();
    }


    //用户更改基础信息-联系方式
    @PostMapping(value = "/changeuserinfor")
    public Result changeUserInfor(UserModel userModel){
        userService.updateInfor(userModel);
        return Result.success();
    }


}

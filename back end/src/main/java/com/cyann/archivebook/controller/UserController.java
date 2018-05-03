package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.CurrentUserModel;
import com.cyann.archivebook.model.UserModel;
import com.cyann.archivebook.service.CurrentUserService;
import com.cyann.archivebook.service.UserService;
import com.cyann.archivebook.util.Result;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

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
    @Autowired
    private CurrentUserService currentUserService;

    //用户信息展示
    @GetMapping(value = "/listuserinfor")
    public Result listUserInfor(){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String objectId = (String) request.getSession().getAttribute("ID");
        CurrentUserModel item = currentUserService.findByObjectId(objectId);
        UserModel userinfor = userService.findByStuNumber(item.getStuNumber());
        return Result.success(userinfor);
    }



    //用户更改基础信息-联系方式
    @PostMapping(value = "/changeuserinfor")
    public Result changeUserInfor(UserModel userModel){
        userService.updateInfor(userModel);
        return Result.success();
    }


}

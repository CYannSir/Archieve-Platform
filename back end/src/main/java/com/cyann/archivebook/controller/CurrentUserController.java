package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.CurrentUserModel;
import com.cyann.archivebook.service.CurrentUserService;
import com.cyann.archivebook.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @GetMapping(value = "/currentUser")
    public Result currentUser(){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String objectId = (String) request.getSession().getAttribute("ID");
        CurrentUserModel item = currentUserService.findByObjectId(objectId);
        Map result = new HashMap();
        result.put("name", item.getStuName());
        result.put("avatar", "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png");
        result.put("notifyCount", 12); //消息功能推出时进行更正，目前写死
        result.put("userid", item.getObjectId());
        return Result.success(result);
    }





}

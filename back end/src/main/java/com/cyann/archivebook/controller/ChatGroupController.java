package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.ChatGroupModel;
import com.cyann.archivebook.model.CurrentUserModel;
import com.cyann.archivebook.model.UserModel;
import com.cyann.archivebook.service.ChatGroupService;
import com.cyann.archivebook.service.CurrentUserService;
import com.cyann.archivebook.service.UserService;
import com.cyann.archivebook.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author CYann
 * @date 2018-04-01 19:15
 */
@RestController
@CrossOrigin
@RequestMapping("/user")
public class ChatGroupController {
    @Autowired
    private ChatGroupService chatGroupService;
    @Autowired
    private CurrentUserService currentUserService;
    @Autowired
    private UserService userService;

    //根据 专业和毕业时间查询交流群
    @GetMapping(value = "/listchatgroup")
    public Result listUserChatGroup(){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String objectId = (String) request.getSession().getAttribute("ID");
        CurrentUserModel item = currentUserService.findByObjectId(objectId);
        UserModel userModel = userService.findByStuNumber(item.getStuNumber());
        return Result.success(chatGroupService.findByStuMajorAndAndStuEndYear(userModel.getStuMajor(),userModel.getStuEndYear()));
    }


}

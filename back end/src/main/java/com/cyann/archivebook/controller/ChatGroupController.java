package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.ChatGroupModel;
import com.cyann.archivebook.service.ChatGroupService;
import com.cyann.archivebook.service.UserService;
import com.cyann.archivebook.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    private UserService userService;

    //根据 专业和毕业时间查询交流群
    @PostMapping(value = "/listchatgroup")
    public Result listUserChatGroup(@RequestBody ChatGroupModel chatGroupModel){
        return Result.success(chatGroupService.findByStuMajorAndAndStuEndYear(chatGroupModel.getStuMajor(),chatGroupModel.getStuEndYear()));
    }


}

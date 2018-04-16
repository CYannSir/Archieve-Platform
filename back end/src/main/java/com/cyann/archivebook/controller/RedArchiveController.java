package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.RedArchiveModel;
import com.cyann.archivebook.model.UserModel;
import com.cyann.archivebook.service.RedArchiveService;
import com.cyann.archivebook.service.UserService;
import com.cyann.archivebook.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author CYann
 * @date 2018-04-01 19:14
 */
@RestController
@CrossOrigin
@RequestMapping("/user")
public class RedArchiveController {
    @Autowired
    private RedArchiveService redArchiveService;
    @Autowired
    private UserService userService;


    //新增红色档案
    @PostMapping(value = "/addredarchive")
    public Result addRedArchiver(RedArchiveModel redArchiveModel){
        redArchiveService.add(redArchiveModel);
        return Result.success();
    }

    //展示红色档案
    @PostMapping(value = "/listredarchive")
    public Result listRedArchiver(@RequestParam("objectId") String objectId){
        UserModel userModel = userService.findById(objectId);
        List<RedArchiveModel> list = redArchiveService.findByStuNumber(userModel.getStuNumber());
        return Result.success(list);
    }

}

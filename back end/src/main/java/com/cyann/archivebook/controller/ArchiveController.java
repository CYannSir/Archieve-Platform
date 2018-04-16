package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.ArchiveModel;
import com.cyann.archivebook.model.UserModel;
import com.cyann.archivebook.service.ArchiveService;
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
public class ArchiveController {
    @Autowired
    private ArchiveService archiveService;
    @Autowired
    private UserService userService;

    //新增档案
    @PostMapping(value = "/addarchive")
    public Result addArchiver(ArchiveModel archiveModel){
        archiveService.add(archiveModel);
        return Result.success();
    }

    //展示档案
    @PostMapping(value = "/listarchive")
    public Result listArchiver(ArchiveModel archiveModel,@RequestParam("objectId") String objectId){
        UserModel userModel = userService.findById(objectId);
        List<ArchiveModel> list = archiveService.findByStuNumber(userModel.getStuNumber());
        return Result.success(list);
    }




}

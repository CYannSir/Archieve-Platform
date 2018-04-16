package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.PracticeInforModel;
import com.cyann.archivebook.model.UserModel;
import com.cyann.archivebook.service.PracticeInforService;
import com.cyann.archivebook.service.UserService;
import com.cyann.archivebook.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.jnlp.PersistenceService;
import java.util.List;

/**
 * @author CYann
 * @date 2018-04-01 19:15
 */
@RestController
@CrossOrigin
public class PracticeInforController {
    @Autowired
    private PracticeInforService practiceInforService;
    @Autowired
    private UserService userService;


    //新增实习生信息
    @PostMapping(value = "/addpractice")
    public Result addPracticeInfor(PracticeInforModel practiceInforModel){
        practiceInforService.add(practiceInforModel);
        return Result.success();
    }

    //展示实习生信息
    @PostMapping(value = "/listpractice")
    public Result listPracticeInfor(@RequestParam("objectId") String objectId){
        UserModel userModel = userService.findById(objectId);
        List<PracticeInforModel> list = practiceInforService.findByStuNum(userModel.getStuNumber());
        return Result.success(list);
    }



}

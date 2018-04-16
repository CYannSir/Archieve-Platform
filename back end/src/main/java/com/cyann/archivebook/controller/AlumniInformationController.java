package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.AlumniInformationModel;
import com.cyann.archivebook.model.UserModel;
import com.cyann.archivebook.service.AlumniInformationService;
import com.cyann.archivebook.service.UserService;
import com.cyann.archivebook.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author CYann
 * @date 2018-04-01 19:15
 */
@RestController
@CrossOrigin
public class AlumniInformationController {
    @Autowired
    private AlumniInformationService alumniInformationService;
    @Autowired
    private UserService userService;

    //新增校友信息
    @PostMapping(value = "/addalumni")
    public Result addAlumniInfor(AlumniInformationModel alumniInformationModel){
        alumniInformationService.add(alumniInformationModel);
        return Result.success();
    }

    //展示校友信息
    @PostMapping(value = "/listalumni")
    public Result listAlumniInfor(@RequestParam("objectId") String objectId){
        UserModel userModel = userService.findById(objectId);
        List<AlumniInformationModel> list = alumniInformationService.findByStuNum(userModel.getStuNumber());
        return Result.success(list);
    }



}

package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.AlumniInformationModel;
import com.cyann.archivebook.model.CurrentUserModel;
import com.cyann.archivebook.model.UserModel;
import com.cyann.archivebook.service.AlumniInformationService;
import com.cyann.archivebook.service.CurrentUserService;
import com.cyann.archivebook.service.UserService;
import com.cyann.archivebook.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author CYann
 * @date 2018-04-01 19:15
 */
@RestController
@CrossOrigin
@RequestMapping("/user")
public class AlumniInformationController {
    @Autowired
    private AlumniInformationService alumniInformationService;
    @Autowired
    private CurrentUserService currentUserService;

    //新增校友信息
    @PostMapping(value = "/addalumni")
    public Result addUserAlumniInfor(@RequestBody AlumniInformationModel alumniInformationModel){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String objectId = (String) request.getSession().getAttribute("ID");
        CurrentUserModel item = currentUserService.findByObjectId(objectId);
        alumniInformationModel.setStuNumber(item.getStuNumber());
        alumniInformationService.add(alumniInformationModel);
        return Result.success();
    }

    //展示校友信息
    @GetMapping(value = "/listalumni")
    public Result listUserAlumniInfor(){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String objectId = (String) request.getSession().getAttribute("ID");
        CurrentUserModel item = currentUserService.findByObjectId(objectId);
        List<AlumniInformationModel> list = alumniInformationService.findByStuNum(item.getStuNumber());
        List<Map> mapList = new ArrayList();
        for(int i=0;i<list.size();i++){
            Map tempMap = new HashMap();
            AlumniInformationModel alumniInformationModel = list.get(i);
            tempMap.put("company",alumniInformationModel.getCompany());
            tempMap.put("companyAddress",alumniInformationModel.getCompanyAddress());
            tempMap.put("industry",alumniInformationModel.getIndustry());
            tempMap.put("occupation",alumniInformationModel.getOccupation());
            tempMap.put("salary",alumniInformationModel.getSalary());
            // tempMap.put("createTime",alumniInformationModel.getCreatTime());
            mapList.add(tempMap);
        }
        return Result.success(mapList);
    }



}

package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.CurrentUserModel;
import com.cyann.archivebook.model.RedArchiveModel;
import com.cyann.archivebook.model.UserModel;
import com.cyann.archivebook.service.CurrentUserService;
import com.cyann.archivebook.service.RedArchiveService;
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
 * @date 2018-04-01 19:14
 */
@RestController
@CrossOrigin
@RequestMapping("/user")
public class RedArchiveController {
    @Autowired
    private RedArchiveService redArchiveService;
    @Autowired
    private CurrentUserService currentUserService;


    //展示红色档案
    @GetMapping(value = "/listredarchive")
    public Result listUserRedArchive(){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String objectId = (String) request.getSession().getAttribute("ID");
        CurrentUserModel item = currentUserService.findByObjectId(objectId);
        List<RedArchiveModel> list = redArchiveService.findByStuNumber(item.getStuNumber());
        List<Map> mapList = new ArrayList();
        for(int i=0;i<list.size();i++){
            Map tempMap = new HashMap();
            RedArchiveModel redArchiveModel = list.get(i);
            tempMap.put("joinDate",redArchiveModel.getJoinDate());
            tempMap.put("activistDate",redArchiveModel.getActivistDate());
            tempMap.put("introducer",redArchiveModel.getIntroducer());
            tempMap.put("introducerB",redArchiveModel.getIntroducerB());
            mapList.add(tempMap);
        }
        return Result.success(mapList);
    }


}

package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.CurrentUserModel;
import com.cyann.archivebook.model.MsgModel;
import com.cyann.archivebook.model.UserModel;
import com.cyann.archivebook.service.AlumniInformationService;
import com.cyann.archivebook.service.CurrentUserService;
import com.cyann.archivebook.service.MsgService;
import com.cyann.archivebook.service.PracticeInforService;
import com.cyann.archivebook.util.Result;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
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
public class CurrentUserController {
    @Autowired
    private CurrentUserService currentUserService;
    @Autowired
    private AlumniInformationService alumniInformationService;
    @Autowired
    private PracticeInforService practiceInforService;
    @Autowired
    private MsgService msgService;

    //增加用户
    @PostMapping(value = "/addcurrentuser")
    public Result addUser(@RequestBody CurrentUserModel currentUserModel){
        currentUserService.add(currentUserModel);
        return Result.success();
    }

    //当前用户
    @GetMapping(value = "/currentUser")
    public Result currentUser(){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String objectId = (String) request.getSession().getAttribute("ID");
        CurrentUserModel item = currentUserService.findByObjectId(objectId);
        List<MsgModel> list = msgService.findByRecUser(item.getLoginEmail());
        Map result = new HashMap();
        result.put("name", item.getStuName());
        result.put("avatar", item.getAvatar());
        result.put("notifyCount", list.size()); //消息功能推出时进行更正，目前写死
        result.put("userid", item.getStuNumber());
        return Result.success(result);
    }

    @GetMapping(value = "/home")
    public Result viewHome(){
        List<Object[]> list = alumniInformationService.findAllAlumniInformation();
        List<Object[]> list2 = practiceInforService.findAllPracticeInformation();
        List<Map> returnList = new ArrayList<>();
        for(int i=0;i<list.size();i++){
            Object[] objects = list.get(i);
            Map tempMap = new HashMap();
            tempMap.put("company",objects[4]);
            tempMap.put("industry",objects[6]);
            tempMap.put("occupation",objects[7]);
            tempMap.put("salary",objects[8]);
            tempMap.put("stuNumber",objects[9]);
            tempMap.put("stuName",objects[11]);
            tempMap.put("stuMajor",objects[12]);
            tempMap.put("stuClass",objects[13]);
            tempMap.put("stuEndYear",objects[15]);
            tempMap.put("currentEmail",objects[16]);
            tempMap.put("currentPhone",objects[17]);
            tempMap.put("avatar","https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png");
            tempMap.put("cover","https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png");
            returnList.add(tempMap);
        }
        for(int i=0;i<list2.size();i++){
            Object[] objects = list.get(i);
            Map tempMap2 = new HashMap();
            tempMap2.put("company",objects[4]);
            tempMap2.put("industry",objects[6]);
            tempMap2.put("occupation",objects[7]);
            tempMap2.put("salary",objects[8]);
            tempMap2.put("stuNumber",objects[9]);
            tempMap2.put("stuName",objects[11]);
            tempMap2.put("stuMajor",objects[12]);
            tempMap2.put("stuClass",objects[13]);
            tempMap2.put("stuEndYear",objects[15]);
            tempMap2.put("currentEmail",objects[16]);
            tempMap2.put("currentPhone",objects[17]);
            tempMap2.put("avatar","https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png");
            tempMap2.put("cover","https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png");
            returnList.add(tempMap2);
        }
        return Result.success(returnList);
    }
    @PostMapping(value = "/home/search")
    public Result searchHome(@RequestBody String value){
        List<Object[]> list = alumniInformationService.search(value,value);
        List<Object[]> list2 = practiceInforService.search(value,value);
        List<Map> returnList = new ArrayList<>();
        for(int i=0;i<list.size();i++){
            Object[] objects = list.get(i);
            Map tempMap = new HashMap();
            tempMap.put("company",objects[4]);
            tempMap.put("industry",objects[6]);
            tempMap.put("occupation",objects[7]);
            tempMap.put("salary",objects[8]);
            tempMap.put("stuNumber",objects[9]);
            tempMap.put("stuName",objects[11]);
            tempMap.put("stuMajor",objects[12]);
            tempMap.put("stuClass",objects[13]);
            tempMap.put("stuEndYear",objects[15]);
            tempMap.put("currentEmail",objects[16]);
            tempMap.put("currentPhone",objects[17]);
            tempMap.put("avatar","https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png");
            tempMap.put("cover","https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png");
            returnList.add(tempMap);
        }
        for(int i=0;i<list2.size();i++){
            Object[] objects = list.get(i);
            Map tempMap2 = new HashMap();
            tempMap2.put("company",objects[4]);
            tempMap2.put("industry",objects[6]);
            tempMap2.put("occupation",objects[7]);
            tempMap2.put("salary",objects[8]);
            tempMap2.put("stuNumber",objects[9]);
            tempMap2.put("stuName",objects[11]);
            tempMap2.put("stuMajor",objects[12]);
            tempMap2.put("stuClass",objects[13]);
            tempMap2.put("stuEndYear",objects[15]);
            tempMap2.put("currentEmail",objects[16]);
            tempMap2.put("currentPhone",objects[17]);
            tempMap2.put("avatar","https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png");
            tempMap2.put("cover","https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png");
            returnList.add(tempMap2);
        }
        return Result.success(returnList);
    }

    //修改密码
    @PostMapping(value = "/modifypwd")
    public Result modifyUserPwd(@RequestBody CurrentUserModel currentUserModel){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String objectId = (String) request.getSession().getAttribute("ID");
        // System.out.println(password);
        currentUserService.updateMyPwd(currentUserModel,currentUserModel.getPassword(),objectId);
        return Result.success();
    }

}

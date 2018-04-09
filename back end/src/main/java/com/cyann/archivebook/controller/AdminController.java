package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.UserModel;
import com.cyann.archivebook.service.FileService;
import com.cyann.archivebook.service.UserService;
import com.cyann.archivebook.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

/**
 * @author CYann
 * @date 2018-02-27 22:26
 */

@RestController
@CrossOrigin
public class AdminController {
    @Autowired
    private UserService userService;
    @Autowired
    private FileService fileService;
    /*
     *所有学生用户操作 Start Here
    */

    //增加用户
    @PostMapping(value = "/addstu")
    public Result addUser(UserModel userModel){
        userService.add(userModel);
        return Result.success();
    }

    //批量增加用户 stuName / stuNumber / stuMajor / stuEndYear / redParty / stuClass / stuPower / stuStartYear
    @PostMapping(value = "/addstubyfile")
    public Result addStuByfile(@RequestParam("file")MultipartFile file){
        if (file != null){
            System.out.println("File Not NULL");
            String fileName = file.getOriginalFilename();
            List<Map<String,String>> list = fileService.viewExcelFile("xlsx",file);
            for (int i=0;i<list.size();i++){
                Map<String,String> tempMap = list.get(i);
                UserModel userModel = new UserModel();
                userModel.setStuName(tempMap.get("stuName"));
                userModel.setStuNumber(tempMap.get("stuNumber"));
                userModel.setStuMajor(tempMap.get("stuMajor"));
                userModel.setStuEndYear(tempMap.get("stuEndYear"));
                userModel.setRedParty(Integer.parseInt(tempMap.get("redParty")));
                userModel.setStuClass(tempMap.get("stuClass"));
                userModel.setStuPower(Integer.parseInt(tempMap.get("stuPower")));
                userModel.setStuStartYear(tempMap.get("stuStartYear"));
                userService.add(userModel);
            }
        } else {
            System.out.println("File is NULL");
        }
        return Result.success();
    }

    //删除用户
    @PostMapping(value = "/deletestu")
    public Result deleteUser(UserModel userModel){
        userService.delete(userModel);
        return Result.success();
    }

    //根据 名字 学号 专业 毕业年份 入学年份 多条件动态查询课程
    @PostMapping(value = "/searchstu")
    public Result searchUser(UserModel userModel){
        userService.findAllByAdvancedForm(userModel);
        return Result.success();
    }

    //修改用户权限
    @PostMapping(value = "/editstupower")
    public Result editUserPower(UserModel userModel){
        userService.updatePower(userModel);
        return Result.success();
    }
    /*
    //帮助用户重置密码
    @PostMapping(value = "/editstupwd")
    public Result editUserPwd(UserModel userModel){
        userService.updatePwd(userModel);
        return Result.success();
    }
    */
    /*
     *所有用户操作 - End 待添加
     */

    /*
     *通过EXCEL 的.xlsx文件添加信息
     */
    /*
    @PostMapping(value = "/addstubyfile")
    public Result addUserByfile(@RequestParam("file")MultipartFile file){
        if (file != null){
            System.out.println("File Not NULL");
            String fileName = file.getOriginalFilename();
            List<Map<String,String>> list = fileService.viewExcelFile("xlsx",file);
            for (int i=0;i<list.size();i++){
                Map<String,String> tempMap = list.get(i);
                User user = new User();
                user.setLogId(tempMap.get("logId"));
                user.setPwd(tempMap.get("pwd"));
                user.setOfficeNum(tempMap.get("officeNum"));
                user.setUserType(tempMap.get("userType"));
                user.setUserName(tempMap.get("userName"));
                userService.add(user);
            }
        } else {
            System.out.println("File is NULL");
        }
        return Result.success();
    }
    */


}

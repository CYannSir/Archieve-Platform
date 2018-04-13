package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.AccountModel;
import com.cyann.archivebook.model.ArchiveModel;
import com.cyann.archivebook.model.UserModel;
import com.cyann.archivebook.service.*;
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
    @Autowired
    private ArchiveService archiveService;
    @Autowired
    private AccountService accountService;
    /*
     *学生用户操作 Start Here
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

    //根据 名字 学号 专业 毕业年份 入学年份 多条件动态查询学生用户
    @PostMapping(value = "/searchstu")
    public Result searchUser(UserModel userModel){
        userService.findAllByAdvancedForm(userModel);
        return Result.success();
    }

    //动态修改更新学生用户
    @PostMapping(value = "/modifystu")
    public Result modifyUser(UserModel userModel){
        userService.update(userModel);
        return Result.success();
    }

    //修改用户权限信息
    @PostMapping(value = "/editstu")
    public Result editUser(UserModel userModel){
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
     *学生用户操作 - End 待添加
     */


    /*
    * 档案信息操作 - Start
    */

    //新增档案
    @PostMapping(value = "/addarchive")
    public Result addArchiver(ArchiveModel archiveModel){
        archiveService.add(archiveModel);
        return Result.success();
    }

    //删除档案
    @PostMapping(value = "/deletearchive")
    public Result deleteArchive(ArchiveModel archiveModel){
        archiveService.delete(archiveModel);
        return Result.success();
    }

    //动态修改更新档案
    @PostMapping(value = "/modifyarchive")
    public Result modifyArchive(ArchiveModel archiveModel){
        archiveService.update(archiveModel);
        return Result.success();
    }

    //根据 学号 目前单位 多条件动态查询档案
    @PostMapping(value = "/searchaccount")
    public Result searchAccount(ArchiveModel archiveModel){
        archiveService.findAllByAdvancedForm(archiveModel);
        return Result.success();
    }

    //批量增加档案  stuNumber / unit / unitAddress / flowDate
    @PostMapping(value = "/addarchviebyfile")
    public Result addArchiveByfile(@RequestParam("file")MultipartFile file){
        if (file != null){
            System.out.println("File Not NULL");
            String fileName = file.getOriginalFilename();
            List<Map<String,String>> list = fileService.viewExcelFile("xlsx",file);
            for (int i=0;i<list.size();i++){
                Map<String,String> tempMap = list.get(i);
                ArchiveModel archiveModel = new ArchiveModel();
                archiveModel.setStuNumber(tempMap.get("stuNumber"));
                archiveModel.setUnit(tempMap.get("unit"));
                archiveModel.setUnitAddress(tempMap.get("unitAddress"));
                archiveModel.setFlowDate(tempMap.get("flowDate"));
                archiveService.add(archiveModel);
            }
        } else {
            System.out.println("File is NULL");
        }
        return Result.success();
    }
    /*
     * 档案信息操作 - End
     */

    /*
     * 户口信息操作 - Start
     */

    //新增户口
    @PostMapping(value = "/addaccount")
    public Result addAccount(AccountModel accountModel){
        accountService.add(accountModel);
        return Result.success();
    }

    //删除户口
    @PostMapping(value = "/deleteaccount")
    public Result deleteAccount(AccountModel accountModel){
        accountService.delete(accountModel);
        return Result.success();
    }

    //根据 学号 查询户口
    @PostMapping(value = "/searcharchive")
    public Result searchArchive(AccountModel accountModel){
        accountService.findByStuNumber(accountModel.getStuNumber());
        return Result.success();
    }
    //动态修改更新户口
    @PostMapping(value = "/modifyaccount")
    public Result modifyAccount(AccountModel accountModel){
        accountService.update(accountModel);
        return Result.success();
    }

    //批量增加户口  stuNumber / accountAddress / accountDate
    @PostMapping(value = "/addarchviebyfile")
    public Result addAccountByfile(@RequestParam("file")MultipartFile file){
        if (file != null){
            System.out.println("File Not NULL");
            String fileName = file.getOriginalFilename();
            List<Map<String,String>> list = fileService.viewExcelFile("xlsx",file);
            for (int i=0;i<list.size();i++){
                Map<String,String> tempMap = list.get(i);
                AccountModel accountModel = new AccountModel();
                accountModel.setStuNumber(tempMap.get("stuNumber"));
                accountModel.setAccountAddress(tempMap.get("accountAddress"));
                accountModel.setAccountDate(tempMap.get("accountDate"));
            }
        } else {
            System.out.println("File is NULL");
        }
        return Result.success();
    }


    /*
     * 户口信息操作 - End
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

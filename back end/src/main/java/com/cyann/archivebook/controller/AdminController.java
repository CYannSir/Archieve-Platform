package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.*;
import com.cyann.archivebook.service.*;
import com.cyann.archivebook.util.Result;
import org.apache.poi.hssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * @author CYann
 * @date 2018-02-27 22:26
 */

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserService userService;
    @Autowired
    private FileService fileService;
    @Autowired
    private ArchiveService archiveService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private RedArchiveService redArchiveService;
    @Autowired
    private AlumniInformationService alumniInformationService;
    @Autowired
    private PracticeInforService practiceInforService;
    @Autowired
    private ChatGroupService chatGroupService;





    /*
     *学生用户操作 Start Here
    */

    //展示用户
    @PostMapping(value = "/liststu")
    public Result listUser(UserModel userModel){
        userService.findAllUser();
        return Result.success();
    }

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
    @PostMapping(value = "/searcharchive")
    public Result searchArchive(ArchiveModel archiveModel){
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
    @PostMapping(value = "/searchaccount")
    public Result searchAccount(AccountModel accountModel){
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
    @PostMapping(value = "/addaccountbyfile")
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
     * 红色档案信息操作 - Start
     */

    //新增红色档案
    @PostMapping(value = "/addredarchive")
    public Result addRedArchive(RedArchiveModel redArchiveModel){
        redArchiveService.add(redArchiveModel);
        return Result.success();
    }

    //删除红色档案
    @PostMapping(value = "/deleteredarchive")
    public Result deleteRedArchive(RedArchiveModel redArchiveModel){
        redArchiveService.delete(redArchiveModel);
        return Result.success();
    }

    //根据 学号 查询红色档案
    @PostMapping(value = "/searchredarchive")
    public Result searchRedArchive(RedArchiveModel redArchiveModel){
        redArchiveService.findByStuNumber(redArchiveModel.getStuNumber());
        return Result.success();
    }

    //动态修改更新红色档案
    @PostMapping(value = "/modifyredarchive")
    public Result modifyRedArchive(RedArchiveModel redArchiveModel){
        redArchiveService.update(redArchiveModel);
        return Result.success();
    }

    //批量增加红色档案  stuNumber / becomeActivistDate / introducer / joinDate
    @PostMapping(value = "/addredarchivebyfile")
    public Result addRedArchiveByfile(@RequestParam("file")MultipartFile file){
        if (file != null){
            System.out.println("File Not NULL");
            String fileName = file.getOriginalFilename();
            List<Map<String,String>> list = fileService.viewExcelFile("xlsx",file);
            for (int i=0;i<list.size();i++){
                Map<String,String> tempMap = list.get(i);
                RedArchiveModel redArchiveModel = new RedArchiveModel();
                redArchiveModel.setStuNumber(tempMap.get("stuNumber"));
                redArchiveModel.setBecomeActivistDate(tempMap.get("becomeActivistDate"));
                redArchiveModel.setIntroducer(tempMap.get("introducer"));
                redArchiveModel.setJoinDate(tempMap.get("joinDate"));
            }
        } else {
            System.out.println("File is NULL");
        }
        return Result.success();
    }
    /*
     * 红色档案信息操作 - End
     */

    /*
     * 校友信息操作 - Start
     *
     *校友信息视图展示
        CREATE VIEW alumniview AS
        SELECT tb_alumniinformation.*,
        tb_user.object_id as userobject_id, tb_user.stu_number as userstu_namealumniview, tb_user.stu_name, tb_user.stu_major, tb_user.stu_class,
        tb_user.stu_start_year, tb_user.stu_end_year, tb_user.current_email, tb_user.current_phone
        FROM tb_alumniinformation,tb_user
        WHERE tb_alumniinformation.stu_number = tb_user.stu_number
    */

    //查看所有校友资料
    @PostMapping(value = "/viewallalumni")
    public Result viewAllAlumni(){
        return Result.success(alumniInformationService.findAllAlumniInformation());
    }

    //根据校友学号查找校友资料
    @PostMapping(value = "/searchalumnibystunumber")
    public Result searchAlumni(AlumniInformationModel alumniInformationModel){
        return Result.success(alumniInformationService.findByStuNumber(alumniInformationModel.getStuNumber()));
    }

    /*
     * 校友信息操作 - End
     */

    /*
     * 实习生信息操作 - Start
     *
     *实习生信息视图展示
        CREATE VIEW alumniview AS
        SELECT tb_practiceinfor.*,
        tb_user.object_id as userobject_id, tb_user.stu_number as userstu_namealumniview, tb_user.stu_name, tb_user.stu_major, tb_user.stu_class,
        tb_user.stu_start_year, tb_user.stu_end_year, tb_user.current_email, tb_user.current_phone
        FROM tb_practiceinfor,tb_user
        WHERE tb_practiceinfor.stu_number = tb_user.stu_number
    */
    //查看所有实习生资料
    @PostMapping(value = "/viewallpractice")
    public Result viewAllPractice(){
        return Result.success(practiceInforService.findAllAlumniInformation());
    }

    //根据实习生学号查找实习生资料
    @PostMapping(value = "/searchpracticebystunumber")
    public Result searchPractice(PracticeInforModel practiceInforModel){
        return Result.success(practiceInforService.findByStuNumber(practiceInforModel.getStuNumber()));
    }


    /*
     * 实习生信息操作 - End
     */

    /*
     * 交流群信息操作 - Start
     */
    //增加用户
    @PostMapping(value = "/addchatgroup")
    public Result addChatGroup(ChatGroupModel chatGroupModel){
        chatGroupService.add(chatGroupModel);
        return Result.success();
    }

    //删除用户
    @PostMapping(value = "/deletechatgroup")
    public Result deleteChatGroup(ChatGroupModel chatGroupModel){
        chatGroupService.delete(chatGroupModel);
        return Result.success();
    }

    //动态修改更新学生用户
    @PostMapping(value = "/modifychatgroup")
    public Result modifyChatGroup(ChatGroupModel chatGroupModel){
        chatGroupService.update(chatGroupModel);
        return Result.success();
    }

    /*
     * 交流群信息操作 - End
     */


}

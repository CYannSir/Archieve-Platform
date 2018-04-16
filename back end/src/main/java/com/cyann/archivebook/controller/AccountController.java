package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.AccountModel;
import com.cyann.archivebook.model.UserModel;
import com.cyann.archivebook.service.AccountService;
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
public class AccountController {
    @Autowired
    private AccountService accountService;
    @Autowired
    private UserService userService;


    //新增户口
    @PostMapping(value = "/addaccount")
    public Result addAccount(AccountModel accountModel){
        accountService.add(accountModel);
        return Result.success();
    }

    //展示户口
    @PostMapping(value = "/listaccount")
    public Result listAccount(@RequestParam("objectId") String objectId){
        UserModel userModel = userService.findById(objectId);
        List<AccountModel> list = accountService.findByStuNumber(userModel.getStuNumber());
        return Result.success(list);
    }




}

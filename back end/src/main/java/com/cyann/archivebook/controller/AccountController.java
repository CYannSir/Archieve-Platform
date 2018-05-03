package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.AccountModel;
import com.cyann.archivebook.model.CurrentUserModel;
import com.cyann.archivebook.model.UserModel;
import com.cyann.archivebook.service.AccountService;
import com.cyann.archivebook.service.CurrentUserService;
import com.cyann.archivebook.service.UserService;
import com.cyann.archivebook.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
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
    @Autowired
    private CurrentUserService currentUserService;


    //新增户口
    @Transactional
    @PostMapping(value = "/addaccount")
    public Result addUserAccount(@RequestBody AccountModel accountModel){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String objectId = (String) request.getSession().getAttribute("ID");
        CurrentUserModel item = currentUserService.findByObjectId(objectId);
        if(accountModel.getStuNumber().equals(item.getStuNumber()) == true){
            accountService.add(accountModel);
            List<AccountModel> list = accountService.findByStuNumber(accountModel.getStuNumber());
            return Result.success(list);
        } else {
            return Result.error(110,"非该用户");
        }
    }

    //展示户口
    @GetMapping(value = "/listaccount")
    public Result listUserAccount(){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String objectId = (String) request.getSession().getAttribute("ID");
        CurrentUserModel item = currentUserService.findByObjectId(objectId);
        List<AccountModel> list = accountService.findByStuNumber(item.getStuNumber());
        return Result.success(list);
    }


}

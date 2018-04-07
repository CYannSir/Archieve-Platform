package com.cyann.archivebook.service;

import com.cyann.archivebook.enums.ResultEnum;
import com.cyann.archivebook.exception.MyException;
import com.cyann.archivebook.model.CurrentUserModel;
import com.cyann.archivebook.respository.CurrentUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author CYann
 * @date 2018-03-29 21:22
 */
@Service
public class CurrentUserService {
    @Autowired
    private CurrentUserRepository currentUserRepository;
    @Autowired
    private BaseService baseService;

    //查询所有用户
    public List<CurrentUserModel> findAllUser(){
        List<CurrentUserModel> list = currentUserRepository.findAllUser();
        return list;
    }


    //重置密码
    public void resetPwd(CurrentUserModel currentUserModel){
        CurrentUserModel userItem = currentUserRepository.findById(currentUserModel.getObjectId());
        if(userItem == null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            userItem.setLoginPsw("123456");
            currentUserRepository.save(userItem);
        }
    }


    //用户登录
    public CurrentUserModel findByLoginEmailAndLoginPwd(String loginEmail , String loginPwd){
        return currentUserRepository.findByLoginEmailAndLoginPwdAndDelTimeIsNull(loginEmail, loginPwd);
    }


    //用户更改密码
    public void updateMyPwd(CurrentUserModel currentUserModel,String newPwd){
        CurrentUserModel userItem = currentUserRepository.findById(currentUserModel.getObjectId());
        if(userItem == null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            if (userItem.getLoginPsw().equals(currentUserModel.getLoginPsw()) == true){
                userItem.setLoginPsw(newPwd);
                currentUserRepository.save(userItem);
            }else {
                throw new MyException(ResultEnum.ERROR_105);
            }

        }
    }

    //通过学号查询用户
    public List<CurrentUserModel> findByStuNumber(String stuNumber){
        List<CurrentUserModel> list = currentUserRepository.findByStuNumber(stuNumber);
        return list;
    }

    //通过学号、姓名、手机、邮箱查询用户
    public List<CurrentUserModel> findByStuNumberAndStuNameaAndMobilePhoneAndLoginEmailAndDelTimeIsNull(String stuNumber, String stuName, String mobilePhone, String loginEmail){
        List<CurrentUserModel> list = currentUserRepository.findByStuNumberAndStuNameaAndMobilePhoneAndLoginEmailAndDelTimeIsNull(stuNumber, stuName, mobilePhone, loginEmail);
        return list;
    }


}

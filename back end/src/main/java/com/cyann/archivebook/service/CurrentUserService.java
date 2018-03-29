package com.cyann.archivebook.service;

import com.cyann.archivebook.enums.ResultEnum;
import com.cyann.archivebook.exception.MyException;
import com.cyann.archivebook.model.CurrentUserModel;
import com.cyann.archivebook.respository.CurrentUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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


    //重置密码
    public void updatePwd(CurrentUserModel currentUserModel){
        CurrentUserModel userItem = currentUserRepository.findById(currentUserModel.getObjectId());
        if(userItem == null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            userItem.setLoginPsw("12345678");
            currentUserRepository.save(userItem);
        }
    }


    //用户登录
    public CurrentUserModel findByLogIdAndPwd(String loginEmail , String loginPwd){
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

}

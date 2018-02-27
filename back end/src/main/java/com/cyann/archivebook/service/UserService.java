package com.cyann.archivebook.service;

import com.cyann.archivebook.enums.ResultEnum;
import com.cyann.archivebook.exception.MyException;
import com.cyann.archivebook.model.UserModel;
import com.cyann.archivebook.respository.UserRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @author CYann
 * @date 2018-02-26 20:38
 */
@Service
public class UserService {
    @Autowired
    private UserRespository userRespository;
    @Autowired
    private BaseService baseService;

    //增加用户
    public void add(UserModel userModel){
        userRespository.save(userModel);
    }

    //删除用户
    @Transactional
    public void delete(UserModel userModel){
        UserModel userItem = userRespository.findById(userModel.getObjectId());
        if(userItem == null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            baseService.delete(userRespository , userItem);
        }
    }

    //改
    public void update(UserModel userModel){
        UserModel userItem = userRespository.findById(userModel.getObjectId());
        if(userItem == null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            userRespository.save(userModel);
        }
    }

    //用户修改基本信息-联系方式
    public void updateInfor(UserModel userModel){
        UserModel userItem = userRespository.findById(userModel.getObjectId());
        if(userItem == null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            if (userItem.getUserPhone() == null || userItem.getUserPhone().equals(userModel.getUserPhone()) == false) {
                userItem.setUserPhone(userModel.getUserPhone());
            }
            userRespository.save(userItem);
        }
    }

    //更改用户权限
    public void updatePower(UserModel userModel){
        UserModel userItem = userRespository.findById(userModel.getObjectId());
        if(userItem == null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            userItem.setUserPower(userModel.getUserPower());
            userRespository.save(userItem);
        }
    }

    //重置密码
    public void updatePwd(UserModel userModel){
        UserModel userItem = userRespository.findById(userModel.getObjectId());
        if(userItem == null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            userItem.setPwd("12345678");
            userRespository.save(userItem);
        }
    }

    //用户更改密码
    public void updateMyPwd(UserModel userModel,String newPwd){
        UserModel userItem = userRespository.findById(userModel.getObjectId());
        if(userItem == null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            if (userItem.getPwd().equals(userModel.getPwd()) == true){
                userItem.setPwd(newPwd);
                userRespository.save(userItem);
            }else {
                throw new MyException(ResultEnum.ERROR_105);
            }

        }
    }

    //查询所有用户
    public List<UserModel> findAllUser(){
        List<UserModel> list =userRespository.findAllUser();
        return list;
    }

    //主key查询
    public UserModel findById(String id){
        return userRespository.findById(id);
    }

    //用户登录
    public UserModel findByLogIdAndPwd(String logId , String pwd){
        return userRespository.findByLogEmailAndPwdAndDelTimeIsNull(logId,pwd);
    }

    //姓名查询
    public List<UserModel> findByUserName(String userName){
        List<UserModel> list = userRespository.findByUserName(userName);
        return list;
    }

    //学号查询
    public UserModel findByUserNumber(String userNumber){
        return userRespository.findByUserNumber(userNumber);
    }

}

package com.cyann.archivebook.service;

import com.cyann.archivebook.enums.ResultEnum;
import com.cyann.archivebook.exception.MyException;
import com.cyann.archivebook.model.UserModel;
import com.cyann.archivebook.respository.UserRepository;
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
    private UserRepository userRepository;
    @Autowired
    private BaseService baseService;

    //增加用户
    public void add(UserModel userModel){
        userRepository.save(userModel);
    }

    //删除用户
    @Transactional
    public void delete(UserModel userModel){
        UserModel userItem = userRepository.findById(userModel.getObjectId());
        if(userItem == null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            baseService.delete(userRepository, userItem);
        }
    }

    //改
    public void update(UserModel userModel){
        UserModel userItem = userRepository.findById(userModel.getObjectId());
        if(userItem == null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            userRepository.save(userModel);
        }
    }

    //用户修改基本信息-联系方式
    public void updateInfor(UserModel userModel){
        UserModel userItem = userRepository.findById(userModel.getObjectId());
        if(userItem == null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            if (userItem.getCurrentPhone() == null || userItem.getCurrentPhone().equals(userModel.getCurrentPhone()) == false) {
                userItem.setCurrentPhone(userModel.getCurrentPhone());
            }
            userRepository.save(userItem);
        }
    }

    //更改用户权限
    public void updatePower(UserModel userModel){
        UserModel userItem = userRepository.findById(userModel.getObjectId());
        if(userItem == null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            userItem.setStuPower(userModel.getStuPower());
            userRepository.save(userItem);
        }
    }



    //查询所有用户
    public List<UserModel> findAllUser(){
        List<UserModel> list = userRepository.findAllUser();
        return list;
    }

    //主key查询
    public UserModel findById(String id){
        return userRepository.findById(id);
    }



    //姓名查询
    public List<UserModel> findByStuName(String stuName){
        List<UserModel> list = userRepository.findByStuName(stuName);
        return list;
    }

    //学号查询
    public UserModel findByStuNumber(String stuNumber){
        return userRepository.findByStuNumber(stuNumber);
    }

    //班级查询
    public List<UserModel> findByStuClass(String stuClass){
        List<UserModel> list = userRepository.findByStuClass(stuClass);
        return list;
    }

}

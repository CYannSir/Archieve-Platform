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
            if (userItem.getUserPhone() == null || userItem.getUserPhone().equals(userModel.getUserPhone()) == false) {
                userItem.setUserPhone(userModel.getUserPhone());
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
            userItem.setUserPower(userModel.getUserPower());
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
    public List<UserModel> findByUserName(String userName){
        List<UserModel> list = userRepository.findByUserName(userName);
        return list;
    }

    //学号查询
    public UserModel findByUserNumber(String userNumber){
        return userRepository.findByUserNumber(userNumber);
    }

}

package com.cyann.archivebook.service;

import com.cyann.archivebook.enums.ResultEnum;
import com.cyann.archivebook.exception.MyException;
import com.cyann.archivebook.model.CurrentUserModel;
import com.cyann.archivebook.respository.CurrentUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import java.util.ArrayList;
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
    @Autowired
    private UserService userService;

    //增加用户
    @Transactional
    public void add(@RequestBody CurrentUserModel currentUserModel){
        userService.updateContract(currentUserModel.getStuNumber(),currentUserModel.getMobilePhone(),currentUserModel.getLoginEmail());
        baseService.add(currentUserRepository,currentUserModel);
        currentUserRepository.save(currentUserModel);
    }


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
    //删除学生用户
    @Transactional
    public void delete(CurrentUserModel currentUserModel){
        CurrentUserModel currentuserItem = currentUserRepository.findById(currentUserModel.getObjectId());
        if(currentuserItem == null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            baseService.delete(currentUserRepository, currentuserItem);
        }
    }

    //用户登录
    public CurrentUserModel findByLoginEmailAndLoginPwd(String loginEmail , String loginPsw){
        return currentUserRepository.findByLoginEmailAndLoginPswAndDelTimeIsNull(loginEmail, loginPsw);
    }

    //根据 学号 目前单位 多条件动态查询
    public List<CurrentUserModel> findAllByAdvancedForm(CurrentUserModel currentUserModel) {
        return currentUserRepository.findAll(new Specification<CurrentUserModel>(){
            @Override
            public Predicate toPredicate(Root<CurrentUserModel> root, CriteriaQuery<?> query, CriteriaBuilder cb){
                List<Predicate> list = new ArrayList<Predicate>();
                // list.add(cb.isNull(root.get("delTime")));
                if(currentUserModel != null && !StringUtils.isEmpty(currentUserModel.getStuNumber()) ){
                    list.add(cb.equal(root.get("stuNumber"), currentUserModel.getStuNumber()));
                }
                if(currentUserModel != null && !StringUtils.isEmpty(currentUserModel.getStuName()) ){
                    list.add(cb.equal(root.get("stuName"), currentUserModel.getStuName()));
                }
                if(currentUserModel != null && !StringUtils.isEmpty(currentUserModel.getMobilePhone()) ){
                    list.add(cb.equal(root.get("mobilePhone"), currentUserModel.getMobilePhone()));
                }
                if(currentUserModel != null && !StringUtils.isEmpty(currentUserModel.getLoginEmail()) ){
                    list.add(cb.equal(root.get("loginEmail"), currentUserModel.getLoginEmail()));
                }
                Predicate[] p = new Predicate[list.size()];
                return cb.and(list.toArray(p));
            }
        });
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

    //验证邮箱是否被注册
    public void verifyLoginEmail(String loginEmail){
        CurrentUserModel currentuserItem = currentUserRepository.findByLoginEmail(loginEmail);
        if(currentuserItem != null){
            throw new MyException(ResultEnum.ERROR_106);
        }else {
            baseService.delete(currentUserRepository, currentuserItem);
        }
    }

    //验证邮箱激活码是否正确
    public void verifyActiveCode(String activeCode){
        CurrentUserModel currentuserItem = currentUserRepository.findByActiveCode(activeCode);
        if(currentuserItem != null){
            throw new MyException(ResultEnum.ERROR_106);
        }else {
            baseService.delete(currentUserRepository, currentuserItem);
        }
    }

    //验证名字是否正确
    public void verifyStuName(String stuName){
        CurrentUserModel currentuserItem = currentUserRepository.findByStuNum(stuName);
        if(currentuserItem != null){
            throw new MyException(ResultEnum.ERROR_106);
        }else {
            baseService.delete(currentUserRepository, currentuserItem);
        }
    }

    //验证学号是否正确
    public void verifyStuNumber(String stuNumber){
        CurrentUserModel currentuserItem = currentUserRepository.findByStuN(stuNumber);
        if(currentuserItem != null){
            throw new MyException(ResultEnum.ERROR_106);
        }else {
            baseService.delete(currentUserRepository, currentuserItem);
        }
    }

    //通过学号查询用户
    public List<CurrentUserModel> findByStuNumber(String stuNumber){
        List<CurrentUserModel> list = currentUserRepository.findByStuNumber(stuNumber);
        return list;
    }

    //通过学号查询用户
    public CurrentUserModel findByLoginEmail(String loginEmail){
        return currentUserRepository.findByLoginEmail(loginEmail);
    }


}

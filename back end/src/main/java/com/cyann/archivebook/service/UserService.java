package com.cyann.archivebook.service;

import com.cyann.archivebook.enums.ResultEnum;
import com.cyann.archivebook.exception.MyException;
import com.cyann.archivebook.model.UserModel;
import com.cyann.archivebook.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
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

    //增加学生用户
    @Transactional
    public void add(UserModel userModel){
        baseService.add(userRepository,userModel);
        userRepository.save(userModel);
    }

    //修改学生用户
    @Transactional
    public void modify(UserModel userModel) {
        UserModel userItem = userRepository.findById(userModel.getObjectId());
        if (userItem == null) {
            throw new MyException(ResultEnum.ERROR_101);
        } else {
            userItem.setStuNumber(userModel.getStuNumber());
            userItem.setStuName(userModel.getStuName());
            userItem.setStuClass(userModel.getStuClass());
            userItem.setStuMajor(userModel.getStuMajor());
            userItem.setStuStartYear(userModel.getStuStartYear());
            userItem.setStuEndYear(userItem.getStuEndYear());
            userItem.setStuPower(userItem.getStuPower());
            baseService.modify(userRepository,userModel);
            userRepository.save(userItem);
        }
    }

    //删除学生用户
    @Transactional
    public void delete(UserModel userModel){
        UserModel userItem = userRepository.findById(userModel.getObjectId());
        if(userItem == null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            baseService.delete(userRepository, userItem);
        }
    }

    //修改学生用户
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

    //学号、姓名查找
    public List<UserModel> findByStuNameAndStuNumber(String stuName, String stuNumber){
        List<UserModel> list = userRepository.findByStuNameAndStuNumber(stuName, stuNumber);
        return list;
    }

    //学号、是否党员查找
    public List<UserModel> findByStuNumberAndIfRed(String stuNumber, int redParty){
        List<UserModel> list = userRepository.findByStuNumberAndRedParty(stuNumber, redParty);
        return list;
    }

    //班级查询
    public List<UserModel> findByStuClass(String stuClass){
        List<UserModel> list = userRepository.findByStuClass(stuClass);
        return list;
    }

    //专业查询
    public List<UserModel> findByStuMajor(String stuMajor){
        List<UserModel> list = userRepository.findByStuClass(stuMajor);
        return list;
    }

    //根据 名字 学号 专业 毕业年份 入学年份 多条件动态查询课程
    public List<UserModel> findAllByAdvancedForm(UserModel userModel) {
        return userRepository.findAll(new Specification<UserModel>(){
            @Override
            public Predicate toPredicate(Root<UserModel> root, CriteriaQuery<?> query, CriteriaBuilder cb){
                List<Predicate> list = new ArrayList<Predicate>();
                list.add(cb.isNull(root.get("delTime")));
                if(userModel != null && !StringUtils.isEmpty(userModel.getStuName()) ){
                    list.add(cb.equal(root.get("stuName"), userModel.getStuName()));
                }
                if(userModel != null && !StringUtils.isEmpty(userModel.getStuNumber()) ){
                    list.add(cb.equal(root.get("stuNumber"), userModel.getStuNumber()));
                }
                if(userModel != null && !StringUtils.isEmpty(userModel.getStuMajor()) ){
                    list.add(cb.equal(root.get("stuMajor"), userModel.getStuMajor()));
                }
                if(userModel != null && !StringUtils.isEmpty(userModel.getStuEndYear()) ){
                    list.add(cb.equal(root.get("stuEndYear"), userModel.getStuEndYear()));
                }
                if(userModel != null && !StringUtils.isEmpty(userModel.getStuStartYear()) ){
                    list.add(cb.equal(root.get("stuStartYear"), userModel.getStuStartYear()));
                }
                if(userModel != null && !StringUtils.isEmpty(userModel.getRedParty()) ){
                    list.add(cb.lessThanOrEqualTo(root.get("redParty"), userModel.getRedParty()));
                }
                Predicate[] p = new Predicate[list.size()];
                return cb.and(list.toArray(p));
            }
        });
    }

}

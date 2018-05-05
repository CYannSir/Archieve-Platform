package com.cyann.archivebook.service;

import com.cyann.archivebook.enums.ResultEnum;
import com.cyann.archivebook.exception.MyException;
import com.cyann.archivebook.model.PracticeInforModel;
import com.cyann.archivebook.respository.PracticeInforRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @author CYann
 * @date 2018-03-01 23:15
 */
@Service
public class PracticeInforService extends BaseService {
    @Autowired
    private PracticeInforRepository practiceInforRepository;
    @Autowired
    private BaseService baseService;

    //增
    public void add(PracticeInforModel traineeInformationModel){
        practiceInforRepository.save(traineeInformationModel);
    }

    //删
    @Transactional
    public void delete(PracticeInforModel traineeInformationModel){
        PracticeInforModel traineeInformationItem = practiceInforRepository.findById(traineeInformationModel.getObjectId());
        if (traineeInformationItem ==null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            baseService.delete(practiceInforRepository, traineeInformationItem);
        }

    }

    //改
    public void update(PracticeInforModel traineeInformationModel){
        PracticeInforModel traineeInformationItem = practiceInforRepository.findById(traineeInformationModel.getObjectId());
        if (traineeInformationItem ==null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            practiceInforRepository.save(traineeInformationModel);
        }
    }

    //查询所有实习生信息
    public List<PracticeInforModel> findALLPracticeInfor(){
        List<PracticeInforModel> list = practiceInforRepository.findALLPracticeInfor();
        return list;
    }

    //学号查询所有实习生信息
    public List<PracticeInforModel> findByStuNum(String stuNumber){
        List<PracticeInforModel> list = practiceInforRepository.findByStuNum(stuNumber);
        return list;
    }

    //视图 根据 名字 班级 毕业年份 多条件动态查询课程
    public List<Object[]> search(String stuName,String stuClass){
        List<Object[]> list = practiceInforRepository.search(stuName,stuClass);
        return list;
    }

    //视图--学号查询实习生信息
    public List<Object[]> findByStuNumber(String stuNumber){
        List<Object[]> list = practiceInforRepository.findByStuNumber(stuNumber);
        return list;
    }

    //视图--查询所有实习生信息
    public List<Object[]> findAllPracticeInformation(){
        List<Object[]> list = practiceInforRepository.findAllPractice();
        return list;
    }


}

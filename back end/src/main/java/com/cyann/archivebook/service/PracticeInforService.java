package com.cyann.archivebook.service;

import com.cyann.archivebook.enums.ResultEnum;
import com.cyann.archivebook.exception.MyException;
import com.cyann.archivebook.model.PracticeInforModel;
import com.cyann.archivebook.respository.PracticeInforRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @author CYann
 * @date 2018-03-01 23:15
 */
public class PracticeInforService extends BaseService {
    @Autowired
    private PracticeInforRepository traineeInformationRepository;
    @Autowired
    private BaseService baseService;

    //增
    public void add(PracticeInforModel traineeInformationModel){
        traineeInformationRepository.save(traineeInformationModel);
    }

    //删
    @Transactional
    public void delete(PracticeInforModel traineeInformationModel){
        PracticeInforModel traineeInformationItem = traineeInformationRepository.findById(traineeInformationModel.getObjectId());
        if (traineeInformationItem ==null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            baseService.delete(traineeInformationRepository, traineeInformationItem);
        }

    }

    //改
    public void update(PracticeInforModel traineeInformationModel){
        PracticeInforModel traineeInformationItem = traineeInformationRepository.findById(traineeInformationModel.getObjectId());
        if (traineeInformationItem ==null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            traineeInformationRepository.save(traineeInformationModel);
        }
    }

    //查询所有校友信息
    public List<PracticeInforModel> findAllTraineeInformation(){
        List<PracticeInforModel> list = traineeInformationRepository.findALLTraineeInformation();
        return list;
    }



}

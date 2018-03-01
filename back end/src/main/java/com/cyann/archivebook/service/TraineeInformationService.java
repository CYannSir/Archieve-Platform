package com.cyann.archivebook.service;

import com.cyann.archivebook.enums.ResultEnum;
import com.cyann.archivebook.exception.MyException;
import com.cyann.archivebook.model.TraineeInformationModel;
import com.cyann.archivebook.respository.TraineeInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @author CYann
 * @date 2018-03-01 23:15
 */
public class TraineeInformationService extends BaseService {
    @Autowired
    private TraineeInformationRepository traineeInformationRepository;
    @Autowired
    private BaseService baseService;

    //增
    public void add(TraineeInformationModel traineeInformationModel){
        traineeInformationRepository.save(traineeInformationModel);
    }

    //删
    @Transactional
    public void delete(TraineeInformationModel traineeInformationModel){
        TraineeInformationModel traineeInformationItem = traineeInformationRepository.findById(traineeInformationModel.getObjectId());
        if (traineeInformationItem ==null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            baseService.delete(traineeInformationRepository, traineeInformationItem);
        }

    }

    //改
    public void update(TraineeInformationModel traineeInformationModel){
        TraineeInformationModel traineeInformationItem = traineeInformationRepository.findById(traineeInformationModel.getObjectId());
        if (traineeInformationItem ==null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            traineeInformationRepository.save(traineeInformationModel);
        }
    }

    //查询所有校友信息
    public List<TraineeInformationModel> findAllUser(){
        List<TraineeInformationModel> list = traineeInformationRepository.findALLTraineeInformation();
        return list;
    }



}

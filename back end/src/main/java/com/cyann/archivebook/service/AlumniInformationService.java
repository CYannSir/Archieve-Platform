package com.cyann.archivebook.service;

import com.cyann.archivebook.enums.ResultEnum;
import com.cyann.archivebook.exception.MyException;
import com.cyann.archivebook.model.AlumniInformationModel;
import com.cyann.archivebook.respository.AlumniInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @author CYann
 * @date 2018-03-01 23:12
 */
public class AlumniInformationService extends BaseService {
    @Autowired
    private AlumniInformationRepository alumniInformationRepository;
    @Autowired
    private BaseService baseService;

    //增
    public void add(AlumniInformationModel alumniInformationModel){
        alumniInformationRepository.save(alumniInformationModel);
    }

    //删
    @Transactional
    public void delete(AlumniInformationModel alumniInformationModel){
        AlumniInformationModel alumniInformationItem = alumniInformationRepository.findById(alumniInformationModel.getObjectId());
        if (alumniInformationItem ==null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            baseService.delete(alumniInformationRepository, alumniInformationItem);
        }

    }

    //改
    public void update(AlumniInformationModel alumniInformationModel){
        AlumniInformationModel alumniInformationItem = alumniInformationRepository.findById(alumniInformationModel.getObjectId());
        if (alumniInformationItem ==null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            alumniInformationRepository.save(alumniInformationModel);
        }
    }

    //查询所有校友信息
    public List<AlumniInformationModel> findAllUser(){
        List<AlumniInformationModel> list = alumniInformationRepository.findALLAlumniInformation();
        return list;
    }

}

package com.cyann.archivebook.service;

import com.cyann.archivebook.enums.ResultEnum;
import com.cyann.archivebook.exception.MyException;
import com.cyann.archivebook.model.RedArchiveModel;
import com.cyann.archivebook.respository.RedArchiveRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @author CYann
 * @date 2018-03-01 22:56
 */
public class RedArchiveService extends BaseService {
    @Autowired
    private RedArchiveRepository redArchiveRepository;
    @Autowired
    private BaseService baseService;

    //增
    public void add(RedArchiveModel redArchiveModel){
        redArchiveRepository.save(redArchiveModel);
    }

    //删
    @Transactional
    public void delete(RedArchiveModel redArchiveModel){
        RedArchiveModel redArchiveItem = redArchiveRepository.findById(redArchiveModel.getObjectId());
        if (redArchiveItem ==null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            baseService.delete(redArchiveRepository, redArchiveItem);
        }

    }

    //改
    public void update(RedArchiveModel redArchiveModel){
        RedArchiveModel redArchiveItem = redArchiveRepository.findById(redArchiveModel.getObjectId());
        if (redArchiveItem ==null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            redArchiveRepository.save(redArchiveModel);
        }
    }

    //查询所有档案
    public List<RedArchiveModel> findAllUser(){
        List<RedArchiveModel> list = redArchiveRepository.findALLRedArchive();
        return list;
    }

}

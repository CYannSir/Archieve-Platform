package com.cyann.archivebook.service;

import com.cyann.archivebook.enums.ResultEnum;
import com.cyann.archivebook.exception.MyException;
import com.cyann.archivebook.model.ArchiveModel;
import com.cyann.archivebook.respository.AccountRepository;
import com.cyann.archivebook.respository.ArchiveRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @author CYann
 * @date 2018-03-01 22:55
 */
public class ArchiveService extends BaseService {
    @Autowired
    private ArchiveRepository archiveRepository;
    @Autowired
    private BaseService baseService;

    //增
    public void add(ArchiveModel archiveModel){
        archiveRepository.save(archiveModel);
    }

    //删
    @Transactional
    public void delete(ArchiveModel archiveModel){
        ArchiveModel archiveItem = archiveRepository.findById(archiveModel.getObjectId());
        if (archiveItem ==null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            baseService.delete(archiveRepository, archiveItem);
        }

    }

    //改
    public void update(ArchiveModel archiveModel){
        ArchiveModel archiveItem = archiveRepository.findById(archiveModel.getObjectId());
        if (archiveItem ==null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            archiveRepository.save(archiveModel);
        }
    }

    //查询所有档案
    public List<ArchiveModel> findByStuNumber(String stuNumber){
        List<ArchiveModel> list = archiveRepository.findByStuNumber(stuNumber);
        return list;
    }

    //根据学号查所有档案
    public ArchiveModel findByStuNumberAndUnit(String stuNumber, String unit){
        return archiveRepository.findByStuNumberAndUnit(stuNumber, unit);
    }

}

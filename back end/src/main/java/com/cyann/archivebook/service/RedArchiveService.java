package com.cyann.archivebook.service;

import com.cyann.archivebook.enums.ResultEnum;
import com.cyann.archivebook.exception.MyException;
import com.cyann.archivebook.model.RedArchiveModel;
import com.cyann.archivebook.respository.RedArchiveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @author CYann
 * @date 2018-03-01 22:56
 */
@Service
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
    //动态修改红色档案信息
    @Transactional
    public void update(RedArchiveModel redArchiveModel) {
        RedArchiveModel redArchiveItem = redArchiveRepository.findById(redArchiveModel.getObjectId());
        if (redArchiveItem == null) {
            throw new MyException(ResultEnum.ERROR_101);
        } else {
            if(redArchiveModel.getStuNumber() !=null && redArchiveItem.getStuNumber().equals(redArchiveModel.getStuNumber()) == false ){
                redArchiveItem.setStuNumber(redArchiveModel.getStuNumber());
            }
            if(redArchiveModel.getJoinDate() !=null && redArchiveItem.getJoinDate().equals(redArchiveModel.getJoinDate()) == false ){
                redArchiveItem.setJoinDate(redArchiveModel.getJoinDate());
            }
            if(redArchiveModel.getBecomeActivistDate() !=null && redArchiveItem.getBecomeActivistDate().equals(redArchiveModel.getBecomeActivistDate()) == false ){
                redArchiveItem.setBecomeActivistDate(redArchiveModel.getBecomeActivistDate());
            }
            if(redArchiveModel.getIntroducer() !=null && redArchiveItem.getIntroducer().equals(redArchiveModel.getIntroducer()) == false ){
                redArchiveItem.setIntroducer(redArchiveModel.getIntroducer());
            }
            baseService.modify(redArchiveRepository, redArchiveItem);
            redArchiveRepository.save(redArchiveItem);
        }
    }
    //学号查询红色档案列表
    public List<RedArchiveModel> findByStuNumber(String stuNumber){
        List<RedArchiveModel> list = redArchiveRepository.findByStuNumber(stuNumber);
        return list;
    }


    //查询所有红色档案
    public List<RedArchiveModel> findALLRedArchive(){
        List<RedArchiveModel> list = redArchiveRepository.findALLRedArchive();
        return list;
    }

}

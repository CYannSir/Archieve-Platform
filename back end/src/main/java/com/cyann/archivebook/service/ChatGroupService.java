package com.cyann.archivebook.service;

import com.cyann.archivebook.enums.ResultEnum;
import com.cyann.archivebook.exception.MyException;
import com.cyann.archivebook.model.ChatGroupModel;
import com.cyann.archivebook.respository.ChatGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * @author CYann
 * @date 2018-04-15 22:20
 */
@Service
public class ChatGroupService {
    @Autowired
    private ChatGroupRepository chatGroupRepository;
    @Autowired
    private BaseService baseService;

    //增
    public void add(ChatGroupModel chatGroupModel){
        chatGroupRepository.save(chatGroupModel);
    }

    //删
    @Transactional
    public void delete(ChatGroupModel chatGroupModel){
        ChatGroupModel chatGroupItem = chatGroupRepository.findById(chatGroupModel.getObjectId());
        if (chatGroupItem ==null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            baseService.delete(chatGroupRepository, chatGroupItem);
        }

    }

    //动态修改交流组信息
    @Transactional
    public void update(ChatGroupModel chatGroupModel) {
        ChatGroupModel chatGroupItem = chatGroupRepository.findById(chatGroupModel.getObjectId());
        if (chatGroupItem == null) {
            throw new MyException(ResultEnum.ERROR_101);
        } else {
            if(chatGroupModel.getStuMajor() !=null && chatGroupItem.getStuMajor().equals(chatGroupModel.getStuMajor()) == false ){
                chatGroupItem.setStuMajor(chatGroupModel.getStuMajor());
            }
            if(chatGroupModel.getStuEndYear() !=null && chatGroupItem.getStuEndYear().equals(chatGroupModel.getStuEndYear()) == false ){
                chatGroupItem.setStuEndYear(chatGroupModel.getStuEndYear());
            }
            if(chatGroupModel.getQqNo() !=null && chatGroupItem.getQqNo().equals(chatGroupModel.getQqNo()) == false ){
                chatGroupItem.setQqNo(chatGroupModel.getQqNo());
            }
            baseService.modify(chatGroupRepository,chatGroupItem);
            chatGroupRepository.save(chatGroupItem);
        }
    }

    //根据专业和毕业时间查询档案
    public ChatGroupModel findByStuMajorAndAndStuEndYear(String stuMajor, String stuEndYear){
        return chatGroupRepository.findByStuMajorAndAndStuEndYear(stuMajor, stuEndYear);
    }




}

package com.cyann.archivebook.service;

import com.cyann.archivebook.enums.ResultEnum;
import com.cyann.archivebook.exception.MyException;
import com.cyann.archivebook.model.AccountModel;
import com.cyann.archivebook.respository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


/**
 * @author CYann
 * @date 2018-02-28 21:18
 */
@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private BaseService baseService;

    //增
    public void add(AccountModel accountModel){
        accountRepository.save(accountModel);
    }

    //删
    @Transactional
    public void delete(AccountModel accountModel){
        AccountModel accountItem = accountRepository.findById(accountModel.getObjectId());
        if (accountItem ==null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            baseService.delete(accountRepository, accountItem);
        }

    }

    //改
    public void update(AccountModel accountModel){
        AccountModel accountItem = accountRepository.findById(accountModel.getObjectId());
        if (accountItem ==null){
            throw new MyException(ResultEnum.ERROR_101);
        }else {
            accountRepository.save(accountModel);
        }
    }

    //查询所有户口
    public List<AccountModel> findAllUser(){
        List<AccountModel> list = accountRepository.findALLAccount();
        return list;
    }


}

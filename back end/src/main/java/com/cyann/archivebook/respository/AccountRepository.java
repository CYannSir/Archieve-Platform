package com.cyann.archivebook.respository;

import com.cyann.archivebook.model.AccountModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author CYann
 * @date 2018-02-28 21:19
 */
public interface AccountRepository extends JpaRepository<AccountModel,String> {

    //查询所有户口信息
    @Query("select accountModel from AccountModel accountModel where accountModel.delTime is null")
    List<AccountModel> findALLAccount();

    //Id查询户口信息
    @Query("select accountModel from AccountModel accountModel where accountModel.objectId = :objectId and accountModel.delTime is null")
    AccountModel findById(@Param("objectId") String objectId);

}

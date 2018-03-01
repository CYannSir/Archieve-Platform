package com.cyann.archivebook.respository;

import com.cyann.archivebook.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author CYann
 * @date 2018-02-26 20:43
 */

public interface UserRepository extends JpaRepository<UserModel,String>{

    //查找所有用户
    @Query(value = "select userModel from UserModel userModel where userModel.delTime is null")
    List<UserModel> findAllUser();

    //通过数据库编号id查找用户
    @Query("select userModel from UserModel userModel where userModel.objectId = :objectId and userModel.delTime is null")
    UserModel findById(@Param("objectId") String objectId);

    //通过查找学号查找用户
    @Query("select userModel from UserModel userModel where userModel.userNumber = ?1 and userModel.delTime is null")
    UserModel findByUserNumber(@Param("userNumber") String userNumber);

    //通过查找姓名查找用户
    @Query("select userModel from UserModel userModel where userModel.userName = ?1 and userModel.delTime is null")
    List<UserModel> findByUserName(@Param("userName") String userName);

    UserModel findByLogEmailAndPwdAndDelTimeIsNull(String logEmail, String pwd);


}

package com.cyann.archivebook.respository;

import com.cyann.archivebook.model.CurrentUserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author CYann
 * @date 2018-03-29 21:23
 */
public interface CurrentUserRepository extends JpaRepository<CurrentUserModel,String> {
    //查找所有用户
    @Query(value = "select currentUserModel from CurrentUserModel currentUserModel where currentUserModel.delTime is null")
    List<CurrentUserModel> findAllUser();

    //通过数据库编号id查找用户
    @Query("select currentUserModel from CurrentUserModel currentUserModel where currentUserModel.objectId = :objectId and currentUserModel.delTime is null")
    CurrentUserModel findById(@Param("objectId") String objectId);

    //通过查找学号查找用户
    @Query("select currentUserModel from CurrentUserModel currentUserModel where currentUserModel.stuNumber = ?1 and currentUserModel.delTime is null")
    List<CurrentUserModel> findByStuNumber(@Param("stuNumber") String stuNumber);

    //通过查找学号、名字、手机号码、邮件查找用户
    @Query("select currentUserModel from CurrentUserModel currentUserModel where " +
            "currentUserModel.stuNumber = ?1 " +
            "and currentUserModel.stuName = ?2 " +
            "and currentUserModel.mobilePhone = ?3" +
            "and currentUserModel.loginEmail = ?4" +
            "and currentUserModel.delTime is null")
    List<CurrentUserModel> findByStuNumberAndStuNameaAndMobilePhoneAndLoginEmailAndDelTimeIsNull(@Param("stuNumber") String stuNumber,
                                     @Param("stuName") String stuName,
                                     @Param("mobilePhone") String mobilePhone,
                                     @Param("loginEmail") String loginEmail);


    CurrentUserModel findByLoginEmailAndLoginPwdAndDelTimeIsNull(String loginEmail, String loginPsw);

}

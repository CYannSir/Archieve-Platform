package com.cyann.archivebook.respository;

import com.cyann.archivebook.model.PracticeInforModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author CYann
 * @date 2018-03-01 23:15
 */
public interface PracticeInforRepository extends JpaRepository<PracticeInforModel,String> {
    //查询所有实习生信息
    @Query("select practiceInforModel from PracticeInforModel practiceInforModel where practiceInforModel.delTime is null")
    List<PracticeInforModel> findALLPracticeInfor();

    //Id查询实习生信息
    @Query("select practiceInforModel from PracticeInforModel practiceInforModel where practiceInforModel.objectId = :objectId and practiceInforModel.delTime is null")
    PracticeInforModel findById(@Param("objectId") String objectId);

    //学校Id查询实习生信息
    @Query(value = "select * from practiceview where practiceview.del_time is null and practiceview.stu_number = ?1",nativeQuery = true)
    List<Object[]> findByStuNumber(@Param("stuNumber") String stuNumber);

    //通过视图查看所有实习生信息
    @Query(value = "select * from practiceview where practiceview.del_time is null",nativeQuery = true)
    List<Object[]> findAllPractice();

}

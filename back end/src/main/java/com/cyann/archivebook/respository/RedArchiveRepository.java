package com.cyann.archivebook.respository;

import com.cyann.archivebook.model.RedArchiveModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author CYann
 * @date 2018-03-01 22:52
 */
public interface RedArchiveRepository extends JpaRepository<RedArchiveModel,String> {

    //查询所有红色档案信息
    @Query("select redArchiveModel from RedArchiveModel redArchiveModel where redArchiveModel.delTime is null")
    List<RedArchiveModel> findALLRedArchive();

    //Id查询红色档案信息
    @Query("select redArchiveModel from RedArchiveModel redArchiveModel where redArchiveModel.objectId = :objectId and redArchiveModel.delTime is null")
    RedArchiveModel findById(@Param("objectId") String objectId);
}

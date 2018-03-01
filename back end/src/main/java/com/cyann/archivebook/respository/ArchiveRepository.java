package com.cyann.archivebook.respository;

import com.cyann.archivebook.model.ArchiveModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author CYann
 * @date 2018-03-01 22:52
 */
public interface ArchiveRepository extends JpaRepository<ArchiveModel,String> {

    //查询所有档案信息
    @Query("select archiveModel from ArchiveModel archiveModel where archiveModel.delTime is null")
    List<ArchiveModel> findALLArchive();

    //Id查询档案信息
    @Query("select archiveModel from ArchiveModel archiveModel where archiveModel.objectId = :objectId and archiveModel.delTime is null")
    ArchiveModel findById(@Param("objectId") String objectId);

}

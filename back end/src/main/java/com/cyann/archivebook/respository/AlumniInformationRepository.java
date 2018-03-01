package com.cyann.archivebook.respository;

import com.cyann.archivebook.model.AlumniInformationModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author CYann
 * @date 2018-03-01 23:13
 */
public interface AlumniInformationRepository extends JpaRepository<AlumniInformationModel,String>{
    //查询所有校友信息
    @Query("select alumniInformationModel from AlumniInformationModel alumniInformationModel where alumniInformationModel.delTime is null")
    List<AlumniInformationModel> findALLAlumniInformation();

    //Id查询校友信息
    @Query("select alumniInformationModel from AlumniInformationModel alumniInformationModel where alumniInformationModel.objectId = :objectId and alumniInformationModel.delTime is null")
    AlumniInformationModel findById(@Param("objectId") String objectId);
}

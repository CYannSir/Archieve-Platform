package com.cyann.archivebook.respository;

import com.cyann.archivebook.model.TraineeInformationModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author CYann
 * @date 2018-03-01 23:15
 */
public interface TraineeInformationRepository extends JpaRepository<TraineeInformationModel,String> {
    //查询所有实习生信息
    @Query("select traineeInformationModel from TraineeInformationModel traineeInformationModel where traineeInformationModel.delTime is null")
    List<TraineeInformationModel> findALLTraineeInformation();

    //Id查询实习生信息
    @Query("select traineeInformationModel from TraineeInformationModel traineeInformationModel where traineeInformationModel.objectId = :objectId and traineeInformationModel.delTime is null")
    TraineeInformationModel findById(@Param("objectId") String objectId);
}

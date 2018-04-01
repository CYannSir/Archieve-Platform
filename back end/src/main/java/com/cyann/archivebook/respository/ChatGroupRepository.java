package com.cyann.archivebook.respository;

import com.cyann.archivebook.model.ChatGroupModel;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author CYann
 * @date 2018-04-01 17:32
 */
public interface ChatGroupRepository extends JpaRepository<ChatGroupModel,String> {

}

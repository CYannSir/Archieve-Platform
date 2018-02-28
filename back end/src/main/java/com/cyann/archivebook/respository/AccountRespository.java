package com.cyann.archivebook.respository;

import com.cyann.archivebook.model.AccountModel;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author CYann
 * @date 2018-02-28 21:19
 */
public interface AccountRespository extends JpaRepository<AccountModel,String> {

}

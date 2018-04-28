package com.cyann.archivebook.controllerguest;

import com.cyann.archivebook.enums.ResultEnum;
import com.cyann.archivebook.exception.MyException;
import com.cyann.archivebook.model.AlumniInformationModel;
import com.cyann.archivebook.model.CurrentUserModel;
import com.cyann.archivebook.service.AlumniInformationService;
import com.cyann.archivebook.service.CurrentUserService;
import com.cyann.archivebook.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
/**
 * @author CYann
 * @date 2018-04-28 10:36
 */
@RestController
@CrossOrigin
public class GuestController {
    @Autowired
    private CurrentUserService currentUserService;
    @Autowired
    private AlumniInformationService alumniInformationService;


    @PostMapping(value = "/login")
    public Result login (CurrentUserModel currentUserModel, HttpSession session){
        CurrentUserModel loginUser = currentUserService.findByLoginEmailAndLoginPwd(currentUserModel.getLoginEmail(),currentUserModel.getLoginPsw());
        if(loginUser != null){
            session.setAttribute("ID", loginUser.getObjectId());
            session.setAttribute("TYPE", loginUser.getUserType());
            loginUser.setLoginPsw(null);
            // AlumniInformationModel alumniInformationModel = alumniInformationService.findById(loginUser.get());
            Map result = new HashMap();
            result.put("CurrentUserModel", loginUser);
            // result.put("Office", office);
            result.put("SessionId", session.getId());
            return Result.success(result);
        } else {
            throw new MyException(ResultEnum.ERROR_102);
        }
    }

    @PostMapping(value = "/register")
    public Result register (CurrentUserModel currentUserModel, HttpSession session){
        CurrentUserModel loginUser = currentUserService.findByLoginEmailAndLoginPwd(currentUserModel.getLoginEmail(),currentUserModel.getLoginPsw());
        if(loginUser != null){
            session.setAttribute("ID", loginUser.getObjectId());
            session.setAttribute("TYPE", loginUser.getUserType());
            loginUser.setLoginPsw(null);
            // AlumniInformationModel alumniInformationModel = alumniInformationService.findById(loginUser.get());
            Map result = new HashMap();
            result.put("User", loginUser);
            // result.put("Office", office);
            result.put("SessionId", session.getId());
            return Result.success(result);
        } else {
            throw new MyException(ResultEnum.ERROR_102);
        }
    }
}
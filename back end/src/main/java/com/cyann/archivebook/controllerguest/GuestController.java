package com.cyann.archivebook.controllerguest;

import com.cyann.archivebook.enums.ResultEnum;
import com.cyann.archivebook.exception.MyException;
import com.cyann.archivebook.model.AlumniInformationModel;
import com.cyann.archivebook.model.CurrentUserModel;
import com.cyann.archivebook.service.AlumniInformationService;
import com.cyann.archivebook.service.CurrentUserService;
import com.cyann.archivebook.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
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
    @Autowired
    private JavaMailSender javaMailSender;


    @PostMapping(value = "/login")
    public Result login (@RequestBody CurrentUserModel currentUserModel, HttpSession session){
        CurrentUserModel loginUser = currentUserService.findByLoginEmailAndLoginPwd(currentUserModel.getLoginEmail(),currentUserModel.getLoginPsw());
        if(loginUser != null){
            session.setAttribute("ID", loginUser.getObjectId());
            session.setAttribute("TYPE", loginUser.getUserType());
            loginUser.setLoginPsw(null);
            // AlumniInformationModel alumniInformationModel = alumniInformationService.findById(loginUser.get());
            Map result = new HashMap();
            result.put("currentAuthority", loginUser.getUserType());
            result.put("status", "ok");
            result.put("type", "account");
            result.put("SessionId", session.getId());
            return Result.success(result);
        } else {
            Map result = new HashMap();
            result.put("currentAuthority", loginUser.getUserType());
            result.put("status", "error");
            result.put("type", "account");
            result.put("SessionId", session.getId());
            return Result.loginerror(result);
        }
    }

    @PostMapping(value = "/register")
    public Result register (@RequestBody String loginEmail){
        return Result.success();
    }



    // 邮件验证发送例子
    @PostMapping(value = "/testa")
    public Result test() throws Exception{
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setFrom("xjx@zucc.edu.cn");
        helper.setTo("wcy623209668@vip.qq.com");
        helper.setSubject("Archive Book - Verification code of Email");
        helper.setText("");
        javaMailSender.send(mimeMessage);
        return Result.success();
    }


}

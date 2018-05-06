package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.CurrentUserModel;
import com.cyann.archivebook.model.MsgModel;
import com.cyann.archivebook.service.CurrentUserService;
import com.cyann.archivebook.service.MsgService;
import com.cyann.archivebook.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.List;

/**
 * @author CYann
 * @date 2018-05-05 22:23
 */
@RestController
@CrossOrigin
public class MsgController {
    @Autowired
    private CurrentUserService currentUserService;
    @Autowired
    private MsgService msgService;

    //新增反馈留言
    @Transactional
    @PostMapping(value = "/addfeedback")
    public Result addFeedback(@RequestBody MsgModel msgModel) {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String objectId = (String) request.getSession().getAttribute("ID");
        CurrentUserModel item = currentUserService.findByObjectId(objectId);
        msgModel.setSendUser(item.getLoginEmail());
        msgService.addFeedback(msgModel);
        return Result.success();
    }

    //新增通知
    @Transactional
    @PostMapping(value = "/addboard")
    public Result addBoard(@RequestBody MsgModel msgModel) {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String objectId = (String) request.getSession().getAttribute("ID");
        CurrentUserModel item = currentUserService.findByObjectId(objectId);
        msgModel.setSendUser(item.getLoginEmail());
        msgService.addBoard(msgModel);
        return Result.success();
    }


}


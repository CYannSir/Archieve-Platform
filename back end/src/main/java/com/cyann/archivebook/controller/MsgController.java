package com.cyann.archivebook.controller;

import com.cyann.archivebook.model.CurrentUserModel;
import com.cyann.archivebook.model.MsgModel;
import com.cyann.archivebook.service.CurrentUserService;
import com.cyann.archivebook.service.MsgService;
import com.cyann.archivebook.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    //展示通知
    @GetMapping(value = "/listnotice")
    public Result listNotice() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String objectId = (String) request.getSession().getAttribute("ID");
        CurrentUserModel item = currentUserService.findByObjectId(objectId);
        List<MsgModel> msgitem = msgService.findByRecUser(item.getLoginEmail());
        List<Map> mapList = new ArrayList();
        for(int i=0;i<msgitem.size();i++){
            Map tempMap = new HashMap();

            MsgModel msgModel = msgitem.get(i);
            tempMap.put("id",msgModel.getObjectId());
            if(msgModel.getMsgType().equals("消息")){
                tempMap.put("avatar","https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png");
            } else {
                tempMap.put("avatar","https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png");
            }
            tempMap.put("title",msgModel.getSendUser()+":"+msgModel.getMsgContent());
            tempMap.put("type",msgModel.getMsgType());
            tempMap.put("datetime",msgModel.getCreatTime());
            if(msgModel.getMsgStats().equals("read")){
                tempMap.put("read",true);
            } else {
                tempMap.put("read",false);
            }
            mapList.add(tempMap);
        }
        return Result.success(mapList);
    }

    //修改通知
    @PostMapping(value = "/updatestatus")
    public Result updateStatus(@RequestBody MsgModel msgModel) {
        msgService.updateStatus(msgModel);
        return Result.success();
    }

    //回复消息
    @PostMapping(value = "/replynotice")
    public Result replyNotice(@RequestBody MsgModel msgModel) {
        msgService.updateStatus(msgModel);
        return Result.success();
    }


}


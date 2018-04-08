package com.cyann.archivebook.aspect;


import com.cyann.archivebook.enums.ResultEnum;
import com.cyann.archivebook.exception.MyException;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
/**
 * @author CYann
 * @date 2018-04-01 18:55
 */
@Aspect
@Component
public class LoginAspect {
    /*private final static Logger logger = LoggerFactory.getLogger(LoginAspect.class);

    @Pointcut("execution(public * com.cyann.archivebook.controller.*.*(..))")
    public void point(){}

    @Pointcut("execution(public * com.cyann.archivebook.controller.AdminController.*(..))")
    public void pointAdmin(){}

    @Before("point()")
    public void doBefore() {
        logger.info("before!!!!");
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        HttpSession session = request.getSession();
        String id = (String) session.getAttribute("ID");
        if (id == null) {
            throw new MyException(ResultEnum.ERROR_100);
        }
    }

    @After("point()")
    public void doAfter() {
        logger.info("after!!!!");
    }

    @Before("pointAdmin()")
    public void doBeforeAdmin() {
        logger.info("before!!!!");
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        HttpSession session = request.getSession();
        String type = (String) session.getAttribute("TYPE");
        if (type.equals("admin")) {
            throw new MyException(ResultEnum.ERROR_100);
        }
    }

    @After("pointAdmin()")
    public void doAfterAdmin() {
        logger.info("after!!!!");
    }
    */
}

package com.cyann.archivebook.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author CYann
 * @date 2018-03-29 21:07
 * 当前用户
 * -用户登录邮箱 loginEmail
 * -用户登录密码 loginPsw
 * -学生学号-验证信息 stuNumber
 * -联系方式 mobliePhone
 * -激活码 activeCode
 * -用户类型 userType
 */

@Entity
@Table(name = "tb_currentuser")
public class CurrentUserModel extends BaseEntity {
    @Column(nullable = false , length = 64)
    private String loginEmail;
    @Column(nullable = false , length = 32)
    private String loginPsw;
    @Column(nullable = false , length = 32)
    private String stuNumber;
    @Column(nullable = false , length = 32)
    private String mobliePhone;
    @Column(nullable = false , length = 32)
    private String activeCode;
    @Column(nullable = false , length = 32)
    private String userType;

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getLoginEmail() {
        return loginEmail;
    }

    public void setLoginEmail(String loginEmail) {
        this.loginEmail = loginEmail;
    }

    public String getLoginPsw() {
        return loginPsw;
    }

    public void setLoginPsw(String loginPsw) {
        this.loginPsw = loginPsw;
    }

    public String getStuNumber() {
        return stuNumber;
    }

    public void setStuNumber(String stuNumber) {
        this.stuNumber = stuNumber;
    }

    public String getMobliePhone() {
        return mobliePhone;
    }

    public void setMobliePhone(String mobliePhone) {
        this.mobliePhone = mobliePhone;
    }

    public String getActiveCode() {
        return activeCode;
    }

    public void setActiveCode(String activeCode) {
        this.activeCode = activeCode;
    }
}

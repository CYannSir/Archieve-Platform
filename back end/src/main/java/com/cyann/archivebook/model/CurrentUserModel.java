package com.cyann.archivebook.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author CYann
 * @date 2018-03-29 21:07
 * 当前用户
 *
 */

@Entity
@Table(name = "tb_currentuser")
public class CurrentUserModel extends BaseEntity {
    @Column(nullable = false , length = 32)
    private String loginEmail;
    @Column(nullable = false , length = 32)
    private String loginPsw;
    @Column(nullable = false , length = 32)
    private String studentId;
    @Column(nullable = false , length = 32)
    private String mobliePhone;
    @Column(nullable = false , length = 32)
    private String activeCode;

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

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
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

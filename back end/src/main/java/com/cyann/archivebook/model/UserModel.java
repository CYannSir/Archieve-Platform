package com.cyann.archivebook.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author CYann
 * @date 2018-02-25 22:50
 *  用户
 * -用户学号 userNumber(String varchar)
 * -用户登录邮箱 logEmail(String varchar)
 * -用户登录密码 pwd(String varchar)
 * -用户姓名 userName(Stirng varchar)
 * -用户班级 userClass(String varchar)
 * -联系方式 userPhone(String varchar)
 * -用户权限 userPower(int int) 1:在校生 2:实习生 3:毕业生 4:管理员
 */
@Entity
@Table(name = "tb_user")
public class UserModel extends BaseEntity {
    @Column(nullable = false , length = 9)
    private String userNumber;
    @Column(nullable = false , length = 32)
    private String logEmail;
    @Column(nullable = false , length = 32)
    private String pwd;
    @Column(nullable = false , length = 16)
    private String userName;
    @Column(nullable = false , length = 16)
    private String userClass;
    @Column(nullable = false , length = 32)
    private String userPhone;
    @Column(nullable = false)
    private Integer userPower;

    public String getUserNumber() {
        return userNumber;
    }

    public void setUserNumber(String userNumber) {
        this.userNumber = userNumber;
    }

    public String getLogEmail() {
        return logEmail;
    }

    public void setLogEmail(String logEmail) {
        this.logEmail = logEmail;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserClass() {
        return userClass;
    }

    public void setUserClass(String userClass) {
        this.userClass = userClass;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }

    public Integer getUserPower() {
        return userPower;
    }

    public void setUserPower(Integer userPower) {
        this.userPower = userPower;
    }
}

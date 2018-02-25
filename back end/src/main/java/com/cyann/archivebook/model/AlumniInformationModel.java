package com.cyann.archivebook.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author CYann
 * @date 2018-02-26 0:32
 *  校友信息
 * -所属用户编号 userNum(String varchar) 外键
 * -所在公司 company(String varchar)
 * -公司地址 CompanyAddress(Stirng varchar)
 * -行业 industry(String varchar)
 * -职位 occupation(String varchar)
 * -薪水 salary(String varchar)
 * -交流群 talkGroup(String varchar)
 */
@Entity
@Table(name = "tb_alumniinformation")
public class AlumniInformationModel extends BaseEntity{
    @Column(nullable = false , length = 32)
    private String userNum;
    @Column(nullable = false , length = 32)
    private String company;
    @Column(nullable = false , length = 108)
    private String CompanyAddress;
    @Column(nullable = false , length = 32)
    private String industry;
    @Column(nullable = false , length = 32)
    private String occupation;
    @Column(nullable = false , length = 32)
    private String salary;
    @Column(nullable = false , length = 32)
    private String talkGroup;

    public String getUserNum() {
        return userNum;
    }

    public void setUserNum(String userNum) {
        this.userNum = userNum;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getCompanyAddress() {
        return CompanyAddress;
    }

    public void setCompanyAddress(String companyAddress) {
        CompanyAddress = companyAddress;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public String getTalkGroup() {
        return talkGroup;
    }

    public void setTalkGroup(String talkGroup) {
        this.talkGroup = talkGroup;
    }
}

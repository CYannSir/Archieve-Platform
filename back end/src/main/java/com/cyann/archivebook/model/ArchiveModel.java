package com.cyann.archivebook.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author CYann
 * @date 2018-02-25 23:50
 *  档案
 * -所属用户编号 stuNumber(String varchar) 外键
 * -档案目前单位 currentUnit(String varchar)
 * -档案目前单位地址 currentUnitAddress(String varchar)
 * -档案流向下级时间 flowDate(String varchar)
 * -档案上个单位 preUnit(String varchar)
 * -档案上个单位地址 preUnitAddress(String varchar)
 * -流向下级时间 secondFlowDate(String varchar)
 * -档案单位1 secondUnit(String varchar)
 * -流向下级时间 thirdFlowDate(String varchar)
 * -档案单位2 thirdUnit(String varchar)
 * -流向下级时间 forthFlowDate(String varchar)
 * -档案单位3 forthUnit(String varchar)
 */
@Entity
@Table(name = "tb_archive")
public class ArchiveModel extends BaseEntity {
    @Column(nullable = false , length = 32)
    private String stuNumber;
    @Column(nullable = false , length = 64)
    private String currentUnit;
    @Column(nullable = false , length = 108)
    private String currentUnitAddress;
    @Column(nullable = false , length = 32)
    private String flowDate;
    @Column(nullable = false , length = 64)
    private String preUnit;
    @Column(nullable = false , length = 108)
    private String preUnitAddress;
    @Column(nullable = false , length = 32)
    private String secondFlowDate;
    @Column(nullable = false , length = 64)
    private String secondUnit;
    @Column(nullable = false , length = 32)
    private String thirdFlowDate;
    @Column(nullable = false , length = 64)
    private String thirdUnit;
    @Column(nullable = false , length = 32)
    private String forthFlowDate;
    @Column(nullable = false , length = 64)
    private String forthUnit;

    public String getStuNumber() {
        return stuNumber;
    }

    public void setStuNumber(String stuNumber) {
        this.stuNumber = stuNumber;
    }

    public String getCurrentUnit() {
        return currentUnit;
    }

    public void setCurrentUnit(String currentUnit) {
        this.currentUnit = currentUnit;
    }

    public String getCurrentUnitAddress() {
        return currentUnitAddress;
    }

    public void setCurrentUnitAddress(String currentUnitAddress) {
        this.currentUnitAddress = currentUnitAddress;
    }

    public String getFlowDate() {
        return flowDate;
    }

    public void setFlowDate(String flowDate) {
        this.flowDate = flowDate;
    }

    public String getPreUnit() {
        return preUnit;
    }

    public void setPreUnit(String preUnit) {
        this.preUnit = preUnit;
    }

    public String getPreUnitAddress() {
        return preUnitAddress;
    }

    public void setPreUnitAddress(String preUnitAddress) {
        this.preUnitAddress = preUnitAddress;
    }

    public String getSecondFlowDate() {
        return secondFlowDate;
    }

    public void setSecondFlowDate(String secondFlowDate) {
        this.secondFlowDate = secondFlowDate;
    }

    public String getSecondUnit() {
        return secondUnit;
    }

    public void setSecondUnit(String secondUnit) {
        this.secondUnit = secondUnit;
    }

    public String getThirdFlowDate() {
        return thirdFlowDate;
    }

    public void setThirdFlowDate(String thirdFlowDate) {
        this.thirdFlowDate = thirdFlowDate;
    }

    public String getThirdUnit() {
        return thirdUnit;
    }

    public void setThirdUnit(String thirdUnit) {
        this.thirdUnit = thirdUnit;
    }

    public String getForthFlowDate() {
        return forthFlowDate;
    }

    public void setForthFlowDate(String forthFlowDate) {
        this.forthFlowDate = forthFlowDate;
    }

    public String getForthUnit() {
        return forthUnit;
    }

    public void setForthUnit(String forthUnit) {
        this.forthUnit = forthUnit;
    }
}
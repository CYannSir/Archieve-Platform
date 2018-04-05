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

}
package com.cyann.archivebook.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author CYann
 * @date 2018-02-25 23:50
 *  档案
 * -所属用户编号 userNum(String varchar) 外键
 * -档案上个单位 archiveUnit(String varchar)
 * -档案上个单位地址 archiveUnitAddress(String varchar)
 * -档案流向下级时间 archiveFlowDate(String varchar)
 * -档案下个单位 archiveNextUnit(String varchar)
 * -档案所在单位地址 archiveNextUnitAddress(String varchar)
 * -档案层级 archiveLevel(int int)
 * -
 * -档案单位1
 * -档案单位2
 * -档案单位3
 */
@Entity
@Table(name = "tb_archive")
public class ArchiveModel extends BaseEntity {
    @Column(nullable = false , length = 32)
    private String userNum;
    @Column(nullable = false , length = 64)
    private String archiveUnit;
    @Column(nullable = false , length = 108)
    private String archiveUnitAddress;
    @Column(nullable = false , length = 64)
    private String archiveNextUnit;
    @Column(nullable = false , length = 108)
    private String getArchiveNextUnitAddress;
    @Column(nullable = false , length = 32)
    private String archiveFlowDate;
    @Column(nullable = false)
    private Integer archiveLevel;

    public String getUserNum() {
        return userNum;
    }

    public void setUserNum(String userNum) {
        this.userNum = userNum;
    }

    public String getArchiveUnit() {
        return archiveUnit;
    }

    public void setArchiveUnit(String archiveUnit) {
        this.archiveUnit = archiveUnit;
    }

    public String getArchiveUnitAddress() {
        return archiveUnitAddress;
    }

    public void setArchiveUnitAddress(String archiveUnitAddress) {
        this.archiveUnitAddress = archiveUnitAddress;
    }

    public String getArchiveNextUnit() {
        return archiveNextUnit;
    }

    public void setArchiveNextUnit(String archiveNextUnit) {
        this.archiveNextUnit = archiveNextUnit;
    }

    public String getGetArchiveNextUnitAddress() {
        return getArchiveNextUnitAddress;
    }

    public void setGetArchiveNextUnitAddress(String getArchiveNextUnitAddress) {
        this.getArchiveNextUnitAddress = getArchiveNextUnitAddress;
    }

    public String getArchiveFlowDate() {
        return archiveFlowDate;
    }

    public void setArchiveFlowDate(String archiveFlowDate) {
        this.archiveFlowDate = archiveFlowDate;
    }

    public Integer getArchiveLevel() {
        return archiveLevel;
    }

    public void setArchiveLevel(Integer archiveLevel) {
        this.archiveLevel = archiveLevel;
    }
}

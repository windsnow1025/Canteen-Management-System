package com.windsnow1025.canteenmanagement.springboot.model;

import java.io.Serializable;

public class Complaint implements Serializable {
    private int id;
    private int canteenId;
    private String detail;
    private String complaintResult;

    public Complaint() {
    }

    public Complaint(int id, int canteenId, String detail, String complaintResult) {
        this.id = id;
        this.canteenId = canteenId;
        this.detail = detail;
        this.complaintResult = complaintResult;
    }

    public Complaint(int canteenId, String detail, String complaintResult) {
        this.canteenId = canteenId;
        this.detail = detail;
        this.complaintResult = complaintResult;
    }

    public Complaint(int canteenId, String detail) {
        this.canteenId = canteenId;
        this.detail = detail;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCanteenId() {
        return canteenId;
    }

    public void setCanteenId(int canteenId) {
        this.canteenId = canteenId;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getComplaintResult() {
        return complaintResult;
    }

    public void setComplaintResult(String complaintResult) {
        this.complaintResult = complaintResult;
    }
}

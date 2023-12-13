package com.windsnow1025.canteenmanagement.springboot.model;

import java.io.Serializable;

public class Canteen implements Serializable {
    private int id;
    private String canteenName;
    private String intro;
    private String location;
    private String businessHour;
    private String announcement;

    public Canteen() {
    }

    public Canteen(int id, String canteenName, String intro, String location, String businessHour, String announcement) {
        this.id = id;
        this.canteenName = canteenName;
        this.intro = intro;
        this.location = location;
        this.businessHour = businessHour;
        this.announcement = announcement;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCanteenName() {
        return canteenName;
    }

    public void setCanteenName(String canteenName) {
        this.canteenName = canteenName;
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getBusinessHour() {
        return businessHour;
    }

    public void setBusinessHour(String businessHour) {
        this.businessHour = businessHour;
    }

    public String getAnnouncement() {
        return announcement;
    }

    public void setAnnouncement(String announcement) {
        this.announcement = announcement;
    }
}

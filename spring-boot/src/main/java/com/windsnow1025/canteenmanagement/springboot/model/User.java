package com.windsnow1025.canteenmanagement.springboot.model;

import java.io.Serializable;

public class User implements Serializable {
    private int id;
    private String username;
    private String password;
    private String userType;
    private float userLevel;
    private int canteenId;

    public User() {
    }

    public User(int id, String username, String password, String userType, float userLevel, int canteenId) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.userType = userType;
        this.userLevel = userLevel;
        this.canteenId = canteenId;
    }

    public User(String username, String password, String userType, float userLevel, int canteenId) {
        this.username = username;
        this.password = password;
        this.userType = userType;
        this.userLevel = userLevel;
        this.canteenId = canteenId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public float getUserLevel() {
        return userLevel;
    }

    public void setUserLevel(float userLevel) {
        this.userLevel = userLevel;
    }

    public int getCanteenId() {
        return canteenId;
    }

    public void setCanteenId(int canteenId) {
        this.canteenId = canteenId;
    }
}

package com.windsnow1025.canteenmanagement.springboot.model;

import java.io.Serializable;

public class Evaluation implements Serializable {
    private int id;
    private int userId;
    private int dishId;
    private String content;
    private String picture;
    private float rating;

    public Evaluation() {
    }

    public Evaluation(int dishId, String content, String picture, float rating) {
        this.dishId = dishId;
        this.content = content;
        this.picture = picture;
        this.rating = rating;
    }

    public Evaluation(int id, int userId, int dishId, String content, String picture, float rating) {
        this.id = id;
        this.userId = userId;
        this.dishId = dishId;
        this.content = content;
        this.picture = picture;
        this.rating = rating;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getDishId() {
        return dishId;
    }

    public void setDishId(int dishId) {
        this.dishId = dishId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }
}

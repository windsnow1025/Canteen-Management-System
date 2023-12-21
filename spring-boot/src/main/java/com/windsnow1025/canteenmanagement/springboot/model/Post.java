package com.windsnow1025.canteenmanagement.springboot.model;

import java.io.Serializable;

public class Post implements Serializable {
    private int id;
    private int userId;
    private String time;
    private String title;
    private String content;
    private String picture;
    private int upvote;

    public Post() {
    }

    public Post(String time, String title, int upvote) {
        this.time = time;
        this.title = title;
        this.upvote = upvote;
    }

    public Post(String time, String title, String content, String picture, int upvote) {
        this.time = time;
        this.title = title;
        this.content = content;
        this.picture = picture;
        this.upvote = upvote;
    }

    public Post(int id, int userId, String time, String title, String content, String picture, int upvote) {
        this.id = id;
        this.userId = userId;
        this.time = time;
        this.title = title;
        this.content = content;
        this.picture = picture;
        this.upvote = upvote;
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

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public int getUpvote() {
        return upvote;
    }

    public void setUpvote(int upvote) {
        this.upvote = upvote;
    }
}

package com.windsnow1025.canteenmanagement.springboot.model;

import java.io.Serializable;

public class Comment implements Serializable {
    private int id;
    private int userId;
    private int postId;
    private String content;

    public Comment() {
    }

    public Comment(int userId, int postId, String content) {
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    public Comment(int id, int userId, int postId, String content) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
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

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}

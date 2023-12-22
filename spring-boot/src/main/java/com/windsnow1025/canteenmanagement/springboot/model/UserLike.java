package com.windsnow1025.canteenmanagement.springboot.model;

import java.io.Serializable;

public class UserLike implements Serializable {
    private int id;
    private int userId;
    private int postId;

    public UserLike() {
    }

    public UserLike(int userId, int postId) {
        this.userId = userId;
        this.postId = postId;
    }

    public UserLike(int id, int userId, int postId) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
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
}

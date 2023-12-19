package com.windsnow1025.canteenmanagement.springboot.model;

public class Vote {
    private int id;
    private int canteenId;
    private String title;
    private String voteResult;

    public Vote() {
    }

    public Vote(int canteenId, String title) {
        this.canteenId = canteenId;
        this.title = title;
    }

    public Vote(int canteenId, String title, String voteResult) {
        this.canteenId = canteenId;
        this.title = title;
        this.voteResult = voteResult;
    }

    public Vote(int id, int canteenId, String title, String voteResult) {
        this.id = id;
        this.canteenId = canteenId;
        this.title = title;
        this.voteResult = voteResult;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getVoteResult() {
        return voteResult;
    }

    public void setVoteResult(String voteResult) {
        this.voteResult = voteResult;
    }
}

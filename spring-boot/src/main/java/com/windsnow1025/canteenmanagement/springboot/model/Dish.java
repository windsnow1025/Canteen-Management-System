package com.windsnow1025.canteenmanagement.springboot.model;

import java.io.Serializable;

public class Dish implements Serializable {
    private int id;
    private int canteen_id;
    private String dishName;
    private float price;
    private float discount_rate = 0;
    private String cuisine;
    private String picture;

    public Dish() {
    }

    public Dish(int canteen_id, String dishName, float price, float discount_rate, String cuisine, String picture) {
        this.canteen_id = canteen_id;
        this.dishName = dishName;
        this.price = price;
        this.discount_rate = discount_rate;
        this.cuisine = cuisine;
        this.picture = picture;
    }

    public Dish(int id, int canteen_id, String dishName, float price, float discount_rate, String cuisine, String picture) {
        this.id = id;
        this.canteen_id = canteen_id;
        this.dishName = dishName;
        this.price = price;
        this.discount_rate = discount_rate;
        this.cuisine = cuisine;
        this.picture = picture;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCanteen_id() {
        return canteen_id;
    }

    public void setCanteen_id(int canteen_id) {
        this.canteen_id = canteen_id;
    }

    public String getDishName() {
        return dishName;
    }

    public void setDishName(String dishName) {
        this.dishName = dishName;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public float getDiscount_rate() {
        return discount_rate;
    }

    public void setDiscount_rate(float discount_rate) {
        this.discount_rate = discount_rate;
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}

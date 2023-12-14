package com.windsnow1025.canteenmanagement.springboot.model;

import java.io.Serializable;

public class Dish implements Serializable {
    private int id;
    private int canteen_id;
    private String dishName;
    private float price;
    private float discount_rate;
    private String cuisine;
    
}

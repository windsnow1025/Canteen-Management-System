package com.windsnow1025.canteenmanagement.springboot.dao;

import com.windsnow1025.canteenmanagement.springboot.model.Dish;
import com.windsnow1025.canteenmanagement.springboot.util.JDBCHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.SQLException;
import java.util.Base64;
import java.util.List;

public class DishDAO {
    private static final Logger logger = LoggerFactory.getLogger(DishDAO.class);
    private final JDBCHelper jdbcHelper;
    public DishDAO(){
        jdbcHelper = new JDBCHelper();
    }

    public boolean insert(Dish dish){
        String sql = "INSERT INTO dish (canteen_id, dish_name, price, discount_rate, cuisine, picture) VALUES (?, ?, ?, ?, ?, ?)";
        String base64String = dish.getPicture();
        int canteenId = dish.getCanteen_id();
        String dishName = dish.getDishName();
        float price = dish.getPrice();
        float discountRate = 1;
        String cuisine = dish.getCuisine();
        byte[] pictureBytes = null;
        if (base64String != null && !base64String.isEmpty()){
            pictureBytes = Base64.getDecoder().decode(base64String);
        }
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, canteenId, dishName, price, discountRate, cuisine, pictureBytes);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("insert error", e);
            throw new RuntimeException(e);
        }
    }

//    public List<Dish>
}

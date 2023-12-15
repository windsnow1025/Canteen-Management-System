package com.windsnow1025.canteenmanagement.springboot.dao;

import com.windsnow1025.canteenmanagement.springboot.model.Dish;
import com.windsnow1025.canteenmanagement.springboot.util.JDBCHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;

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

    public List<Dish> getAllDish(){
        List<Dish> dishList = new ArrayList<>();
        String sql = "SELECT * FORM dish";
        try {
            List<Map<String, Object>> results = jdbcHelper.select(sql);
            if (! results.isEmpty()){
                for (Map<String, Object> result : results){
                    int id = (int) result.get("id");
                    int canteenId = (int) result.get("canteen_id");
                    String dishName = (String) result.get("dish_name");
                    float price = (float) result.get("price");
                    float discount_rate = (float) result.get("discount_rate");
                    String cuisine = (String) result.get("cuisine");
                    byte[] pictureBytes = (byte[]) result.get("picture");
                    String picture = ( pictureBytes != null) ? Base64.getEncoder().encodeToString(pictureBytes) :null;
                    dishList.add(new Dish(id, canteenId, dishName, price, discount_rate, cuisine, picture));
                }
                return dishList;
            } else {
                return null;
            }
        } catch (SQLException e) {
            logger.error("getAllDish error", e);
            throw new RuntimeException(e);
        }
    }

    public Dish getDishById(int id){
        String sql = "SELECT * FROM dish WHERE id = ?";
        try {
            List<Map<String, Object>> results = jdbcHelper.select(sql, id);
            if (! results.isEmpty()){
                    Map<String, Object> result = results.getFirst();
                    int canteenId = (int) result.get("canteen_id");
                    String dishName = (String) result.get("dish_name");
                    float price = (float) result.get("price");
                    float discount_rate = (float) result.get("discount_rate");
                    String cuisine = (String) result.get("cuisine");
                    byte[] pictureBytes = (byte[]) result.get("picture");
                    String picture = ( pictureBytes != null) ? Base64.getEncoder().encodeToString(pictureBytes) :null;
                return new Dish(id, canteenId, dishName, price, discount_rate, cuisine, picture);
            } else {
                return null;
            }
        } catch (SQLException e) {
            logger.error("getDishById error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean hasPermission(String username){
        String sql = "SELECT * FROM user JOIN dish ON user.canteen_id = dish.canteen_id WHERE user.username = ?";
        try {
            if (! jdbcHelper.select(sql, username).isEmpty()){
                return true;
            } else {
                return false;
            }
        } catch (SQLException e) {
            logger.error("hasPermission error", e);
            throw new RuntimeException(e);
        }
    }

}

package com.windsnow1025.canteenmanagement.springboot.dao;

import com.windsnow1025.canteenmanagement.springboot.model.Dish;
import com.windsnow1025.canteenmanagement.springboot.util.JDBCHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.SQLException;
import java.util.*;

public class DishDAO {
    private static final Logger logger = LoggerFactory.getLogger(DishDAO.class);
    private final JDBCHelper jdbcHelper;
    public DishDAO(){
        jdbcHelper = new JDBCHelper();
    }

    public boolean hasCreatePermission(String username, int canteenId){
        String sql = "SELECT * FROM user JOIN dish ON user.canteen_id = dish.canteen_id WHERE user.username = ? AND dish.canteen_id = ?";
        String sqlMaster = "SELECT * FROM user WHERE username = ?";
        try {
            List<Map<String, Object>> results = jdbcHelper.select(sqlMaster, username);
            if (results.isEmpty()){
                return false;
            }
            Map<String,Object> result = results.getFirst();
            String userType = (String) result.get("user_type");
            if (Objects.equals(userType, "master_admin")){
                return true;
            }
            return ! jdbcHelper.select(sql, username, canteenId).isEmpty();
        } catch (SQLException e) {
            logger.error("hasCreatePermission error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean hasUpdatePermission(String username, int dishId){
        String sql = "SELECT * FROM user JOIN dish ON user.canteen_id = dish.canteen_id WHERE user.username = ? AND dish.id = ?";
        String sqlMaster = "SELECT * FROM user WHERE username = ?";
        try {
            List<Map<String, Object>> results = jdbcHelper.select(sqlMaster, username);
            if (results.isEmpty()){
                return false;
            }
            Map<String,Object> result = results.getFirst();
            String userType = (String) result.get("user_type");
            if (Objects.equals(userType, "master_admin")){
                return true;
            }
            return ! jdbcHelper.select(sql, username, dishId).isEmpty();
        } catch (SQLException e) {
            logger.error("hasUpdatePermission error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean insert(Dish dish){
        String sql = "INSERT INTO dish (canteen_id, dish_name, price, discount_rate, cuisine, picture) VALUES (?, ?, ?, ?, ?, ?)";
        String base64String = dish.getPicture();
        int canteenId = dish.getCanteen_id();
        String dishName = dish.getDishName();
        float price = dish.getPrice();
        float discountRate = 1;
        if (dish.getDiscount_rate() != 0){
            discountRate = dish.getDiscount_rate();
        }
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

    public Set<String> getAllDishName(){
        Set<String> dishNameSet = new HashSet<>();
        String sql = "SELECT dish_name FROM dish";
        try {
            List<Map<String, Object>> results = jdbcHelper.select(sql);
            if (! results.isEmpty()){
                for (Map<String, Object> result : results){
                    dishNameSet.add((String) result.get("dish_name"));
                }
                return dishNameSet;
            } else {
                return null;
            }
        } catch (SQLException e) {
            logger.error("selectDishName error", e);
            throw new RuntimeException(e);
        }
    }

    public List<Dish> getAllDish(){
        List<Dish> dishList = new ArrayList<>();
        String sql = "SELECT * FROM dish";
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

    public List<Dish> getDishByName(String name){
        List<Dish> dishList = new ArrayList<>();
        String sql = "SELECT * FROM dish WHERE dish_name = ?";
        try {
            List<Map<String, Object>> results = jdbcHelper.select(sql, name);
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
            logger.error("getDishByName error", e);
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

    public boolean updateCanteenIdById(int id, int canteenId){
        String sql = "UPDATE dish SET canteen_id = ? WHERE id = ?";
        String selectCanteenIsExist = "SELECT * FROM canteen WHERE id = ?";
        try {
            if ( jdbcHelper.select(selectCanteenIsExist, canteenId).isEmpty()){
                return false;
            }
            int rowsAffected = jdbcHelper.executeUpdate(sql, canteenId, id);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("updateCanteenIdById error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean updateDishNameById(int id, String dishName){
        String sql = "UPDATE dish SET dish_name = ? WHERE id = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, dishName, id);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("updateDishNameById error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean updatePriceById(int id, float price){
        String sql = "UPDATE dish SET price = ? WHERE id = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, price, id);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("updatePriceById error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean updateDiscountRateById(int id, float discountRate){
        String sql = "UPDATE dish SET discount_rate = ? WHERE id = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, discountRate, id);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("updateDiscountRateById error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean updateCuisineById(int id, String cuisine){
        String sql = "UPDATE dish SET cuisine = ? WHERE id = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, cuisine, id);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("updateCuisineById error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean updatePictureById(int id, String picture){
        String sql = "UPDATE dish SET picture = ? WHERE id = ?";
        byte[] pictureBytes = null;
        if (picture != null && !picture.isEmpty()){
            pictureBytes = Base64.getDecoder().decode(picture);
        }
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, pictureBytes, id);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("updatePictureById error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean deleteById(int id){
        String sql = "DELETE FROM dish WHERE id = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, id);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("deleteById error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean deleteByName(String name){
        String sql = "DELETE FROM dish WHERE dish_name = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, name);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("deleteById error", e);
            throw new RuntimeException(e);
        }
    }

}

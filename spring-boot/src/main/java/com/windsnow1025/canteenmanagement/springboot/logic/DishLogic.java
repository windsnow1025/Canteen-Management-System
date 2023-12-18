package com.windsnow1025.canteenmanagement.springboot.logic;

import com.windsnow1025.canteenmanagement.springboot.dao.DishDAO;
import com.windsnow1025.canteenmanagement.springboot.model.Dish;
import com.windsnow1025.canteenmanagement.springboot.util.JwtUtil;

import java.util.List;
import java.util.Set;

public class DishLogic {
    private final DishDAO dishDAO;

    public DishLogic(){
        dishDAO = new DishDAO();
    }

    public List<Dish> getAllDish(String token){
        if (JwtUtil.parseJWT(token) != null){
            return dishDAO.getAllDish();
        } else {
            return null;
        }
    }

    public Set<String> getAllName(String token){
        if (JwtUtil.parseJWT(token) != null){
            return dishDAO.getAllDishName();
        } else {
            return null;
        }
    }

    public List<Dish> getDishByName(String token, String dishName){
        if (JwtUtil.parseJWT(token) != null){
            return dishDAO.getDishByName(dishName);
        } else {
            return null;
        }
    }

    public Dish getDishById(String token, int id){
        if (JwtUtil.parseJWT(token) != null){
            return dishDAO.getDishById(id);
        } else {
            return null;
        }
    }

    public boolean addDish(String token, Dish dish){
        String username = JwtUtil.parseJWT(token);
        if ( dishDAO.hasCreatePermission(username, dish.getCanteen_id())){
            return  dishDAO.insert(dish);
        } else {
            return false;
        }
    }

    public boolean updateCanteenId(String token, int id, int canteenId){
        String username = JwtUtil.parseJWT(token);
        if (dishDAO.hasUpdatePermission(username, id)){
            return  dishDAO.updateCanteenIdById(id, canteenId);
        } else {
            return false;
        }
    }

    public boolean updateDishNameById(String token, int id, String dishName){
        String username = JwtUtil.parseJWT(token);
        if (dishDAO.hasUpdatePermission(username, id)){
            return dishDAO.updateDishNameById(id, dishName);
        } else {
            return false;
        }
    }

    public boolean updatePriceById(String token, int id, float price){
        String username = JwtUtil.parseJWT(token);
        if (dishDAO.hasUpdatePermission(username, id)){
            return dishDAO.updatePriceById(id, price);
        } else {
            return false;
        }
    }

    public boolean updateDiscountRateById(String token, int id, float discountRate){
        String username = JwtUtil.parseJWT(token);
        if (dishDAO.hasUpdatePermission(username, id)){
            return dishDAO.updateDiscountRateById(id, discountRate);
        } else {
            return false;
        }
    }

    public boolean updateCuisineById(String token, int id, String cuisine){
        String username = JwtUtil.parseJWT(token);
        if (dishDAO.hasUpdatePermission(username, id)){
            return dishDAO.updateCuisineById(id, cuisine);
        } else {
            return false;
        }
    }

    public boolean updatePictureById(String token, int id, String picture){
        String username = JwtUtil.parseJWT(token);
        if (dishDAO.hasUpdatePermission(username, id)){
            return dishDAO.updatePictureById(id, picture);
        } else {
            return false;
        }
    }

    public boolean deleteById(String token, int id){
        String username = JwtUtil.parseJWT(token);
        if (dishDAO.hasUpdatePermission(username, id)){
            return dishDAO.deleteById(id);
        } else {
            return false;
        }
    }
}


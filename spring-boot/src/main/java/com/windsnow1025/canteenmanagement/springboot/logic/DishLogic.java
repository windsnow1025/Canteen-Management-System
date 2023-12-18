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
}


package com.windsnow1025.canteenmanagement.springboot.logic;

import com.windsnow1025.canteenmanagement.springboot.dao.CanteenDAO;
import com.windsnow1025.canteenmanagement.springboot.model.Canteen;
import com.windsnow1025.canteenmanagement.springboot.util.JwtUtil;

import java.util.Objects;

public class CanteenLogic {
    private final CanteenDAO canteenDAO;

    public CanteenLogic(){
        canteenDAO = new CanteenDAO();
    }

    public Canteen getInfo(String token, String username, String canteenName){
        if (Objects.equals(username, JwtUtil.parseJWT(token))) {
            return canteenDAO.selectCanteenByCanteenName(canteenName);
        }else
        {
            return null;
        }
    }

    public boolean insert(String token, String username, String canteenName, String intro, String location, String businessHours, String announcement){
        if (Objects.equals(username, JwtUtil.parseJWT(token))) {
            Canteen canteen = new Canteen(canteenName, intro, location, businessHours, announcement);
            return canteenDAO.insert(canteen);
        }else {
            return false;
        }
    }

    public boolean updateCanteenName(String token, String username, int id, String newCanteenName){
        if (Objects.equals(username, JwtUtil.parseJWT(token))) {
            return canteenDAO.updateCanteenName(id, newCanteenName);
        }else {
            return false;
        }
    }

    public boolean updateIntro(String token, String username, String canteenName, String newIntro){
        if (Objects.equals(username, JwtUtil.parseJWT(token))){
            return canteenDAO.updateIntro(canteenName, newIntro);
        }else {
            return false;
        }
    }

    public boolean updateLocation(String token, String username, String canteenName, String newLocation){
        if (Objects.equals(username, JwtUtil.parseJWT(token))){
            return canteenDAO.updateLocation(canteenName, newLocation);
        }else {
            return false;
        }
    }

    public boolean updateBusinessHour(String token, String username, String canteenName, String newBusinessHours){
        if (Objects.equals(username, JwtUtil.parseJWT(token))){
            return canteenDAO.updateBusinessHour(canteenName, newBusinessHours);
        }else {
            return false;
        }
    }

    public boolean updateAnnouncement(String token, String username, String canteenName, String newAnnouncement){
        if (Objects.equals(username, JwtUtil.parseJWT(token))){
            return canteenDAO.updateAnnouncement(canteenName, newAnnouncement);
        }else {
            return false;
        }
    }

    public boolean delete(String token, String username, String canteenName){
        if (Objects.equals(username, JwtUtil.parseJWT(token))){
            return canteenDAO.delete(canteenName);
        }else {
            return false;
        }
    }
}

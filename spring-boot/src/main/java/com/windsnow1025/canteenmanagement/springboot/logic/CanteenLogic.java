package com.windsnow1025.canteenmanagement.springboot.logic;

import com.windsnow1025.canteenmanagement.springboot.dao.CanteenDAO;
import com.windsnow1025.canteenmanagement.springboot.model.Canteen;
import com.windsnow1025.canteenmanagement.springboot.util.JwtUtil;

public class CanteenLogic {
    private final CanteenDAO canteenDAO;

    public CanteenLogic(){
        canteenDAO = new CanteenDAO();
    }

    public Canteen getInfo(String token){
        String canteenName = JwtUtil.parseJWT(token);
        return canteenDAO.selectCanteenByCanteenName(canteenName);
    }

    public boolean insert(Canteen canteen){
        return canteenDAO.insert(canteen);
    }

    public boolean updateCanteenName(String token, String newCanteenName){
        int id = Integer.parseInt(JwtUtil.parseJWT(token));
        return canteenDAO.updateCanteenName(id, newCanteenName);
    }

    public boolean updateIntro(String token, String newIntro){
        String canteenName = JwtUtil.parseJWT(token);
        return canteenDAO.updateIntro(canteenName, newIntro);
    }

    public boolean updateLocation(String token, String newLocation){
        String canteenName = JwtUtil.parseJWT(token);
        return canteenDAO.updateLocation(canteenName, newLocation);
    }

    public boolean updateBusinessHour(String token, String newBusinessHours){
        String canteenName = JwtUtil.parseJWT(token);
        return canteenDAO.updateBusinessHour(canteenName, newBusinessHours);
    }

    public boolean updateAnnouncement(String token, String newAnnouncement){
        String canteenName = JwtUtil.parseJWT(token);
        return canteenDAO.updateAnnouncement(canteenName, newAnnouncement);
    }

    public boolean delete(String token){
        String canteenName = JwtUtil.parseJWT(token);
        return canteenDAO.delete(canteenName);
    }
}

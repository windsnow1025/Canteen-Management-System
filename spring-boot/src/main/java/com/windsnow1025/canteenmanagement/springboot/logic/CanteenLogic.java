package com.windsnow1025.canteenmanagement.springboot.logic;

import com.windsnow1025.canteenmanagement.springboot.dao.CanteenDAO;
import com.windsnow1025.canteenmanagement.springboot.dao.UserDAO;
import com.windsnow1025.canteenmanagement.springboot.model.Canteen;
import com.windsnow1025.canteenmanagement.springboot.util.JwtUtil;

import java.util.List;
import java.util.Objects;

public class CanteenLogic {
    private final CanteenDAO canteenDAO;
    private final UserDAO userDAO;

    public CanteenLogic() {
        canteenDAO = new CanteenDAO();
        userDAO = new UserDAO();
    }

    public Canteen getInfo(String token, String canteenName) {
        if (JwtUtil.parseJWT(token) != null) {
            return canteenDAO.selectCanteenByCanteenName(canteenName);
        } else {
            return null;
        }
    }

    public Canteen getInfoById(String token, int id) {
        if (JwtUtil.parseJWT(token) != null) {
            return canteenDAO.selectCanteenById(id);
        } else {
            return null;
        }
    }

    public List<Canteen> getAllName(String token) {
        if (JwtUtil.parseJWT(token) != null) {
            return canteenDAO.getAllCanteen();
        } else {
            return null;
        }
    }

    public boolean insert(String token, String canteenName, String intro, String location, String businessHours, String announcement) {
        if (Objects.equals(userDAO.getUserTypeByName(JwtUtil.parseJWT(token)), "master_admin")) {
            Canteen canteen = new Canteen(canteenName, intro, location, businessHours, announcement);
            return canteenDAO.insert(canteen);
        } else {
            return false;
        }
    }

    public boolean updateCanteenName(String token, int id, String newCanteenName) {
        if ( ! Objects.equals(userDAO.getUserTypeByName(JwtUtil.parseJWT(token)), "consumer")) {
            return canteenDAO.updateCanteenName(id, newCanteenName);
        } else {
            return false;
        }
    }

    public boolean updateIntro(String token, String canteenName, String newIntro) {
        if ( ! Objects.equals(userDAO.getUserTypeByName(JwtUtil.parseJWT(token)), "consumer")) {
            return canteenDAO.updateIntro(canteenName, newIntro);
        } else {
            return false;
        }
    }

    public boolean updateLocation(String token, String canteenName, String newLocation) {
        if ( ! Objects.equals(userDAO.getUserTypeByName(JwtUtil.parseJWT(token)), "consumer")) {
            return canteenDAO.updateLocation(canteenName, newLocation);
        } else {
            return false;
        }
    }

    public boolean updateBusinessHour(String token, String canteenName, String newBusinessHours) {
        if ( ! Objects.equals(userDAO.getUserTypeByName(JwtUtil.parseJWT(token)), "consumer")) {
            return canteenDAO.updateBusinessHour(canteenName, newBusinessHours);
        } else {
            return false;
        }
    }

    public boolean updateAnnouncement(String token, String canteenName, String newAnnouncement) {
        if (Objects.equals(JwtUtil.parseJWT(token), "master")) {
            return canteenDAO.updateAnnouncement(canteenName, newAnnouncement);
        } else {
            return false;
        }
    }

    public boolean delete(String token, String canteenName) {
        if (Objects.equals(userDAO.getUserTypeByName(JwtUtil.parseJWT(token)), "master_admin")) {
            return canteenDAO.delete(canteenName);
        } else {
            return false;
        }
    }
}

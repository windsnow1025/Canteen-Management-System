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

    public Canteen getInfoById(String token, int id) {
        if (JwtUtil.parseJWT(token) != null) {
            return canteenDAO.selectById(id);
        } else {
            return null;
        }
    }

    public List<Canteen> getInfos(String token) {
        if (JwtUtil.parseJWT(token) != null) {
            return canteenDAO.selectAll();
        } else {
            return null;
        }
    }

    public boolean insert(String token, String canteenName, String intro, String location, String businessHours, String announcement) {
        String userType = userDAO.getUserTypeByName(JwtUtil.parseJWT(token));
        if (userType.equals("master_admin")) {
            Canteen canteen = new Canteen(canteenName, intro, location, businessHours, announcement);
            return canteenDAO.insert(canteen);
        } else {
            return false;
        }
    }

    public boolean updateCanteenName(String token, int id, String newCanteenName) {
        String userType = userDAO.getUserTypeByName(JwtUtil.parseJWT(token));

        if (userType.equals("master_admin")) {
            return canteenDAO.updateCanteenName(id, newCanteenName);
        }else if(userType.equals("canteen_admin")){
            int canteenId = userDAO.getCanteenIdByName(JwtUtil.parseJWT(token));
            if (canteenId == id) {
                return canteenDAO.updateCanteenName(id, newCanteenName);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public boolean updateIntro(String token, String canteenName, String newIntro) {
        String userType = userDAO.getUserTypeByName(JwtUtil.parseJWT(token));

        if (userType.equals("master_admin")) {
            return canteenDAO.updateIntro(canteenName, newIntro);
        } else if(userType.equals("canteen_admin")){
            int canteenId = userDAO.getCanteenIdByName(JwtUtil.parseJWT(token));
            String ownCanteenName = canteenDAO.selectById(canteenId).getCanteenName();
            if (Objects.equals(canteenName, ownCanteenName)) {
                return canteenDAO.updateIntro(canteenName, newIntro);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public boolean updateLocation(String token, String canteenName, String newLocation) {
        String userType = userDAO.getUserTypeByName(JwtUtil.parseJWT(token));
        if (userType.equals("master_admin")) {
            return canteenDAO.updateLocation(canteenName, newLocation);
        } else if(userType.equals("canteen_admin")){
            int canteenId = userDAO.getCanteenIdByName(JwtUtil.parseJWT(token));
            String ownCanteenName = canteenDAO.selectById(canteenId).getCanteenName();
            if (Objects.equals(canteenName, ownCanteenName)) {
                return canteenDAO.updateLocation(canteenName, newLocation);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public boolean updateBusinessHour(String token, String canteenName, String newBusinessHour) {
        String userType = userDAO.getUserTypeByName(JwtUtil.parseJWT(token));

        if (userType.equals("master_admin")) {
            return canteenDAO.updateBusinessHour(canteenName, newBusinessHour);
        } else if(userType.equals("canteen_admin")){
            int canteenId = userDAO.getCanteenIdByName(JwtUtil.parseJWT(token));
            String ownCanteenName = canteenDAO.selectById(canteenId).getCanteenName();
            if (Objects.equals(canteenName, ownCanteenName)) {
                return canteenDAO.updateBusinessHour(canteenName, newBusinessHour);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public boolean updateAnnouncement(String token, String canteenName, String newAnnouncement) {
        String userType = userDAO.getUserTypeByName(JwtUtil.parseJWT(token));
        if (userType.equals("master_admin")) {
            return canteenDAO.updateAnnouncement(canteenName, newAnnouncement);
        } else if(userType.equals("canteen_admin")){
            int canteenId = userDAO.getCanteenIdByName(JwtUtil.parseJWT(token));
            String ownCanteenName = canteenDAO.selectById(canteenId).getCanteenName();
            if (Objects.equals(canteenName, ownCanteenName)) {
                return canteenDAO.updateAnnouncement(canteenName, newAnnouncement);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public boolean delete(String token, int id) {
        String userType = userDAO.getUserTypeByName(JwtUtil.parseJWT(token));
        if (userType.equals("master_admin")) {
            return canteenDAO.delete(id);
        } else {
            return false;
        }
    }
}

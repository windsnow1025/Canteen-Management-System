package com.windsnow1025.canteenmanagement.springboot.logic;

import com.windsnow1025.canteenmanagement.springboot.dao.UserDAO;
import com.windsnow1025.canteenmanagement.springboot.model.User;
import com.windsnow1025.canteenmanagement.springboot.util.JwtUtil;

import java.util.List;
import java.util.Objects;

public class UserLogic {

    private final UserDAO userDao;

    public UserLogic() {
        userDao = new UserDAO();
    }

    public User getInfo(String token) {
        String username = JwtUtil.parseJWT(token);
        return userDao.selectByUsername(username);
    }

    public List<User> getAllUser(String token) {
        String userType = userDao.getUserTypeByName(JwtUtil.parseJWT(token));
        if (userType.equals("master_admin") || userType.equals("canteen_admin")) {
            return userDao.getAllUser();
        } else {
            return null;
        }
    }

    public String signIn(String username, String password) {
        User user = userDao.selectByUsernamePassword(username, password);
        return JwtUtil.createJWT(user.getUsername());
    }

    public boolean signUp(String username, String password, String userType, String userLevel, int canteenId) {
        User user = new User(username, password, userType, userLevel, canteenId);
        return userDao.insert(user);
    }

    public boolean updatePassword(String token, String newPassword) {
        String oldUsername = JwtUtil.parseJWT(token);
        return userDao.updatePassword(oldUsername, newPassword);
    }

    public boolean updateType(String token, String username, String newType, int canteenId) {
        String userType = userDao.getUserTypeByName(JwtUtil.parseJWT(token));
        if (userType.equals("master_admin") || userType.equals("canteen_admin")) {
            return userDao.updateType(username, newType, canteenId);
        } else {
            return false;
        }
    }

    public boolean updateLevel(String token, String newLevel) {
        String oldUsername = JwtUtil.parseJWT(token);
        return userDao.updateLevel(oldUsername, newLevel);
    }

    public boolean delete(String token, String username) {
        String userType = userDao.getUserTypeByName(JwtUtil.parseJWT(token));
        if (userType.equals("master_admin") || userType.equals("canteen_admin")) {
            return userDao.delete(username);
        } else {
            return false;
        }
    }
}

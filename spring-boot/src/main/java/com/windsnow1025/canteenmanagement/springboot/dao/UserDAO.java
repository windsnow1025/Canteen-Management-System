package com.windsnow1025.canteenmanagement.springboot.dao;

import com.windsnow1025.canteenmanagement.springboot.model.User;
import com.windsnow1025.canteenmanagement.springboot.util.JDBCHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public class UserDAO {
    private static final Logger logger = LoggerFactory.getLogger(UserDAO.class);
    private final JDBCHelper jdbcHelper;

    public UserDAO() {
        this.jdbcHelper = new JDBCHelper();
    }

    public boolean insert(User user) {
        String sql = "INSERT INTO user (username, password, user_type, user_level, canteen_id) VALUES (?,?,?,?,?)";
        String username = user.getUsername();
        String password = user.getPassword();
        String userType = "consumer";
        String userLevel = "1";
        int canteenId = user.getCanteenId();
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, username, password, userType, userLevel, canteenId);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("Insert user error", e);
            throw new RuntimeException(e);
        }
    }

    public User selectByUsernamePassword(String username, String password) {
        String sql = "SELECT * FROM user WHERE username = ? AND password = ?";
        try {
            List<Map<String, Object>> result = jdbcHelper.select(sql, username, password);
            if (!result.isEmpty()) {
                Map<String, Object> resultMap = result.getFirst();
                int userId = (int) resultMap.get("id");
                String userType = (String) resultMap.get("user_type");
                String userLevel = (String) resultMap.get("user_level");
                int canteenId = (int) resultMap.get("canteen_id");
                return new User(userId, username, password, userType, userLevel, canteenId);
            } else {
                return null;
            }
        } catch (SQLException e) {
            logger.error("Select user by username and password error", e);
            throw new RuntimeException(e);
        }
    }

    public User selectByUsername(String username) {
        String sql = "SELECT * FROM user WHERE username = ?";
        try {
            List<Map<String, Object>> result = jdbcHelper.select(sql, username);
            if (!result.isEmpty()) {
                Map<String, Object> resultMap = result.getFirst();
                int userId = (int) resultMap.get("id");
                String password = (String) resultMap.get("password");
                String userType = (String) resultMap.get("user_type");
                String userLevel = (String) resultMap.get("user_level");
                int canteenId = (int) resultMap.get("canteen_id");
                return new User(userId, username, password, userType, userLevel, canteenId);
            } else {
                return null;
            }
        } catch (SQLException e) {
            logger.error("Select user by username error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean updatePassword(String username, String newPassword) {
        String sql = "UPDATE user SET password = ? WHERE username = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, newPassword, username);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("Update password error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean updateType(String username, String newType, int canteenId) {
        String sql = "UPDATE user SET user_type = ?, canteen_id = ? WHERE username = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, newType, canteenId, username);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("Update type error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean updateLevel(String username, String newLevel) {
        String sql = "UPDATE user SET user_level = ? WHERE username = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, newLevel, username);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("Update level error", e);
            throw new RuntimeException(e);
        }
    }

}

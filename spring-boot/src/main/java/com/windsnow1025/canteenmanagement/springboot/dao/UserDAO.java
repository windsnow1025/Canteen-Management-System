package com.windsnow1025.canteenmanagement.springboot.dao;

import com.windsnow1025.canteenmanagement.springboot.model.User;
import com.windsnow1025.canteenmanagement.springboot.util.JDBCHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

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

    public List<User> selectAll(){
        List<User> userList = new ArrayList<>();
        String sql = "SELECT * FROM user";
        try {
            List<Map<String, Object>> results = jdbcHelper.select(sql);
            if (! results.isEmpty()) {
                for (Map<String, Object> result : results) {
                    int id = (int) result.get("id");
                    String username = (String) result.get("username");
                    String password = (String) result.get("password");
                    String userType = (String) result.get("user_type");
                    if (Objects.equals(userType, "master_admin")){
                        continue;
                    }
                    String userLevel = (String) result.get("user_level");
                    int canteenID = (int) result.get("canteen_id");
                    userList.add(new User(id, username, password, userType, userLevel, canteenID));
                }
                return userList;
            }else {
                return null;
            }
        } catch (SQLException e) {
            logger.error("getAllUser error");
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

    public User selectById(int id) {
        String sql = "SELECT * FROM user WHERE id = ?";
        try {
            List<Map<String, Object>> result = jdbcHelper.select(sql, id);
            if (!result.isEmpty()) {
                Map<String, Object> resultMap = result.getFirst();
                User user = new User();
                String username = (String) resultMap.get("username");
                user.setUsername(username);
                return user;
            } else {
                return null;
            }
        } catch (SQLException e) {
            logger.error("Select user by username error", e);
            throw new RuntimeException(e);
        }
    }

    public String getUserTypeByName(String username){
        String sql = "SELECT user_type FROM user WHERE username = ?";
        try {
            List<Map<String, Object>> result = jdbcHelper.select(sql, username);
            if (! result.isEmpty()){
                return (String) result.getFirst().get("user_type");
            }else {
                return null;
            }
        } catch (SQLException e) {
            logger.error("getUserTypeByName error", e);
            throw new RuntimeException(e);
        }
    }

    public int getCanteenIdByName(String username){
        String sql = "SELECT canteen_id FROM user WHERE username = ?";
        try {
            List<Map<String, Object>> result = jdbcHelper.select(sql, username);
            if (! result.isEmpty()){
                return (int) result.getFirst().get("canteen_id");
            }else {
                return 0;
            }
        } catch (SQLException e) {
            logger.error("getCanteenIdByName error", e);
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
    public boolean updateType(int id, String newType, int canteenId) {
        String sql = "UPDATE user SET user_type = ?, canteen_id = ? WHERE id = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, newType, canteenId, id);
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

    public boolean delete(int id){
        String sql = "DELETE FROM user WHERE id = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, id);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("Delete error", e);
            throw new RuntimeException(e);
        }
    }
}

package com.windsnow1025.canteenmanagement.springboot.db;

import com.windsnow1025.canteenmanagement.springboot.model.User;
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
        String userType = user.getUserType();
        String userLevel = user.getUserLevel();
        int canteenId = user.getCanteenId();
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, username, password, userType, userLevel, canteenId);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("addNewUser error", e);
            throw new RuntimeException(e);
        }
    }

    // 用户名唯一， 不能重复
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
            logger.error("getUserByUsername error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean updateById(String changColumnName, String changeColumnValue, int userId) {
        String sql = "UPDATE user SET " + changColumnName + "=? WHERE id = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, changeColumnValue, userId);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("changeById error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean deleteById(String userId) {
        String sql = "DELETE FROM user WHERE id = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, userId);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("deleteUserById error", e);
            throw new RuntimeException(e);
        }
    }
}

package com.windsnow1025.canteenmanagement.springboot.dao;

import com.windsnow1025.canteenmanagement.springboot.util.JDBCHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public class UserLikeDAO {
    private static final Logger logger = LoggerFactory.getLogger(UserLikeDAO.class);
    private final JDBCHelper jdbcHelper;

    public UserLikeDAO() {
        jdbcHelper = new JDBCHelper();
    }

    public boolean hasLiked(int userId, int postId) {
        String sql = "SELECT * FROM user_like WHERE user_id = ? AND post_id = ?";
        try {
            return !jdbcHelper.select(sql, userId, postId).isEmpty();
        } catch (SQLException e) {
            logger.error("hasLiked error", e);
            throw new RuntimeException(e);
        }
    }

    public long getLikesByPostId(int postId) {
        String sql = "SELECT COUNT(*) AS like_count FROM user_like WHERE post_id = ?";
        try {
            List<Map<String, Object>> results = jdbcHelper.select(sql, postId);
            if (!results.isEmpty()) {
                Map<String, Object> result = results.getFirst();
                return (Long) result.get("like_count");
            } else {
                return -1;
            }
        } catch (SQLException e) {
            logger.error("getLikesByPostId error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean likePost(int userId, int postId) {
        String sql = "INSERT INTO user_like (user_id, post_id) VALUES (?, ?)";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, userId, postId);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("likePost error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean unlikePost(int userId, int postId) {
        String sql = "DELETE FROM user_like WHERE user_id = ? AND post_id = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, userId, postId);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("unlikePost error", e);
            throw new RuntimeException(e);
        }
    }
}

package com.windsnow1025.canteenmanagement.springboot.dao;

import com.windsnow1025.canteenmanagement.springboot.model.Comment;
import com.windsnow1025.canteenmanagement.springboot.util.JDBCHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class CommentDAO {
    private static final Logger logger = LoggerFactory.getLogger(CommentDAO.class);

    private final JDBCHelper jdbcHelper;

    public CommentDAO() {
        jdbcHelper = JDBCHelper.getInstance();
    }

    public boolean hasDeletePermission(String username, int id){
        String sql = "SELECT * FROM user JOIN comment ON user.id = comment.user_id WHERE username = ? AND comment.id = ?";
        UserDAO userDAO = new UserDAO();
        try {
            String userType = userDAO.getUserTypeByName(username);
            if (userType == null) {
                return false;
            }

            if (userType.equals("master_admin")) {
                return true;
            }

            return !jdbcHelper.select(sql, username, id).isEmpty();
        } catch (SQLException e) {
            logger.error("hasPermission error", e);
            throw new RuntimeException(e);
        }
    }

    public List<Comment> getAllCommentByPostId(int postId) {
        String sql = "SELECT * FROM comment WHERE post_id = ?";
        List<Comment> comments = new ArrayList<>();
        try {
            List<Map<String, Object>> results = jdbcHelper.select(sql, postId);
            for (Map<String, Object> result : results) {
                int id = (int) result.get("id");
                int userId = (result.get("user_id") == null) ? 0 : (int) result.get("user_id");
                String content = (String) result.get("content");
                comments.add(new Comment(id, userId, postId, content));
            }
            return comments;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean insert(Comment comment) {
        String sql = "INSERT INTO comment (user_id, post_id, content) VALUES (?, ?, ?)";
        int userId = comment.getUserId();
        int postId = comment.getPostId();
        String content = comment.getContent();
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, userId, postId, content);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("insert error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean delete(int id) {
        String sql = "DELETE FROM comment WHERE id = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, id);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("delete error", e);
            throw new RuntimeException(e);
        }
    }
}

package com.windsnow1025.canteenmanagement.springboot.dao;

import com.windsnow1025.canteenmanagement.springboot.model.Post;
import com.windsnow1025.canteenmanagement.springboot.util.JDBCHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;

public class PostDAO {

    private static final Logger logger = LoggerFactory.getLogger(PostDAO.class);
    private final JDBCHelper jdbcHelper;
    private final UserLikeDAO userLikeDAO;

    public PostDAO() {
        jdbcHelper = JDBCHelper.getInstance();
        userLikeDAO = new UserLikeDAO();
    }

    public boolean hasPermission(String username, int id) {
        String sql = "SELECT * FROM user JOIN post ON user.id = post.user_id WHERE user.username = ? AND post.id = ?";
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

    public List<Post> getAllPost() {
        String sql = "SELECT * FROM post";
        try {
            List<Post> posts = new ArrayList<>();
            List<Map<String, Object>> results = jdbcHelper.select(sql);
            for (Map<String, Object> result : results) {
                int id = (int) result.get("id");
                int userId = (result.get("user_id") == null) ? 0 : (int) result.get("user_id");
                String time = (String) result.get("time");
                String title = (String) result.get("title");
                String content = (result.get("content") == null) ? null : (String) result.get("content");
                byte[] pictureBytes = (byte[]) result.get("picture");
                String picture = (pictureBytes != null) ? Base64.getEncoder().encodeToString(pictureBytes) : null;
                long upvote = userLikeDAO.getLikesByPostId(id);
                posts.add(new Post(id, userId, time, title, content, picture, upvote));
            }
            return posts;
        } catch (SQLException e) {
            logger.error("getAllPost error", e);
            throw new RuntimeException(e);
        }
    }

    public List<Post> getPostByTitle(String title) {
        String sql = "SELECT * FROM post WHERE title = ?";
        try {
            List<Post> posts = new ArrayList<>();
            List<Map<String, Object>> results = jdbcHelper.select(sql, title);
            for (Map<String, Object> result : results) {
                int id = (int) result.get("id");
                int userId = (result.get("user_id") == null) ? 0 : (int) result.get("user_id");
                String time = (String) result.get("time");
                String content = (result.get("content") == null) ? null : (String) result.get("content");
                byte[] pictureBytes = (byte[]) result.get("picture");
                String picture = (pictureBytes != null) ? Base64.getEncoder().encodeToString(pictureBytes) : null;
                long upvote = userLikeDAO.getLikesByPostId(id);
                posts.add(new Post(id, userId, time, title, content, picture, upvote));
            }
            return posts;
        } catch (SQLException e) {
            logger.error("getAllPost error", e);
            throw new RuntimeException(e);
        }
    }

    public List<Post> getPostByUserId(int userId) {
        String sql = "SELECT * FROM post WHERE user_id = ?";
        try {
            List<Post> posts = new ArrayList<>();
            List<Map<String, Object>> results = jdbcHelper.select(sql, userId);
            for (Map<String, Object> result : results) {
                int id = (int) result.get("id");
                String time = (String) result.get("time");
                String title = (String) result.get("title");
                String content = (result.get("content") == null) ? null : (String) result.get("content");
                byte[] pictureBytes = (byte[]) result.get("picture");
                String picture = (pictureBytes != null) ? Base64.getEncoder().encodeToString(pictureBytes) : null;
                long upvote = userLikeDAO.getLikesByPostId(id);
                posts.add(new Post(id, userId, time, title, content, picture, upvote));
            }
            return posts;
        } catch (SQLException e) {
            logger.error("getAllPost error", e);
            throw new RuntimeException(e);
        }
    }

    public Post getPostById(int id) {
        String sql = "SELECT * FROM post WHERE id = ?";
        try {
            List<Map<String, Object>> results = jdbcHelper.select(sql, id);
            if (!results.isEmpty()) {
                Map<String, Object> result = results.getFirst();
                int userId = (result.get("user_id") == null) ? 0 : (int) result.get("user_id");
                String time = (String) result.get("time");
                String title = (String) result.get("title");
                String content = (result.get("content") == null) ? null : (String) result.get("content");
                byte[] pictureBytes = (byte[]) result.get("picture");
                String picture = (pictureBytes != null) ? Base64.getEncoder().encodeToString(pictureBytes) : null;
                long upvote = userLikeDAO.getLikesByPostId(id);
                return new Post(id, userId, time, title, content, picture, upvote);
            } else {
                return null;
            }
        } catch (SQLException e) {
            logger.error("getPostById error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean insert(Post post) {
        String sql = "INSERT INTO post(user_id, time, title, content, picture) VALUES (?, ?, ?, ?, ?)";
        int userId = post.getUserId();
        String time = post.getTime();
        String title = post.getTitle();
        String content = post.getContent();
        String base64String = post.getPicture();
        byte[] pictureBytes = null;
        if (base64String != null && !base64String.isEmpty()) {
            pictureBytes = Base64.getDecoder().decode(base64String);
        }
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, userId, time, title, content, pictureBytes);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("insert error", e);
            throw new RuntimeException(e);
        }
    }


    public boolean delete(int id) {
        String sql = "DELETE FROM post WHERE id = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, id);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("delete error", e);
            throw new RuntimeException(e);
        }
    }

}

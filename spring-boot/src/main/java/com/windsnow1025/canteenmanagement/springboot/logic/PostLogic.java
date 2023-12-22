package com.windsnow1025.canteenmanagement.springboot.logic;

import com.windsnow1025.canteenmanagement.springboot.dao.PostDAO;
import com.windsnow1025.canteenmanagement.springboot.dao.UserDAO;
import com.windsnow1025.canteenmanagement.springboot.dao.UserLikeDAO;
import com.windsnow1025.canteenmanagement.springboot.model.Post;
import com.windsnow1025.canteenmanagement.springboot.util.JwtUtil;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class PostLogic {
    private final PostDAO postDAO;
    private final UserLikeDAO userLikeDAO;

    public PostLogic() {
        postDAO = new PostDAO();
        userLikeDAO = new UserLikeDAO();
    }

    public List<Post> getAllPost(String token) {
        if (JwtUtil.parseJWT(token) != null) {
            return postDAO.getAllPost();
        } else {
            return null;
        }
    }

    public List<Post> getPostByTitle(String token, String title) {
        if (JwtUtil.parseJWT(token) != null) {
            return postDAO.getPostByTitle(title);
        } else {
            return null;
        }
    }

    public List<Post> getPostByUsername(String token, String username) {
        UserDAO userDAO = new UserDAO();
        if (JwtUtil.parseJWT(token) != null) {
            return postDAO.getPostByUserId(userDAO.selectByUsername(username).getId());
        } else {
            return null;
        }
    }

    public Post getPostById(String token, int id) {
        if (JwtUtil.parseJWT(token) != null) {
            return postDAO.getPostById(id);
        } else {
            return null;
        }
    }

    public boolean addPost(String token, Post post) {
        UserDAO userDAO = new UserDAO();
        if (JwtUtil.parseJWT(token) != null) {
            int userId = userDAO.selectByUsername(JwtUtil.parseJWT(token)).getId();
            LocalDateTime localDateTime = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd-HH:mm");
            String time = localDateTime.format(formatter);
            post.setTime(time);
            post.setUserId(userId);
            return postDAO.insert(post);
        } else {
            return false;
        }
    }

    public boolean like(String token, int id) {
        String username = JwtUtil.parseJWT(token);
        if (username != null) {
            UserDAO userDAO = new UserDAO();
            int userId = userDAO.selectByUsername(username).getId();
            if (userLikeDAO.hasLiked(userId, id)) {
                return userLikeDAO.unlikePost(userId, id);
            } else {
                return userLikeDAO.likePost(userId, id);
            }
        } else {
            return false;
        }
    }

    public boolean delete(String token, int id) {
        String username = JwtUtil.parseJWT(token);
        if (postDAO.hasPermission(username, id)) {
            return postDAO.delete(id);
        } else {
            return false;
        }
    }

}

package com.windsnow1025.canteenmanagement.springboot.logic;

import com.windsnow1025.canteenmanagement.springboot.dao.CommentDAO;
import com.windsnow1025.canteenmanagement.springboot.dao.UserDAO;
import com.windsnow1025.canteenmanagement.springboot.model.Comment;
import com.windsnow1025.canteenmanagement.springboot.util.JwtUtil;

import java.util.List;

public class CommentLogic {
    private final CommentDAO commentDAO;

    public CommentLogic() {
        commentDAO = new CommentDAO();
    }

    public List<Comment> getAllComment(String token, int postId) {
        if (JwtUtil.parseJWT(token) != null) {
            return commentDAO.getAllCommentByPostId(postId);
        } else {
            return null;
        }
    }

    public boolean addComment(String token, Comment comment) {
        if (JwtUtil.parseJWT(token) != null) {
            UserDAO userDAO = new UserDAO();
            comment.setUserId(userDAO.selectByUsername(JwtUtil.parseJWT(token)).getId());
            return commentDAO.insert(comment);
        } else {
            return false;
        }
    }

    public boolean delete(String token, int id) {
        String username = JwtUtil.parseJWT(token);
        if (commentDAO.hasDeletePermission(username, id)) {
            return commentDAO.delete(id);
        } else {
            return false;
        }
    }
}

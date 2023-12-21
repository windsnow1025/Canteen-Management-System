package com.windsnow1025.canteenmanagement.springboot.dao;

import com.windsnow1025.canteenmanagement.springboot.model.Evaluation;
import com.windsnow1025.canteenmanagement.springboot.util.JDBCHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;


public class EvaluationDAO {
    private static final Logger logger = LoggerFactory.getLogger(EvaluationDAO.class);
    private final JDBCHelper jdbcHelper;

    public EvaluationDAO() {
        jdbcHelper = new JDBCHelper();
    }

    public boolean hasPermission(String username, int id) {
        String sql = "SELECT * FROM user JOIN evaluation ON user.id = evaluation.user_id WHERE user.username = ? AND evaluation.id = ?";
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
            logger.error("hasDeletePermission error", e);
            throw new RuntimeException(e);
        }
    }

    public List<Evaluation> getAllEvaluation() {
        String sql = "SELECT * FROM evaluation";
        try {
            List<Evaluation> evaluations = new ArrayList<>();
            List<Map<String, Object>> results = jdbcHelper.select(sql);
            for (Map<String, Object> result : results) {
                int id = (int) result.get("id");
                int userId = (result.get("user_id") == null) ? 0 : (int) result.get("user_id");
                int dishId = (int) result.get("dish_id");
                String content = (result.get("content") == null) ? null : (String) result.get("content");
                byte[] pictureBytes = (byte[]) result.get("picture");
                String picture = (pictureBytes != null) ? Base64.getEncoder().encodeToString(pictureBytes) : null;
                float rating = (float) result.get("rating");
                evaluations.add(new Evaluation(id, userId, dishId, content, picture, rating));
            }
            return evaluations;
        } catch (SQLException e) {
            logger.error("getAllEvaluation error", e);
            throw new RuntimeException(e);
        }
    }

    public List<Evaluation> getEvaluationByDishId(int dishId) {
        String sql = "SELECT * FROM evaluation WHERE dish_id = ?";
        try {
            List<Evaluation> evaluations = new ArrayList<>();
            List<Map<String, Object>> results = jdbcHelper.select(sql, dishId);
            for (Map<String, Object> result : results) {
                int evaluationId = (int) result.get("id");
                int userId = (result.get("user_id") == null) ? 0 : (int) result.get("user_id");
                String content = (result.get("content") == null) ? null : (String) result.get("content");
                byte[] pictureBytes = (byte[]) result.get("picture");
                String picture = (pictureBytes != null) ? Base64.getEncoder().encodeToString(pictureBytes) : null;
                float rating = (float) result.get("rating");
                evaluations.add(new Evaluation(evaluationId, userId, dishId, content, picture, rating));
            }
            return evaluations;
        } catch (SQLException e) {
            logger.error("getEvaluationByDishId error", e);
            throw new RuntimeException(e);
        }
    }

    public Evaluation getEvaluationById(int id) {
        String sql = "SELECT * FROM evaluation WHERE id = ?";
        try {
            List<Map<String, Object>> results = jdbcHelper.select(sql, id);
            if (!results.isEmpty()) {
                Map<String, Object> result = results.getFirst();
                int userId = (result.get("user_id") == null) ? 0 : (int) result.get("user_id");
                int dishId = (int) result.get("dish_id");
                String content = (result.get("content") == null) ? null : (String) result.get("content");
                byte[] pictureBytes = (byte[]) result.get("picture");
                String picture = (pictureBytes != null) ? Base64.getEncoder().encodeToString(pictureBytes) : null;
                float rating = (float) result.get("rating");
                return new Evaluation(id, userId, dishId, content, picture, rating);
            } else {
                return null;
            }
        } catch (SQLException e) {
            logger.error("getEvaluationById error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean insert(Evaluation evaluation) {
        String sql = "INSERT INTO evaluation (user_id, dish_id, content, picture, rating) VALUES (?, ?, ?, ?, ?)";
        int userId = evaluation.getUserId();
        int dish_id = evaluation.getDishId();
        String content = evaluation.getContent();
        String base64String = evaluation.getPicture();
        float rating = evaluation.getRating();
        byte[] pictureBytes = null;
        if (base64String != null && !base64String.isEmpty()) {
            pictureBytes = Base64.getDecoder().decode(base64String);
        }
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, userId, dish_id, content, pictureBytes, rating);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("insert error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean delete(int id) {
        String sql = "DELETE FROM evaluation WHERE id = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, id);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("delete error", e);
            throw new RuntimeException(e);
        }
    }

}

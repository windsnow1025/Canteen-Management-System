package com.windsnow1025.canteenmanagement.springboot.logic;

import com.windsnow1025.canteenmanagement.springboot.dao.DishDAO;
import com.windsnow1025.canteenmanagement.springboot.dao.EvaluationDAO;
import com.windsnow1025.canteenmanagement.springboot.dao.UserDAO;
import com.windsnow1025.canteenmanagement.springboot.model.Evaluation;
import com.windsnow1025.canteenmanagement.springboot.util.JwtUtil;

import java.util.List;

public class EvaluationLogic {
    private final EvaluationDAO evaluationDAO;

    public EvaluationLogic() {
        evaluationDAO = new EvaluationDAO();
    }

    public List<Evaluation> getAllEvaluation(String token) {
        if (JwtUtil.parseJWT(token) != null) {
            return evaluationDAO.getAllEvaluation();
        } else {
            return null;
        }
    }

    public List<Evaluation> getEvaluationByDishId(String token, int dishId) {
        if (JwtUtil.parseJWT(token) != null) {
            return evaluationDAO.getEvaluationByDishId(dishId);
        } else {
            return null;
        }
    }

    public Evaluation getEvaluationById(String token, int id) {
        if (JwtUtil.parseJWT(token) != null) {
            return evaluationDAO.getEvaluationById(id);
        } else {
            return null;
        }
    }

    public boolean insert(String token, Evaluation evaluation) {
        UserDAO userDAO = new UserDAO();
        DishDAO dishDAO = new DishDAO();
        if (JwtUtil.parseJWT(token) != null && dishDAO.getDishById(evaluation.getDishId()) != null) {
            int userId = userDAO.selectByUsername(JwtUtil.parseJWT(token)).getId();
            evaluation.setUserId(userId);
            return evaluationDAO.insert(evaluation);
        } else {
            return false;
        }
    }

    public boolean delete(String token, int id) {
        String username = JwtUtil.parseJWT(token);
        if (evaluationDAO.hasPermission(username, id)) {
            return evaluationDAO.delete(id);
        } else {
            return false;
        }
    }

}

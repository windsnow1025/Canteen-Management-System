package com.windsnow1025.canteenmanagement.springboot.api;

import com.windsnow1025.canteenmanagement.springboot.dao.EvaluationDAO;
import com.windsnow1025.canteenmanagement.springboot.dao.UserDAO;
import com.windsnow1025.canteenmanagement.springboot.logic.EvaluationLogic;
import com.windsnow1025.canteenmanagement.springboot.model.Evaluation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/evaluation")
public class EvaluationController {
    private static final Logger logger = LoggerFactory.getLogger(EvaluationDAO.class);
    private final EvaluationLogic evaluationLogic;

    public EvaluationController() {
        evaluationLogic = new EvaluationLogic();
    }

    @GetMapping("/infos")
    public ResponseEntity<List<Evaluation>> getAllEvaluation(@RequestHeader("Authorization") String token) {
        try {
            List<Evaluation> evaluations = evaluationLogic.getAllEvaluation(token);
            if (evaluations != null) {
                return ResponseEntity.ok(evaluations);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            logger.error("Get Evaluation error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/infos/{dishId}")
    public ResponseEntity<List<Evaluation>> getEvaluationByDishId(@RequestHeader("Authorization") String token, @PathVariable int dishId) {
        try {
            List<Evaluation> evaluations = evaluationLogic.getEvaluationByDishId(token, dishId);
            if (evaluations != null) {
                return ResponseEntity.ok(evaluations);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            logger.error("Get EvaluationByDishId error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/info/{id}")
    public ResponseEntity<Evaluation> getEvaluationById(@RequestHeader("Authorization") String token, @PathVariable int id) {
        try {
            Evaluation evaluation = evaluationLogic.getEvaluationById(token, id);
            if (evaluation != null) {
                return ResponseEntity.ok(evaluation);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            logger.error("Get Evaluation by Id error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("")
    public ResponseEntity<Map<String, Object>> addEvaluation(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        try {
            int dishId = Integer.parseInt(request.get("dishId"));
            String content = request.get("content");
            String picture = request.get("picture");
            float rating = Float.parseFloat(request.get("rating"));
            if (evaluationLogic.insert(token, new Evaluation(dishId, content, picture, rating))) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "Add successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "Add failed"));
            }
        } catch (Exception e) {
            logger.error("Add  error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@RequestHeader("Authorization") String token, @PathVariable int id) {
        try {
            if (evaluationLogic.delete(token, id)) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "Delete successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "Delete failed"));
            }
        } catch (Exception e) {
            logger.error("Delete  error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }
}

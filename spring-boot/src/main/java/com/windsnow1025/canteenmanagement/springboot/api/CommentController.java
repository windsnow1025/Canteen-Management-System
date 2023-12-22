package com.windsnow1025.canteenmanagement.springboot.api;

import com.windsnow1025.canteenmanagement.springboot.dao.CommentDAO;
import com.windsnow1025.canteenmanagement.springboot.logic.CommentLogic;
import com.windsnow1025.canteenmanagement.springboot.model.Comment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/comment")
public class CommentController {
    private static final Logger logger = LoggerFactory.getLogger(CommentDAO.class);
    private final CommentLogic commentLogic;

    public CommentController() {
        commentLogic = new CommentLogic();
    }

    @GetMapping("/infos/{id}")
    public ResponseEntity<List<Comment>> getVote(@RequestHeader("Authorization") String token, @PathVariable int id) {
        try {
            List<Comment> comments = commentLogic.getAllComment(token, id);
            if (comments != null) {
                return ResponseEntity.ok(comments);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            logger.error("Get comment  error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("")
    public ResponseEntity<Map<String, Object>> addVote(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        try {
            int postId = Integer.parseInt(request.get("postId"));
            String content = request.get("content");
            Comment comment = new Comment();
            comment.setPostId(postId);
            comment.setContent(content);
            if (commentLogic.addComment(token, comment)) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "Add successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "Add failed"));
            }
        } catch (Exception e) {
            logger.error("Add comment error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@RequestHeader("Authorization") String token, @PathVariable int id) {
        try {
            if (commentLogic.delete(token, id)) {
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

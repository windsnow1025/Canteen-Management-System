package com.windsnow1025.canteenmanagement.springboot.api;

import com.windsnow1025.canteenmanagement.springboot.dao.PostDAO;
import com.windsnow1025.canteenmanagement.springboot.logic.PostLogic;
import com.windsnow1025.canteenmanagement.springboot.model.Post;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/post")
public class PostController {
    private static final Logger logger = LoggerFactory.getLogger(PostDAO.class);
    private final PostLogic postLogic;

    public PostController() {
        postLogic = new PostLogic();
    }

    @GetMapping("/infos")
    public ResponseEntity<List<Post>> getPosts(@RequestHeader("Authorization") String token) {
        try {
            List<Post> posts = postLogic.getAllPost(token);
            if (posts != null) {
                return ResponseEntity.ok(posts);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            logger.error("Get posts error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/infos/title")
    public ResponseEntity<List<Post>> getPostByTitle(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        try {
            List<Post> posts = postLogic.getPostByTitle(token, request.get("title"));
            if (posts != null) {
                return ResponseEntity.ok(posts);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            logger.error("Get getPostByTitle error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

        @PostMapping("/infos/username")
    public ResponseEntity<List<Post>> getPostByUsername(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        try {
            List<Post> posts = postLogic.getPostByUsername(token, request.get("username"));
            if (posts != null) {
                return ResponseEntity.ok(posts);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            logger.error("Get getPostByUsername error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/info/{id}")
    public ResponseEntity<Post> getPostById(@RequestHeader("Authorization") String token, @PathVariable int id) {
        try {
            Post post = postLogic.getPostById(token, id);
            if (post != null) {
                return ResponseEntity.ok(post);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            logger.error("Get post by Id error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("")
    public ResponseEntity<Map<String, Object>> addPost(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request){
        try {
            String title = request.get("title");
            String content = request.get("content");
            String picture = request.get("picture");
            if (postLogic.addPost(token, new Post(title, content, picture))){
                return ResponseEntity.ok(Map.of("status", "Success", "message", "Add successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "Add failed"));
            }
        }catch (Exception e){
            logger.error("Add post error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @PutMapping("/like/{id}")
    public ResponseEntity<Map<String, Object>> updateUpvoteById(@RequestHeader("Authorization") String token, @PathVariable int id){
        try {
            if (postLogic.like(token, id)){
                return ResponseEntity.ok(Map.of("status", "Success", "message", "Update successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "Update failed"));
            }
        }catch (Exception e){
            logger.error("Like  error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@RequestHeader("Authorization") String token, @PathVariable int id){
        try {
            if (postLogic.delete(token, id)){
                return ResponseEntity.ok(Map.of("status", "Success", "message", "Delete successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "Delete failed"));
            }
        }catch (Exception e){
            logger.error("Delete  error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

}

package com.windsnow1025.canteenmanagement.springboot.api;

import com.windsnow1025.canteenmanagement.springboot.logic.UserLogic;
import com.windsnow1025.canteenmanagement.springboot.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserLogic userLogic;

    public UserController() {
        this.userLogic = new UserLogic();
    }

    @GetMapping("/info")
    public ResponseEntity<User> getUser(@RequestHeader("Authorization") String token) {
        try {
            User user = userLogic.getInfo(token);
            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            logger.error("Get user info error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String password = request.get("password");
            String token = userLogic.signIn(username, password);
            if (token != null) {
                return ResponseEntity.ok(Map.of("token", token));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            logger.error("Login user error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signupUser(@RequestBody Map<String, String> request) {
        try {
            int canteenId = Integer.parseInt(null);
            String username = request.get("username");
            String password = request.get("password");
            String userType = request.get("userType");
            String userLevel = request.get("userLevel");
            if (request.get("canteenId") != null) {
                canteenId = Integer.parseInt(request.get("canteenId"));
            }
            User user = new User(username, password, userType, userLevel, canteenId);
            boolean isSignedUp = userLogic.signUp(user);
            if (isSignedUp) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "Signup successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "Signup failed"));
            }
        } catch (Exception e) {
            logger.error("Signup user error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @PostMapping("/update/password")
    public ResponseEntity<Map<String, Object>> updatePassword(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        try {
            String newPassword = request.get("password");
            boolean result = userLogic.updatePassword(token, newPassword);
            if (result) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "UpdatePassword successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "UpdatePassword failed"));
            }
        } catch (Exception e) {
            logger.error("Update password error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @PostMapping("/update/type")
    public ResponseEntity<Map<String, Object>> updateType(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        try {
            String userType = request.get("userType");
            int canteenId = Integer.parseInt(request.get("canteen_id"));
            boolean result = userLogic.updateType(token, userType, canteenId);
            if (result) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "UpdateType successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "UpdateType failed"));
            }
        } catch (Exception e) {
            logger.error("Update type error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @PostMapping("/update/level")
    public ResponseEntity<Map<String, Object>> updateLevel(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        try {
            String userLevel = request.get("userLevel");
            boolean result = userLogic.updateLevel(token, userLevel);
            if (result) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "UpdateLevel successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "UpdateLevel failed"));
            }
        } catch (Exception e) {
            logger.error("Update level error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }


}

package com.windsnow1025.canteenmanagement.springboot.api;

import com.windsnow1025.canteenmanagement.springboot.logic.UserLogic;
import com.windsnow1025.canteenmanagement.springboot.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<User> loginUser(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String password = request.get("password");
            String token = userLogic.signIn(username, password);
            if (token != null) {
                return ResponseEntity.ok().header("Authorization", token).build();
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signupUser(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String password = request.get("password");
            String userType = request.get("userType");
            String userLevel = request.get("userLevel");
            int canteenId = Integer.parseInt(request.get("canteenId"));
            User user = new User(username, password, userType, userLevel, canteenId);
            boolean isSignedUp = userLogic.signUp(user);
            if (isSignedUp) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "Signup successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "Signup failed"));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }


}

package com.windsnow1025.canteenmanagement.springboot.api;

import com.windsnow1025.canteenmanagement.springboot.dao.UserDAO;
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

    private static final Logger logger = LoggerFactory.getLogger(UserDAO.class);
    private final UserLogic userLogic;
    private final UserDAO userDAO;

    public UserController() {
        this.userLogic = new UserLogic();
        userDAO = new UserDAO();
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
            logger.error("Login user error", e);
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
            logger.error("Signup user error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @PostMapping("/updatePassword")
    public ResponseEntity<Map<String, Object>> updatePassword(@RequestBody Map<String,String> request){
        try {
            String password = request.get("password");
            int useId = Integer.parseInt(request.get("id"));
            User user = new User();
            user.setId(useId);
            user.setPassword(password);
            if (userDAO.updateUserPasswordById(user)){
                return ResponseEntity.ok(Map.of("status", "Success", "message", "UpdatePassword successful"));
            }else
            {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "UpdatePassword failed"));
            }
        } catch (Exception e) {
            logger.error("Update password error",e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @PostMapping("/updateType")
    public ResponseEntity<Map<String, Object>> updateType(@RequestBody Map<String, String> request){
        try {
            int id = Integer.parseInt(request.get("id"));
            String userType = request.get("userType");
            int canteenId = Integer.parseInt(request.get("canteen_id"));
            User user = new User();
            user.setId(id);
            user.setUserType(userType);
            user.setCanteenId(canteenId);
            if (userDAO.updateUserStatusById(user)){
                return ResponseEntity.ok(Map.of("status", "Success", "message", "UpdateType successful"));
            }else
            {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "UpdateType failed"));
            }
        }catch (Exception e){
            logger.error("Update type error",e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @PostMapping("/updateLevel")
    public ResponseEntity<Map<String, Object>> updateLevel(@RequestBody Map<String, String> request){
        try {
            int id = Integer.parseInt(request.get("id"));
            String userLevel = request.get("userLevel");
            User user = new User();
            user.setId(id);
            user.setUserLevel(userLevel);
            if (userDAO.updateUserLevelById(user)){
                return ResponseEntity.ok(Map.of("status", "Success", "message", "UpdateLevel successful"));
            }else
            {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "UpdateLevel failed"));
            }
        }catch (Exception e){
            logger.error("Update level error",e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }


}

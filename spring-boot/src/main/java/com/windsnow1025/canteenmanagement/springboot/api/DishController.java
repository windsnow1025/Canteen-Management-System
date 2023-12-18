package com.windsnow1025.canteenmanagement.springboot.api;

import com.windsnow1025.canteenmanagement.springboot.dao.DishDAO;
import com.windsnow1025.canteenmanagement.springboot.logic.DishLogic;
import com.windsnow1025.canteenmanagement.springboot.model.Dish;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/dish")
public class DishController {
    private static final Logger logger = LoggerFactory.getLogger(DishDAO.class);

    private final DishLogic dishLogic;

    public DishController(){
        dishLogic = new DishLogic();
    }

    @GetMapping("/infos")
    public ResponseEntity<List<Dish>> getAllDish(@RequestHeader("Authorization") String token){
        try {
            List<Dish> dishList = dishLogic.getAllDish(token);
            if (dishList != null) {
                return ResponseEntity.ok(dishList);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            logger.error("Get all dish info error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/names")
    public ResponseEntity<Set<String>> getAllName(@RequestHeader("Authorization") String token){
        try {
            Set<String> dishList = dishLogic.getAllName(token);
            if (dishList != null) {
                return ResponseEntity.ok(dishList);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            logger.error("Get all dish name info error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/info")
    public ResponseEntity<List<Dish>> getDishByName(@RequestHeader("Authorization") String token, @RequestParam("dishName") String dishName){
        try {
            List<Dish> dishList = dishLogic.getDishByName(token, dishName);
            if (dishList != null) {
                return ResponseEntity.ok(dishList);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            logger.error("Get dish info error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/info/{id}")
    public ResponseEntity<Dish> getDishById(@RequestHeader("Authorization") String token, @PathVariable int id){
        try {
            Dish dish = dishLogic.getDishById(token, id);
            if (dish != null) {
                return ResponseEntity.ok(dish);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            logger.error("Get dish info by id error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("")
    public ResponseEntity<Map<String, Object>> addDish(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request){
        try {
            String picture = null;
            int canteenId = Integer.parseInt(request.get("canteenId"));
            String dishName = request.get("dishName");
            float price = Float.parseFloat(request.get("price"));
            float discountRate = Float.parseFloat(request.get("discountRate"));
            String cuisine = request.get("cuisine");
            if (request.get("picture") != null) {
                picture = request.get("picture");
            }
            Dish dish = new Dish(canteenId, dishName, price, discountRate, cuisine, picture);
            if (dishLogic.addDish(token, dish)){
                return ResponseEntity.ok(Map.of("status", "Success", "message", "Create successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "Create failed"));
            }
        }catch (Exception e){
            logger.error("add dish error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/canteen-id")
    public ResponseEntity<Map<String, Object>> updateCanteenIdById(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request){

    }
}

package com.windsnow1025.canteenmanagement.springboot.api;

import com.windsnow1025.canteenmanagement.springboot.dao.CanteenDAO;
import com.windsnow1025.canteenmanagement.springboot.logic.CanteenLogic;
import com.windsnow1025.canteenmanagement.springboot.model.Canteen;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/canteen")
public class CanteenController {
    private static final Logger logger = LoggerFactory.getLogger(CanteenDAO.class);
    private CanteenLogic canteenLogic;

    public CanteenController(){
        canteenLogic = new CanteenLogic();
    }

    @GetMapping("/info")
    public ResponseEntity<Canteen> getCanteen(@RequestHeader("Authorization") String token){
        try {
            Canteen canteen = canteenLogic.getInfo(token);
            if (canteen != null){
                return ResponseEntity.ok(canteen);
            }else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }catch (Exception e){
            logger.error("Get canteen info error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> create(@RequestBody Map<String, String> request){
        try {
            String canteenName = request.get("canteen_name");
            String intro = request.get("intro");
            String location = request.get("location");
            String businessHours = request.get("business_hours");
            String announcement = request.get("announcement");
            Canteen canteen = new Canteen(canteenName, intro, location, businessHours, announcement);
            boolean isCreate = canteenLogic.insert(canteen);
            if (isCreate) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "Create successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "Create failed"));
            }
        }catch (Exception e){
            logger.error("Create canteen error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @PostMapping("/updateCanteenName")
    public ResponseEntity<Map<String, Object>> updateCanteenName(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request){
        try {
            String newCanteenName = request.get("newCanteenName");
            boolean isUpdate = canteenLogic.updateCanteenName(token,newCanteenName);
            if (isUpdate) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "UpdateCanteenName successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "UpdateCanteenName failed"));
            }
        } catch (Exception e) {
            logger.error("Update canteenName error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @PostMapping("/updateIntro")
    public ResponseEntity<Map<String, Object>> updateIntro(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request){
        try {
            String newIntro = request.get("newIntro");
            boolean isUpdate = canteenLogic.updateIntro(token, newIntro);
            if (isUpdate) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "UpdateIntro successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "UpdateIntro failed"));
            }
        } catch (Exception e) {
            logger.error("Update intro error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @PostMapping("/updateLocation")
    public ResponseEntity<Map<String, Object>> updateLocation(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        try {
            String newLocation = request.get("newLocation");
            boolean isUpdate = canteenLogic.updateLocation(token, newLocation);
            if (isUpdate) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "UpdateLocation successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "UpdateLocation failed"));
            }
        }catch (Exception e){
            logger.error("Update location error");
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @PostMapping("/updateBusinessHours")
    public ResponseEntity<Map<String, Object>> updateBusinessHours(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        try {
            String newBusinessHours = request.get("newBusinessHours");
            boolean isUpdate = canteenLogic.updateBusinessHour(token, newBusinessHours);
            if (isUpdate) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "Update BusinessHours successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "Update BusinessHours failed"));
            }
        }catch (Exception e){
            logger.error("Update business hours error");
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @PostMapping("/updateAnnouncement")
    public ResponseEntity<Map<String, Object>> updateAnnouncement(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        try {
            String newAnnouncement = request.get("newAnnouncement");
            boolean isUpdate = canteenLogic.updateAnnouncement(token, newAnnouncement);
            if (isUpdate) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "UpdateAnnouncement successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "UpdateAnnouncement failed"));
            }
        }catch (Exception e){
            logger.error("Update announcement error");
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<Map<String, Object>> delete(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        try {
            boolean isDelete = canteenLogic.delete(token);
            if (isDelete) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "Delete successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "Delete failed"));
            }
        }catch (Exception e){
            logger.error("Delete  error");
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }
}

package com.windsnow1025.canteenmanagement.springboot.api;

import com.windsnow1025.canteenmanagement.springboot.dao.CanteenDAO;
import com.windsnow1025.canteenmanagement.springboot.logic.CanteenLogic;
import com.windsnow1025.canteenmanagement.springboot.model.Canteen;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/canteen")
public class CanteenController {
    private static final Logger logger = LoggerFactory.getLogger(CanteenDAO.class);
    private final CanteenLogic canteenLogic;

    public CanteenController() {
        canteenLogic = new CanteenLogic();
    }

    @GetMapping("/all-name")
    public ResponseEntity<List<String>> getAllName(@RequestHeader("Authorization") String token) {
        try {
            List<String> canteenList = canteenLogic.getAllName(token);
            if (canteenList != null) {
                return ResponseEntity.ok(canteenList);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            logger.error("Get canteenName info error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/info")
    public ResponseEntity<Canteen> getCanteen(@RequestHeader("Authorization") String token, @RequestParam("canteenName") String canteenName) {
        try {
            Canteen canteen = canteenLogic.getInfo(token, canteenName);
            if (canteen != null) {
                return ResponseEntity.ok(canteen);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            logger.error("Get canteen info error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> create(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        try {
            String canteenName = request.get("canteenName");
            String intro = request.get("intro");
            String location = request.get("location");
            String businessHours = request.get("businessHours");
            String announcement = request.get("announcement");
            boolean isCreate = canteenLogic.insert(token, canteenName, intro, location, businessHours, announcement);
            if (isCreate) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "Create successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "Create failed"));
            }
        } catch (Exception e) {
            logger.error("Create canteen error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @PutMapping("/canteen-name")
    public ResponseEntity<Map<String, Object>> updateCanteenName(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        try {
            int id = Integer.parseInt(request.get("id"));
            String canteenName = request.get("canteenName");
            boolean isUpdate = canteenLogic.updateCanteenName(token, id, canteenName);
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

    @PutMapping("/intro")
    public ResponseEntity<Map<String, Object>> updateIntro(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        try {
            String canteenName = request.get("canteenName");
            String newIntro = request.get("intro");
            boolean isUpdate = canteenLogic.updateIntro(token, canteenName, newIntro);
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

    @PutMapping("/location")
    public ResponseEntity<Map<String, Object>> updateLocation(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        try {
            String canteenName = request.get("canteenName");
            String newLocation = request.get("location");
            boolean isUpdate = canteenLogic.updateLocation(token, canteenName, newLocation);
            if (isUpdate) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "UpdateLocation successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "UpdateLocation failed"));
            }
        } catch (Exception e) {
            logger.error("Update location error");
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @PutMapping("/business-hours")
    public ResponseEntity<Map<String, Object>> updateBusinessHours(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        try {
            String canteenName = request.get("canteenName");
            String newBusinessHours = request.get("businessHours");
            boolean isUpdate = canteenLogic.updateBusinessHour(token, canteenName, newBusinessHours);
            if (isUpdate) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "Update BusinessHours successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "Update BusinessHours failed"));
            }
        } catch (Exception e) {
            logger.error("Update business hours error");
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @PutMapping("/announcement")
    public ResponseEntity<Map<String, Object>> updateAnnouncement(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        try {
            String canteenName = request.get("canteenName");
            String newAnnouncement = request.get("announcement");
            boolean isUpdate = canteenLogic.updateAnnouncement(token, canteenName, newAnnouncement);
            if (isUpdate) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "UpdateAnnouncement successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "UpdateAnnouncement failed"));
            }
        } catch (Exception e) {
            logger.error("Update announcement error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, Object>> delete(@RequestHeader("Authorization") String token, @RequestParam("canteenName") String canteenName) {
        try {
            boolean isDelete = canteenLogic.delete(token, canteenName);
            if (isDelete) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "Delete successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "Delete failed"));
            }
        } catch (Exception e) {
            logger.error("Delete error");
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }
}

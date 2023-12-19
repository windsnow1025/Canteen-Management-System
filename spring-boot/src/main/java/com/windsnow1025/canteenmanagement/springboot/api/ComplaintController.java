package com.windsnow1025.canteenmanagement.springboot.api;

import com.windsnow1025.canteenmanagement.springboot.dao.ComplaintDAO;
import com.windsnow1025.canteenmanagement.springboot.logic.ComplaintLogic;
import com.windsnow1025.canteenmanagement.springboot.model.Complaint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/complaint")
public class ComplaintController {
    private static final Logger logger = LoggerFactory.getLogger(ComplaintDAO.class);
    private final ComplaintLogic complaintLogic;
    public ComplaintController(){
        complaintLogic = new ComplaintLogic();
    }

    @GetMapping("/infos")
    public ResponseEntity<List<Complaint>> getComplaint(@RequestHeader("Authorization") String token){
        try {
            List<Complaint> complaints = complaintLogic.getComplaint(token);
            if (complaints != null){
                return ResponseEntity.ok(complaints);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }catch (Exception e){
            logger.error("Get complaint error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/info/{id}")
    public ResponseEntity<Complaint> getComplaintById(@RequestHeader("Authorization") String token, @PathVariable int id){
        try {
            Complaint complaints = complaintLogic.getComplaintById(token, id);
            if (complaints != null){
                return ResponseEntity.ok(complaints);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }catch (Exception e){
            logger.error("Get complaint by id error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/infos/{canteenId}")
    public ResponseEntity<List<Complaint>> getComplaint(@RequestHeader("Authorization") String token, @PathVariable int canteenId){
        try {
            List<Complaint> complaints = complaintLogic.getComplaintByCanteenId(token, canteenId);
            if (complaints != null){
                return ResponseEntity.ok(complaints);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }catch (Exception e){
            logger.error("Get complaint error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("")
    public ResponseEntity<Map<String, Object>> addComplaint(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request){
        try {
            System.out.println(request.get("canteenId"));
            int canteenId = Integer.parseInt(request.get("canteenId"));
            String detail = request.get("detail");
            Complaint complaint = new Complaint(canteenId, detail);
            if (complaintLogic.addComplaint(token, complaint)){
                return ResponseEntity.ok(Map.of("status", "Success", "message", "Add successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "Add failed"));
            }
        }catch (Exception e){
            logger.error("Add  error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @PutMapping("/result")
    public ResponseEntity<Map<String, Object>> updateComplaintResultById(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request){
        try {
            int id = Integer.parseInt(request.get("id"));
            String complaintResult = request.get("complaintResult");
            if (complaintLogic.updateComplaintResult(token, id, complaintResult)){
                return ResponseEntity.ok(Map.of("status", "Success", "message", "Update successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "Update failed"));
            }
        }catch (Exception e){
            logger.error("Update  error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@RequestHeader("Authorization") String token, @PathVariable int id){
        try {
            if (complaintLogic.delete(token, id)){
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

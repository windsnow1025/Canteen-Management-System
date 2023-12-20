package com.windsnow1025.canteenmanagement.springboot.api;


import com.windsnow1025.canteenmanagement.springboot.dao.VoteDAO;
import com.windsnow1025.canteenmanagement.springboot.logic.VoteLogic;
import com.windsnow1025.canteenmanagement.springboot.model.Vote;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/vote")
public class VoteController {
    private static final Logger logger = LoggerFactory.getLogger(VoteDAO.class);
    private final VoteLogic voteLogic;

    public VoteController() {
        voteLogic = new VoteLogic();
    }

    @GetMapping("/infos")
    public ResponseEntity<List<Vote>> getVote(@RequestHeader("Authorization") String token) {
        try {
            List<Vote> votes = voteLogic.getVote(token);
            if (votes != null) {
                return ResponseEntity.ok(votes);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            logger.error("Get votes error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/infos/{canteenId}")
    public ResponseEntity<List<Vote>> getVoteByCanteenId(@RequestHeader("Authorization") String token, @PathVariable int canteenId) {
        try {
            List<Vote> votes = voteLogic.getVoteByCanteenId(token, canteenId);
            if (votes != null) {
                return ResponseEntity.ok(votes);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            logger.error("Get votes by canteenId error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/info/{id}")
    public ResponseEntity<Vote> getVoteById(@RequestHeader("Authorization") String token, @PathVariable int id) {
        try {
            Vote votes = voteLogic.getVoteById(token, id);
            if (votes != null) {
                return ResponseEntity.ok(votes);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            logger.error("Get votes by Id error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("")
    public ResponseEntity<Map<String, Object>> addVote(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        try {
            int canteenId = Integer.parseInt(request.get("canteenId"));
            String title = request.get("title");
            if (voteLogic.addVote(token, new Vote(canteenId, title))) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "Add successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "Add failed"));
            }
        } catch (Exception e) {
            logger.error("Add error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @PutMapping("/vote-result")
    public ResponseEntity<Map<String, Object>> updateVoteResultById(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> request) {
        try {
            int id = Integer.parseInt(request.get("id"));
            String voteResult = request.get("voteResult");
            if (voteLogic.updateVoteResult(token, id, voteResult)) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "Update successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "Update failed"));
            }
        } catch (Exception e) {
            logger.error("Update error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@RequestHeader("Authorization") String token, @PathVariable int id) {
        try {
            if (voteLogic.delete(token, id)) {
                return ResponseEntity.ok(Map.of("status", "Success", "message", "Delete successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("status", "Failure", "message", "Delete failed"));
            }
        } catch (Exception e) {
            logger.error("Delete error", e);
            return ResponseEntity.internalServerError().body(Map.of("status", "Error", "message", e.getMessage()));
        }
    }
}

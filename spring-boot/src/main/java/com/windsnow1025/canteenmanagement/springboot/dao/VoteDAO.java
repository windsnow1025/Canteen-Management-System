package com.windsnow1025.canteenmanagement.springboot.dao;

import com.windsnow1025.canteenmanagement.springboot.model.Vote;
import com.windsnow1025.canteenmanagement.springboot.util.JDBCHelper;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class VoteDAO {
    private static final Logger logger = LoggerFactory.getLogger(VoteDAO.class);
    private final JDBCHelper jdbcHelper;

    public VoteDAO() {
        jdbcHelper = new JDBCHelper();
    }

    public boolean hasCreatePermission(String username, int canteenId){
        String sql = "SELECT * FROM user JOIN canteen ON user.canteen_id = canteen.id WHERE user.username = ? AND canteen.id = ?";
        String sqlMaster = "SELECT * FROM user WHERE username = ?";
        try {
            List<Map<String, Object>> results = jdbcHelper.select(sqlMaster, username);
            if (results.isEmpty()){
                return false;
            }
            System.out.println(username);
            Map<String,Object> result = results.getFirst();
            String userType = (String) result.get("user_type");
            if (Objects.equals(userType, "master_admin")){
                return true;
            }
            return ! jdbcHelper.select(sql, username, canteenId).isEmpty();
        } catch (SQLException e) {
            logger.error("hasCreatePermission error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean hasUpdatePermission(String username, int id){
        String sql = "SELECT * FROM user JOIN vote ON user.canteen_id = vote.canteen_id WHERE user.username = ? AND vote.id = ?";
        String sqlMaster = "SELECT * FROM user WHERE username = ?";
        try {
            List<Map<String, Object>> results = jdbcHelper.select(sqlMaster, username);
            if (results.isEmpty()){
                return false;
            }
            Map<String,Object> result = results.getFirst();
            String userType = (String) result.get("user_type");
            if (Objects.equals(userType, "master_admin")){
                return true;
            }
            return ! jdbcHelper.select(sql, username, id).isEmpty();
        } catch (SQLException e) {
            logger.error("hasResponsePermission error", e);
            throw new RuntimeException(e);
        }
    }

    public List<Vote> getAllVote(){
        String sql = "SELECT * FROM vote";
        try {
            List<Vote> votes = new ArrayList<>();
            List<Map<String, Object>> results = jdbcHelper.select(sql);
            for (Map<String, Object> result : results){
                int id = (int) result.get("id");
                int canteenId = (int) result.get("canteen_id");
                String title = (String) result.get("title");
                String voteResult = (String) result.get("vote_result");
                votes.add(new Vote(id, canteenId, title, voteResult));
            }
            return votes;
        } catch (SQLException e) {
            logger.error("getAllVote error", e);
            throw new RuntimeException(e);
        }
    }

    public List<Vote> getVoteByCanteenId(int canteenId){
        String sql = "SELECT * FROM vote WHERE canteen_id = ?";
        try {
            List<Vote> votes = new ArrayList<>();
            List<Map<String, Object>> results = jdbcHelper.select(sql, canteenId);
            for (Map<String, Object> result : results){
                int id = (int) result.get("id");
                String title = (String) result.get("title");
                String voteResult = (String) result.get("vote_result");
                votes.add(new Vote(id, canteenId, title, voteResult));
            }
            return votes;
        } catch (SQLException e) {
            logger.error("getAllVoteByCanteenId error", e);
            throw new RuntimeException(e);
        }
    }

    public Vote getVoteById(int id){
        String sql = "SELECT * FROM vote WHERE id = ?";
        try {
            List<Map<String, Object>> results = jdbcHelper.select(sql, id);
            if ( ! results.isEmpty()){
                Map<String, Object> result = results.getFirst();
                int canteenId = (int) result.get("canteen_id");
                String title = (String) result.get("title");
                String voteResult = (String) result.get("vote_result");
                return new Vote(id, canteenId, title, voteResult);
            } else {
                return null;
            }
        } catch (SQLException e) {
            logger.error("getAllVoteById error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean addVote(Vote vote){
        String sql = "INSERT INTO vote (canteen_id, title) VALUES (?, ?)";
        try {
            int canteenId = vote.getCanteenId();
            String title = vote.getTitle();

            int rowsAffected = jdbcHelper.executeUpdate(sql, canteenId, title);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("addVote error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean updateVoteResultById(int id, String voteResult){
        String sql = "UPDATE vote SET vote_result = ? WHERE id = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, voteResult, id);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("updateVoteResultById error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean delete(int id){
        String sql = "DELETE FROM vote WHERE id = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, id);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("delete error", e);
            throw new RuntimeException(e);
        }
    }
}

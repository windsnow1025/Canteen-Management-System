package com.windsnow1025.canteenmanagement.springboot.dao;

import com.windsnow1025.canteenmanagement.springboot.model.Complaint;
import com.windsnow1025.canteenmanagement.springboot.util.JDBCHelper;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class ComplaintDAO {
    private static final Logger logger = LoggerFactory.getLogger(ComplaintDAO.class);
    private final JDBCHelper jdbcHelper;

    public ComplaintDAO(){
        jdbcHelper = new JDBCHelper();
    }

    public boolean hasResponsePermission(String username, int id){
        String sql = "SELECT * FROM user JOIN complaint ON user.canteen_id = complaint.canteen_id WHERE user.username = ? AND complaint.id = ?";
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

    public List<Complaint> getAllComplaint(){
        try {
            List<Complaint> complaints = new ArrayList<>();
            String sql = "SELECT * FROM complaint";
            List<Map<String, Object>> results = jdbcHelper.select(sql);
            for (Map<String, Object> result : results){
                int id = (int) result.get("id");
                int canteenId = (int) result.get("canteen_id");
                String detail = (String) result.get("detail");
                String complaintResult = (String) result.get("complaint_result");
                complaints.add(new Complaint(id, canteenId, detail, complaintResult));
            }
            return complaints;
        } catch (SQLException e) {
            logger.error("getAllComplaint error", e);
            throw new RuntimeException(e);
        }
    }

    public Complaint getComplaintById(int id){
        try {
            String sql = "SELECT * FROM complaint WHERE id = ?";
            List<Map<String, Object>> results = jdbcHelper.select(sql, id);
            if (!results.isEmpty()){
                Map<String, Object> result = results.getFirst();
                int canteenId = (int) result.get("canteen_id");
                String detail = (String) result.get("detail");
                String complaintResult = (String) result.get("complaint_result");
                return new Complaint(id, canteenId, detail, complaintResult);
            } else {
                return null;
            }
        } catch (SQLException e) {
            logger.error("getComplaintById error", e);
            throw new RuntimeException(e);
        }
    }

    public List<Complaint> getComplaintByCanteenId(int canteenId){
        try {
            List<Complaint> complaintList = new ArrayList<>();
            String sql = "SELECT * FROM complaint WHERE canteen_id = ?";
            List<Map<String, Object>> results = jdbcHelper.select(sql, canteenId);
            for (Map<String, Object> result : results){
                int id = (int) result.get("id");
                String detail = (String) result.get("detail");
                String complaintResult = (String) result.get("complaint_result");
                complaintList.add(new Complaint(id, canteenId, detail, complaintResult));
            }
            return complaintList;
        } catch (SQLException e) {
            logger.error("getComplaintByCanteenId error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean addComplaint(Complaint complaint){
        try {
            String sql = "INSERT INTO complaint (canteen_id, detail) VALUES (?, ?)";
            int canteenId = complaint.getCanteenId();
            String detail = complaint.getDetail();

            int rowsAffected = jdbcHelper.executeUpdate(sql, canteenId, detail);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("addComplaint error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean updateComplaintResultById(String complaintResult, int id){
        try {
            String sql = "UPDATE complaint SET complaint_result = ? WHERE id = ?";

            int rowsAffected = jdbcHelper.executeUpdate(sql, complaintResult, id);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("updateComplaintResultById error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean delete(int id){
        try {
            String sql = "DELETE FROM complaint WHERE id = ?";

            int rowsAffected = jdbcHelper.executeUpdate(sql, id);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("delete error", e);
            throw new RuntimeException(e);
        }
    }
}

package com.windsnow1025.canteenmanagement.springboot.dao;

import com.windsnow1025.canteenmanagement.springboot.model.Canteen;
import com.windsnow1025.canteenmanagement.springboot.util.JDBCHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class CanteenDAO {
    private static final Logger logger = LoggerFactory.getLogger(CanteenDAO.class);
    private final JDBCHelper jdbcHelper;
    public CanteenDAO() {
        jdbcHelper = JDBCHelper.getInstance();
    }

    public boolean hasCanteen(int canteenId){
        String sql = "SELECT * FROM canteen WHERE id = ?";
        try {
            return ! jdbcHelper.select(sql, canteenId).isEmpty();
        } catch (SQLException e) {
            logger.error("hasCanteen error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean insert(Canteen canteen){
        String sql = "INSERT INTO canteen (canteen_name, intro, location, business_hours, announcement) VALUES (?, ?, ?, ?, ?)";
        String canteenName = canteen.getCanteenName();
        String intro = canteen.getIntro();
        String location = canteen.getLocation();
        String business_hours = canteen.getBusinessHour();
        String announcement = canteen.getAnnouncement();
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, canteenName, intro, location, business_hours, announcement);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("Canteen insert error");
            throw new RuntimeException(e);
        }
    }

    public List<Canteen> selectAll(){
        List<Canteen> canteenNameList = new ArrayList<>();
        String sql = "SELECT * FROM canteen";
        try {
            List<Map<String, Object>> results = jdbcHelper.select(sql);
            if (! results.isEmpty()){
                for (Map<String, Object> result : results){
                    int id = (int) result.get("id");
                    String canteenName = (String) result.get("canteen_name");
                    String intro = (String) result.get("intro");
                    String location = (String) result.get("intro");
                    String businessHours = (String) result.get("business_hours");
                    String announcement = (String) result.get("announcement");
                    canteenNameList.add(new Canteen(id, canteenName, intro, location, businessHours, announcement));
                }
                return canteenNameList;
            }else {
                return null;
            }
        } catch (SQLException e) {
            logger.error("getAllCanteen error", e);
            throw new RuntimeException(e);
        }
    }

    public Canteen selectById(int id){
        String sql = "SELECT * FROM canteen WHERE id = ?";
        try {
            List<Map<String, Object>> result = jdbcHelper.select(sql, id);
            if (! result.isEmpty()){
                Map<String, Object> resultMap = result.getFirst();
                int canteenId = (int) resultMap.get("id");
                String canteen_name = (String) resultMap.get("canteen_name");
                String intro = (String) resultMap.get("intro");
                String location = (String) resultMap.get("location");
                String businessHour = (String) resultMap.get("business_hours");
                String announcement = (String) resultMap.get("announcement");
                return new Canteen(canteenId, canteen_name, intro, location, businessHour, announcement);
            }else {
                return null;
            }
        } catch (SQLException e) {
            logger.error("selectCanteenByCanteenName error");
            throw new RuntimeException(e);
        }
    }

    public boolean updateCanteenName(int id, String canteenName){
        String sql = "UPDATE canteen SET canteen_name = ? WHERE id = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql,canteenName,id);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("updateCanteenName error", e);
            throw new RuntimeException(e);
        }
    }

    public boolean updateIntro(String canteenName, String intro){
        String sql = "UPDATE canteen SET intro = ? WHERE canteen_name = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql,intro,canteenName);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("updateIntro error",e);
            throw new RuntimeException(e);
        }
    }

    public boolean updateLocation(String canteenName, String location){
        String sql = "UPDATE canteen SET location = ? WHERE canteen_name = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql,location,canteenName);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("updateLocationById error",e);
            throw new RuntimeException(e);
        }
    }

    public boolean updateBusinessHour(String canteenName, String businessHour){
        String sql = "UPDATE canteen SET business_hours = ? WHERE canteen_name = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql,businessHour,canteenName);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("updateBusinessHour error",e);
            throw new RuntimeException(e);
        }
    }

    public boolean updateAnnouncement(String canteenName, String announcement){
        String sql = "UPDATE canteen SET announcement = ? WHERE canteen_name = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, announcement, canteenName);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("updateAnnouncement error",e);
            throw new RuntimeException(e);
        }
    }

    public boolean delete(int id){
        String sql = "DELETE FROM canteen WHERE id = ?";
        try {
            int rowsAffected = jdbcHelper.executeUpdate(sql, id);
            return rowsAffected > 0;
        } catch (SQLException e) {
            logger.error("delete error", e);
            throw new RuntimeException(e);
        }
    }
}

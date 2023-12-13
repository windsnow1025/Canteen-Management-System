package com.windsnow1025.canteenmanagement.springboot.dao;

import com.windsnow1025.canteenmanagement.springboot.model.Canteen;
import com.windsnow1025.canteenmanagement.springboot.util.JDBCHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class CanteenDAO {
    private static final Logger logger = LoggerFactory.getLogger(CanteenDAO.class);
    private final JDBCHelper jdbcHelper;
    public CanteenDAO() {
        this.jdbcHelper = new JDBCHelper();
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

}

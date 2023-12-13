package com.windsnow1025.canteenmanagement.springboot.util;

import org.json.JSONObject;

import java.io.*;
import java.sql.*;

public class JDBCHelper extends DatabaseHelper {

    // user_type: consumer / canteen_admin / master_admin
    private static final String CREATE_TABLE_USER = """
            CREATE TABLE IF NOT EXISTS user (
                id INT AUTO_INCREMENT,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                user_type VARCHAR(255) NOT NULL,
                user_level VARCHAR(255),
                canteen_id INT,
                PRIMARY KEY (id)
            )
            """;

    private static final String CREATE_TABLE_CANTEEN = """
            CREATE TABLE IF NOT EXISTS canteen (
                id INT AUTO_INCREMENT,
                canteen_name VARCHAR(255) NOT NULL,
                intro TEXT NOT NULL,
                location VARCHAR(255) NOT NULL,
                bussiness_hours VARCHAR(255) NOT NULL,
                announcement VARCHAR(255),
                PRIMARY KEY (id)
            )
            """;

    private static final String CREATE_TABLE_DISH = """
            CREATE TABLE IF NOT EXISTS dish (
                id INT AUTO_INCREMENT,
                canteen_id INT NOT NULL,
                dish_name VARCHAR(255) NOT NULL,
                price FLOAT NOT NULL,
                discount_rate FLOAT NOT NULL,
                cuisine VARCHAR(255) NOT NULL,
                picture BLOB,
                PRIMARY KEY (id)
            )
            """;

    private static final String CREATE_TABLE_COMPLAINT = """
            CREATE TABLE IF NOT EXISTS complaint (
                id INT AUTO_INCREMENT,
                canteen_id INT NOT NULL,
                detail VARCHAR(255),
                complaint_result VARCHAR(255),
                PRIMARY KEY (id),
                FOREIGN KEY (canteen_id) REFERENCES canteen(id)
            )
            """;

    private static final String CREATE_TABLE_VOTE = """
            CREATE TABLE IF NOT EXISTS vote (
                id INT AUTO_INCREMENT,
                canteen_id INT NOT NULL,
                title VARCHAR(255),
                vote_result VARCHAR(255),
                PRIMARY KEY (id),
                FOREIGN KEY (canteen_id) REFERENCES canteen(id)
            )
            """;

    private static final String CREATE_TABLE_EVALUATION = """
            CREATE TABLE IF NOT EXISTS evaluation(
                id INT AUTO_INCREMENT,
                user_id INT NOT NULL,
                dish_id INT NOT NULL,
                content TEXT,
                picture BLOB,
                rating FLOAT NOT NULL,
                PRIMARY KEY (id),
                FOREIGN KEY (user_id) REFERENCES user(id),
                FOREIGN KEY (dish_id) REFERENCES dish(id)
            )
            """;

    public JDBCHelper() {
        super();
    }

    @Override
    protected void setDatabaseConfig() {
        try (InputStream inputStream = JDBCHelper.class.getClassLoader().getResourceAsStream("config.json")) {
            String text = new String(inputStream.readAllBytes());
            JSONObject jsonObject = new JSONObject(text);
            dbUrl = jsonObject.getString("database_url");
            dbUsername = jsonObject.getString("database_username");
            dbPassword = jsonObject.getString("database_password");
            dbDriverClassName = "com.mysql.cj.jdbc.Driver";
            dbVersion = "1.1.2";
        } catch (IOException e) {
            logger.error("Database config failed", e);
        }
    }

    @Override
    public void onCreate() throws SQLException {
        try (Statement statement = getConnection().createStatement()) {
            statement.executeUpdate(CREATE_TABLE_USER);
            statement.executeUpdate(CREATE_TABLE_CANTEEN);
            statement.executeUpdate(CREATE_TABLE_DISH);
            statement.executeUpdate(CREATE_TABLE_COMPLAINT);
            statement.executeUpdate(CREATE_TABLE_VOTE);
            statement.executeUpdate(CREATE_TABLE_EVALUATION);
        }

        createMetadata();
        insertVersion();
        logger.info("Database created");
    }

    @Override
    public void onUpgrade() throws SQLException {
        try (Statement statement = getConnection().createStatement()) {
            // Drop all
            statement.executeUpdate("DROP TABLE IF EXISTS complaint");
            statement.executeUpdate("DROP TABLE IF EXISTS vote");
            statement.executeUpdate("DROP TABLE IF EXISTS evaluation");
            statement.executeUpdate("DROP TABLE IF EXISTS dish");
            statement.executeUpdate("DROP TABLE IF EXISTS canteen");
            statement.executeUpdate("DROP TABLE IF EXISTS user");

            // Create all
            statement.executeUpdate(CREATE_TABLE_USER);
            statement.executeUpdate(CREATE_TABLE_CANTEEN);
            statement.executeUpdate(CREATE_TABLE_DISH);
            statement.executeUpdate(CREATE_TABLE_COMPLAINT);
            statement.executeUpdate(CREATE_TABLE_VOTE);
            statement.executeUpdate(CREATE_TABLE_EVALUATION);
        }

        updateVersion();
        logger.info("Database upgraded");
    }
}
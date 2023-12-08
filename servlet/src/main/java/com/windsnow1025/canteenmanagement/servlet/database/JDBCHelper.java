package com.windsnow1025.canteenmanagement.servlet.database;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.json.JSONObject;

import java.io.InputStream;
import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JDBCHelper {
    private static final Logger logger = Logger.getLogger(JDBCHelper.class.getName());
    private static HikariDataSource dataSource;
    private static String DATABASE_URL;
    private static String DATABASE_USER;
    private static String DATABASE_PASSWORD;
    private static final String DATABASE_VERSION = "1.0";

    private Connection connection;

    private static final String CREATE_TABLE_METADATA = """
            CREATE TABLE IF NOT EXISTS metadata (
                version VARCHAR(255)
            );
            """;

    private static final String INSERT_METADATA = """
            INSERT INTO metadata (version) VALUES (0)
            """;

    // user_type: consumer / canteen_admin / master_admin
    private static final String CREATE_TABLE_USER = """
            CREATE TABLE IF NOT EXISTS user (
                id INT AUTO_INCREMENT,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                user_type VARCHAR(255) NOT NULL,
                user_level VARCHAR(255),
                cateen_id INT,
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
                dish_name VARCHAR(255) NOT NULL,
                price FLOAT NOT NULL,
                discount_rate FLOAT NOT NULL,
                cuisine VARCHAR(255) NOT NULL,
                picture BLOB,
                canteen_id INT NOT NULL,
                PRIMARY KEY (id)
            )
            """;

    private static final String CREATE_TABLE_COMPLAINT = """
            CREATE TABLE IF NOT EXITS complaint (
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
            release_time DATA NOT NULL,
            title VARCHAR(255),
            rating_result VARCHAR(255),
            canteen_id INT NOT NULL,
            PRIMARY KEY (id)
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
            FOREIGN KEY (dish_id) REFERENCES dish(id),
            )
            """;

    public JDBCHelper() {
        try {
            InputStream inputStream = JDBCHelper.class.getClassLoader().getResourceAsStream("config.json");
            String text = new String(inputStream.readAllBytes());
            JSONObject jsonObject = new JSONObject(text);

            DATABASE_URL = jsonObject.getString("database_url");
            DATABASE_USER = jsonObject.getString("database_user");
            DATABASE_PASSWORD = jsonObject.getString("database_password");

            HikariConfig config = new HikariConfig();
            config.setJdbcUrl(DATABASE_URL);
            config.setUsername(DATABASE_USER);
            config.setPassword(DATABASE_PASSWORD);
            config.setDriverClassName("com.mysql.cj.jdbc.Driver");
            dataSource = new HikariDataSource(config);

            connection = getConnection();
            String currentVersion = getDatabaseVersionFromMetadata();
            if (currentVersion == null) {
                onCreate(connection); // Initialize database version to 0
                setDatabaseVersionInMetadata();
            } else if (!currentVersion.equals(DATABASE_VERSION)) {
                onUpgrade(connection);
                setDatabaseVersionInMetadata();
            }
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Database connection failed", e);
        }
    }

    public Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }

    public void onCreate(Connection connection) throws SQLException {
        try (Statement statement = connection.createStatement()) {
            statement.executeUpdate(CREATE_TABLE_METADATA);
            statement.executeUpdate(INSERT_METADATA);
            statement.executeUpdate(CREATE_TABLE_USER);
            statement.executeUpdate(CREATE_TABLE_CANTEEN);
            statement.executeUpdate(CREATE_TABLE_DISH);
            statement.executeUpdate(CREATE_TABLE_COMPLAINT);
            statement.executeUpdate(CREATE_TABLE_VOTE);
            statement.executeUpdate(CREATE_TABLE_EVALUATION);
        }
        logger.log(Level.INFO, "Database created");
    }

    // Change this function for each new version
    public void onUpgrade(Connection connection) throws SQLException {
        try (Statement statement = connection.createStatement()) {

        }
        logger.log(Level.INFO, "Database upgraded");
    }

    private String getDatabaseVersionFromMetadata() {
        final String SELECT_METADATA = "SELECT version FROM metadata";
        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(SELECT_METADATA)) {
            if (resultSet.next()) {
                return resultSet.getString("version");
            } else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }

    private void setDatabaseVersionInMetadata() throws SQLException {
        final String UPDATE_METADATA = """
                UPDATE metadata SET version = ?
                """;
        try (PreparedStatement updateStatement = connection.prepareStatement(UPDATE_METADATA)) {
            updateStatement.setString(1, DATABASE_VERSION);
            updateStatement.executeUpdate();
        }
    }


    public void closeConnection() throws SQLException {
        if (connection != null) {
            connection.close();
        }
    }
}
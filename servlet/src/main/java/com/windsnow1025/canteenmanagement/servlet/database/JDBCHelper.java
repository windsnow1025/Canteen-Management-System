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
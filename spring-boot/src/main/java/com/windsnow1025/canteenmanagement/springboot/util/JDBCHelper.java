package com.windsnow1025.canteenmanagement.springboot.util;

import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.sql.*;

public class JDBCHelper extends DatabaseHelper {

    // user_type: consumer / canteen_admin / master_admin
    private static final String CREATE_TABLE_USER = """
            CREATE TABLE IF NOT EXISTS user (
                id INT AUTO_INCREMENT,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                user_type VARCHAR(255) NOT NULL,
                user_level FLOAT,
                canteen_id INT,
                PRIMARY KEY (id)
            )
            """;

    private static final String CREATE_TABLE_CANTEEN = """
            CREATE TABLE IF NOT EXISTS canteen (
                id INT AUTO_INCREMENT,
                canteen_name VARCHAR(255) NOT NULL UNIQUE,
                intro TEXT,
                location VARCHAR(255) NOT NULL,
                business_hours VARCHAR(255),
                announcement VARCHAR(255),
                PRIMARY KEY (id)
            )
            """;

    private static final String CREATE_TABLE_DISH = """
            CREATE TABLE IF NOT EXISTS dish (
                id INT AUTO_INCREMENT,
                canteen_id INT,
                dish_name VARCHAR(255) NOT NULL,
                price FLOAT NOT NULL,
                discount_rate FLOAT NOT NULL,
                cuisine VARCHAR(255) NOT NULL,
                picture BLOB,
                PRIMARY KEY (id),
                FOREIGN KEY (canteen_id) REFERENCES canteen(id) ON DELETE CASCADE
            )
            """;

    private static final String CREATE_TABLE_COMPLAINT = """
            CREATE TABLE IF NOT EXISTS complaint (
                id INT AUTO_INCREMENT,
                canteen_id INT NOT NULL,
                detail VARCHAR(255),
                complaint_result VARCHAR(255),
                PRIMARY KEY (id),
                FOREIGN KEY (canteen_id) REFERENCES canteen(id) ON DELETE CASCADE
            )
            """;

    private static final String CREATE_TABLE_VOTE = """
            CREATE TABLE IF NOT EXISTS vote (
                id INT AUTO_INCREMENT,
                canteen_id INT NOT NULL,
                title VARCHAR(255),
                vote_result VARCHAR(255),
                PRIMARY KEY (id),
                FOREIGN KEY (canteen_id) REFERENCES canteen(id) ON DELETE CASCADE
            )
            """;

    //菜品评价
    private static final String CREATE_TABLE_EVALUATION = """
            CREATE TABLE IF NOT EXISTS evaluation(
                id INT AUTO_INCREMENT,
                user_id INT,
                dish_id INT NOT NULL,
                content TEXT,
                picture BLOB,
                rating FLOAT NOT NULL,
                PRIMARY KEY (id),
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL,
                FOREIGN KEY (dish_id) REFERENCES dish(id) ON DELETE CASCADE
            )
            """;

    //帖子
    private static final String CREATE_TABLE_POST = """
            CREATE TABLE IF NOT EXISTS post(
                id INT AUTO_INCREMENT,
                user_id INT,
                time VARCHAR(255) NOT NULL,
                title VARCHAR(255) NOT NULL,
                content TEXT,
                picture BLOB,
                PRIMARY KEY (id),
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL
            )
            """;

    //帖子的回复
    private static final String CREATE_TABLE_COMMENT = """
            CREATE TABLE IF NOT EXISTS comment(
                id INT AUTO_INCREMENT,
                user_id INT,
                post_id INT NOT NULL,
                content TEXT NOT NULL,
                PRIMARY KEY (id),
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL,
                FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE
            )
            """;

    private static final String CREATE_TABLE_USER_LIKE = """
            CREATE TABLE IF NOT EXISTS user_like(
                id INT AUTO_INCREMENT,
                user_id INT NOT NULL,
                post_id INT NOT NULL,
                PRIMARY KEY (id),
                UNIQUE KEY unique_user_post_like ( user_id, post_id),
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
                FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE
            )
            """;

    private static final String INSERT_MASTER = """
            INSERT INTO user (username, password, user_type, user_level, canteen_id)
            VALUES ("master","mpassword","master_admin",100,-1)
            """;

    private static final String INSERT_ADMIN1 = """
            INSERT INTO user (username, password, user_type, user_level, canteen_id)
            VALUES ("admin1","apassword","canteen_admin",50,1)
            """;
    private static final String INSERT_ADMIN2 = """
            INSERT INTO user (username, password, user_type, user_level, canteen_id)
            VALUES ("admin2","apassword","canteen_admin",50,2)
            """;
    private static final String INSERT_ADMIN3 = """
            INSERT INTO user (username, password, user_type, user_level, canteen_id)
            VALUES ("admin3","apassword","canteen_admin",50,3)
            """;
    private static final String INSERT_ADMIN4 = """
            INSERT INTO user (username, password, user_type, user_level, canteen_id)
            VALUES ("admin4","apassword","canteen_admin",50,4)
            """;
    private static final String INSERT_ADMIN5 = """
            INSERT INTO user (username, password, user_type, user_level, canteen_id)
            VALUES ("admin5","apassword","canteen_admin",50,5)
            """;
    private static final String INSERT_CONSUMER = """
            INSERT INTO user (username, password, user_type, user_level, canteen_id)
            VALUES ("consumer","cpassword","consumer",0,0)
            """;

    private static final String INSERT_CANTEEN_1 = """
            INSERT INTO canteen (canteen_name, intro, location, business_hours, announcement)
            VALUES ("一餐厅", "....", "杨浦区军工路516号上海理工大学内", "06:00 – 22:00", "一食堂禁止携带酒水");
            """;

    private static final String INSERT_CANTEEN_2 = """
            INSERT INTO canteen (canteen_name, intro, location, business_hours, announcement)
            VALUES ("二食堂", "基础学院学子的唯二选择之一", "杨浦区军工路1100号上海理工大学内", "06:00 – 22:00", "二食堂禁止携带本部食堂的食物");
            """;

    private static final String INSERT_CANTEEN_3 = """
            INSERT INTO canteen (canteen_name, intro, location, business_hours, announcement)
            VALUES ("思餐厅", "思餐厅天下第二", "杨浦区军工路516号上海理工大学内", "06:00 – 22:00", "思餐厅禁止情侣长时间霸占座位，时间就是金钱我的朋友");
            """;

    private static final String INSERT_CANTEEN_4 = """
            INSERT INTO canteen (canteen_name, intro, location, business_hours, announcement)
            VALUES ("五食堂", "五食堂天下第一！！！！！！", "杨浦区军工路516号上海理工大学内", "06:00 – 22:00", "五食堂禁止情侣入内，享受美食吧，诸位，五食堂是你们肠胃最坚实的壁垒");
            """;

    private static final String INSERT_CANTEEN_5 = """
            INSERT INTO canteen (canteen_name, intro, location, business_hours, announcement)
            VALUES ("迷你餐厅", "金刚胃训练处", "杨浦区军工路516号上海理工大学内", "06:00 – 22:00", "请各位同学就餐前，准备好自己的医保卡");
            """;

    private static final String INSERT_DISH_1 = """
            INSERT INTO dish (canteen_id, dish_name, price, discount_rate, cuisine, picture)
            VALUES (1, "麻辣香锅(甜辣)", 200, 1, "本帮菜", NULL)
            """;

    private static final String INSERT_DISH_2 = """
            INSERT INTO dish (canteen_id, dish_name, price, discount_rate, cuisine, picture)
            VALUES (2, "不辣臭锅", 2, 0.5, "地府菜", NULL)
            """;

    private static final String INSERT_DISH_3 = """
            INSERT INTO dish (canteen_id, dish_name, price, discount_rate, cuisine, picture)
            VALUES (3, "微辣酸锅", 20, 0.7, "天府菜", NULL)
            """;

    private static final String INSERT_DISH_4 = """
            INSERT INTO dish (canteen_id, dish_name, price, discount_rate, cuisine, picture)
            VALUES (4, "中辣甜锅", 30, 0.8, "火星菜", NULL)
            """;

    private static final String INSERT_DISH_5 = """
            INSERT INTO dish (canteen_id, dish_name, price, discount_rate, cuisine, picture)
            VALUES (5, "重辣苦锅", 20, 1.5, "一食堂菜", NULL)
            """;

    private static final String INSERT_POST_1 = """
            INSERT INTO post (user_id, time, title, content, picture)
            VALUES (2, "2023-12-25-12:20", "test", "this is a test", NULL)
            """;

    private static JDBCHelper instance;

    private JDBCHelper() {
        super();
    }

    public static synchronized JDBCHelper getInstance() {
        if (instance == null) {
            instance = new JDBCHelper();
        }
        return instance;
    }

    @Override
    protected void setDatabaseConfig() {
        dbDriverClassName = "com.mysql.cj.jdbc.Driver";
        dbVersion = "1.6.1";

        String schemaName = System.getenv("MYSQL_DATABASE");
        dbUrl = "jdbc:mysql://learn-mysql:3306/" + schemaName;
        dbUsername = System.getenv("MYSQL_USER");
        dbPassword = System.getenv("MYSQL_PASSWORD");

        if (schemaName == null || dbUsername == null || dbPassword == null) {
            try (InputStream inputStream = JDBCHelper.class.getClassLoader().getResourceAsStream("config.json")) {
                String text = new String(inputStream.readAllBytes());
                JSONObject jsonObject = new JSONObject(text);
                dbUrl = jsonObject.getString("database_url");
                dbUsername = jsonObject.getString("database_username");
                dbPassword = jsonObject.getString("database_password");

                logger.info("Using development setting.");
            } catch (IOException e) {
                logger.error("Database config failed", e);
            }
        } else {
            logger.info("Using production setting.");
        }
    }

    @Override
    public void onCreate() throws SQLException {
        try (Connection connection = getConnection();
             Statement statement = connection.createStatement()) {
            statement.executeUpdate(CREATE_TABLE_USER);
            statement.executeUpdate(CREATE_TABLE_CANTEEN);
            statement.executeUpdate(CREATE_TABLE_DISH);
            statement.executeUpdate(CREATE_TABLE_COMPLAINT);
            statement.executeUpdate(CREATE_TABLE_VOTE);
            statement.executeUpdate(CREATE_TABLE_EVALUATION);
            statement.executeUpdate(CREATE_TABLE_POST);
            statement.executeUpdate(CREATE_TABLE_COMMENT);
            statement.executeUpdate(CREATE_TABLE_USER_LIKE);

            statement.executeUpdate(INSERT_MASTER);
            statement.executeUpdate(INSERT_ADMIN1);
            statement.executeUpdate(INSERT_ADMIN2);
            statement.executeUpdate(INSERT_ADMIN3);
            statement.executeUpdate(INSERT_ADMIN4);
            statement.executeUpdate(INSERT_ADMIN5);
            statement.executeUpdate(INSERT_CONSUMER);
            statement.executeUpdate(INSERT_CANTEEN_1);
            statement.executeUpdate(INSERT_CANTEEN_2);
            statement.executeUpdate(INSERT_CANTEEN_3);
            statement.executeUpdate(INSERT_CANTEEN_4);
            statement.executeUpdate(INSERT_CANTEEN_5);
            statement.executeUpdate(INSERT_DISH_1);
            statement.executeUpdate(INSERT_DISH_2);
            statement.executeUpdate(INSERT_DISH_3);
            statement.executeUpdate(INSERT_DISH_4);
            statement.executeUpdate(INSERT_DISH_5);
            statement.executeUpdate(INSERT_POST_1);
        }

        super.onCreate();
    }

    @Override
    public void onUpgrade() throws SQLException {
        try (Connection connection = getConnection();
             Statement statement = connection.createStatement()) {
            // Drop all
            statement.executeUpdate("DROP TABLE IF EXISTS metadata");
            statement.executeUpdate("DROP TABLE IF EXISTS user_like");
            statement.executeUpdate("DROP TABLE IF EXISTS comment");
            statement.executeUpdate("DROP TABLE IF EXISTS post");
            statement.executeUpdate("DROP TABLE IF EXISTS evaluation");
            statement.executeUpdate("DROP TABLE IF EXISTS vote");
            statement.executeUpdate("DROP TABLE IF EXISTS complaint");
            statement.executeUpdate("DROP TABLE IF EXISTS dish");
            statement.executeUpdate("DROP TABLE IF EXISTS canteen");
            statement.executeUpdate("DROP TABLE IF EXISTS user");
        }

        onCreate();
        super.onUpgrade();
    }
}
package com.windsnow1025.canteenmanagement.springboot;

import com.windsnow1025.canteenmanagement.springboot.database.JDBCHelper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);

        JDBCHelper jdbcHelper = new JDBCHelper();
    }

}

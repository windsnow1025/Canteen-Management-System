package com.windsnow1025.canteenmanagement.servlet.api;

import com.windsnow1025.canteenmanagement.servlet.database.JDBCHelper;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;

@Path("/hello-world")
public class HelloResource {
    @GET
    @Produces("text/plain")
    public String hello() {
        JDBCHelper jdbcHelper = new JDBCHelper();
        return "Hello, World!";
    }
}
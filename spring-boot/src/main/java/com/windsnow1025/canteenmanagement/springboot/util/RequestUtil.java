package com.windsnow1025.canteenmanagement.springboot.util;

import jakarta.servlet.ServletRequest;
import jakarta.servlet.http.HttpServletRequest;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.*;

public class RequestUtil {

    public static String getRequestFullURL(HttpServletRequest request) {
        StringBuffer requestURL = request.getRequestURL();
        String queryString = request.getQueryString();
        if (queryString != null) {
            requestURL.append("?").append(queryString);
        }
        return requestURL.toString();
    }

    public static Map<String, String> getParams(String url) {
        Map<String, String> params = new HashMap<>();
        String[] paramsString = url.split("\\?")[1].split("&");
        for (String paramString : paramsString) {
            String[] keyValue = paramString.split("=");
            if (keyValue.length > 1) {
                params.put(keyValue[0], keyValue[1]);
            }
        }
        return params;
    }

    public static boolean paramContains(Map<String, String[]> requestParams, Set<String> words) {
        for (Map.Entry<String, String[]> requestParam : requestParams.entrySet()) {
            String[] paramValues = requestParam.getValue();
            for (String paramValue : paramValues) {
                for (String word : words) {
                    if (paramValue.toLowerCase().contains(word.toLowerCase())) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public static String getBodyAsString(ServletRequest request) throws IOException {
        StringBuilder body = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            char[] buffer = new char[1024];
            int bytesRead;
            while ((bytesRead = reader.read(buffer)) != -1) {
                body.append(buffer, 0, bytesRead);
            }
        }
        return body.toString();
    }

    public static boolean bodyContains(String body, Set<String> words) {
        for (String word : words) {
            if (body.toLowerCase().contains(word.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

}

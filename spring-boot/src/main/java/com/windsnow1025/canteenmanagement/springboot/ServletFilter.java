package com.windsnow1025.canteenmanagement.springboot;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import static com.windsnow1025.canteenmanagement.springboot.util.RequestUtil.*;

@WebFilter(filterName = "ServletFilter", urlPatterns = "/*")
public class ServletFilter implements Filter {
    public void init(FilterConfig config) throws ServletException {
        System.out.println("ServletFilter init.");
    }

    public void destroy() {
        System.out.println("ServletFilter destroy.");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
        Map<String, String[]> requestParams = request.getParameterMap();

        System.out.print("Request parameter: ");
        for (Map.Entry<String, String[]> requestParam : requestParams.entrySet()) {
            System.out.print(requestParam.getKey() + " = " + Arrays.toString(requestParam.getValue()) + ", ");
        }
        System.out.println();

        Set<String> forbiddenWords = new HashSet<>();
        forbiddenWords.add("bad word 1");
        forbiddenWords.add("bad word 2");

        if (containWords(requestParams, forbiddenWords)) {
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            httpResponse.sendError(HttpServletResponse.SC_BAD_REQUEST, "Request contains sensitive words.");
            return;
        }

        chain.doFilter(request, response);
    }
}
package com.windsnow1025.canteenmanagement.springboot;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.*;

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
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if (request instanceof HttpServletRequest httpRequest && response instanceof HttpServletResponse httpResponse) {
            String method = httpRequest.getMethod();
            Map<String, String[]> requestParams = httpRequest.getParameterMap();

            // Forbidden words
            Set<String> forbiddenWords = new HashSet<>();
            forbiddenWords.add("bad word 1");
            forbiddenWords.add("bad word 2");

            // URL
            if (paramContains(requestParams, forbiddenWords)) {
                System.out.println("Request URL contains sensitive words.");
                httpResponse.sendError(HttpServletResponse.SC_FORBIDDEN, "Request URL contains sensitive words.");
                return;
            }

            // Body
            if ("POST".equalsIgnoreCase(method) || "PUT".equalsIgnoreCase(method) || "PATCH".equalsIgnoreCase(method)) {
                // Wrap the request to read the body multiple times
                MultiReadHttpServletRequest wrappedRequest = new MultiReadHttpServletRequest(httpRequest);

                // Read the body as a string
                String body = getBodyAsString(wrappedRequest);

                if (bodyContains(body, forbiddenWords)) {
                    System.out.println("Request Body contains sensitive words.");
                    httpResponse.sendError(HttpServletResponse.SC_FORBIDDEN, "Request Body contains sensitive words.");
                    return;
                }

                chain.doFilter(wrappedRequest, response);
                return;
            }
        }

        chain.doFilter(request, response);
    }
}
package com.windsnow1025.canteenmanagement.springboot;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebListener;
import jakarta.servlet.http.*;

import java.util.HashMap;
import java.util.Map;

import static com.windsnow1025.canteenmanagement.springboot.util.RequestUtil.*;

@WebListener
public class ServletListener implements ServletContextListener, HttpSessionListener, HttpSessionAttributeListener, ServletRequestListener {

    public ServletListener() {
    }

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        /* This method is called when the servlet context is initialized(when the Web application is deployed). */
        System.out.println("Context initialized.");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        /* This method is called when the servlet Context is undeployed or Application Server shuts down. */
        System.out.println("Context destroyed.");
    }

    @Override
    public void sessionCreated(HttpSessionEvent se) {
        /* Session is created. */
        System.out.println("Session created.");
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        /* Session is destroyed. */
        System.out.println("Session destroyed.");
    }

    @Override
    public void attributeAdded(HttpSessionBindingEvent sbe) {
        /* This method is called when an attribute is added to a session. */

        String attributeName = sbe.getName();
        Object attributeValue = sbe.getValue();
        System.out.println("Attribute added: " + attributeName + " = " + attributeValue);
    }

    @Override
    public void attributeRemoved(HttpSessionBindingEvent sbe) {
        /* This method is called when an attribute is removed from a session. */

        String attributeName = sbe.getName();
        Object attributeValue = sbe.getValue();
        System.out.println("Attribute removed: " + attributeName + " = " + attributeValue);
    }

    @Override
    public void attributeReplaced(HttpSessionBindingEvent sbe) {
        /* This method is called when an attribute is replaced in a session. */

        String attributeName = sbe.getName();
        Object attributeValue = sbe.getValue();
        System.out.println("Attribute replaced: " + attributeName + " = " + attributeValue);

        if (attributeName.equals("statistics")) {

            Map<String, Object> statistics = (Map<String, Object>) attributeValue;

            String lastURL = statistics.get("lastURL").toString();
            Long lastTime = (Long) statistics.get("lastTime");

            int duration = (int) (System.currentTimeMillis() - lastTime);

            // Statistics for messages
//            if (lastURL.contains("messageId")) {
//                Map<String, String> params = getParams(lastURL);
//                String userIdParam = params.get("userId");
//                String messageIdParam = params.get("messageId");
//
//                if (userIdParam != null && messageIdParam != null) {
//                    int userId = Integer.parseInt(userIdParam);
//                    int messageId = Integer.parseInt(messageIdParam);
//
//                    statisticLogic.increaseDuration(userId, messageId, duration);
//                }
//            }

            // Statistics for ... (to be added)
        }
    }

    @Override
    public void requestInitialized(ServletRequestEvent sre) {
        /* Request is initialized. */
        ServletRequest request = sre.getServletRequest();
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpSession session = httpRequest.getSession(true);

        String currentURL = getRequestFullURL(httpRequest);
        Long currentTime = System.currentTimeMillis();

        Map<String, Object> statistics = new HashMap<>();
        statistics.put("lastURL", currentURL);
        statistics.put("lastTime", currentTime);

        session.setAttribute("statistics", statistics);
    }

    @Override
    public void requestDestroyed(ServletRequestEvent sre) {
        /* Request is destroyed. */
    }
}
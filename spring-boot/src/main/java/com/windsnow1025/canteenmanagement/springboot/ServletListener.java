package com.windsnow1025.canteenmanagement.springboot;

import com.windsnow1025.canteenmanagement.springboot.logic.UserLogic;
import com.windsnow1025.canteenmanagement.springboot.util.JwtUtil;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebListener;
import jakarta.servlet.http.*;

import java.util.HashMap;
import java.util.Map;

import static com.windsnow1025.canteenmanagement.springboot.util.RequestUtil.*;

@WebListener
public class ServletListener implements ServletContextListener, HttpSessionListener, HttpSessionAttributeListener, ServletRequestListener {

    private final UserLogic userLogic;
    public ServletListener() {
        userLogic = new UserLogic();
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
            String username = statistics.get("username").toString();

            int duration = (int) (System.currentTimeMillis() - lastTime);

            // Statistics for userLevel
            if (lastURL != null) {
                // 1000 seconds = 1 level
                userLogic.addLevel(username, duration / 1000000.0f);
            }

            // Statistics for ... (to be added)
        }
    }

    @Override
    public void requestInitialized(ServletRequestEvent sre) {
        /* Request is initialized. */
        ServletRequest request = sre.getServletRequest();

        if (!(request instanceof HttpServletRequest httpRequest)) {
            return;
        }

        HttpSession session = httpRequest.getSession(true);

        String currentURL = getRequestFullURL(httpRequest);
        Long currentTime = System.currentTimeMillis();

        String token = httpRequest.getHeader("Authorization");
        if (token == null) {
            return;
        }
        String username = JwtUtil.parseJWT(token);

        Map<String, Object> statistics = new HashMap<>();
        statistics.put("lastURL", currentURL);
        statistics.put("lastTime", currentTime);
        statistics.put("username", username);

        session.setAttribute("statistics", statistics);
    }

    @Override
    public void requestDestroyed(ServletRequestEvent sre) {
        /* Request is destroyed. */
    }
}
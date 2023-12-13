package com.windsnow1025.canteenmanagement.springboot.logic;

import com.windsnow1025.canteenmanagement.springboot.dao.UserDAO;
import com.windsnow1025.canteenmanagement.springboot.model.User;
import com.windsnow1025.canteenmanagement.springboot.util.JwtUtil;

public class UserLogic {

    private final UserDAO userDao;

    public UserLogic() {
        userDao = new UserDAO();
    }

    public User getInfo(String token) {
        String username = JwtUtil.parseJWT(token);
        return userDao.selectByUsername(username);
    }

    public String signIn(String username, String password) {
        User user = userDao.selectByUsernamePassword(username, password);
        return JwtUtil.createJWT(user.getUsername());
    }

    public boolean signUp(User user) {
        return userDao.insert(user);
    }
}

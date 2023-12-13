package com.windsnow1025.canteenmanagement.springboot.util;

import io.jsonwebtoken.Jwts;

import javax.crypto.SecretKey;


public class JwtUtil {

    private static final SecretKey key = Jwts.SIG.HS256.key().build();

    public static String createJWT(String username) {
        return Jwts.builder().subject(username).signWith(key).compact();
    }

    public static String parseJWT(String jws) {
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(jws).getPayload().getSubject();
    }
}


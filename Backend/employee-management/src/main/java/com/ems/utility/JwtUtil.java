package com.ems.utility;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration:3600000}")   // 1 hour
    private long jwtExpirationInMs;

    @Value("${jwt.refreshExpiration:604800000}") // 7 days
    private long refreshExpirationInMs;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // Generate Access Token
    public String generateAccessToken(String username) {
        return generateToken(username, jwtExpirationInMs);
    }

    // Generate Refresh Token
    public String generateRefreshToken(String username) {
        return generateToken(username, refreshExpirationInMs);
    }

    // Main method to generate JWT token
    private String generateToken(String username, long expiryTime) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiryTime);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Extract username from token
    public String extractUsername(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    // Validate the token
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }
}

package com.ticket.auth.util;

import com.ticket.auth.model.SiteUser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    private Key getSignKey() {
        // Using getBytes() is safe if the secret string is long enough (>= 32 chars for
        // 256 bits).
        // We updated the secret to be 64 chars long.
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(SiteUser user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", user.getId());
        claims.put("type", user.getUserType());
        claims.put("email", user.getEmail());
        claims.put("first_name", user.getFirstName());
        claims.put("last_name", user.getLastName());

        return createToken(claims, user.getEmail());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24 hours
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }
}

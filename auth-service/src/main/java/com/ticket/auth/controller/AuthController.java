package com.ticket.auth.controller;

import com.ticket.auth.model.SiteUser;
import com.ticket.auth.service.AuthService;
import com.ticket.auth.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SiteUser user) {
        try {
            // Provide dummy raw password, it will be extracted from body
            // Wait, logic is: user.pass in body is raw password?
            // SiteUser entity has 'password' field. JSON 'password' maps to it.
            String rawPassword = user.getPassword();
            authService.register(user, rawPassword);
            return ResponseEntity.status(201).body(Map.of("message", "User registered successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> creds) {
        try {
            SiteUser user = authService.login(creds.get("email"), creds.get("password"));
            String token = jwtUtil.generateToken(user);
            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "user", user));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("message", e.getMessage()));
        }
    }
}

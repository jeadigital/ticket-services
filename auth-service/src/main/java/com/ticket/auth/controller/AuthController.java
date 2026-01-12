package com.ticket.auth.controller;

import com.ticket.auth.model.SiteUser;
import com.ticket.auth.service.AuthService;
import com.ticket.auth.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "User authentication and registration endpoints")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @Operation(summary = "Register a new user", description = "Creates a new user account with encrypted password. Email must be unique.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User registered successfully", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"message\": \"User registered successfully\"}"))),
            @ApiResponse(responseCode = "400", description = "Bad request - Email already exists or invalid data", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"message\": \"Email already exists\"}")))
    })
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "User registration details", required = true, content = @Content(schema = @Schema(implementation = SiteUser.class), examples = @ExampleObject(value = """
                    {
                      "firstName": "John",
                      "lastName": "Doe",
                      "email": "john.doe@example.com",
                      "password": "securePassword123",
                      "userType": "customer",
                      "status": "active"
                    }
                    """))) @RequestBody SiteUser user) {
        try {
            String rawPassword = user.getPassword();
            authService.register(user, rawPassword);
            return ResponseEntity.status(201).body(Map.of("message", "User registered successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @Operation(summary = "User login", description = "Authenticates user credentials and returns a JWT token for accessing protected endpoints.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successful - Returns JWT token and user details", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = """
                    {
                      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                      "user": {
                        "id": 1,
                        "firstName": "John",
                        "lastName": "Doe",
                        "email": "john.doe@example.com",
                        "userType": "customer",
                        "status": "active"
                      }
                    }
                    """))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Invalid credentials", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"message\": \"Invalid credentials\"}")))
    })
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "User login credentials", required = true, content = @Content(examples = @ExampleObject(value = """
                    {
                      "email": "john.doe@example.com",
                      "password": "securePassword123"
                    }
                    """))) @RequestBody Map<String, String> creds) {
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

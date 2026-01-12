package com.ticket.service.controller;

import com.ticket.service.exception.InvalidTokenException;
import com.ticket.service.model.Ticket;
import com.ticket.service.service.TicketService;
import com.ticket.service.util.JwtUtil;
import io.jsonwebtoken.Claims;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
@Tag(name = "Tickets", description = "Ticket management endpoints - All endpoints require JWT authentication")
@SecurityRequirement(name = "Bearer Authentication")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private JwtUtil jwtUtil;

    private Long getUserIdFromToken(String tokenHeader) {
        if (tokenHeader == null || !tokenHeader.startsWith("Bearer ")) {
            throw new InvalidTokenException("Missing or malformed Authorization header");
        }
        String token = tokenHeader.substring(7);
        Claims claims = jwtUtil.validateToken(token);
        return ((Number) claims.get("id")).longValue();
    }

    @Operation(summary = "Create a new ticket", description = "Creates a new support ticket for the authenticated user. Returns ticket ID and tracking ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Ticket created successfully", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = """
                    {
                      "message": "Ticket created successfully",
                      "ticketId": 123,
                      "trackId": "TKT-20260112-001"
                    }
                    """))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing JWT token", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"message\": \"Invalid Token\"}")))
    })
    @PostMapping
    public ResponseEntity<?> createTicket(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Ticket details", required = true, content = @Content(schema = @Schema(implementation = Ticket.class), examples = @ExampleObject(value = """
                    {
                      "catId": 1,
                      "title": "Login Issue",
                      "ticketBody": "I cannot login to my account",
                      "priority": "high",
                      "userType": "customer"
                    }
                    """))) @RequestBody Ticket ticket,
            @Parameter(description = "JWT Bearer token", required = true, example = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...") @RequestHeader("Authorization") String token) {
        Long userId = getUserIdFromToken(token);
        Ticket created = ticketService.createTicket(ticket, userId);

        return ResponseEntity.status(201).body(Map.of(
                "message", "Ticket created successfully",
                "ticketId", created.getId(),
                "trackId", created.getTicketTrackId()));
    }

    @Operation(summary = "Get all tickets", description = "Retrieves all tickets for the authenticated user. Optionally filter by status.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tickets retrieved successfully", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = """
                    [
                      {
                        "id": 123,
                        "ticketTrackId": "TKT-20260112-001",
                        "catId": 1,
                        "title": "Login Issue",
                        "ticketBody": "Cannot login to my account",
                        "ticketUser": 1,
                        "openedTime": "2026-01-12T10:45:00",
                        "lastReplyTime": "2026-01-12T11:00:00",
                        "status": "open",
                        "priority": "high",
                        "userType": "customer"
                      }
                    ]
                    """))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing JWT token", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"message\": \"Invalid Token\"}")))
    })
    @GetMapping
    public ResponseEntity<?> getTickets(
            @Parameter(description = "Filter tickets by status (e.g., open, closed, pending)", example = "open") @RequestParam(required = false) String status,
            @Parameter(description = "JWT Bearer token", required = true, example = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...") @RequestHeader("Authorization") String token) {
        Long userId = getUserIdFromToken(token);
        List<Ticket> tickets = ticketService.getTickets(userId, status);
        return ResponseEntity.ok(tickets);
    }

    @Operation(summary = "Get ticket by ID", description = "Retrieves a specific ticket by its ID. User can only access their own tickets.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ticket retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Ticket.class), examples = @ExampleObject(value = """
                    {
                      "id": 123,
                      "ticketTrackId": "TKT-20260112-001",
                      "catId": 1,
                      "title": "Login Issue",
                      "ticketBody": "Cannot login to my account",
                      "ticketUser": 1,
                      "openedTime": "2026-01-12T10:45:00",
                      "lastReplyTime": "2026-01-12T11:00:00",
                      "status": "open",
                      "priority": "high",
                      "userType": "customer"
                    }
                    """))),
            @ApiResponse(responseCode = "404", description = "Ticket not found or access denied", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"message\": \"Ticket not found or access denied\"}"))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing JWT token", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"message\": \"Invalid Token\"}")))
    })
    @GetMapping("/{id}")
    public ResponseEntity<?> getTicketById(
            @Parameter(description = "Ticket ID", required = true, example = "123") @PathVariable Long id,
            @Parameter(description = "JWT Bearer token", required = true, example = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...") @RequestHeader("Authorization") String token) {
        Long userId = getUserIdFromToken(token);
        Ticket ticket = ticketService.getTicketById(id, userId);
        return ResponseEntity.ok(ticket);
    }
}

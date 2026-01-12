package com.ticket.service.controller;

import com.ticket.service.model.Ticket;
import com.ticket.service.service.TicketService;
import com.ticket.service.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private JwtUtil jwtUtil;

    private Long getUserIdFromToken(String tokenHeader) {
        if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
            String token = tokenHeader.substring(7);
            Claims claims = jwtUtil.validateToken(token);
            return ((Number) claims.get("id")).longValue();
        }
        throw new RuntimeException("Invalid Token");
    }

    @PostMapping
    public ResponseEntity<?> createTicket(@RequestBody Ticket ticket, @RequestHeader("Authorization") String token) {
        try {
            Long userId = getUserIdFromToken(token);
            Ticket created = ticketService.createTicket(ticket, userId);

            // Match legacy response format
            // trackId, ticketId, message
            return ResponseEntity.status(201).body(Map.of(
                    "message", "Ticket created successfully",
                    "ticketId", created.getId(),
                    "trackId", created.getTicketTrackId()));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getTickets(@RequestParam(required = false) String status,
            @RequestHeader("Authorization") String token) {
        try {
            Long userId = getUserIdFromToken(token);
            List<Ticket> tickets = ticketService.getTickets(userId, status);
            return ResponseEntity.ok(tickets);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTicketById(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        try {
            Long userId = getUserIdFromToken(token);
            Ticket ticket = ticketService.getTicketById(id, userId);
            if (ticket == null) {
                return ResponseEntity.status(404).body(Map.of("message", "Ticket not found or access denied"));
            }
            return ResponseEntity.ok(ticket);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("message", e.getMessage()));
        }
    }
}

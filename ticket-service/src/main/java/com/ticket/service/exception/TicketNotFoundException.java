package com.ticket.service.exception;

/**
 * Exception thrown when a ticket is not found or user doesn't have access to
 * it.
 * Provides developer-friendly message with ticket ID context.
 */
public class TicketNotFoundException extends RuntimeException {

    private final Long ticketId;

    public TicketNotFoundException(Long ticketId) {
        super(String.format(
                "Ticket not found: No ticket exists with ID '%d' or you don't have permission to access it.",
                ticketId));
        this.ticketId = ticketId;
    }

    public TicketNotFoundException(Long ticketId, Long userId) {
        super(String.format("Ticket not found: Ticket ID '%d' does not exist or does not belong to user ID '%d'.",
                ticketId, userId));
        this.ticketId = ticketId;
    }

    public Long getTicketId() {
        return ticketId;
    }
}

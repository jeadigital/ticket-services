package com.ticket.service.exception;

/**
 * Exception thrown when JWT token is invalid, expired, or malformed.
 * Provides developer-friendly message with token validation failure details.
 */
public class InvalidTokenException extends RuntimeException {

    private final String reason;

    public InvalidTokenException(String reason) {
        super(String.format("Authentication failed: %s. Please login again to get a valid token.", reason));
        this.reason = reason;
    }

    public InvalidTokenException(String reason, Throwable cause) {
        super(String.format("Authentication failed: %s. Please login again to get a valid token.", reason), cause);
        this.reason = reason;
    }

    public String getReason() {
        return reason;
    }
}

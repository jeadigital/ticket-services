package com.ticket.auth.exception;

/**
 * Exception thrown when login credentials are invalid.
 * Provides developer-friendly message without exposing whether email or
 * password was incorrect (security best practice).
 */
public class InvalidCredentialsException extends RuntimeException {

    public InvalidCredentialsException() {
        super("Authentication failed: Invalid email or password. Please check your credentials and try again.");
    }

    public InvalidCredentialsException(String customMessage) {
        super(customMessage);
    }
}

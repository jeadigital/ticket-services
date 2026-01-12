package com.ticket.auth.exception;

/**
 * Exception thrown when attempting to register a user with an email that
 * already exists.
 * Provides developer-friendly message with the conflicting email address.
 */
public class UserAlreadyExistsException extends RuntimeException {

    private final String email;

    public UserAlreadyExistsException(String email) {
        super(String.format(
                "Registration failed: Email '%s' is already registered. Please use a different email or try logging in.",
                email));
        this.email = email;
    }

    public String getEmail() {
        return email;
    }
}

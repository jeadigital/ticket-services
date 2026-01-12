package com.ticket.auth.exception;

/**
 * Exception thrown when password hashing fails.
 * Provides developer-friendly message with technical details for debugging.
 */
public class PasswordHashingException extends RuntimeException {

    public PasswordHashingException(String algorithm, Throwable cause) {
        super(String.format(
                "Password hashing failed: Unable to generate %s hash. This is a server configuration issue.",
                algorithm), cause);
    }
}

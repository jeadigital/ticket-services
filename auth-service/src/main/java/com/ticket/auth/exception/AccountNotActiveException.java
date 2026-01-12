package com.ticket.auth.exception;

/**
 * Exception thrown when attempting to login with an inactive account.
 * Provides developer-friendly message with account status information.
 */
public class AccountNotActiveException extends RuntimeException {

    private final String email;
    private final String status;

    public AccountNotActiveException(String email, String status) {
        super(String.format(
                "Login failed: Account '%s' is not active (current status: '%s'). Please contact support to activate your account.",
                email, status));
        this.email = email;
        this.status = status;
    }

    public String getEmail() {
        return email;
    }

    public String getStatus() {
        return status;
    }
}

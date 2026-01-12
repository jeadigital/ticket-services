package com.ticket.service.exception;

/**
 * Exception thrown when a user attempts to access a resource they don't own.
 * Provides developer-friendly message without exposing sensitive information.
 */
public class UnauthorizedAccessException extends RuntimeException {

    private final String resource;

    public UnauthorizedAccessException(String resource) {
        super(String.format("Access denied: You do not have permission to access this %s.", resource));
        this.resource = resource;
    }

    public UnauthorizedAccessException(String resource, Long resourceId) {
        super(String.format("Access denied: You do not have permission to access %s with ID '%d'.", resource,
                resourceId));
        this.resource = resource;
    }

    public String getResource() {
        return resource;
    }
}

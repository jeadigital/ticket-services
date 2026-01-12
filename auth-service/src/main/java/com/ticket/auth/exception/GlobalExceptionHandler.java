package com.ticket.auth.exception;

import com.ticket.auth.dto.ErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

/**
 * Global exception handler for the Auth Service.
 * Catches all exceptions and returns standardized error responses with
 * developer-friendly messages.
 */
@org.springframework.web.bind.annotation.RestControllerAdvice
public class GlobalExceptionHandler {

        private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

        public GlobalExceptionHandler() {
                System.out.println(">>> GlobalExceptionHandler INITIALIZED <<<");
        }

        /**
         * Handle UserAlreadyExistsException - thrown when email is already registered
         */
        @ExceptionHandler(UserAlreadyExistsException.class)
        public ResponseEntity<ErrorResponse> handleUserAlreadyExists(
                        UserAlreadyExistsException ex, WebRequest request) {

                System.out.println(">>> Handling UserAlreadyExistsException for: " + ex.getEmail());
                logger.warn("Registration attempt with existing email: {}", ex.getEmail());

                ErrorResponse errorResponse = ErrorResponse.builder()
                                .timestamp(LocalDateTime.now())
                                .status(HttpStatus.BAD_REQUEST.value())
                                .error(HttpStatus.BAD_REQUEST.getReasonPhrase())
                                .message(ex.getMessage())
                                .path(getRequestPath(request))
                                .details(String.format("Email '%s' is already in use", ex.getEmail()))
                                .build();

                return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        /**
         * Handle InvalidCredentialsException - thrown when login credentials are
         * incorrect
         */
        @ExceptionHandler(InvalidCredentialsException.class)
        public ResponseEntity<ErrorResponse> handleInvalidCredentials(
                        InvalidCredentialsException ex, WebRequest request) {

                logger.warn("Failed login attempt from path: {}", getRequestPath(request));

                ErrorResponse errorResponse = ErrorResponse.builder()
                                .timestamp(LocalDateTime.now())
                                .status(HttpStatus.UNAUTHORIZED.value())
                                .error(HttpStatus.UNAUTHORIZED.getReasonPhrase())
                                .message(ex.getMessage())
                                .path(getRequestPath(request))
                                .build();

                return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }

        /**
         * Handle AccountNotActiveException - thrown when account is not active
         */
        @ExceptionHandler(AccountNotActiveException.class)
        public ResponseEntity<ErrorResponse> handleAccountNotActive(
                        AccountNotActiveException ex, WebRequest request) {

                logger.warn("Login attempt with inactive account: {} (status: {})",
                                ex.getEmail(), ex.getStatus());

                ErrorResponse errorResponse = ErrorResponse.builder()
                                .timestamp(LocalDateTime.now())
                                .status(HttpStatus.FORBIDDEN.value())
                                .error(HttpStatus.FORBIDDEN.getReasonPhrase())
                                .message(ex.getMessage())
                                .path(getRequestPath(request))
                                .details(String.format("Account status: %s", ex.getStatus()))
                                .build();

                return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
        }

        /**
         * Handle PasswordHashingException - thrown when password hashing fails
         */
        @ExceptionHandler(PasswordHashingException.class)
        public ResponseEntity<ErrorResponse> handlePasswordHashing(
                        PasswordHashingException ex, WebRequest request) {

                logger.error("Password hashing failed", ex);

                ErrorResponse errorResponse = ErrorResponse.builder()
                                .timestamp(LocalDateTime.now())
                                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                                .error(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase())
                                .message(ex.getMessage())
                                .path(getRequestPath(request))
                                .details("Please contact system administrator")
                                .build();

                return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        /**
         * Handle IllegalArgumentException - thrown for invalid input parameters
         */
        @ExceptionHandler(IllegalArgumentException.class)
        public ResponseEntity<ErrorResponse> handleIllegalArgument(
                        IllegalArgumentException ex, WebRequest request) {

                logger.warn("Invalid argument: {}", ex.getMessage());

                ErrorResponse errorResponse = ErrorResponse.builder()
                                .timestamp(LocalDateTime.now())
                                .status(HttpStatus.BAD_REQUEST.value())
                                .error(HttpStatus.BAD_REQUEST.getReasonPhrase())
                                .message("Invalid request parameter: " + ex.getMessage())
                                .path(getRequestPath(request))
                                .build();

                return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        /**
         * Handle all other unexpected exceptions
         */
        @ExceptionHandler(Exception.class)
        public ResponseEntity<ErrorResponse> handleGlobalException(
                        Exception ex, WebRequest request) {

                logger.error("Unexpected error occurred", ex);

                ErrorResponse errorResponse = ErrorResponse.builder()
                                .timestamp(LocalDateTime.now())
                                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                                .error(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase())
                                .message(
                                                "An unexpected error occurred. Please try again later or contact support if the problem persists.")
                                .path(getRequestPath(request))
                                .details(ex.getClass().getSimpleName() + ": " + ex.getMessage())
                                .build();

                return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        /**
         * Extract request path from WebRequest
         */
        private String getRequestPath(WebRequest request) {
                return request.getDescription(false).replace("uri=", "");
        }
}

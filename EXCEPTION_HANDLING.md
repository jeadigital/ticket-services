---

## ⚠️ Exception Handling

This application implements **professional exception handling** with developer-friendly error messages across all services.

### Standardized Error Response Format

All error responses follow this consistent format:

```json
{
  "timestamp": "2026-01-12T13:32:00.123+05:30",
  "status": 400,
  "error": "Bad Request",
  "message": "Registration failed: Email 'user@example.com' is already registered. Please use a different email or try logging in.",
  "path": "/api/auth/register",
  "details": "Email 'user@example.com' is already in use"
}
```

### Custom Exceptions

#### Auth Service Exceptions

| Exception | HTTP Status | Example Message |
|-----------|-------------|-----------------|
| `UserAlreadyExistsException` | 400 Bad Request | "Registration failed: Email 'user@example.com' is already registered. Please use a different email or try logging in." |
| `InvalidCredentialsException` | 401 Unauthorized | "Authentication failed: Invalid email or password. Please check your credentials and try again." |
| `AccountNotActiveException` | 403 Forbidden | "Login failed: Account 'user@example.com' is not active (current status: 'I'). Please contact support to activate your account." |
| `PasswordHashingException` | 500 Internal Server Error | "Password hashing failed: Unable to generate MD5 hash. This is a server configuration issue." |

#### Ticket Service Exceptions

| Exception | HTTP Status | Example Message |
|-----------|-------------|-----------------|
| `TicketNotFoundException` | 404 Not Found | "Ticket not found: Ticket ID '123' does not exist or does not belong to user ID '456'." |
| `UnauthorizedAccessException` | 403 Forbidden | "Access denied: You do not have permission to access ticket with ID '123'." |
| `InvalidTokenException` | 401 Unauthorized | "Authentication failed: Token expired. Please login again to get a valid token." |
| `ExpiredJwtException` | 401 Unauthorized | "Authentication failed: Your session has expired. Please login again to continue." |
| `MalformedJwtException` | 401 Unauthorized | "Authentication failed: Invalid token format. Please login again to get a valid token." |

### Key Features

- ✅ **Developer-Friendly Messages**: Clear, actionable error messages with context
- ✅ **Contextual Information**: Includes relevant IDs, emails, and reasons
- ✅ **Consistent Format**: Same error structure across all services
- ✅ **Comprehensive Logging**: All exceptions logged for debugging
- ✅ **Global Exception Handlers**: Centralized error handling with `@ControllerAdvice`
- ✅ **JWT-Specific Handling**: Dedicated handlers for token validation failures

### Testing Exception Handling

You can test the exception handling using Swagger UI:

**Example 1: Test UserAlreadyExistsException**
1. Go to http://localhost:8081/swagger-ui.html
2. Register a user using `/api/auth/register`
3. Try registering again with the same email
4. You'll receive a 400 error with the message: "Registration failed: Email 'user@example.com' is already registered..."

**Example 2: Test InvalidTokenException**
1. Go to http://localhost:8082/swagger-ui.html
2. Try accessing `/api/tickets` without authorization
3. You'll receive a 401 error with the message: "Authentication failed: Missing or malformed Authorization header..."

**Example 3: Test TicketNotFoundException**
1. Login to get a valid JWT token
2. Try accessing `/api/tickets/99999` (non-existent ID)
3. You'll receive a 404 error with the message: "Ticket not found: Ticket ID '99999' does not exist..."


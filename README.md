# Ticket Services - Microservices Architecture

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.1-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue.svg)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A **production-ready**, **scalable** support ticket management system built with **Spring Boot Microservices Architecture**. This application enables users to create, manage, and track support tickets with enterprise-grade security, service discovery, and API gateway patterns.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Microservices](#microservices)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Security](#security)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This application is a **cloud-native microservices-based ticketing/support system** designed to handle user authentication, ticket management, and support operations at scale. The system follows modern distributed architecture patterns with service discovery, centralized API gateway, and JWT-based security.

### Why This Architecture?

- **Scalability**: Each service can be scaled independently based on demand
- **Resilience**: Service failures are isolated and don't affect the entire system
- **Maintainability**: Services can be developed, deployed, and updated independently
- **Technology Flexibility**: Different services can use different technologies if needed
- **Cloud-Ready**: Designed for deployment on cloud platforms (AWS, Azure, GCP)

### Key Capabilities

- ✅ **User Authentication & Authorization** with JWT tokens
- ✅ **Ticket Management** (Create, Read, Track with unique IDs)
- ✅ **Service Discovery** using Netflix Eureka
- ✅ **API Gateway** for centralized routing and load balancing
- ✅ **Interactive API Documentation** with Swagger/OpenAPI 3.0
- ✅ **RESTful APIs** with comprehensive documentation
- ✅ **MySQL Database** with JPA/Hibernate ORM
- ✅ **Spring Security** for robust authentication
- ✅ **Microservices Architecture** for horizontal scalability
- ✅ **Production-Ready** with proper error handling and logging

---

## 🏗️ Architecture

The application follows a **microservices architecture** pattern with the following components:

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                           │
│              (Web/Mobile/Third-party Apps)                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway (Port 8080)                  │
│         • Request Routing                                   │
│         • Load Balancing                                    │
│         • Service Discovery Integration                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
         ▼                 ▼                 ▼
┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│  Auth Service  │ │ Ticket Service │ │   Discovery    │
│  (Port 8081)   │ │  (Port 8082)   │ │     Server     │
│                │ │                │ │  (Port 8761)   │
│ • Registration │ │ • Create       │ │                │
│ • Login        │ │ • Read         │ │ • Service      │
│ • JWT Tokens   │ │ • Track        │ │   Registry     │
│ • Security     │ │ • Filter       │ │ • Health Check │
└────────┬───────┘ └────────┬───────┘ └────────────────┘
         │                  │
         └────────┬─────────┘
                  │
                  ▼
         ┌────────────────┐
         │ MySQL Database │
         │   (Port 3306)  │
         │                │
         │ • site_user    │
         │ • ticket       │
         └────────────────┘
```

### Architecture Patterns Implemented

1. **Service Discovery Pattern**: Eureka Server for dynamic service registration
2. **API Gateway Pattern**: Single entry point for all client requests
3. **Database per Service**: Each service manages its own data (shared DB in this implementation)
4. **JWT Authentication**: Stateless, token-based security
5. **RESTful Communication**: HTTP/JSON for inter-service communication

---

## ✨ Features

### Backend Microservices

#### 🔐 Authentication & Security
- User registration with encrypted passwords (BCrypt)
- JWT-based authentication and authorization
- Secure password storage (never stored in plain text)
- Token-based session management
- Role-based access control ready

#### 🎫 Ticket Management
- Create support tickets with unique tracking IDs
- Retrieve tickets by ID or user
- Filter tickets by status (open, closed, pending)
- Priority-based ticket classification
- User-specific ticket access control
- Automatic timestamp tracking (created, last updated)

#### 🌐 Microservices Infrastructure
- **Service Discovery**: Automatic service registration and discovery
- **API Gateway**: Centralized routing with path-based forwarding
- **Load Balancing**: Client-side load balancing via Ribbon
- **Health Monitoring**: Service health checks via Eureka
- **Fault Tolerance**: Service isolation and failure handling

#### 📊 Data Management
- MySQL database with JPA/Hibernate
- Automatic schema generation and updates
- Transaction management
- Connection pooling
- SQL query logging for debugging

---

## 🛠️ Technology Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | 17 | Programming Language |
| **Spring Boot** | 3.2.1 | Application Framework |
| **Spring Cloud** | 2023.0.0 | Microservices Framework |
| **Maven** | 3.6+ | Build & Dependency Management |

### Spring Ecosystem
- **Spring Web** - RESTful web services
- **Spring Data JPA** - Database access and ORM
- **Spring Security** - Authentication and authorization
- **Spring Cloud Gateway** - API gateway implementation
- **Spring Cloud Netflix Eureka** - Service discovery

### Database & Persistence
- **MySQL** 8.0+ - Relational database
- **Hibernate** - ORM framework
- **MySQL Connector/J** - JDBC driver

### Security
- **JJWT** 0.11.5 - JWT token generation and validation
- **BCrypt** - Password hashing algorithm
- **Spring Security** - Security framework

### Build & Deployment
- **Maven** - Build automation
- **Spring Boot Maven Plugin** - Executable JAR packaging

---

## 🔧 Microservices

### 1. Discovery Server (Eureka)
**Port**: `8761`  
**Artifact**: `discovery-server`

**Purpose**: Service registry for microservice discovery and health monitoring

**Key Features**:
- Registers all microservices automatically
- Provides service discovery for inter-service communication
- Health check dashboard
- Heartbeat mechanism for service availability

**Configuration**:
```properties
server.port=8761
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false
```

**Access**: http://localhost:8761

---

### 2. API Gateway
**Port**: `8080`  
**Artifact**: `api-gateway`

**Purpose**: Single entry point for all client requests with intelligent routing

**Routes Configuration**:
| Path Pattern | Target Service | Description |
|--------------|----------------|-------------|
| `/api/auth/**` | auth-service | Authentication endpoints |
| `/api/tickets/**` | ticket-service | Ticket management endpoints |

**Key Features**:
- Path-based routing
- Load balancing across service instances
- Service discovery integration
- Request/response filtering capabilities

**Configuration**:
```properties
spring.cloud.gateway.routes[0].id=auth-service
spring.cloud.gateway.routes[0].uri=lb://auth-service
spring.cloud.gateway.routes[0].predicates[0]=Path=/api/auth/**
```

---

### 3. Auth Service
**Port**: `8081`  
**Artifact**: `auth-service`

**Purpose**: User authentication, authorization, and JWT token management

**Endpoints**:

#### Register User
```http
POST /api/auth/register
```
**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "userType": "customer"
}
```

#### Login
```http
POST /api/auth/login
```
**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Key Features**:
- User registration with validation
- Secure password encryption (BCrypt)
- JWT token generation with user claims
- Email uniqueness validation
- User status management

**Database Table**: `site_user`

---

### 4. Ticket Service
**Port**: `8082`  
**Artifact**: `ticket-service`

**Purpose**: Complete ticket lifecycle management

**Endpoints**:

#### Create Ticket
```http
POST /api/tickets
Authorization: Bearer <token>
```

#### Get All Tickets
```http
GET /api/tickets?status=open
Authorization: Bearer <token>
```

#### Get Ticket by ID
```http
GET /api/tickets/{id}
Authorization: Bearer <token>
```

**Key Features**:
- JWT-based authentication on all endpoints
- Unique ticket tracking ID generation
- User-specific ticket filtering
- Status-based filtering
- Priority management
- Automatic timestamp tracking

**Database Table**: `ticket`

---

## 📦 Prerequisites

Ensure you have the following installed before proceeding:

### Required Software

1. **Java Development Kit (JDK) 17 or higher**
   ```bash
   java -version
   # Should output: java version "17.x.x" or higher
   ```
   Download: [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)

2. **Apache Maven 3.6+**
   ```bash
   mvn -version
   # Should output: Apache Maven 3.6.x or higher
   ```
   Download: [Maven](https://maven.apache.org/download.cgi)

3. **MySQL 8.0+**
   ```bash
   mysql --version
   # Should output: mysql Ver 8.0.x or higher
   ```
   Download: [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

4. **Git** (for cloning the repository)
   ```bash
   git --version
   ```

### System Requirements
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: 2GB free space
- **OS**: Windows, Linux, or macOS

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd ticket-services-1
```

### Step 2: Setup MySQL Database

1. **Start MySQL Server**
   ```bash
   # Windows
   net start MySQL80
   
   # Linux/Mac
   sudo systemctl start mysql
   ```

2. **Create Database**
   ```bash
   mysql -u root -p
   ```
   
   ```sql
   CREATE DATABASE support_system_live;
   SHOW DATABASES;
   EXIT;
   ```

3. **Verify Database**
   ```bash
   mysql -u root -p support_system_live
   ```

> **Note**: The application will automatically create the required tables (`site_user`, `ticket`) on first run using Hibernate DDL auto-update.

### Step 3: Configure Database Credentials

Update the following files if your MySQL credentials differ:

**File**: `auth-service/src/main/resources/application.properties`
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/support_system_live
spring.datasource.username=root
spring.datasource.password=root
```

**File**: `ticket-service/src/main/resources/application.properties`
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/support_system_live
spring.datasource.username=root
spring.datasource.password=root
```

### Step 4: Configure JWT Secret (Important!)

**File**: `auth-service/src/main/resources/application.properties`
```properties
jwt.secret=your_secure_jwt_secret_key_here_minimum_256_bits
```

> ⚠️ **Security Warning**: For production, use a strong, randomly generated secret key (minimum 256 bits). Example:
> ```bash
> # Generate a secure secret
> openssl rand -base64 32
> ```

### Step 5: Build All Services

From the project root directory:

```bash
# Build Discovery Server
cd discovery-server
mvn clean install -DskipTests
cd ..

# Build API Gateway
cd api-gateway
mvn clean install -DskipTests
cd ..

# Build Auth Service
cd auth-service
mvn clean install -DskipTests
cd ..

# Build Ticket Service
cd ticket-service
mvn clean install -DskipTests
cd ..
```

**Expected Output**: Each build should end with `BUILD SUCCESS`

---

## ▶️ Running the Application

### Important: Service Startup Order

Services must be started in the following order to ensure proper registration:

### Step 1: Start Discovery Server (Eureka)
```bash
cd discovery-server
mvn spring-boot:run
```

**Wait for**: Console message `Started DiscoveryServerApplication`  
**Verify**: Open http://localhost:8761 - You should see the Eureka dashboard

⏱️ **Wait 30 seconds** before starting other services

---

### Step 2: Start Auth Service
```bash
# In a new terminal
cd auth-service
mvn spring-boot:run
```

**Wait for**: Console message `Started AuthServiceApplication`

---

### Step 3: Start Ticket Service
```bash
# In a new terminal
cd ticket-service
mvn spring-boot:run
```

**Wait for**: Console message `Started TicketServiceApplication`

---

### Step 4: Start API Gateway
```bash
# In a new terminal
cd api-gateway
mvn spring-boot:run
```

**Wait for**: Console message `Started ApiGatewayApplication`

---

### Verify All Services

1. **Check Eureka Dashboard**: http://localhost:8761
   - You should see:
     - `AUTH-SERVICE`
     - `TICKET-SERVICE`
     - `API-GATEWAY`
   - All should show status: **UP**

2. **Test API Gateway**: http://localhost:8080
   - Should be accessible (may return 404, which is expected)

3. **Check Service Logs**:
   - All services should show: `Registered with Eureka`

---

### Alternative: Running JAR Files

After building, you can run the JAR files directly:

```bash
# Terminal 1: Discovery Server
java -jar discovery-server/target/discovery-server-0.0.1-SNAPSHOT.jar

# Terminal 2: Auth Service (wait 30 seconds after Discovery Server)
java -jar auth-service/target/auth-service-0.0.1-SNAPSHOT.jar

# Terminal 3: Ticket Service
java -jar ticket-service/target/ticket-service-0.0.1-SNAPSHOT.jar

# Terminal 4: API Gateway
java -jar api-gateway/target/api-gateway-0.0.1-SNAPSHOT.jar
```

---

## 📚 API Documentation

### Base URL
All API requests go through the API Gateway:
```
http://localhost:8080
```

---

### Authentication Endpoints

#### 1. Register User
Creates a new user account.

**Endpoint**: `POST /api/auth/register`

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "userType": "customer",
  "status": "active"
}
```

**Response** (201 Created):
```json
{
  "message": "User registered successfully"
}
```

**Error Response** (400 Bad Request):
```json
{
  "message": "Email already exists"
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "securePassword123",
    "userType": "customer"
  }'
```

---

#### 2. Login
Authenticates a user and returns a JWT token.

**Endpoint**: `POST /api/auth/login`

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsInVzZXJUeXBlIjoiY3VzdG9tZXIiLCJleHAiOjE3MDUxNTIwMDB9.signature",
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "userType": "customer",
    "status": "active",
    "joinDate": "2026-01-12T10:30:00"
  }
}
```

**Error Response** (401 Unauthorized):
```json
{
  "message": "Invalid credentials"
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securePassword123"
  }'
```

---

### Ticket Endpoints

> **Authentication Required**: All ticket endpoints require a valid JWT token in the `Authorization` header.

#### 3. Create Ticket
Creates a new support ticket.

**Endpoint**: `POST /api/tickets`

**Request Headers**:
```
Content-Type: application/json
Authorization: Bearer <your_jwt_token>
```

**Request Body**:
```json
{
  "catId": 1,
  "title": "Login Issue",
  "ticketBody": "I cannot login to my account. Getting 'Invalid credentials' error even with correct password.",
  "priority": "high",
  "userType": "customer"
}
```

**Response** (201 Created):
```json
{
  "message": "Ticket created successfully",
  "ticketId": 123,
  "trackId": "TKT-20260112-001"
}
```

**Error Response** (401 Unauthorized):
```json
{
  "message": "Invalid Token"
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:8080/api/tickets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "catId": 1,
    "title": "Login Issue",
    "ticketBody": "Cannot login to my account",
    "priority": "high",
    "userType": "customer"
  }'
```

---

#### 4. Get All Tickets
Retrieves all tickets for the authenticated user.

**Endpoint**: `GET /api/tickets`

**Request Headers**:
```
Authorization: Bearer <your_jwt_token>
```

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | No | Filter by status (e.g., "open", "closed", "pending") |

**Response** (200 OK):
```json
[
  {
    "id": 123,
    "ticketTrackId": "TKT-20260112-001",
    "catId": 1,
    "title": "Login Issue",
    "ticketBody": "I cannot login to my account",
    "ticketUser": 1,
    "openedTime": "2026-01-12T10:45:00",
    "lastReplyTime": "2026-01-12T11:00:00",
    "status": "open",
    "priority": "high",
    "userType": "customer"
  },
  {
    "id": 124,
    "ticketTrackId": "TKT-20260112-002",
    "catId": 2,
    "title": "Payment Failed",
    "ticketBody": "Payment transaction failed",
    "ticketUser": 1,
    "openedTime": "2026-01-12T11:30:00",
    "lastReplyTime": null,
    "status": "pending",
    "priority": "medium",
    "userType": "customer"
  }
]
```

**cURL Example**:
```bash
# Get all tickets
curl -X GET http://localhost:8080/api/tickets \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Get tickets filtered by status
curl -X GET "http://localhost:8080/api/tickets?status=open" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

#### 5. Get Ticket by ID
Retrieves a specific ticket by its ID.

**Endpoint**: `GET /api/tickets/{id}`

**Request Headers**:
```
Authorization: Bearer <your_jwt_token>
```

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | Long | Ticket ID |

**Response** (200 OK):
```json
{
  "id": 123,
  "ticketTrackId": "TKT-20260112-001",
  "catId": 1,
  "title": "Login Issue",
  "ticketBody": "I cannot login to my account",
  "ticketUser": 1,
  "openedTime": "2026-01-12T10:45:00",
  "lastReplyTime": "2026-01-12T11:00:00",
  "status": "open",
  "priority": "high",
  "userType": "customer"
}
```

**Error Response** (404 Not Found):
```json
{
  "message": "Ticket not found or access denied"
}
```

**cURL Example**:
```bash
curl -X GET http://localhost:8080/api/tickets/123 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### HTTP Status Codes

| Code | Description | When Used |
|------|-------------|-----------|
| 200 | OK | Successful GET request |
| 201 | Created | Successful POST request (resource created) |
| 400 | Bad Request | Invalid request body or parameters |
| 401 | Unauthorized | Missing or invalid JWT token |
| 403 | Forbidden | Valid token but insufficient permissions |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server-side error |

---

### 🎨 Interactive API Documentation (Swagger UI)

Both Auth Service and Ticket Service include **Swagger/OpenAPI 3.0** documentation for interactive API testing.

#### Access Swagger UI

Once the services are running, access the interactive documentation at:

- **Auth Service**: http://localhost:8081/swagger-ui.html
- **Ticket Service**: http://localhost:8082/swagger-ui.html

#### OpenAPI JSON Specification

- **Auth Service**: http://localhost:8081/v3/api-docs
- **Ticket Service**: http://localhost:8082/v3/api-docs

#### Features

- 📖 **Complete API Documentation**: All endpoints documented with descriptions
- 🧪 **Interactive Testing**: Test APIs directly from the browser
- 📝 **Request/Response Examples**: See example payloads for all endpoints
- 🔐 **JWT Authentication**: Built-in authorization support
- 📊 **Schema Definitions**: View request and response data models

#### How to Use Swagger UI

1. **Start the Services**: Ensure Auth Service and Ticket Service are running
2. **Open Swagger UI**: Navigate to http://localhost:8081/swagger-ui.html (Auth) or http://localhost:8082/swagger-ui.html (Tickets)
3. **Explore Endpoints**: Browse available endpoints organized by tags
4. **Test Authentication**:
   - Use the `/api/auth/register` endpoint to create a user
   - Use the `/api/auth/login` endpoint to get a JWT token
   - Copy the token from the response
5. **Authorize Protected Endpoints** (Ticket Service only):
   - Click the **"Authorize"** button (🔓 icon) at the top right
   - Enter: `Bearer <your_jwt_token>` (include "Bearer " prefix)
   - Click **"Authorize"**
   - Now you can test protected ticket endpoints
6. **Execute Requests**: Click "Try it out" on any endpoint, fill in parameters, and click "Execute"

#### Example: Testing with Swagger UI

```
Step 1: Register a user
POST /api/auth/register
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "userType": "customer"
}

Step 2: Login
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
→ Copy the JWT token from response

Step 3: Authorize in Ticket Service
- Go to http://localhost:8082/swagger-ui.html
- Click "Authorize" button
- Enter: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
- Click "Authorize"

Step 4: Create a ticket
POST /api/tickets
{
  "catId": 1,
  "title": "Test Ticket",
  "ticketBody": "Testing via Swagger",
  "priority": "high",
  "userType": "customer"
}
```

---

## 🗄️ Database Schema

### `site_user` Table
Stores user account information.

```sql
CREATE TABLE site_user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    pass VARCHAR(255) NOT NULL,  -- BCrypt encrypted
    join_date DATETIME,
    status VARCHAR(50),
    user_type VARCHAR(50),
    
    INDEX idx_email (email),
    INDEX idx_status (status)
);
```

**Columns**:
| Column | Type | Description |
|--------|------|-------------|
| `id` | BIGINT | Primary key, auto-increment |
| `first_name` | VARCHAR(255) | User's first name |
| `last_name` | VARCHAR(255) | User's last name |
| `email` | VARCHAR(255) | Unique email address (login identifier) |
| `pass` | VARCHAR(255) | BCrypt encrypted password |
| `join_date` | DATETIME | Account creation timestamp |
| `status` | VARCHAR(50) | Account status (active, inactive, suspended) |
| `user_type` | VARCHAR(50) | User role (customer, admin, support) |

---

### `ticket` Table
Stores support ticket information.

```sql
CREATE TABLE ticket (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ticket_track_id VARCHAR(100),
    cat_id INT,
    title VARCHAR(255),
    ticket_body TEXT,
    ticket_user BIGINT,
    opened_time DATETIME,
    last_reply_time DATETIME,
    status VARCHAR(50),
    priroty VARCHAR(50),  -- Note: Legacy typo in column name
    user_type VARCHAR(50),
    
    FOREIGN KEY (ticket_user) REFERENCES site_user(id),
    INDEX idx_ticket_user (ticket_user),
    INDEX idx_status (status),
    INDEX idx_track_id (ticket_track_id)
);
```

**Columns**:
| Column | Type | Description |
|--------|------|-------------|
| `id` | BIGINT | Primary key, auto-increment |
| `ticket_track_id` | VARCHAR(100) | Unique tracking ID (e.g., TKT-20260112-001) |
| `cat_id` | INT | Category ID |
| `title` | VARCHAR(255) | Ticket title/subject |
| `ticket_body` | TEXT | Detailed ticket description |
| `ticket_user` | BIGINT | Foreign key to site_user.id |
| `opened_time` | DATETIME | Ticket creation timestamp |
| `last_reply_time` | DATETIME | Last update/reply timestamp |
| `status` | VARCHAR(50) | Ticket status (open, closed, pending) |
| `priroty` | VARCHAR(50) | Priority level (high, medium, low) |
| `user_type` | VARCHAR(50) | User type who created ticket |

> **Note**: The column name `priroty` is a legacy typo maintained for backward compatibility.

---

## 🔐 Security

### JWT Authentication Flow

```
┌─────────┐                                    ┌──────────────┐
│ Client  │                                    │ Auth Service │
└────┬────┘                                    └──────┬───────┘
     │                                                │
     │  1. POST /api/auth/login                      │
     │  { email, password }                          │
     ├──────────────────────────────────────────────>│
     │                                                │
     │                                         2. Validate
     │                                         credentials
     │                                         (BCrypt)
     │                                                │
     │  3. Return JWT Token                          │
     │  { token, user }                              │
     │<──────────────────────────────────────────────┤
     │                                                │
     │                                                │
┌────┴────┐                                    ┌─────┴────────┐
│ Client  │                                    │Ticket Service│
└────┬────┘                                    └──────┬───────┘
     │                                                │
     │  4. GET /api/tickets                          │
     │  Authorization: Bearer <token>                │
     ├──────────────────────────────────────────────>│
     │                                                │
     │                                         5. Validate
     │                                         JWT token
     │                                         Extract user ID
     │                                                │
     │  6. Return user's tickets                     │
     │  [ {...}, {...} ]                             │
     │<──────────────────────────────────────────────┤
     │                                                │
```

### Security Features

#### 1. Password Security
- **Hashing Algorithm**: BCrypt with salt
- **Storage**: Only hashed passwords stored in database
- **Validation**: Secure comparison during login
- **Never Exposed**: Raw passwords never logged or returned in API responses

#### 2. JWT Token Structure
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "id": 1,
    "email": "john.doe@example.com",
    "userType": "customer",
    "exp": 1705152000
  },
  "signature": "HMACSHA256(...)"
}
```

**Token Claims**:
- `id`: User ID
- `email`: User email
- `userType`: User role/type
- `exp`: Expiration timestamp

**Token Expiration**: 24 hours (configurable)

#### 3. API Security
- All ticket endpoints require valid JWT token
- Token validation on every request
- User-specific data access (users can only see their own tickets)
- Automatic token expiration handling

#### 4. Best Practices Implemented
- ✅ Passwords encrypted with BCrypt
- ✅ JWT tokens for stateless authentication
- ✅ HTTPS ready (configure in production)
- ✅ SQL injection prevention (JPA/Hibernate)
- ✅ Input validation
- ✅ Error messages don't leak sensitive information

### Production Security Checklist

Before deploying to production:

- [ ] Change JWT secret to a strong, randomly generated key (256+ bits)
- [ ] Update database credentials
- [ ] Enable HTTPS/TLS
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable SQL query logging only in development
- [ ] Implement token refresh mechanism
- [ ] Add request/response encryption
- [ ] Set up security headers (HSTS, CSP, etc.)
- [ ] Regular security audits and dependency updates

---

## 📁 Project Structure

```
ticket-services-1/
│
├── discovery-server/                    # Eureka Service Registry
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/ticket/discovery/
│   │       │       └── DiscoveryServerApplication.java
│   │       └── resources/
│   │           └── application.properties
│   ├── target/                          # Compiled JAR
│   └── pom.xml                          # Maven configuration
│
├── api-gateway/                         # Spring Cloud Gateway
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/ticket/gateway/
│   │       │       └── ApiGatewayApplication.java
│   │       └── resources/
│   │           └── application.properties
│   ├── target/
│   └── pom.xml
│
├── auth-service/                        # Authentication Service
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/ticket/auth/
│   │       │       ├── config/
│   │       │       │   └── SecurityConfig.java
│   │       │       ├── controller/
│   │       │       │   └── AuthController.java
│   │       │       ├── model/
│   │       │       │   └── SiteUser.java
│   │       │       ├── repository/
│   │       │       │   └── UserRepository.java
│   │       │       ├── service/
│   │       │       │   └── AuthService.java
│   │       │       ├── util/
│   │       │       │   └── JwtUtil.java
│   │       │       └── AuthServiceApplication.java
│   │       └── resources/
│   │           └── application.properties
│   ├── target/
│   └── pom.xml
│
├── ticket-service/                      # Ticket Management Service
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/ticket/service/
│   │       │       ├── controller/
│   │       │       │   └── TicketController.java
│   │       │       ├── model/
│   │       │       │   └── Ticket.java
│   │       │       ├── repository/
│   │       │       │   └── TicketRepository.java
│   │       │       ├── service/
│   │       │       │   └── TicketService.java
│   │       │       ├── util/
│   │       │       │   └── JwtUtil.java
│   │       │       └── TicketServiceApplication.java
│   │       └── resources/
│   │           └── application.properties
│   ├── target/
│   └── pom.xml
│
└── README.md                            # This file
```

---

## ⚙️ Configuration

### Service Ports

| Service | Port | Configurable In | Purpose |
|---------|------|----------------|---------|
| Discovery Server | 8761 | `discovery-server/application.properties` | Eureka dashboard and service registry |
| API Gateway | 8080 | `api-gateway/application.properties` | Main entry point for all API calls |
| Auth Service | 8081 | `auth-service/application.properties` | Authentication endpoints |
| Ticket Service | 8082 | `ticket-service/application.properties` | Ticket management endpoints |

### Application Properties Reference

#### Discovery Server (`discovery-server/application.properties`)
```properties
server.port=8761
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false
spring.application.name=discovery-server
```

#### API Gateway (`api-gateway/application.properties`)
```properties
server.port=8080
spring.application.name=api-gateway

eureka.client.service-url.defaultZone=http://localhost:8761/eureka/

# Route to Auth Service
spring.cloud.gateway.routes[0].id=auth-service
spring.cloud.gateway.routes[0].uri=lb://auth-service
spring.cloud.gateway.routes[0].predicates[0]=Path=/api/auth/**

# Route to Ticket Service
spring.cloud.gateway.routes[1].id=ticket-service
spring.cloud.gateway.routes[1].uri=lb://ticket-service
spring.cloud.gateway.routes[1].predicates[0]=Path=/api/tickets/**
```

#### Auth Service (`auth-service/application.properties`)
```properties
server.port=8081
spring.application.name=auth-service

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/support_system_live
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Eureka Configuration
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/

# JWT Configuration
jwt.secret=your_jwt_secret
```

#### Ticket Service (`ticket-service/application.properties`)
```properties
server.port=8082
spring.application.name=ticket-service

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/support_system_live
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Eureka Configuration
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
```

---

## 💻 Development

### Running in Development Mode

#### Using Maven
```bash
cd <service-directory>
mvn spring-boot:run
```

#### Using IDE (IntelliJ IDEA / Eclipse)
1. Import project as Maven project
2. Wait for dependencies to download
3. Run the main application class:
   - `DiscoveryServerApplication.java`
   - `ApiGatewayApplication.java`
   - `AuthServiceApplication.java`
   - `TicketServiceApplication.java`

### Hot Reload (Spring Boot DevTools)

Add to `pom.xml`:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>
```

### Building for Production

```bash
# Build all services
mvn clean package -DskipTests

# Build specific service
cd <service-directory>
mvn clean package
```

**Output**: Executable JAR in `target/` directory

### Running Tests

```bash
# Run all tests
mvn test

# Run tests with coverage
mvn test jacoco:report
```

---

## 🔧 Troubleshooting

### 1. Services Not Registering with Eureka

**Symptoms**:
- Services don't appear in Eureka dashboard
- API Gateway returns 503 Service Unavailable

**Solutions**:
```bash
# Check if Discovery Server is running
curl http://localhost:8761

# Verify Eureka URL in application.properties
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/

# Check service logs for registration errors
# Look for: "Registered with Eureka"

# Wait 30-60 seconds for registration to complete
```

---

### 2. Database Connection Errors

**Symptoms**:
- `Communications link failure`
- `Access denied for user 'root'@'localhost'`
- `Unknown database 'support_system_live'`

**Solutions**:
```bash
# Verify MySQL is running
# Windows
net start MySQL80

# Linux/Mac
sudo systemctl status mysql

# Test connection
mysql -u root -p

# Verify database exists
mysql -u root -p -e "SHOW DATABASES;"

# Create database if missing
mysql -u root -p -e "CREATE DATABASE support_system_live;"

# Check credentials in application.properties
spring.datasource.username=root
spring.datasource.password=root
```

---

### 3. Port Already in Use

**Symptoms**:
- `Port 8080 is already in use`
- `Address already in use`

**Solutions**:
```bash
# Windows - Find and kill process
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac - Find and kill process
lsof -i :8080
kill -9 <PID>

# Or change port in application.properties
server.port=8090
```

---

### 4. JWT Token Errors

**Symptoms**:
- `Invalid token`
- `Token expired`
- `Malformed JWT`

**Solutions**:
```bash
# Ensure JWT secret matches in both services
# auth-service/application.properties
jwt.secret=your_jwt_secret

# Verify token format in Authorization header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Token expires after 24 hours - login again to get new token

# Check for whitespace in token
# Ensure no extra spaces after "Bearer "
```

---

### 5. Maven Build Failures

**Symptoms**:
- `BUILD FAILURE`
- Dependency resolution errors
- Compilation errors

**Solutions**:
```bash
# Clean Maven cache
mvn clean

# Force update dependencies
mvn clean install -U

# Skip tests if they're failing
mvn clean install -DskipTests

# Check Java version
java -version  # Should be 17+

# Check Maven version
mvn -version  # Should be 3.6+

# Delete .m2 repository and rebuild
rm -rf ~/.m2/repository
mvn clean install
```

---

### 6. API Gateway Returns 404

**Symptoms**:
- All API calls return 404 Not Found
- Routes not working

**Solutions**:
```bash
# Verify services are registered in Eureka
# Check http://localhost:8761

# Verify route configuration in api-gateway/application.properties
spring.cloud.gateway.routes[0].predicates[0]=Path=/api/auth/**

# Check API Gateway logs for routing errors

# Test service directly (bypass gateway)
curl http://localhost:8081/api/auth/login
```

---

### 7. Hibernate DDL Errors

**Symptoms**:
- Table creation errors
- Column mismatch errors

**Solutions**:
```properties
# Change DDL strategy in application.properties

# For development (auto-create tables)
spring.jpa.hibernate.ddl-auto=update

# For production (don't modify schema)
spring.jpa.hibernate.ddl-auto=validate

# To see SQL queries
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

---

## 🚀 Future Enhancements

### Planned Features

- [ ] **Docker Support**: Containerize all services with docker-compose
- [ ] **Config Server**: Centralized configuration management
- [ ] **API Rate Limiting**: Prevent abuse and ensure fair usage
- [ ] **Distributed Tracing**: Sleuth + Zipkin for request tracing
- [ ] **Circuit Breaker**: Resilience4j for fault tolerance
- [ ] **Message Queue**: Kafka/RabbitMQ for async communication
- [ ] **Caching**: Redis for improved performance
- [ ] **Monitoring**: Prometheus + Grafana dashboards
- [ ] **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)
- [ ] **API Documentation**: Swagger/OpenAPI integration

### Feature Enhancements

- [ ] **Ticket Replies**: Comment/reply functionality
- [ ] **File Attachments**: Upload files with tickets
- [ ] **Email Notifications**: Automated email alerts
- [ ] **Admin Dashboard**: Web-based admin panel
- [ ] **Real-time Updates**: WebSocket support
- [ ] **Ticket Assignment**: Assign tickets to support agents
- [ ] **SLA Management**: Service level agreement tracking
- [ ] **Analytics**: Reporting and analytics dashboard
- [ ] **Multi-tenancy**: Support for multiple organizations
- [ ] **OAuth2 Integration**: Social login (Google, GitHub)

### Testing & Quality

- [ ] Unit tests with JUnit 5
- [ ] Integration tests
- [ ] API contract testing
- [ ] Load testing with JMeter
- [ ] Security scanning
- [ ] Code coverage reports

---

## 👥 Contributing

We welcome contributions! Please follow these guidelines:

### How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/ticket-services.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test Your Changes**
   ```bash
   mvn test
   ```

5. **Commit Your Changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Describe your changes
   - Reference any related issues
   - Wait for review

### Code Style Guidelines

- Follow Java naming conventions
- Use meaningful variable and method names
- Add JavaDoc comments for public methods
- Keep methods small and focused
- Write unit tests for new features

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Ticket Services

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Support & Contact

### Getting Help

- **Documentation**: Read this README thoroughly
- **Issues**: [Create an issue](https://github.com/your-repo/issues) for bugs or feature requests
- **Discussions**: [Join discussions](https://github.com/your-repo/discussions) for questions

### Useful Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Cloud Documentation](https://spring.io/projects/spring-cloud)
- [Netflix Eureka Guide](https://spring.io/guides/gs/service-registration-and-discovery/)
- [JWT Introduction](https://jwt.io/introduction)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

## 🙏 Acknowledgments

- **Spring Boot Team** - For the excellent framework
- **Netflix OSS** - For Eureka and cloud components
- **MySQL** - For the robust database system
- **JJWT** - For JWT implementation
- **Open Source Community** - For continuous inspiration

---

## 📊 Project Stats

- **Services**: 4 (Discovery, Gateway, Auth, Ticket)
- **Language**: Java 17
- **Framework**: Spring Boot 3.2.1
- **Database**: MySQL 8.0+
- **Architecture**: Microservices
- **Authentication**: JWT
- **Build Tool**: Maven

---

<div align="center">

**Built with ❤️ using Spring Boot Microservices**

⭐ **Star this repository if you found it helpful!** ⭐

</div>

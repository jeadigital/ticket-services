# Ticket Application - Microservices Architecture

A modern support ticket management system built with **Spring Boot Microservices** architecture and **React** frontend. This application enables users to create, manage, and track support tickets with a scalable, cloud-ready backend.

## 🏗️ Architecture Overview

This application follows a microservices architecture pattern with the following components:

```
┌─────────────────┐
│  React Client   │
│   (Port 5173)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   API Gateway   │
│   (Port 8080)   │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────────┐ ┌──────────────┐
│  Auth   │ │   Ticket     │
│ Service │ │   Service    │
│ (8081)  │ │   (8082)     │
└────┬────┘ └──────┬───────┘
     │             │
     └──────┬──────┘
            ▼
    ┌──────────────┐
    │    MySQL     │
    │   Database   │
    └──────────────┘
            ▲
            │
    ┌───────┴──────┐
    │    Eureka    │
    │   Discovery  │
    │   (8761)     │
    └──────────────┘
```

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## ✨ Features

### Backend (Microservices)
- **Service Discovery**: Netflix Eureka for dynamic service registration and discovery
- **API Gateway**: Centralized routing and load balancing
- **Authentication**: JWT-based secure authentication
- **User Management**: Registration and login with MD5 password hashing (legacy compatibility)
- **Ticket Management**: Create, view, and track support tickets
- **RESTful APIs**: Clean and well-documented REST endpoints
- **Database Integration**: MySQL with Spring Data JPA

### Frontend
- **Modern UI**: Built with React and Tailwind CSS
- **Responsive Design**: Mobile-friendly interface
- **Authentication Flow**: Secure login and registration
- **Dashboard**: User-specific ticket management
- **Real-time Updates**: Dynamic ticket status tracking

## 🛠️ Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.1**
- **Spring Cloud 2023.0.0**
  - Eureka Server (Service Discovery)
  - Spring Cloud Gateway (API Gateway)
- **Spring Data JPA** (ORM)
- **MySQL 8.0+** (Database)
- **JJWT 0.11.5** (JWT Authentication)
- **Maven** (Build Tool)

### Frontend
- **React 18**
- **Vite** (Build Tool)
- **Tailwind CSS** (Styling)
- **Axios** (HTTP Client)

## 📦 Prerequisites

Before running this application, ensure you have the following installed:

1. **Java Development Kit (JDK) 17 or higher**
   ```bash
   java -version
   ```

2. **Apache Maven 3.6+**
   ```bash
   mvn -version
   ```

3. **MySQL 8.0+**
   - Running on `localhost:3306`
   - Database: `support_system_live`
   - Username: `root`
   - Password: `root`

4. **Node.js 18+ and npm** (for frontend)
   ```bash
   node -version
   npm -version
   ```

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ticket-app
```

### 2. Database Setup
Create the MySQL database:
```sql
CREATE DATABASE support_system_live;
USE support_system_live;
```

The application will automatically create the required tables on first run using Hibernate DDL auto-update.

### 3. Build Microservices
Use the provided build script:
```bash
build_all.bat
```

Or build manually:
```bash
# Discovery Server
cd microservices/discovery-server
mvn clean package -DskipTests
cd ../..

# API Gateway
cd microservices/api-gateway
mvn clean package -DskipTests
cd ../..

# Auth Service
cd microservices/auth-service
mvn clean package -DskipTests
cd ../..

# Ticket Service
cd microservices/ticket-service
mvn clean package -DskipTests
cd ../..
```

### 4. Install Frontend Dependencies
```bash
cd client
npm install
cd ..
```

## 🏃 Running the Application

### Option 1: Using the Run Script (Recommended)
```bash
run_all.bat
```

This will start all services in separate terminal windows.

### Option 2: Manual Startup

**Start services in the following order:**

1. **Discovery Server** (wait 30 seconds)
   ```bash
   java -jar microservices/discovery-server/target/discovery-server-0.0.1-SNAPSHOT.jar
   ```

2. **API Gateway** (wait 15 seconds)
   ```bash
   java -jar microservices/api-gateway/target/api-gateway-0.0.1-SNAPSHOT.jar
   ```

3. **Auth Service & Ticket Service** (can start simultaneously)
   ```bash
   java -jar microservices/auth-service/target/auth-service-0.0.1-SNAPSHOT.jar
   java -jar microservices/ticket-service/target/ticket-service-0.0.1-SNAPSHOT.jar
   ```

4. **Frontend**
   ```bash
   cd client
   npm run dev
   ```

### Verify Services

- **Eureka Dashboard**: [http://localhost:8761](http://localhost:8761)
- **API Gateway**: [http://localhost:8080](http://localhost:8080)
- **Frontend**: [http://localhost:5173](http://localhost:5173)

You should see `AUTH-SERVICE`, `TICKET-SERVICE`, and `API-GATEWAY` registered in Eureka.

## 📚 API Documentation

### Base URL
```
http://localhost:8080
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "userType": "U",
    "status": "A"
  }
}
```

### Ticket Endpoints

#### Create Ticket
```http
POST /api/tickets
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "title": "Login Issue",
  "ticketBody": "Cannot login to my account",
  "priority": "H",
  "catId": 1
}
```

**Response:**
```json
{
  "message": "Ticket created successfully",
  "ticketId": 1,
  "trackId": "T1-1234-A5B6"
}
```

#### Get All Tickets
```http
GET /api/tickets?status=active
Authorization: Bearer <your_token>
```

**Query Parameters:**
- `status`: `active` (default) or `closed`

**Response:**
```json
[
  {
    "id": 1,
    "ticketTrackId": "T1-1234-A5B6",
    "title": "Login Issue",
    "ticketBody": "Cannot login to my account",
    "status": "N",
    "priority": "H",
    "openedTime": "2026-01-12T11:00:00",
    "lastReplyTime": "2026-01-12T11:00:00"
  }
]
```

#### Get Ticket by ID
```http
GET /api/tickets/{id}
Authorization: Bearer <your_token>
```

**Response:**
```json
{
  "id": 1,
  "ticketTrackId": "T1-1234-A5B6",
  "title": "Login Issue",
  "ticketBody": "Cannot login to my account",
  "status": "N",
  "priority": "H",
  "ticketUser": 1,
  "openedTime": "2026-01-12T11:00:00",
  "lastReplyTime": "2026-01-12T11:00:00"
}
```

### Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## 📁 Project Structure

```
ticket-app/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── pages/                   # Page components
│   │   ├── App.jsx                  # Main app component
│   │   └── index.css                # Global styles
│   ├── index.html
│   └── package.json
│
├── server/                          # Legacy Node.js (for reference)
│   └── src/
│
├── microservices/                   # Spring Boot Microservices
│   ├── discovery-server/            # Eureka Server
│   │   ├── src/main/java/com/ticket/discovery/
│   │   │   └── DiscoveryServerApplication.java
│   │   ├── src/main/resources/
│   │   │   └── application.properties
│   │   └── pom.xml
│   │
│   ├── api-gateway/                 # Spring Cloud Gateway
│   │   ├── src/main/java/com/ticket/gateway/
│   │   │   └── ApiGatewayApplication.java
│   │   ├── src/main/resources/
│   │   │   └── application.properties
│   │   └── pom.xml
│   │
│   ├── auth-service/                # Authentication Service
│   │   ├── src/main/java/com/ticket/auth/
│   │   │   ├── config/              # Security configuration
│   │   │   ├── controller/          # REST controllers
│   │   │   ├── model/               # JPA entities
│   │   │   ├── repository/          # Data repositories
│   │   │   ├── service/             # Business logic
│   │   │   ├── util/                # JWT utilities
│   │   │   └── AuthServiceApplication.java
│   │   ├── src/main/resources/
│   │   │   └── application.properties
│   │   └── pom.xml
│   │
│   └── ticket-service/              # Ticket Management Service
│       ├── src/main/java/com/ticket/service/
│       │   ├── controller/          # REST controllers
│       │   ├── model/               # JPA entities
│       │   ├── repository/          # Data repositories
│       │   ├── service/             # Business logic
│       │   ├── util/                # JWT utilities
│       │   └── TicketServiceApplication.java
│       ├── src/main/resources/
│       │   └── application.properties
│       └── pom.xml
│
├── build_all.bat                    # Build script
├── run_all.bat                      # Run script
└── README.md                        # This file
```

## ⚙️ Configuration

### Service Ports

| Service | Port | Description |
|---------|------|-------------|
| Discovery Server | 8761 | Eureka service registry |
| API Gateway | 8080 | Entry point for all API requests |
| Auth Service | 8081 | User authentication |
| Ticket Service | 8082 | Ticket management |
| Frontend | 5173 | React development server |

### Database Configuration

Update database credentials in:
- `microservices/auth-service/src/main/resources/application.properties`
- `microservices/ticket-service/src/main/resources/application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/support_system_live
spring.datasource.username=root
spring.datasource.password=root
```

### JWT Secret

Update JWT secret in:
- `microservices/auth-service/src/main/resources/application.properties`

```properties
jwt.secret=your_jwt_secret_key_here
```

**Note:** For production, use a strong, randomly generated secret key.

## 💻 Development

### Running in Development Mode

1. **Backend**: Each service can be run individually using your IDE or:
   ```bash
   cd microservices/<service-name>
   mvn spring-boot:run
   ```

2. **Frontend**:
   ```bash
   cd client
   npm run dev
   ```

### Building for Production

```bash
# Backend
mvn clean package

# Frontend
cd client
npm run build
```

## 🔧 Troubleshooting

### Services Not Registering with Eureka

**Issue**: Services don't appear in Eureka dashboard.

**Solution**:
- Ensure Discovery Server is running first
- Wait 30-60 seconds for registration
- Check service logs for connection errors
- Verify `eureka.client.service-url.defaultZone` is correct

### Database Connection Errors

**Issue**: `Communications link failure` or connection refused.

**Solution**:
- Verify MySQL is running: `mysql -u root -p`
- Check database exists: `SHOW DATABASES;`
- Verify credentials in `application.properties`
- Ensure port 3306 is not blocked

### Port Already in Use

**Issue**: `Port 8080 is already in use`.

**Solution**:
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :8080
kill -9 <PID>
```

### Maven Not Found

**Issue**: `mvn: command not found`.

**Solution**:
- Install Maven from [maven.apache.org](https://maven.apache.org/)
- Add Maven to system PATH
- Verify: `mvn -version`

### JWT Token Errors

**Issue**: `Invalid token` or `Token expired`.

**Solution**:
- Ensure JWT secret matches in both auth-service and ticket-service
- Token expires after 24 hours - login again
- Check Authorization header format: `Bearer <token>`

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For issues and questions:
- Create an issue in the repository
- Contact the development team

---

**Built with ❤️ using Spring Boot and React**

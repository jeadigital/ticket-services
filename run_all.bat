@echo off
start "Discovery Server" java -jar microservices/discovery-server/target/discovery-server-0.0.1-SNAPSHOT.jar
timeout /t 15

start "API Gateway" java -jar microservices/api-gateway/target/api-gateway-0.0.1-SNAPSHOT.jar
timeout /t 10

start "Auth Service" java -jar microservices/auth-service/target/auth-service-0.0.1-SNAPSHOT.jar
start "Ticket Service" java -jar microservices/ticket-service/target/ticket-service-0.0.1-SNAPSHOT.jar

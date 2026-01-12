@echo off
echo Building Discovery Service...
cd microservices/discovery-server
call mvn clean package -DskipTests
cd ../..

echo Building API Gateway...
cd microservices/api-gateway
call mvn clean package -DskipTests
cd ../..

echo Building Auth Service...
cd microservices/auth-service
call mvn clean package -DskipTests
cd ../..

echo Building Ticket Service...
cd microservices/ticket-service
call mvn clean package -DskipTests
cd ../..

echo Build Complete.

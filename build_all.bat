@echo off
echo Building Discovery Service...
cd discovery-server
call mvn clean package -DskipTests
cd ..

echo Building API Gateway...
cd api-gateway
call mvn clean package -DskipTests
cd ..

echo Building Auth Service...
cd auth-service
call mvn clean package -DskipTests
cd ..

echo Building Ticket Service...
cd ticket-service
call mvn clean package -DskipTests
cd ..

echo Build Complete.

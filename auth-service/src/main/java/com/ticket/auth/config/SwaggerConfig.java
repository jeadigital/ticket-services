package com.ticket.auth.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI authServiceAPI() {
        Server server = new Server();
        server.setUrl("http://localhost:8081");
        server.setDescription("Auth Service - Development");

        Contact contact = new Contact();
        contact.setName("Ticket Services Team");
        contact.setEmail("support@ticketservices.com");

        License mitLicense = new License()
                .name("MIT License")
                .url("https://opensource.org/licenses/MIT");

        Info info = new Info()
                .title("Auth Service API")
                .version("1.0.0")
                .contact(contact)
                .description("Authentication and Authorization API for Ticket Management System. " +
                        "Provides user registration, login, and JWT token generation.")
                .license(mitLicense);

        return new OpenAPI()
                .info(info)
                .servers(List.of(server));
    }
}

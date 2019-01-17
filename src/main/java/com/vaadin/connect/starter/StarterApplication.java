package com.vaadin.connect.starter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.vaadin.connect.oauth.EnableVaadinConnectOAuthServer;
import com.vaadin.frontend.server.EnableVaadinFrontendServer;

/**
 * Spring boot starter class.
 */
@SpringBootApplication
@EnableVaadinConnectOAuthServer
@EnableVaadinFrontendServer
public class StarterApplication {

    /**
     * Main method to run the application.
     *
     * @param args arguments
     */
    public static void main(String[] args) {
        SpringApplication.run(StarterApplication.class, args);
    }
}

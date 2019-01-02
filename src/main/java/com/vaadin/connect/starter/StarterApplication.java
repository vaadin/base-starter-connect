package com.vaadin.connect.starter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.vaadin.connect.oauth.EnableVaadinConnectOAuthServer;

/**
 * Spring boot starter class.
 */
@SpringBootApplication
@EnableVaadinConnectOAuthServer
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

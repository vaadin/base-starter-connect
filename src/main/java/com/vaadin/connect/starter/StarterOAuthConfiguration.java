/*
 * Copyright 2000-2018 Vaadin Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.vaadin.connect.starter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * The Spring Boot configuration for authentication part of the Vaadin Connect based application.
 * Specifies the way user details should be fetched when authentication takes place.
 */
@Configuration
public class StarterOAuthConfiguration {
    private static final String TEST_LOGIN = "test_login";
    private static final String TEST_PASSWORD = "test_password";

    private final PasswordEncoder encoder;

    public StarterOAuthConfiguration(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    private UserDetails createTestUserDetails() {
        return User.builder()
                .username(TEST_LOGIN)
                .password(encoder.encode(TEST_PASSWORD))
                .roles("USER")
                .build();
    }

    /**
     * Defines a service for looking up the account data using the repository specified.
     * <p>
     * Currently provides a single hardcoded test user account, should be replaced with proper
     * approach before pushing the app into the production.
     *
     * @return the service for searching for the account data
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            if (TEST_LOGIN.equals(username)) {
                return createTestUserDetails();
            }
            throw new UsernameNotFoundException(username);
        };
    }
}

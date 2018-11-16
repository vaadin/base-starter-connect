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

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.vaadin.connect.starter.account.Account;
import com.vaadin.connect.starter.account.AccountRepository;

/**
 * The Spring Boot configuration for authentication part of the Vaadin Connect based application.
 * Specifies the way user details should be fetched when authentication takes place.
 */
@Configuration
public class StarterOAuthConfiguration {
    private static final String TEST_LOGIN = "test_login";
    private static final String TEST_PASSWORD = "test_password";

    /**
     * Defines a service for looking up the account data using the repository specified.
     *
     * @param accountRepository the repository to look for accounts
     * @return the service for searching for the account data
     */
    @Bean
    public UserDetailsService userDetailsService(AccountRepository accountRepository) {
        return username -> accountRepository.findByUsername(username)
                .map(account -> User.builder().username(account.getUsername())
                        .password(account.getPassword()).roles("USER").build())
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

    /**
     * Prefills the account repository with test account data for testing purposes.
     * Should be removed when a real application is developed.
     *
     * @param accountRepository the repository to store the data into
     * @param encoder           the encoder to use for
     * @return a generic runner interface
     */
    @Bean
    public CommandLineRunner init(
            AccountRepository accountRepository,
            PasswordEncoder encoder) {
        return args -> accountRepository
                .save(new Account(TEST_LOGIN, encoder.encode(TEST_PASSWORD)));
    }
}

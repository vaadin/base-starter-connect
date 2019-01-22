package com.vaadin.connect.starter;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Sample unit test file.
 * Add more when developing your own project.
 */
class StatusServiceTests {

    @Test
    @DisplayName("update method should contain the status it receives")
    void update() {
        String testStatus = "Test Status";

        assertTrue(new StatusService().update(testStatus).contains(testStatus));
    }
}

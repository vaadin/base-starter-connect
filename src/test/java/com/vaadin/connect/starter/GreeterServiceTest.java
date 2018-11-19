package com.vaadin.connect.starter;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Sample unit test file.
 * Add more when developing your own project.
 */
class GreeterServiceTests {

    @Test
    @DisplayName("greet method should contain the name it receives")
    void greet() {
        String testName = "Test Name";

        assertTrue(new GreeterService().greet(testName).contains(testName));
    }
}

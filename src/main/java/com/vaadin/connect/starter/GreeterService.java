package com.vaadin.connect.starter;

import com.vaadin.connect.VaadinService;

/**
 * Simple Vaadin Connect Service definition.
 * Any {@code public} method of the class can be called via the corresponding POST request.
 * <p>
 * For the current class and method, the requests should be addressed to
 * {@literal http://localhost:8080/connect/greeterservice/greet} endpoint
 * where
 * <ul>
 * <li><b>http://localhost:8080</b> is the application base url</li>
 * <li><b>connect</b>  is the Vaadin Connect endpoint, refer to {@literal application.properties} to know how to override it</li>
 * <li><b>greeterservice</b> is the current service class name, case insensitive</li>
 * <li><b>greet</b> is the corresponding method name of the service class, case insensitive</li>
 * </ul>
 * <p>
 * <p>
 * The request body should contain a json with the parameter values for the method to be called.
 * Note that in order to successfully execute the requests, an OAuth token should be passed in each of the requests by detault.
 * <p>
 * <p>
 * Refer to {@literal README.md} for more instructions on how to acquire the token and to
 * the Vaadin Connect documentation on more complete guide how to configure the application.
 */
@VaadinService
public class GreeterService {
    /**
     * Service method that can be called via the corresponding POST request.
     * Refer to the class javadoc for details.
     *
     * @param name a parameter that should be sent as a part of the json request body
     * @return a generic greeting string that will be sent back as part of the json response body
     */
    public String greet(String name) {
        return String.format("Hello, %s!", name);
    }
}

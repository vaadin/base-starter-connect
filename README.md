# Vaadin Connect starter

This is the Vaadin Connect starter that can be used to simplify the new Vaadin Connect based project creation.
 
The project contains the required dependencies and basic set up that you can experiment with to create your own application.
To access it directly from github, clone the repository and import the project to the IDE of your choice as a Maven project. You need to have Java 8 or newer installed.

Run using `./mvnw spring-boot:run` in the root of the project if you don't have Maven installed or `mvn spring-boot:run` if you do.
To run unit tests, use `./mvnw test` or `mvn test` respectively.

Currently the project is still in a work in progress state, so a `curl` commands need to be used in order to get a GreeterService response.

First, an access token should be acquired:
`curl http://localhost:8080/oauth/token -u vaadin-connect-client:c13nts3cr3t -d password=test_password -d username=test_login -d grant_type=password`
Where 
* `http://localhost:8080/oauth/token` is the application OAuth endpoint
* `vaadin-connect-client` and `c13nts3cr3t` are the application client name and secret defaults, refer to the project's `application.properties` in order to override them  
* `password` and `username` are the user credentials set in `StarterOAuthConfiguration` configuration

If everything is done correct, the response with `200` code and `access_token` value in the response body is returned, example:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDI0MjA5NDksInVzZXJfbmFtZSI6InRlc3RfbG9naW4iLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiM2E4YTNmZDMtMTgwZS00YjBkLWJmOTktMDNkODAwNDg2OWJmIiwiY2xpZW50X2lkIjoidmFhZGluLWNvbm5lY3QtY2xpZW50Iiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.4EFBcNXSxOLIuX7LpnVPvZ3xiDiekQXJAr-_KBmg-kc",
  "token_type": "bearer",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ0ZXN0X2xvZ2luIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImF0aSI6IjNhOGEzZmQzLTE4MGUtNGIwZC1iZjk5LTAzZDgwMDQ4NjliZiIsImV4cCI6MTU0NDk2OTc0OSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjNlZjI5ZjU1LTFlODktNDQ4Yi04YjQyLWMzMmZiYTk0N2Q2ZiIsImNsaWVudF9pZCI6InZhYWRpbi1jb25uZWN0LWNsaWVudCJ9.sGJvVZNnRA0oBuvRLK-xvx86J4yXsXBXmjLPHt-0LQc",
  "expires_in": 43199,
  "scope": "read write",
  "jti": "3a8a3fd3-180e-4b0d-bf99-03d8004869bf"
}
```

 
Use the token value in the next requests to be able to call Vaadin Connect services:
`curl -H "Content-Type: application/json" -H "Authorization: Bearer ${access_token}" -d '{"name":"User"}' http://localhost:8080/connect/greeterservice/greet`
Where 
* `${access_token}` is the token acquired from the previous request 
* `connect` is the service endpoint, refer to the project's `application.properties` in order to override it
* `greeterservice` and `greet` are the service name and method name of the corresponding service to call
* `{"name":"User"}` is the json body of the request with the method parameter values

If everything is done correct, the response with `200` code and a greeting is returned:
`"Hello, User!"`

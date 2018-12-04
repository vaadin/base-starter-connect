# Vaadin Connect starter

This is the Vaadin Connect starter that can be used to simplify the new Vaadin Connect based project creation.

The project contains the required dependencies and basic set up that you can experiment with to create your own application.

To access it directly from GitHub, clone the repository and import the project to the IDE of your choice as a Maven project.

## Prerequisites

You need to have Java 8 or newer and Node 8 or newer installed.

## Running

First, install the required frontend dependencies by running `npm install` (or `yarn install`, it is supported also).
Run using `npm start` in the root of the project to launch both backend and frontend parts of the app.
Then navigate to `http://localhost:8081` to see the UI, the backend part starts at `http://localhost:8080`.

You can launch both backend and frontend separately, use `npm run start:backend` or `npm run start:frontend` correspondingly.
Backend part can be also started as any Java application, via Maven: `./mvnw spring-boot:run` in the root of the project if you don't have Maven installed or `mvn spring-boot:run` if you do.

## Unit Tests

They test individual modules of the application.

To run a backend unit tests, use `./mvnw test` or `mvn test` respectively.

## Integration Tests

They test all the modules of the application as a group by interacting with the UI. They are slow since previously to run the tests all the layers of the application need to be running.

We provide an integration test placed in the `e2e` folder that you can run by executing `npm test`. The script starts the backend java server, a node frontend server, and finally it runs [`intern`](https://theintern.io/) a JavaScript testing system able to open the application in a browser, interact with it, and report assertions.

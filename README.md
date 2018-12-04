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

To run backend unit tests, use `./mvnw test` or `mvn test`.

To run frontend unit tests, use `npm run test:unit`.

Note that it is important to make the logic of every unit tested on its own,
without involving other dependencies in unit testing, such as the backend,
browser APIs, and so on. To follow that principle, the frontend unit tests
are running in a Node.js environment, and are using stubs instead of the actual
Vaadin Connect client methods. The frontend tests command does start neither
the backend nor the frontend application servers.

Normally, a frontend application framework provides abstractions over
the browser APIs, and defines conventions on how to structure the application
to isolate the logic in separately testable units. However, this project aims
to be agnostic to particular frontend frameworks. Instead, the view wrapper
classes are used to keep the frontend logic in the controllers free of using
the browser APIs.

## Integration Tests

We provide an integration test placed in the `e2e` folder that you can run by executing `npm test`, or
if you prefer the Java way, execute `./mvnw verify` or `mvn verify` if you already have maven installed.

The script starts the backend Java server, the Node.js frontend server, and finally it runs [`intern`](https://theintern.io/) a JavaScript testing system able to open the application in a browser and interact with it.
The test uses [Leadfoot](https://theintern.io/leadfoot/index.html) for driving actions in the browser,
and [Chai](https://www.chaijs.com/) for making the assertions.

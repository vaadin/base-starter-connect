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

Both backend and frontend servers listen to changes in order to live reload modifications to the project.
For the frontend, change files under the `frontend` folder and reload the browser.
For the backend, change any Java file under `src/main/java` folder and save the changes — Java files will be recompiled, Vaadin Connect resources regenerated and the
Spring Boot server will be restarted.

On a backend side the changes are applied via the `fizzed-watcher-maven-plugin` that is automatically started via `npm start` or `npm run start:backend`.
If you start the project via Maven, run  `./mvnw fizzed-watcher:run` (or `mvn fizzed-watcher:run`) to start the watcher.

## OpenApi browser

The project has the support for displaying the project's OpenApi spec via the browser task: run `npm run start:apibrowser`
and open `http://localhost:8082` to check out the Vaadin Connect api available.

## Unit tests

To run backend unit tests, use `./mvnw test` or `mvn test`.

To run frontend unit tests, use `npm run test:unit`.

To run selected frontend unit suites or tests, use the `grep` RegExp argument:

```shell
$ npm run test:unit -- grep="greet with a name"
```

To attach a Node debugger on the test runner, use:

```shell
$ NODE_DEBUG_OPTION=--inspect-brk npm run test:unit
```

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

## Integration tests

We provide an integration test placed in the `e2e` folder that you can run by executing `npm test`, or
if you prefer the Java way, execute `./mvnw verify` or `mvn verify` if you already have Maven installed.

The script starts the backend Java server, the Node.js frontend server, and finally it runs [`intern`](https://theintern.io/) a JavaScript testing system able to open the application in a browser and interact with it.
The test uses [Leadfoot](https://theintern.io/leadfoot/index.html) for driving actions in the browser,
and [Chai](https://www.chaijs.com/) for making the assertions.
To run selected end-to-end unit suites or tests, use the `grep` RegExp argument:

```shell
$ npm run test -- grep="show the greeting"
```

To use Chrome DevTools when debugging end-to-end tests, follow these steps:

1. Run `$ npm start` to start the application servers.

2. Launch Chrome with `--remote-debugging-port=9222` argument. See the
[running Chromium with flags](http://www.chromium.org/developers/how-tos/run-chromium-with-flags)
guide for more information.

3. Open [`http://localhost:8081`](http://localhost:8081) in the Chrome.

4. Open Chrome DevTools, navigate to Sources and set desired breakpoints.

5. Use the following command to run the end-to-end tests against the Chrome
instance:

```shell
$ npm run test:e2e -- -- config=@debug-chrome
```

## Packaging the application for production

You can generate the final artefact by runing either `./mvnw package`, `mvn package` or `npm run build`.

In the target folder you will get a `.jar` file with everything set to run the application by typing
`java -jar target/base-starter-connect-0.0.1-SNAPSHOT.jar`, then you can use the application from any
supported browser navigating to the url `http://localhost:8080/`

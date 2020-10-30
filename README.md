# This project has been archived

Vaadin Connect is being integrated into [Vaadin Flow](https://github.com/vaadin/flow). You can build a project with [Vaadin Starter](https://vaadin.com/start).

# Vaadin Connect starter

This is the Vaadin Connect starter that can be used to simplify the new Vaadin Connect based project creation.

The project contains the required dependencies and basic set up that you can experiment with to create your own application.

To access it directly from GitHub, clone the repository and import the project to the IDE of your choice as a Maven project.

## Prerequisites

You need to have Java 8 or newer and Node 8 or newer installed.

## Running

First, install the required frontend dependencies by running `npm install` (or `yarn install` is supported also).

To run the app in dev mode just type `npm start`. Then navigate to `http://localhost:8080` to see the UI.

If you prefer to start each process separatly, you need to run `npm run start:webpack` which watches and transpiles
any change in the frontend code, and then `./mvnw spring-boot:run` or `mvn spring-boot:run` in a different terminal 
to start the backend server. In order to automatically recompile and run the generator on any backend change, you need 
to run `./mvnw fizzed-watcher:run` (or `mvn fizzed-watcher:run`) to start the watcher.

### Live reload support

For the frontend code, webpack will watch any change under the `frontend` folder and transpile it.

For the backend part, when a Java file under `src/main/java` is changed, it is recompiled by the backend watcher as well the resources generator is run.

When a change in frontend or backend happens, you will need to reload the browser.
Though optionally, you might want to install the [live-reload extension](http://livereload.com/extensions/) that automatically
reloads your browser on any change.

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

To attach a Node debugger on the test runner, run the following command:

```shell
$ NODE_DEBUG_OPTION=--inspect-brk npm run test:unit
```

Then open Chrome and navigate to the [chrome://inspect](chrome://inspect) URL
and click on the inspect link for the `intern` process.

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

By default, the end-to-end test runner starts the Chrome browser automatically.
Optionally, you can also run the end-to-end tests against an existing Chrome
instance to be able to use DevTools for debugging end-to-end tests. Follow
these steps:

1. In a terminal, run `$ npm start` to start the application servers.

2. Launch Chrome with `--remote-debugging-port=9222` argument.

    ```shell
    # Mac OS
    $ open -a "Google Chrome" http://localhost:8080 --args --remote-debugging-port=9222

    # Linux
    $ google-chrome --remote-debugging-port=9222 http://localhost:8080

    # Windows
    $ chrome.exe --remote-debugging-port=9222 http://localhost:8080
    ```

    NOTE: See also the [running Chromium with flags](http://www.chromium.org/developers/how-tos/run-chromium-with-flags)
    guide to adjust the command for your system.

3. In the Chrome, open DevTools, navigate to Sources, and set breakpoints.

4. Use the following command to run the end-to-end tests against the Chrome
instance:

    ```shell
    $ npm run test:e2e -- -- config=@debug-chrome
    ```

## Packaging the application for production

You can generate the final artefact by runing either `./mvnw package`, `mvn package` or `npm run build`.

In the target folder you will get a `.jar` file with everything set to run the application by typing
`java -jar target/base-starter-connect-0.0.1-SNAPSHOT.jar`, then you can use the application from any
supported browser navigating to the url `http://localhost:8080/`

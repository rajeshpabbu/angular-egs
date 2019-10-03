## Unit Testing - Setup

## Setup and Running:

When we create project with Angular CLI, Angular takes care `Jasmine` and `Karma` setup and its ready to run.
The `ng test` command builds the app in `watch mode`, and launches the Karma test runner.
A chrome browser also opens and displays the test output.

## What is `Jasmine`?

Jasmine is a behavior driven development framework for JavaScript that has become the most popular choice for testing Angular applications. Jasmine provides functions to help with structuring your tests and also making assertions.

- describe()
- beforeEach()
- it()
- expect()
- Matchers
  - toBe()
  - toContain ()

## What is `Karma`?

Karma is a JavaScript test runner created by the Angular team. `Karma` is essentially a tool which spawns a web server that executes source code against test code for each of the browsers connected. The results of each test against each browser are examined and displayed via the command line to the developer such that they can see which browsers and tests passed or failed.

## Test file name and location

The CLI generates a test file for every Component names name.component.spec.ts.

## Set up continuous integration

If we can setup continuous integration (CI). It runs test cases on every commit and pull request.
( Jenkins or Any other)

## Configure CLI for CI testing in Chrome

In the Karma configuration file, karma.conf.js, add a custom launcher called ChromeHeadlessCI below browsers:

```JS
browsers: ['Chrome'],
customLaunchers: {
  ChromeHeadlessCI: {
    base: 'ChromeHeadless',
    flags: ['--no-sandbox']
  }
},
```

Run this command to open headless chrome

```JS
ng test -- --no-watch --no-progress --disable-gpu --browsers=ChromeHeadlessCI
```

## Enable code coverage reports

To generate a coverage report run the following command in the root of the project.

```JS
ng test --no-watch --code-coverage
```

If you want to create code-coverage reports every time you test, you can set the following option in the CLI configuration file, angular.json:

```JSON
test: {
    options: {
        codeCoverage: true
    }
}
```

## Code coverage enforcement

We can enforce this minimum amount of code coverage with the Angular CLI by setting up the below in karma.conf.js, add the following `coverageIstanbulReporter`:

```JSON
coverageIstanbulReporter: {
  reports: [ 'html', 'lcovonly' ],
  fixWebpackSourcePaths: true,
  thresholds: {
    statements: 80,
    lines: 80,
    branches: 80,
    functions: 80
  }
}
```

80 is the minimum percentage to be covered with test cases.

## Three Types of Tests

1. Isolated Tests: Focusing only on the component class. It doesn’t render template or any child component.
   As it doesn’t involve any DOM. We may not need Testbed, we can create instance of class and test.
   Example: Any single method and its own logic.
2. Shallow Testing: Only the component with associated template actions, but not the child component template.
   Example: Component user interactions like Click event (not with child component events)
3. Integration Testing: A complete component testing. Which renders all the dependences and child components.
   Example: Any child events and associated function component classes.

Please check the file af-bento-combobox.component.spec.ts for implementation all above 3 types.

Reference: https://vsavkin.com/three-ways-to-test-angular-2-components-dcea8e90bd8d

## To increase tests execution time

- **Ng-bullet:** It’s a patch to angular’ s TestBed. which allows us to preserve our compilation results(templates) and re-use them for multiple tests per suite.<br>
  **Installation:** npm install ng-bullet or yarn add ng-bullet. <br>
  **Reference link:** https://www.npmjs.com/package/ng-bullet <br>
  **How it works?** \_\_instantiated is a flag from TesBed. It cleans up all your overrides, modules, module factories and disposes all active fixtures as well. By setting it false it keeps the compiled factories, and just re-create components and services without re-compilation.<br>
  **Reference:** https://blog.angularindepth.com/angular-unit-testing-performance-34363b7345ba (takes 15-30mins)

- **karma-parallel:** It’s a plugin for karma runner, which allows us to run our tests in parallel.
  **Installation:** npm i karma-parallel or yarn add karma-parallel
  **Reference link:** https://www.npmjs.com/package/karma-parallel
  **How it works?** It creates multiple instances of a browser from a single karma server. Each browser downloads all the spec files, but when a describe block is encountered, the browsers deterministically decide if that block should run in the given browser. This leads to a way to split up unit tests across multiple browsers without changing any build processes.

## References

Below URL covers testing for most of the building blocks like `Services`/`Pipes`/`Observables`/`Http`/`Directive`/`Routes`/`EventEmitters`
<br>Please follow below reference.
<br>**Reference:** https://medium.com/google-developer-experts/angular-2-testing-guide-a485b6cb1ef0 (takes approx. 20min for each)

## Write Unit Tests

A unit test is a test of a single `unit` of code and should test one thing. Confine your `it` blocks to a single assertion.
Don't `expect` more than one.

## Any Unit Test is treated as GOOD when it is...

- Fast (Test should run fast otherwise it fail the purpose of writing tests if it take longer to execute)
- Cheap to write (First Test takes time to write but after that it follow chain implementation and fairly quick)
- Single State Change (Good test should test single state change)
- Assert 1 thing (means Assert test 1 item at a time)
- Doesn't Cross Process Boundaries (Means should not make actual call of database or http server)
- Reliable (Should not fail by making any external change and always give result as Pass or Fail)

Example:

**Not Recommended:**

```javascript
describe("Array.prototype", function() {
  describe(".push(x)", function() {
    it("appends x to the end of the Array and returns it", function() {
      var initialArray = [1];
      expect(initialArray.push(2)).toBe(2);
      expect(initialArray).toEqual([1, 2]);
    });
  });
});
```

**Recommended:**

```javascript
describe("Array.prototype", function() {
  describe(".push(x)", function() {
    it("appends x to the end of the Array", function() {
      var initialArray = [1];
      initialArray.push(2);
      expect(initialArray).toEqual([1, 2]);
    });

    it("returns x", function() {
      var initialArray = [1];
      expect(initialArray.push(2)).toBe(2);
    });
  });
});
```

## Arrange-Act-Assert (AAA Structure)

Organize your code in a way that clearly conveys the 3 A's of each unit test. One way to accomplish this is by Arranging and Acting in before blocks and Asserting in it ones.

- The AAA unit test pattern is well known and recommended.
- Improves unit test modularity.

```javascript
describe("Array.prototype", function() {
  describe(".push(x)", function() {
    var initialArray;

    beforeEach(function() {
      initialArray = [1]; // Arrange

      initialArray.push(2); // Act
    });

    it("appends x to the end of the Array", function() {
      expect(initialArray).toEqual([1, 2]); // Assert
    });
  });
});
```

## DRY and DAMP principles when developing and unit testing

`DRY (Don't Repeat Yourself)` is more subitable in Development to avoid same code redundancy but in the case of TEST `DAMP (Descriptive and Meaningful Phrases)` is more meaningful where you can have some Duplication to tells the story.

`DRY` in Test can be considered where you have common code like class instantiation or destory which can be used with beforeEach() and afterEach().

DRY Example:

```JS
describe("Car", function() {
    beforeEach(function() {
        this.car = new Dog("Tesla");
    });

    it("has a name", function() {
        expect(this.dog.name).toBe("Tesla");
    });

    it("Color", function() {
        expect(this.car.color()).toBe("Black");
    });

    afterEach(function() {
        this.car.destroy();
    });
});
```

However `Readability is more important than avoiding redundant code` therefore `DAMP (Descriptive and Meaningful Phrases)` are more useful in Test Code (Unit test).

DAMP Example:

```JS
describe('add friend', () => {
  beforeEach(function() {
        this.user = new User("Jeo");
  });

  it('add first friend', function() {
      this.user.addFriend('Doe'); //This need to repeat to see different result
      expect(this.user.friends.length).toBe(1);
  });

  it('add more friend', function() {
      this.user.addFriend('Sally'); //This need to repeat to see different result
      expect(this.user.friends.length).toBeGreaterThan(1);
  });
})
```

## `this` Is How We Do It

Use `this` to share variables between it and before/after blocks.

- Declare and initialize variables on one line
- Jasmine automatically cleans the this object between specs to avoid state leak

```javascript
describe("Array.prototype", function() {
  describe(".push(x)", function() {
    beforeEach(function() {
      this.initialArray = [1];

      this.pushResult = this.initialArray.push(2);
    });

    it("appends x to the end of the Array", function() {
      expect(this.initialArray).toEqual([1, 2]);
    });

    it("returns x", function() {
      expect(this.pushResult).toBe(2);
    });
  });
});
```

## Avoid the Alls

Prefer beforeEach/afterEach blocks over beforeAll/afterAll ones. The latter are not reset between tests.

- Avoids accidental state leak.
- Enforces test independence.
- Order of All block execution relative to Each ones is not always obvious.

## Be `describe`tive

Nest describe blocks liberally to create functional subsets.

- Allows tests to build on each other from least to most specific.
- Creates tests that are easy to extend and/or refactor.
- Makes branch testing easier and less repetitive.
- Encapsulates tests based on their common denominator.

## Stubbing and Mocking

Mocking is a mechanism of replacing the dependecy with fake piece of code that does same process what actuall code do. <br> Jasmine provides useful helpers `spyOn`, `spyOnProperty`, `jasmine.createSpy`, and `jasmine.createSpyObject` to facilitate replacing methods with dummy placeholders, and recalling when they are called and the arguments that are passed to them. These tools should be used liberally, to test for expected behavior, to mock responses.
Refer <a href="https://jasmine.github.io/2.0/introduction.html#section-Spies"> Jasmine documentation</a> for more details.

## Waiting in tests

If you cannot avoid using `setTimeout` in tests, use the <a href="https://jasmine.github.io/api/2.9/Clock.html">Jasmine mock clock</a>

## Test file name and location:

The test file extension must be .spec.ts so that tooling can identify it as a file with tests.

## Handling Child Components

When the component uses child component we have two ways to make child component available. Angular injects actual child components or inject a stub for it, based on below pros and cons we can decide to choose the right way.

- Injecting actual child component:

  - It’s very easy to inject as Angular takes care. But this component again uses other components we need to inject that as well and so on until we resolve all dependencies.
  - For some low-level components this should be fine.
  - For some high-level components this takes much time and every time you save it checks.

- Creating stub component:
  - Just make the version of the component with the same CSS selector with empty html template.


      ```javascript
      @Component({selector: 'app-spinner', template: '' })
      export class SpinnerStubComponent { }
      ```

    * In this way we can minimize the Angular effort for html compilation.

    * If the original component has @Input and @Output, we can declare those in this as well.

    * This can be preferred when original component may have high compilation time and dependencies are high. Of course, when we don’t want test anything related to this (like bento).

    * This can be preferred for some small components like spinerComponents.

## Type of Unit Test

- Isolated Tests:

  - Test class only but not Template
  - Constructed in Test (In Isolated test we will call Class constructor directly to test)
  - Simple
  - Best for Services & Pipes
  - Appropriate for Components & Directives (if your intention to test only component but not the interaction with template usage)
    <br>Example to see **Isolated Tests**, please [<a href="src/app/af-bento-combobox/af-bento-combobox.component.spec.ts#L19">Refer the link</a>].

- Integrated Tests:
  - Test class & Template
  - Constructed by Framework
  - Complex because of template integration and Fix functionality in place (Bad because of more difficult to change code but Good more difficult to introduce Bugs)
  - Mainly used for Components & Directives
  - Sometime used for Services
  - Deep or Shallow (Deep test both parent and child component however Shallow test single component)
    <br>Example to see **Deep Tests**, [<a href="src/app/af-bento-combobox/af-bento-combobox.component.spec.ts#L76">Refer the link</a>].
    <br>Example to view **Shallow Tests**, [<a href="src/app/af-bento-combobox/af-bento-combobox.component.spec.ts#L40">Refer the link</a>].

## Useful References:

1. https://medium.com/@bencabanes/angular-component-testing-with-examples-7c52b2b7035e
2. https://www.anexinet.com/blog/angular-corner-pro-unit-testing/

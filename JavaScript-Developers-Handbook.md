#  The JavaScript Developer's Handbook

*A Practical Guide for Modern JavaScript Developers*

------------------------------------------------------------------------

#  Introduction

This handbook is written developer-to-developer.\
No academic jargon. Just practical knowledge you'll actually use when
building real applications.

You'll learn: - Modern ES6+ JavaScript - DOM manipulation - Event
handling - Asynchronous programming - Error handling best practices

------------------------------------------------------------------------

#  Part 1: The Core Engine (ES6+ Fundamentals)

## Scope & Declaration --- var vs let vs const

###  Bad Way

``` javascript
var count = 10;

if (true) {
  var count = 20;
}

console.log(count); // 20
```

###  Pro Way

``` javascript
const count = 10;

if (true) {
  const innerCount = 20;
}

console.log(count); // 10
```

### Why Default to `const`?

-   Prevents accidental reassignment\
-   Encourages immutability\
-   Makes code predictable

### Hoisting

JavaScript moves declarations to the top of their scope.

``` javascript
console.log(name);
var name = "Dev"; // undefined
```

With `let` and `const`, you get a ReferenceError instead.

------------------------------------------------------------------------

## Modern Functions

###  Traditional Function

``` javascript
function add(a, b) {
  return a + b;
}
```

###  Arrow Function

``` javascript
const add = (a, b) => a + b;
```

Arrow functions: - Allow implicit return\
- Do not have their own `this`

------------------------------------------------------------------------

## Array Mastery

### `.map()` --- Transform

``` javascript
const doubled = [1,2,3].map(n => n * 2);
```

### `.filter()` --- Select

``` javascript
const even = [1,2,3,4].filter(n => n % 2 === 0);
```

### `.reduce()` --- Combine

``` javascript
const total = [1,2,3].reduce((acc, curr) => acc + curr, 0);
```

Use these instead of `for` loops when transforming data.

------------------------------------------------------------------------

## Objects & Destructuring

###  Old Way

``` javascript
const user = { name: "Dev", age: 25 };
const name = user.name;
```

###  Destructuring

``` javascript
const { name, age } = user;
```

### Spread Operator

``` javascript
const updatedUser = { ...user, age: 26 };
```

------------------------------------------------------------------------

#  Part 2: DOM Manipulation & Storage

## Selecting Elements

``` javascript
const button = document.querySelector("#submitBtn");
```

## Modifying Content

``` javascript
button.textContent = "Clicked!";
button.style.backgroundColor = "blue";
```

------------------------------------------------------------------------

## Event Handling

``` javascript
button.addEventListener("click", () => {
  console.log("Button clicked");
});
```

------------------------------------------------------------------------

## Event Bubbling

Events move upward from child → parent → body.

### Event Delegation Example

``` javascript
parent.addEventListener("click", (e) => {
  if (e.target.matches(".child-item")) {
    console.log("Child clicked");
  }
});
```

------------------------------------------------------------------------

## Local Storage

### Save Data

``` javascript
localStorage.setItem("darkMode", JSON.stringify(true));
```

### Retrieve Data

``` javascript
const isDark = JSON.parse(localStorage.getItem("darkMode"));
```

LocalStorage only stores strings --- that's why we stringify and parse.

------------------------------------------------------------------------

#  Part 3: Asynchronous JavaScript

## The Event Loop

JavaScript is single-threaded.\
When it encounters slow tasks (like API calls), it delegates them and
continues execution.

------------------------------------------------------------------------

## Callback Hell

``` javascript
getUser(function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      console.log(comments);
    });
  });
});
```

Nested. Hard to maintain.

------------------------------------------------------------------------

## Promises

``` javascript
getUser()
  .then(user => getPosts(user.id))
  .catch(error => console.error(error));
```

------------------------------------------------------------------------

## Async/Await

``` javascript
async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response failed");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
}
```

------------------------------------------------------------------------

## Error Handling

Always use: - `try/catch` - `response.ok` check - Friendly UI error
messages

Never let your app fail silently.

------------------------------------------------------------------------

#  Conclusion

If you master: - ES6+ syntax\
- DOM manipulation\
- Event handling\
- Async programming\
- Error handling

You are ready to build real-world applications.

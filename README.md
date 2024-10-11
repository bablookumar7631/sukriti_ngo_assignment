## Section 2 (Practical Assignment)
first download code from my sukriti_ngo_assignment repositories

open the code in "Visual Studio Code" and goto terminal
1 - chnage directries through this command "cd server" and run this command in current directry "npm install"
    and now create file ".env" and paste this 
    PORT=8000
    MONGODB_URI='mongodb://127.0.0.1:27017/sukriti_ngo_assignment' 
in your .env file
Here have chnage your uri because i have online database. so, you can use your MONGODB_URI.
without mongodb uri database are not work so you can see only frontend and not the backend data.
and then after run this "npm run dev"

2- open new terminal and chnage directries through this command "cd client" and run this command in current directry "npm install" and after it run this command "npm run dev"
then you will get url like "http://localhost:5173/" and now copy it and paste in browser or (click ctrl + click)


## Section 1

Q1. What is the difference between controlled and uncontrolled components in React?

Ans1. Controlled components manage form data through React state. The component’s state dictates the input’s value, making it useful for validation and real-time updates.

Uncontrolled components let the DOM handle form data, using refs to access the input's value. This approach is simpler when you don’t need continuous control over the input, like when accessing values on form submission.

Controlled gives more control, while uncontrolled is simpler for basic use cases.


Q2. What is the significance of the functional Component in React? Explain hooks methods like use Effect, use State and use Ref hooks?

Ans2. Functional components in React are simple, lightweight functions that can now manage state and side effects using hooks.

useState: Manages local state in functional components. It returns the current state and a function to update it.
useEffect: Handles side effects like data fetching and subscriptions. It can run on every render or conditionally based on dependencies.
useRef: Provides a way to reference DOM elements or persist values across renders without causing re-renders.

Functional components, with hooks, are concise and powerful, making React development more efficient and modular.


Q3. What is Redux-toolkit and how does it work with React? What is prop drilling and how can you avoid it?

Ans3. Redux Toolkit (RTK) is an official, simplified way to use Redux, providing tools to streamline the setup and development process in state management for React apps. It reduces boilerplate and improves developer experience.

How it works with React:

TK provides functions like createSlice (to define state and reducers), configureStore (to create the store with middleware), and createAsyncThunk (for handling async logic). React components connect to Redux via hooks like useSelector (to access state) and useDispatch (to trigger actions).

Prop drilling occurs when you pass props down multiple levels of the component tree just to reach a deeply nested child component. This can make your code harder to manage and understand.

How to Avoid Prop Drilling:

Context API: React's built-in Context API allows you to pass data through the component tree without manually passing props at every level.
Redux: You can use global state management (like Redux) to avoid prop drilling by storing data centrally and accessing it from any component directly.


Q4. What is Box Model in CSS? How to Create Custom Scrollbars using CSS?

Ans4. The CSS Box Model describes how elements are rendered on a webpage. Each element is treated as a rectangular box made up of four components:

Content: The actual content (text, image, etc.) of the element.
Padding: Space between the content and the border.
Border: The boundary that wraps the padding and content.
Margin: Space outside the border, separating the element from others.

To style scrollbars, we can use the -webkit-scrollbar pseudo-elements, as

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}


Q5. What is “callback hell”? Is it possible to avoid callback hells and how?

Ans5. Callback Hell occurs when multiple nested callbacks are used for asynchronous tasks, leading to complex, hard-to-read code.

How to Avoid:

Promises: Use .then() and .catch() to handle async operations in a chain instead of nesting.

Async/Await: Use async functions and await to write asynchronous code in a synchronous style, making it more readable and reducing nesting.



Q6. Explain the concept of closures in JavaScript and provide a real-world example where closures would be beneficial in a coding scenario?

Ans6. A closure in JavaScript is a function that retains access to variables from its outer scope even after the outer function has finished executing. This allows the inner function to "remember" and access those variables.

Real-World Example: Counter

Closures are useful for creating private variables:

function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2

Benefits:

Encapsulation: Keeps variables private.
State Management: Maintains state between function calls, like in event handlers or counters.


Q7. How would you explain the event loop in JavaScript, and why is it crucial for managing asynchronous operations in the language?

Ans7. The event loop is a mechanism that enables JavaScript to perform asynchronous operations in a non-blocking manner. It allows the language to handle tasks like user interactions, API calls, and timers without freezing the execution of other code.

How It Works:

Call Stack: JavaScript executes code in a single-threaded call stack. Functions are pushed and popped off the stack as they are called and completed.
Web APIs: Asynchronous operations are delegated to Web APIs, which handle them outside the main thread.
Callback Queue: Once the asynchronous operations complete, their callbacks are added to the callback queue.
Execution: The event loop checks the call stack; if it's empty, it moves callbacks from the queue to the stack for execution.

Importance:

Non-blocking I/O: Allows handling multiple asynchronous operations without blocking the main thread, keeping applications responsive.
Task Scheduling: Ensures that asynchronous code runs smoothly alongside synchronous code, maintaining performance in a single-threaded environment.



Q8. Write a function that makes three asynchronous calls using Promises. Ensure they complete in order, regardless of their individual completion times. How would you handle errors in such a scenario?

Ans8. To make three asynchronous calls that complete in order using Promises, you can chain them using .then(). This ensures that each call waits for the previous one to complete before proceeding.

Function Implementation:

function asyncCall1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Call 1 completed");
      resolve("Result from Call 1");
    }, 1000);
  });
}

function asyncCall2(resultFromCall1) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Call 2 completed");
      resolve("Result from Call 2");
    }, 500);
  });
}

function asyncCall3(resultFromCall2) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Call 3 completed");
      resolve("Result from Call 3");
    }, 300);
  });
}

function executeAsyncCalls() {
  asyncCall1()
    .then(result1 => asyncCall2(result1))
    .then(result2 => asyncCall3(result2))
    .then(result3 => console.log(result3))
    .catch(error => console.error("An error occurred:", error));
}

executeAsyncCalls();

Error Handling:

The .catch() method at the end of the promise chain handles any errors that occur during the asynchronous calls, ensuring robust error management.



Q9. Explain ES6 feature in JavaScript with example?

Ans9. ES6 (ECMAScript 2015) introduced several key features in JavaScript that enhance functionality and readability. 

1. Arrow Functions:
const add = (a, b) => a + b;

2. Template Literals:
const name = "Alice";
const greeting = Hello, ${name}!;

3. Destructuring Assignment:
const person = { name: "Bob", age: 30 };
const { name, age } = person;

4. Default Parameters:
function multiply(a, b = 1) {
  return a * b;
}

5. Modules:
export const pi = 3.14;
import { pi } from './math.js';



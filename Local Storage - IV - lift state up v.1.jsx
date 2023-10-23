/*
  Local Storage - IV - lift state up
  You are given a simple Counter component that displays a count and two buttons to increment and decrement the count. You need to modify the component to store the count in the browser's local storage so that the count is persisted even when the page is refreshed.

  We have already written some starting code for you.

  Hide Demo
  x
  Directions
  Do not edit the data-testid attributes.
  Use the reload button in the demo browser to test if your component works as expected.
  You can import any methods from the react library.
  Use key count to store the data in local storage.
  Need some hints?
  Make use of the useState hook to initialize the count from the value stored in the local storage.

  Use the useEffect hook to store the updated count value in the local storage every time it changes.

  When initialising the count, use localStorage.getItem to retrieve the stored count value and parse it into an integer.
*/

import React, { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(parseInt(localStorage.getItem("count")) ?? 0);

  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  const onIncrement = () => {
    setCount((count) => ++count);
  };

  const onDecrement = () => {
    setCount((count) => --count);
  };

  return (
    <div>
      <h2 data-testid="count-id">Count: {count}</h2>
      <button data-testid="inc-id" onClick={onIncrement}>
        +
      </button>
      <button data-testid="dec-id" onClick={onDecrement}>
        -
      </button>
    </div>
  );
}

export default Counter;

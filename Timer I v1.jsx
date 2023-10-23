/**
Timer I
Write a component that implements a timer. The component should display the elapsed time in minutes and seconds, formatted as "MM:SS". The timer should start at 0 and increase by 1 second every second.

Hide Demo
x
Directions
This exercise has no tests. Use the Mark as completed button when you’re done.
Need some hints?
Use the useState hook to store the elapsed time and useEffect hook to update the elapsed time every second.

Use the setInterval method within the useEffect hook to increment the elapsed time every second.

Remember to clear the interval using the clearInterval method within the cleanup function of useEffect to prevent memory leaks.
 */
import { useEffect, useRef, useState } from "react";

const App = () => {
  const [timer, setTimer] = useState(5999);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, [1000]);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const minutes = Math.floor(timer / 60);
  const minutesDisplay = minutes > 9 ? minutes : `0${minutes}`;

  const seconds = timer % 60;
  const secondsDisplay = seconds > 9 ? seconds : `0${seconds}`;

  return (
    <div>
      {minutesDisplay}:{secondsDisplay}
    </div>
  );
};

export default App;

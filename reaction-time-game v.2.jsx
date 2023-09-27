import { useState, useRef } from "react";
import styled from "styled-components";

/**
 * separation of concerns on the handlers
 *  instead of handling the logic in one do it for different states
 *  creating the reset state
 *
 */

function ReactionTest() {
  // Write your game here
  const [gameState, setGameState] = useState("initial"); // initial, ready, waiting, success, failed
  const [reactionTime, setReactionTime] = useState(0); // the difference between box rendered and box pressed
  const [startTime, setStartTime] = useState(0); // when the box turns green
  const [endTime, setEndTime] = useState(0);

  const timerRef = useRef(0); // this is for the timer side effect

  // write the different states of the game, ready, waiting, success, failed

  const onStartGame = () => {
    setGameState("waiting"); // waiting to turn green

    // resets state
    setStartTime(0);
    setEndTime(0);

    /**
     * create logic that would get a random number from 1000 to 6000 for the ms
     */
    const randomTime = Math.floor(Math.random() * (6000 - 1000 + 1) + 1000);

    console.log({ randomTime });

    timerRef.current = setTimeout(() => {
      setGameState("ready"); // this is what makes the box green
      setStartTime(performance.now());
    }, randomTime);
  };

  // implement the logic of the success and fail states
  const onBoxPress = () => {
    console.log({ startTime });
    clearTimeout(timerRef.current);
    // you pressed too early
    if (gameState === "waiting") {
      setGameState("failed");

      // pressed the box when it's green
    } else if (gameState === "ready") {
      setEndTime(performance.now());
      setReactionTime(Math.floor(performance.now() - startTime));
      setGameState("success");
    }
  };

  return (
    <div>
      {(gameState === "initial" || gameState === "success" || gameState === "failed") && (
        <button onClick={onStartGame}>Start Game</button>
      )}
      {gameState === "waiting" && <button onClick={onBoxPress}>RedBox</button>}
      {gameState === "ready" && <button onClick={onBoxPress}>GreenBox</button>}
      {gameState === "success" && <span>{`You took ${reactionTime} ms`}</span>}
      {gameState === "failed" && <span>You clicked too early!</span>}
    </div>
  );
}

export default ReactionTest;

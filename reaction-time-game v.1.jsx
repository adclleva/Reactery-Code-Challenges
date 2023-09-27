/*
  lessons learned

  - writing some pseudo code and get a game plan going
  - no need to over do it with styled components
  - maybe using tailwind was good
  - use a ref only with timers, because using anything else would not trigger a re-render
    - hence using state was needed to change the colors
  - if possible, no need to put the logic inside a useEffect, sometimes it's better to have it in a button
*/
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

function ReactionTest() {
  const { gameState, startGame, reactionTime, gameTimePressed, gameBoxPressed, gameTimeReactionReady } = useGameState();

  return (
    <GameContainer>
      <span>{gameTimePressed}</span>
      <span>{reactionTime}</span>

      {(gameState === "initial" || gameState === "results") && <GameStartButton startGame={startGame} />}
      <GameBox
        gameState={gameState}
        gameBoxPressed={gameBoxPressed}
        gameTimePressed={gameTimePressed}
        gameTimeReactionReady={gameTimeReactionReady}
      />
      {gameState === "results" && <GameMessage results={reactionTime} />}
      <GameMessage />
    </GameContainer>
  );
}

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GameBox = ({ gameState, gameBoxPressed, gameTimePressed, gameTimeReactionReady }) => {
  const handleBoxPress = () => {
    gameBoxPressed();
    console.log("pressed box");
  };

  return (
    <>
      {gameState === "playing" && !gameTimeReactionReady && <StyledRedBox onClick={handleBoxPress} />}
      {gameState === "playing" && gameTimeReactionReady > 0 && <StyledGreenBox onClick={handleBoxPress} />}
    </>
  );
};

const StyledGameBox = styled.button`
  padding: 100px;
  border-radius: 10px;
`;

const StyledRedBox = styled(StyledGameBox)`
  background-color: red;
`;

const StyledGreenBox = styled(StyledGameBox)`
  background-color: green;
`;

const GameMessage = ({ results }) => {
  let message = "";

  if (results === "early") {
    message = `You clicked too earyl!`;
  } else if (results) {
    message = `You took ${results}ms!`;
  }

  if (!results) return null;
  return <span>{message}</span>;
};

const GameStartButton = ({ startGame }) => {
  const onHandleStartGame = () => {
    startGame();
  };

  return <StyledGameStartButton onClick={onHandleStartGame}>Game Start</StyledGameStartButton>;
};

const StyledGameStartButton = styled.button`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #2c2c2c;
  color: white;
  border-radius: 10px;
`;

const useGameState = () => {
  /**
   * three states
   * 1. initial
   * 2. playing
   * 4. end
   *
   */
  const [gameState, setGameState] = useState("initial");
  const [gameTimeReactionReady, setGameTimeReactionReady] = useState(0);
  const gameTimePressed = useRef(0);

  const startGame = () => {
    setGameState("playing");
    console.log("should be playing");
    setGameTimeReactionReady(0);
  };

  const gameBoxPressed = () => {
    setGameState("results");
    gameTimePressed.current = performance.now();
  };

  useEffect(() => {
    const randomReactionEndTime = Math.round(Math.random() * (6000 - 1000 + 1)) + 1000;

    if (gameState === "playing") {
      setTimeout(() => {
        setGameTimeReactionReady(performance.now());
      }, randomReactionEndTime);
    }

    if (gameTimeReactionReady < 0) {
      setGameState("early");
    }
  }, [gameState, gameTimeReactionReady]);

  return {
    gameState,
    startGame,
    reactionTime: gameTimePressed.current - gameTimeReactionReady,
    gameTimeReactionReady: gameTimeReactionReady > 0,
    gameTimePressed: gameTimePressed.current,
    gameBoxPressed,
  };
};

export default ReactionTest;

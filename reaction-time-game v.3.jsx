import { useState, useEffect, useRef } from "react";

function ReactionTest() {
  // initial playing reactionReady success failed
  const [gameState, setGameState] = useState("initial");
  const [reactionStartTime, setReactionStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);

  const timeoutRef = useRef(0);

  const onGameStartPress = () => {
    setGameState("playing");
    // we use performance.now() because it is more precise when getting the time for ms
    setReactionStartTime(performance.now());
  };

  // when the box is still red
  const onRedBoxPress = () => {
    setGameState("failed");
    clearTimeout(timeoutRef);
  };

  // when the box turns green
  const onGreenPress = () => {
    setGameState("success");
    setReactionTime(Math.floor(performance.now() - reactionStartTime));
    clearTimeout(timeoutRef);
  };

  useEffect(() => {
    if (gameState === "playing") {
      /**
       * If you want to find a random integer in between min (inclusive) to max (inclusive),
       * you can use the following formula:
       * Math.floor(Math.random() * (max - min + 1)) + min
       */
      const randomTime = Math.floor(Math.random() * (6000 - 1 + 1)) + 1;

      // we set it the setTimeout to a ref to have it cleaned up later
      timeoutRef.current = setTimeout(() => {
        setGameState("reactionReady");
      }, randomTime);
    }
  }, [gameState]);

  // Load Tailwind CSS via CDN dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove the added stylesheet when component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center p-4">
      {/* Include Tailwind CSS via CDN using <link> tag */}
      {(gameState === "initial" || gameState === "success" || gameState === "failed") && (
        <button className="bg-gray-500 text-white px-4 py-4 rounded mb-4 font-bold" onClick={onGameStartPress}>
          GameStart
        </button>
      )}
      {gameState === "playing" && (
        <button className="bg-red-500 text-white px-16 py-16 rounded mb-4 font-bold" onClick={onRedBoxPress}>
          RedBox
        </button>
      )}
      {gameState === "reactionReady" && (
        <button className="bg-green-500 text-white px-16 py-16 rounded mb-4 font-bold" onClick={onGreenPress}>
          GreenBox
        </button>
      )}
      {gameState === "success" && <span className="px-4 py-4 font-bold">{`You took ${reactionTime}ms!`}</span>}
      {gameState === "failed" && <span className="px-4 py-4 font-bold">You clicked too early!</span>}
    </div>
  );
}

export default ReactionTest;

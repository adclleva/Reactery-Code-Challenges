import { useState } from "react";
export const useTheme = () => {
  // Write your hook logic here
  const [theme, setTheme] = useState("light"); // could be light or dark

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      if (currentTheme === "light") {
        return "dark";
      } else {
        return "light";
      }
    });
  };

  return {
    theme,
    toggleTheme,
  };
};

const App = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      style={{
        height: "100vh",
        transition: "0.3s ease-in",
        backgroundColor: theme === "light" ? "white" : "black",
      }}
    >
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default App;

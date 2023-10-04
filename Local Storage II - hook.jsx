import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [localStorageValue, setLocalStorageValue] = useState(localStorage.getItem(key) || initialValue);

  useEffect(() => {
    localStorage.setItem(key, localStorageValue);
  }, [localStorageValue]);

  return {
    value: localStorageValue,
    setValue: setLocalStorageValue,
  };
};

const App = () => {
  const { value, setValue } = useLocalStorage("inputValue", "");
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
};

export default App;

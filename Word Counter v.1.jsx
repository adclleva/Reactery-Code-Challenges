import "./styles.css";
import { useState } from "react";

const App = () => {
  // you usually want to infer the state
  const [textArea, setTextArea] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleTextEvent = (event) => {
    event.target.value;

    setTextArea(event.target.value);
    const words = event.target.value
      .trim()
      .split(/[ \t]+/)
      .filter((string) => string).length;
    console.log(event.target.value.trim().split(/[ \t]+/));
    setWordCount(words);
  };

  const getWordCountText = (wordCount) => {
    let text;

    if (wordCount === 0) {
      text = `Your article has 0 words`;
    } else if (wordCount === 1) {
      text = `Your article has 1 word`;
    } else if (wordCount > 1) {
      text = `Your article has ${wordCount} words`;
    }

    return text;
  };

  return (
    <>
      <textarea data-testid="textarea-id" onChange={handleTextEvent} value={textArea} />
      <h1 data-testid="output-id">{getWordCountText(wordCount)}</h1>
      {wordCount}
    </>
  );
};

export default App;

/**
 * the lesson learned here is to trim the text and also use the correct regex to split the text
 * as well as filtering out the empty strings, but you can deal with the empty strings in a different way
 */

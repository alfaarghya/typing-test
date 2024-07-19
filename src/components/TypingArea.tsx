import React from "react";
import { TypingAreaProps } from "../types";

const TypingArea: React.FC<TypingAreaProps> = ({
  quote,
  userInput,
  handleInputChange,
}) => {
  const quoteChars = quote.split("").map((char, idx) => (
    <span
      key={idx}
      className={
        char === userInput[idx]
          ? "correct"
          : userInput[idx] == null
          ? ""
          : "wrong"
      }
    >
      {char}
    </span>
  ));

  return (
    <div className="typing-area">
      <div id="quote">{quoteChars}</div>
      <textarea
        id="type"
        value={userInput}
        onChange={handleInputChange}
        autoFocus
      ></textarea>
    </div>
  );
};

export default TypingArea;

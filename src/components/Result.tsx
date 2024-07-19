import React from "react";
import { ResultProps } from "../types";

const Result: React.FC<ResultProps> = ({ userInput, mistake, time }) => {
  const timeTaken = (30 - time) / 60; // Convert time to minutes
  const correctChars = userInput.length - mistake;
  const accuracy =
    userInput.length > 0
      ? Math.max(Math.round((correctChars / userInput.length) * 100), 0)
      : 0;
  const speed =
    timeTaken > 0 ? (userInput.length / 5 / timeTaken).toFixed(2) : "0.00";

  return (
    <div className="box2">
      <div className="result">
        <h3>Result</h3>
        <div className="wrapper">
          <p>
            Accuracy : <span id="accuracy">{accuracy} %</span>
          </p>
          <p>
            Speed : <span id="speed">{speed} wpm</span>
          </p>
          <p>
            Mistake : <span id="mistake">{mistake}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Result;

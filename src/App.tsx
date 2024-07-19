import React, { useState, useEffect, useRef } from "react";
import TypingArea from "./components/TypingArea";
import Result from "./components/Result";
import TimeSelection from "./components/TimeSelection";
import { defaultQuotes } from "./store";
import "./App.css";
import "remixicon/fonts/remixicon.css";

const App: React.FC = () => {
  const [time, setTime] = useState<number>(30);
  const [selectedTime, setSelectedTime] = useState<number>(30);
  const [quote, setQuote] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [mistake, setMistake] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    generateRandomQuote();
  }, []);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setShowResult(true);
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const generateRandomQuote = async () => {
    try {
      const response = await fetch(
        "https://api.quotable.io/random?minLength=300&maxLength=400"
      );
      const data = await response.json();
      setQuote(data.content);
    } catch (error) {
      setQuote(defaultQuotes[Math.floor(Math.random() * defaultQuotes.length)]);
    }
  };

  const handleRestart = () => {
    setTime(selectedTime);
    setUserInput("");
    setMistake(0);
    setIsRunning(false);
    setShowResult(false);
    generateRandomQuote();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setUserInput(value);

    const quoteChars = quote.split("");
    const inputChars = value.split("");

    if (!isRunning && inputChars.length > 0) {
      setIsRunning(true);
    }

    let mistakes = 0;
    inputChars.forEach((char, idx) => {
      if (char !== quoteChars[idx]) {
        mistakes += 1;
      }
    });
    setMistake(mistakes);

    if (value === quote) {
      setIsRunning(false);
      setShowResult(true);
    }
  };

  const handleTimeChange = (time: number) => {
    setSelectedTime(time);
    setTime(time);
  };

  return (
    <div className="container">
      {!showResult ? (
        <div className="box1">
          <TimeSelection
            selectedTime={selectedTime}
            onTimeChange={handleTimeChange}
          />
          <div className="info">
            <p>TIME</p>
            <span id="time">{time}</span>
          </div>
          <TypingArea
            quote={quote}
            userInput={userInput}
            handleInputChange={handleInputChange}
          />
          <div className="btn-body">
            <span className="btn" id="restart-test" onClick={handleRestart}>
              <i className="ri-restart-line"></i>
            </span>
            <span
              className="btn"
              id="stop-test"
              onClick={() => setShowResult(true)}
            >
              <i className="ri-stop-circle-line"></i>
            </span>
          </div>
        </div>
      ) : (
        <Result userInput={userInput} mistake={mistake} time={time} />
      )}
    </div>
  );
};

export default App;

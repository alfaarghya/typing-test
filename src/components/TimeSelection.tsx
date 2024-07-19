import React from "react";
import { TimeSelectionProps } from "../types";
import { times } from "../store";

const TimeSelection: React.FC<TimeSelectionProps> = ({
  selectedTime,
  onTimeChange,
}) => {
  return (
    <div className="time-selection">
      {times.map((time) => (
        <button
          key={time}
          className={`time-button ${selectedTime === time ? "selected" : ""}`}
          onClick={() => onTimeChange(time)}
        >
          {time}s
        </button>
      ))}
    </div>
  );
};

export default TimeSelection;

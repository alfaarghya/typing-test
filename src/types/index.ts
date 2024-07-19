export interface TimeSelectionProps {
  selectedTime: number;
  onTimeChange: (time: number) => void;
}

export interface TypingAreaProps {
  quote: string;
  userInput: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface ResultProps {
  userInput: string;
  mistake: number;
  time: number;
}

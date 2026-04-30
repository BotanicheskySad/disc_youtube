import React, { useState } from 'react';
import Button from '../common/Button';

const MultipleChoice = ({ question, onAnswer, disabled, currentAnswer }) => {
  const [selected, setSelected] = useState(currentAnswer || null);

  const handleSubmit = () => {
    if (selected && !disabled) {
      onAnswer(selected);
    }
  };

  return (
    <div className="multiple-choice">
      <div className="options">
        {question.options.map((option, index) => (
          <label 
            key={index} 
            className={`option ${selected === option ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              checked={selected === option}
              onChange={(e) => setSelected(e.target.value)}
              disabled={disabled}
            />
            <code>{option}</code>
          </label>
        ))}
      </div>
      
      {!disabled && (
        <Button 
          onClick={handleSubmit}
          disabled={!selected}
          variant="primary"
        >
          Проверить
        </Button>
      )}
    </div>
  );
};

export default MultipleChoice;
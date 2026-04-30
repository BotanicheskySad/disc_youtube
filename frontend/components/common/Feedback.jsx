import React from 'react';

const Feedback = ({ isCorrect, explanation, userAnswer }) => {
  return (
    <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
      <p>{isCorrect ? '✅ Правильно!' : '❌ Неправильно'}</p>
      <small>{explanation}</small>
      {!isCorrect && userAnswer && (
        <small className="user-answer">
          Ваш ответ: {typeof userAnswer === 'object' 
            ? JSON.stringify(userAnswer) 
            : userAnswer}
        </small>
      )}
    </div>
  );
};

export default Feedback;
import React, { useState, useEffect } from 'react';
import MultipleChoice from './QuestionTypes/MultipleChoice';
import DragDrop from '@components/QuestionTypes/DragDrop';
import FillCode from '@components/QuestionTypes/FillCode';
import OrderBlocks from '@components/QuestionTypes/OrderBlocks';
import Button from '@components/common/Button';
import Feedback from '@components/common/Feedback';

const Quiz = ({ moduleId, questions, modules, onModuleChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    setCurrentIndex(0);
    setAnswered(false);
    setCurrentAnswer(null);
  }, [moduleId]);

  const checkAnswer = (answer, correct, question) => {
    if (question.ignoreSpaces === false) {
      return answer === correct;
    }
    
    if (typeof answer === 'string' && typeof correct === 'string') {
      const normalizedAnswer = answer.trim().replace(/\s+/g, ' ');
      const normalizedCorrect = correct.trim().replace(/\s+/g, ' ');
      return normalizedAnswer === normalizedCorrect;
    }
    
    if (Array.isArray(answer) && Array.isArray(correct)) {
      return JSON.stringify(answer) === JSON.stringify(correct);
    }
    
    return answer === correct;
  };

  const handleAnswer = (answer) => {
    if (answered) return;
    
    const question = questions[currentIndex];
    const isCorrect = checkAnswer(answer, question.correct, question);
    
    const answerData = {
      correct: isCorrect,
      userAnswer: answer,
      points: isCorrect ? question.points : 0
    };
    
    setCurrentAnswer(answerData);
    
    if (isCorrect) {
      setScore(prev => prev + question.points);
    }
    
    setAnswered(true);
    setUserAnswers(prev => [...prev, { questionId: question.id, ...answerData }]);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setAnswered(false);
      setCurrentAnswer(null);
    } else {
      const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
      alert(`🎉 Поздравляю! Ты завершил модуль!\n\nТвой счёт: ${score}/${totalPoints} очков`);
    }
  };

  const currentQuestion = questions[currentIndex];
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const renderQuestionComponent = () => {
    const commonProps = {
      key: currentQuestion.id,
      question: currentQuestion,
      onAnswer: handleAnswer,
      disabled: answered,
      currentAnswer: currentAnswer?.userAnswer
    };

    switch(currentQuestion.type) {
      case 'multiple-choice':
        return <MultipleChoice {...commonProps} />;
      case 'drag-drop':
        return <DragDrop {...commonProps} />;
      case 'fill-code':
        return <FillCode {...commonProps} />;
      case 'order-blocks':
        return <OrderBlocks {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="quiz-container">
      <div className="module-selector">
        {modules.map(module => (
          <button
            key={module.id}
            className={`module-btn ${moduleId === module.id ? 'active' : ''}`}
            onClick={() => onModuleChange(module.id)}
          >
            {module.name}
          </button>
        ))}
      </div>
      
      <div className="quiz-header">
        <div className="progress-info">
          <span className="progress-text">
            Вопрос {currentIndex + 1} из {questions.length}
          </span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="score-info">
          <span className="score-label">⭐ Очки:</span>
          <span className="score-value">{score}</span>
          <span className="score-total">/{totalPoints}</span>
        </div>
      </div>
      
      <div className="question-card">
        <h2>{currentQuestion.title}</h2>
        <p className="question-text">{currentQuestion.question}</p>
        
        {currentQuestion.ignoreSpaces === false && (
          <div className="info-text">
            ⚠️ В этом задании важны пробелы и отступы (как в Python)!
          </div>
        )}
        
        <div className="question-content">
          {renderQuestionComponent()}
        </div>
        
        {answered && (
          <>
            <Feedback 
              isCorrect={currentAnswer.correct}
              explanation={currentQuestion.explanation}
              userAnswer={currentAnswer.userAnswer}
            />
            <Button 
              onClick={handleNextQuestion}
              variant="primary"
              className="next-btn"
            >
              {currentIndex + 1 === questions.length ? '🏆 Завершить' : '➡️ Следующий вопрос'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
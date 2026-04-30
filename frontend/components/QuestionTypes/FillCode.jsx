import React, { useState } from 'react';
import Button from '../common/Button';

const FillCode = ({ question, onAnswer, disabled, currentAnswer }) => {
  const [code, setCode] = useState(currentAnswer || '');

  const handleSubmit = () => {
    if (code.trim() && !disabled) {
      onAnswer(code);
    }
  };

  const isPythonTask = question.ignoreSpaces === false;
  const placeholder = isPythonTask 
    ? 'Введите код с правильными отступами (например, "    print(\'positive\')")' 
    : 'Введите недостающий код...';

  return (
    <div className="fill-code">
      <div className="code-snippet">
        <pre>{question.codeSnippet}</pre>
      </div>
      
      <textarea
        className="code-input"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={isPythonTask ? 4 : 2}
        style={{ fontFamily: 'monospace' }}
      />
      
      {!disabled && (
        <Button 
          onClick={handleSubmit}
          disabled={!code.trim()}
          variant="primary"
        >
          Проверить
        </Button>
      )}
    </div>
  );
};

export default FillCode;
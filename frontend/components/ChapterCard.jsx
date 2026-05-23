// ChapterCard.jsx - компонент карточки главы
import React, { useState } from 'react';
import '@styles/ChapterCard.css';
import { useNavigate } from 'react-router-dom';

const ChapterCard = ({ chapter }) => {
   const navigate = useNavigate();
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const { number, title, description, subsections, branches } = chapter;

  const handleQuiz1 = () => {
    navigate('/quiz1');
  };

  return (
    <div className="chapter-card" onClick={handleQuiz1}>
      <div className="card-header">
        <span className="chapter-number">{number}</span>
        <h3 className="chapter-title">{title}</h3>
      </div>

      <p className="chapter-description">{description}</p>

      {/* Подтемы (параграфы) */}
      <div className="subsections-section">
        <div className="section-label">
          <span className="label-icon">📖</span>
          <span>Подтемы (по желанию)</span>
        </div>
        <div className="subsections-list">
          {subsections.map((sub, idx) => (
            <span key={idx} className="subsection-tag">{sub}</span>
          ))}
        </div>
      </div>

      {/* Ответвления (ветки) - скрывающийся блок */}
      {branches && branches.length > 0 && (
        <div className="branches-section">
          <button 
            className="branches-toggle"
            onClick={() => setIsBranchOpen(!isBranchOpen)}
          >
            <span className="toggle-icon">{isBranchOpen ? '▼' : '▶'}</span>
            <span className="section-label">
              <span className="label-icon">🔀</span>
              <span>Ответвления (углублённо)</span>
            </span>
          </button>
          
          {isBranchOpen && (
            <div className="branches-list">
              {branches.map((branch, idx) => (
                <div key={idx} className="branch-item">
                  <div className="branch-name">↳ {branch.name}</div>
                  <div className="branch-desc">{branch.desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChapterCard;
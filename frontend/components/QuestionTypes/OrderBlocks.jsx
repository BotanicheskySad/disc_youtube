import React, { useState, useCallback } from 'react';
import Button from '../common/Button';

const OrderBlocks = ({ question, onAnswer, disabled, currentAnswer }) => {
  const [blocks, setBlocks] = useState(() => {
    return currentAnswer || [...question.blocks];
  });
  
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = useCallback((e, index) => {
    if (disabled) return;
    setDraggedIndex(index);
    e.dataTransfer.setData('text/plain', index);
    e.dataTransfer.effectAllowed = 'move';
  }, [disabled]);

  const handleDragOver = useCallback((e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!disabled && draggedIndex !== null && dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  }, [disabled, draggedIndex, dragOverIndex]);

  const handleDrop = useCallback((e, targetIndex) => {
    e.preventDefault();
    
    if (disabled || draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    
    const newBlocks = [...blocks];
    const [draggedItem] = newBlocks.splice(draggedIndex, 1);
    newBlocks.splice(targetIndex, 0, draggedItem);
    
    setBlocks(newBlocks);
    setDraggedIndex(null);
    setDragOverIndex(null);
  }, [disabled, draggedIndex, blocks]);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  }, []);

  const handleSubmit = () => {
    if (!disabled) {
      onAnswer(blocks);
    }
  };

  return (
    <div className="order-blocks">
      <p className="order-instruction">
        💡 Перетаскивайте строки, чтобы установить правильный порядок
      </p>
      
      <div className="order-list">
        {blocks.map((block, index) => (
          <div
            key={`${block}-${index}`}
            className={`order-item ${draggedIndex === index ? 'dragging' : ''} ${dragOverIndex === index ? 'drag-over' : ''}`}
            draggable={!disabled}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
          >
            <div className="order-number">{index + 1}</div>
            <code>{block}</code>
            <div className="drag-handle">⋮⋮</div>
          </div>
        ))}
      </div>
      
      {!disabled && (
        <Button 
          onClick={handleSubmit}
          variant="primary"
        >
          Проверить порядок
        </Button>
      )}
    </div>
  );
};

export default OrderBlocks;
import React, { useState, useCallback } from 'react';
import Button from '../common/Button';

const DragDrop = ({ question, onAnswer, disabled, currentAnswer }) => {
  const [availableBlocks, setAvailableBlocks] = useState(() => {
    const savedSelected = currentAnswer || [];
    return question.availableBlocks.filter(block => !savedSelected.includes(block));
  });
  
  const [selectedBlocks, setSelectedBlocks] = useState(() => {
    return currentAnswer || [];
  });
  
  const [dragOverZone, setDragOverZone] = useState(null);
  const [draggedBlock, setDraggedBlock] = useState(null);

  const handleDragStart = useCallback((e, block, source) => {
    if (disabled) return;
    setDraggedBlock({ block, source });
    e.dataTransfer.setData('text/plain', block);
    e.dataTransfer.effectAllowed = 'move';
    
    // Создаём призрак
    const dragIcon = document.createElement('div');
    dragIcon.textContent = block;
    dragIcon.style.cssText = 'position:absolute; top:-1000px; background:#667eea; color:white; padding:10px; border-radius:8px;';
    document.body.appendChild(dragIcon);
    e.dataTransfer.setDragImage(dragIcon, 0, 0);
    setTimeout(() => document.body.removeChild(dragIcon), 0);
  }, [disabled]);

  const handleDragOver = useCallback((e, zone) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverZone(zone);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverZone(null);
  }, []);

  const handleDropOnSelected = useCallback((e) => {
    e.preventDefault();
    setDragOverZone(null);
    
    if (!draggedBlock || draggedBlock.source !== 'available' || disabled) return;
    
    const maxBlocks = question.correct.length;
    if (selectedBlocks.length >= maxBlocks) {
      alert(`Нельзя добавить больше ${maxBlocks} блоков!`);
      return;
    }
    
    setSelectedBlocks(prev => [...prev, draggedBlock.block]);
    setAvailableBlocks(prev => prev.filter(b => b !== draggedBlock.block));
    setDraggedBlock(null);
  }, [draggedBlock, disabled, selectedBlocks.length, question.correct.length]);

  const handleDropOnAvailable = useCallback((e) => {
    e.preventDefault();
    setDragOverZone(null);
    
    if (!draggedBlock || draggedBlock.source !== 'selected' || disabled) return;
    
    setAvailableBlocks(prev => [...prev, draggedBlock.block]);
    setSelectedBlocks(prev => prev.filter(b => b !== draggedBlock.block));
    setDraggedBlock(null);
  }, [draggedBlock, disabled]);

  const handleSubmit = () => {
    if (!disabled && selectedBlocks.length > 0) {
      onAnswer(selectedBlocks);
    }
  };

  const isMaxBlocks = selectedBlocks.length >= question.correct.length;

  return (
    <div className="drag-drop">
      <div className="drop-zones">
        <div 
          className={`selected-zone ${dragOverZone === 'selected' ? 'drag-over' : ''}`}
          onDragOver={(e) => handleDragOver(e, 'selected')}
          onDragLeave={handleDragLeave}
          onDrop={handleDropOnSelected}
        >
          <h3>
            ✨ Твой код 
            <span className="block-count">({selectedBlocks.length}/{question.correct.length})</span>
          </h3>
          <div className="blocks-container">
            {selectedBlocks.map((block, idx) => (
              <div
                key={`${block}-${idx}`}
                className="block selected"
                draggable={!disabled}
                onDragStart={(e) => handleDragStart(e, block, 'selected')}
                data-block={block}
              >
                <code>{block}</code>
              </div>
            ))}
            {selectedBlocks.length === 0 && (
              <div className="empty-zone">Перетащите сюда блоки...</div>
            )}
          </div>
        </div>
        
        <div 
          className={`available-zone ${dragOverZone === 'available' ? 'drag-over' : ''}`}
          onDragOver={(e) => handleDragOver(e, 'available')}
          onDragLeave={handleDragLeave}
          onDrop={handleDropOnAvailable}
        >
          <h3>📦 Доступные блоки</h3>
          <div className="blocks-container">
            {availableBlocks.map((block, idx) => (
              <div
                key={`${block}-${idx}`}
                className="block available"
                draggable={!disabled}
                onDragStart={(e) => handleDragStart(e, block, 'available')}
                data-block={block}
              >
                <code>{block}</code>
              </div>
            ))}
            {availableBlocks.length === 0 && (
              <div className="empty-zone">Все блоки использованы</div>
            )}
          </div>
        </div>
      </div>
      
      {!disabled && (
        <Button 
          onClick={handleSubmit}
          disabled={!isMaxBlocks}
          variant="primary"
        >
          Проверить
        </Button>
      )}
    </div>
  );
};

export default DragDrop;
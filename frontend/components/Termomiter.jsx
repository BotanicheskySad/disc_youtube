import { useState } from 'react';

function Termomiter(){
    const [temp, updTemp] = useState(10)
     const color = temp > 30 ? 'red' : temp < 0 ? 'blue' : 'black';
    const [isMet, udtIsMet] = useState(false);
    const yes_no = isMet ? 'да' : 'нет';
    const col_text = yes_no == 'да' ? 'green' : 'red'; 
    return(
        <div>
            
            <h1 style={{color:color}}>{temp}</h1>
            <button onClick={() => updTemp(prev => prev + 1)}>увеличить на 1</button>
            <button onClick={() => updTemp(prev => prev - 1)}>-1</button>

            <h1>Мы знакомы? <span style={{color:col_text}}>{yes_no}</span></h1>
            <button onClick={() => udtIsMet(prev => true)}>познакомиться</button>
            <button onClick={() => udtIsMet(prev => false)}>разпознакомиться</button>
        </div>
    )
}

export default Termomiter;
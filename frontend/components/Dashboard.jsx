import React, { useState, useEffect } from 'react';
import Termomiter from './Termomiter'

import Quiz from './Quiz';
import { QUESTIONS_DB } from '../data/questions';
import '../styles/App.css';




function Dashboard({ user, onLogout }) {
    const [profile, setProfile] = useState(null);



    const [currentModule, setCurrentModule] = useState('beginner');

    const modules = [
        { id: 'beginner', name: '🌱 Начинающий', icon: '🌱' },
    ];

    const handleModuleChange = (moduleId) => {
        setCurrentModule(moduleId);
    };
    
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setProfile(data.user);
            }
        };
        
        fetchProfile();
    }, []);
    
    return (
        <div>
            <h1>Добро пожаловать, {user.email}!</h1>
            <button onClick={onLogout}>Выйти</button>
            
            <div>
                <Quiz 
                moduleId={currentModule}
                questions={QUESTIONS_DB[currentModule]}
                modules={modules}
                onModuleChange={handleModuleChange}
                />
            </div>
        </div>
    );
}

export default Dashboard;
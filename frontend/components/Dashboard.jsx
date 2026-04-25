import React, { useState, useEffect } from 'react';

function Dashboard({ user, onLogout }) {
    const [profile, setProfile] = useState(null);
    
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
                <h2>Ваши курсы</h2>
                {/* Здесь будет список видео и задач */}
            </div>
        </div>
    );
}

export default Dashboard;
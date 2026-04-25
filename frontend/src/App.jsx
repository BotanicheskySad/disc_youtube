import { useState, useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import Dashboard from '../components/Dashboard';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Проверяем, есть ли токен при загрузке
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);
    
    const handleLogin = (userData) => {
        setUser(userData);
    };
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };
    
    if (loading) return <div>Загрузка...</div>;
    
    return user ? (
        <Dashboard user={user} onLogout={handleLogout} />
    ) : (
        <AuthForm onLogin={handleLogin} />
    );
}

export default App;
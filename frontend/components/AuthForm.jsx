import { useState } from 'react';
import { useTheme } from './ThemeContext';
import sunIcon from '../public/sun.svg';
import moonIcon from '../public/moon.svg';
import '../styles/AuthForm.css';

function AuthForm({ onLogin }) {
    const { theme, toggleTheme } = useTheme();

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        const endpoint = isLogin ? '/api/login' : '/api/register';
        
        try {
            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error);
            }
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            onLogin(data.user);
            
        } catch (err) {
            setError(err.message);
        }
    };
    
    return (
        <div className="auth-container">
            <button className="theme-toggle-btn top-menu-button" onClick={toggleTheme}>
                <img 
                    src={theme === 'light' ? moonIcon : sunIcon} 
                    alt="Toggle theme"
                    className="theme-icon"
                />
            </button>

            <div className="auth-card">
                <div className="auth-header">
                    <h2 className="auth-title">
                        {isLogin ? 'Добро пожаловать' : 'Создать аккаунт'}
                    </h2>
                    <p className="auth-subtitle">
                        {isLogin ? 'Войдите, чтобы продолжить' : 'Зарегистрируйтесь для начала работы'}
                    </p>
                </div>

                {error && (
                    <div className="error-alert">
                        <span className="error-icon">⚠️</span>
                        <span className="error-text">{error}</span>
                    </div>
                )}
                
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">
                            {isLogin ? 'Логин' : 'Электронная почта'}
                        </label>
                        <input
                            type="text"
                            className="auth-input"
                            placeholder={isLogin ? "Введите логин" : "example@mail.com"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Пароль</label>
                        <input
                            type="password"
                            className="auth-input"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {isLogin && (
                        <div className="forgot-password">
                            <a href="#" className="forgot-link">Забыли пароль?</a>
                        </div>
                    )}
                    
                    <button type="submit" className="submit-btn">
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </form>
                
                <div className="auth-footer">
                    <button 
                        className="switch-mode-btn"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
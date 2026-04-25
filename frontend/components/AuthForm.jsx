import { useState } from 'react';

function AuthForm({ onLogin }) {
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
            
            // Сохраняем токен и пользователя
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            onLogin(data.user);
            
        } catch (err) {
            setError(err.message, "ну вот");
        }
    };
    
    return (
        <div style={{ maxWidth: 400, margin: '50px auto', padding: 20 }}>
            <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: 10, margin: '10px 0' }}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: 10, margin: '10px 0' }}
                    required
                />
                <button type="submit" style={{ width: '100%', padding: 10 }}>
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>
            </form>
            
            <button 
                onClick={() => setIsLogin(!isLogin)}
                style={{ marginTop: 10, background: 'none', border: 'none', cursor: 'pointer' }}
            >
                {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
            </button>
        </div>
    );
}

export default AuthForm;
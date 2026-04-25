const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');  // 👈 ДОБАВИТЬ ЭТУ СТРОКУ

const app = express();

// 👇 ЭТИ СТРОКИ РЕШАЮТ ПРОБЛЕМУ
app.use(cors({
    origin: 'http://localhost:5173',  // адрес вашего фронтенда
    credentials: true
}));



app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'duo_you',
    password: '1234',
    port: 5432,
});

const SECRET_KEY = 'your_secret_key_change_it';

// РЕГИСТРАЦИЯ
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email и пароль обязательны' });
    }
    
    try {
        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Сохраняем в БД
        const result = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
            [email, hashedPassword]
        );
        
        const user = result.rows[0];
        
        // Создаем JWT токен
        const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY);
        
        res.json({ token, user: { id: user.id, email: user.email } });
    } catch (err) {
        if (err.code === '23505') { // unique violation
            res.status(400).json({ error: 'Пользователь с таким email уже существует' });
        } else {
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }
});

// ЛОГИН
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Неверный email или пароль' });
        }
        
        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password_hash);
        
        if (!validPassword) {
            return res.status(401).json({ error: 'Неверный email или пароль' });
        }
        
        const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY);
        res.json({ token, user: { id: user.id, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Middleware для проверки токена (для защищенных роутов)
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Нет доступа' });
    }
    
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Неверный токен' });
        req.user = user;
        next();
    });
};

// Пример защищенного роута (получить профиль)
app.get('/api/profile', authenticateToken, async (req, res) => {
    res.json({ user: req.user });
});

app.listen(5000, () => console.log('Server running on port 5000'));
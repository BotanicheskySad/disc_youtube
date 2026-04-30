import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Добавьте этот импорт
import '../styles/App.css';
import { useTheme } from './ThemeContext';  // Убедитесь, что путь правильный
import sunIcon from '../public/sun.svg';
import moonIcon from '../public/moon.svg';
import outIcon from '../public/out.svg';


function Dashboard({ user, onLogout }) {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate(); // Добавьте эту строку
    const [profile, setProfile] = useState(null);
    const [courses, setCourses] = useState([
        {
            id: 1,
            title: "React для начинающих",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/960px-React-icon.svg.png",
            description: "Изучите основы React: компоненты, хуки, состояние и пропсы. Научитесь создавать динамические веб-приложения с нуля.",
            level: "Начинающий"
        },
        {
            id: 2,
            title: "JavaScript Мастер",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuHnJDLOcdm_0b6N6kNj-1OvO9KhKYgqIy0w&s",
            description: "Углубленный курс по современному JavaScript: асинхронность, замыкания, прототипы, промисы и новые возможности ES2024.",
            level: "Средний"
        },
        {
            id: 3,
            title: "Python для анализа данных",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1280px-Python-logo-notext.svg.png",
            description: "Научитесь использовать Python для обработки и визуализации данных с помощью Pandas, NumPy и Matplotlib.",
            level: "Средний"
        },
        {
            id: 4,
            title: "Веб-дизайн с Figma",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/960px-Figma-logo.svg.png",
            description: "Освойте создание дизайн-систем, прототипов и интерактивных макетов в Figma для современных веб-проектов.",
            level: "Начинающий"
        },
        {
            id: 5,
            title: "Backend на Node.js",
            image: "https://cp.beget.com/shared/6ayu2lMsV1DpkfCrePd2HEMWvsKDBY-c/logo_nodejs2x.png.webp",
            description: "Создавайте серверные приложения с Express, MongoDB и REST API. Изучите авторизацию, базы данных и деплой.",
            level: "Продвинутый"
        },
        {
            id: 6,
            title: "TypeScript полный курс",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1280px-Typescript_logo_2020.svg.png",
            description: "Освойте типизацию, дженерики, декораторы и интеграцию TypeScript с фреймворками.",
            level: "Средний"
        }
    ]);

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
    
    // Функция для перехода на страницу курса
    const handleEnroll = (courseId) => {
        navigate(`/course/${courseId}`);
    };
    
    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-content">
                    <h1 className="welcome-title">
                        Добро пожаловать, {user.email}!
                    </h1>
                    <div className='header-buttons'>
                        <button className='top-menu-button' onClick={toggleTheme}>
                            <img src={theme === 'light' ? moonIcon : sunIcon} alt="" />
                            
                        </button>
                        <button className='top-menu-button' onClick={onLogout}>
                            <img src={outIcon} alt="" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Courses Section */}
            <div className="courses-section">               
                <div className="courses-grid">
                    {courses.map((course) => (
                        <div key={course.id} className="course-card" onClick={() => handleEnroll(course.id)}>
                            <div className="course-image-container">
                                <img 
                                    src={course.image} 
                                    alt={course.title}
                                    className="course-image"
                                />
                                
                            </div>
                            <h3 className="course-title">{course.title}</h3>
                            <div className="course-hover-content">
                                <p className="course-description">{course.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
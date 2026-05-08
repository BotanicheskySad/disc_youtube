import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Добавьте этот импорт
import '../styles/App.css';
import { useTheme } from './ThemeContext';  // Убедитесь, что путь правильный
import sunIcon from '../public/sun.svg';
import moonIcon from '../public/moon.svg';
import outIcon from '../public/out.svg';
import robloxStudioIcon from '../public/roblox-logo.png';
import unityIcon from '../public/unity-logo.png';
import htmlIcon from '../public/html-logo.png';
import pythonIcon from '../public/python-logo.png';
import godotIcon from '../public/godot-logo.svg';
import gitIcon from '../public/git-logo.svg';


function Dashboard({ user, onLogout }) {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate(); // Добавьте эту строку
    const [profile, setProfile] = useState(null);
    const [courses, setCourses] = useState([
        {
            id: 1,
            title: "Roblox Studio",
            image: `${robloxStudioIcon}`,
            description: "Изучите создание игр и 3D-миров в Roblox Studio с помощью языка Lua.",
            level: "Начинающий"
        },
        {
            id: 2,
            title: "Unity",
            image: `${unityIcon}`,
            description: "Освойте разработку 2D и 3D игр в Unity с использованием C#.",
            level: "Средний"
        },
        {
            id: 3,
            title: "Python",
            image: `${pythonIcon}`,
            description: "Изучите основы программирования на Python: синтаксис, функции и работу с данными.",
            level: "Средний"
        },
        {
            id: 4,
            title: "Создание сайтов",
            image: `${htmlIcon}`,
            description: "Научитесь создавать современные сайты с нуля, используя HTML, CSS и JavaScript.",
            level: "Начинающий"
        },
        {
            id: 5,
            title: "Godot",
            image: `${godotIcon}`,
            description: "Освойте создание игр в Godot с помощью GDScript и встроенных инструментов.",
            level: "Продвинутый"
        },
        {
            id: 6,
            title: "GitHub",
            image: `${gitIcon}`,
            description: "Изучите систему контроля версий Git и платформу GitHub для совместной разработки.",
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
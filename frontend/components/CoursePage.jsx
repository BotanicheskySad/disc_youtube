import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';  // Убедитесь, что путь правильный
import sunIcon from '../public/sun.svg';
import moonIcon from '../public/moon.svg';
import outIcon from '../public/out.svg';
import logoIcon from '../public/logo.svg'
import logoLightIcon from '../public/logo-light.svg'
import '../styles/App.css';

function CoursePage({ user, onLogout }) {
    const { theme, toggleTheme } = useTheme();
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enrolled, setEnrolled] = useState(false);
    
    // Ваши курсы (можно вынести в отдельный файл)
    const coursesData = {
        1: {
            id: 1,
            title: "React для начинающих",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/960px-React-icon.svg.png",
            description: "Изучите основы React: компоненты, хуки, состояние и пропсы. Научитесь создавать динамические веб-приложения с нуля.",
            fullDescription: "Полный курс по React для начинающих разработчиков. Вы научитесь создавать современные веб-приложения, использовать хуки, работать с состоянием и пропсами, а также освоите маршрутизацию и управление состоянием.",
            lessons: [
                "Введение в React и JSX",
                "Компоненты и пропсы",
                "Состояние и жизненный цикл",
                "Обработка событий",
                "Хуки useState и useEffect",
                "Работа с формами",
                "Маршрутизация",
                "Финальный проект"
            ]
        },
        2: {
            id: 2,
            title: "JavaScript Мастер",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuHnJDLOcdm_0b6N6kNj-1OvO9KhKYgqIy0w&s",
            description: "Углубленный курс по современному JavaScript: асинхронность, замыкания, прототипы, промисы и новые возможности ES2024.",
            fullDescription: "Продвинутый курс по JavaScript, который превратит вас в эксперта. Изучите замыкания, прототипное наследование, асинхронное программирование, промисы, async/await и все новые возможности ES2024.",
            lessons: [
                "Замыкания и область видимости",
                "Прототипы и наследование",
                "Асинхронность: Callbacks",
                "Промисы",
                "Async/Await",
                "Event Loop",
                "ES2024 новые возможности",
                "Практический проект"
            ]
        }
        // Добавьте остальные курсы по аналогии
    };
    
    useEffect(() => {
        // Имитация загрузки данных
        setTimeout(() => {
            const foundCourse = coursesData[courseId];
            if (foundCourse) {
                setCourse(foundCourse);
            }
            setLoading(false);
        }, 500);
    }, [courseId]);
    
    const handleConfirmEnrollment = async () => {
        setEnrolled(true);
        // Здесь можно добавить API запрос для сохранения записи
        console.log(`Пользователь ${user.email} записался на курс ${course.title}`);
        
        // Пример отправки на сервер:
        // const token = localStorage.getItem('token');
        // await fetch('http://localhost:5000/api/enroll', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     },
        //     body: JSON.stringify({ courseId: course.id })
        // });
    };
    
    const handleBackToDashboard = () => {
        navigate('/dashboard');
    };
    
    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <div>Загрузка курса...</div>
            </div>
        );
    }
    
    if (!course) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>Курс не найден</h2>
                <button onClick={handleBackToDashboard} style={{ marginTop: '20px', padding: '10px 20px' }}>
                    Вернуться к курсам
                </button>
            </div>
        );
    }
   
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-content">
                    <button className='top-menu-button logo-btn' onClick={() => handleBackToDashboard()}>
                        <img src={theme === 'light' ? logoIcon : logoLightIcon} alt="" />
                        <span>SchoolDev</span>
                    </button>
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
            
            <div className='course-card margin-top-course-page pointer-off'>
                    <h1 className="course-title course-title-course-page ">{course.title}</h1>
                    <img 
                        className='margin-top-course-page'
                        src={course.image} 
                        alt={course.title}
                        style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', marginBottom: '20px' }}
                    />
                    
                    <h2 className="course-title">Описание курса</h2>
                    <p style={{ lineHeight: '1.6', marginBottom: '30px' }}>{course.fullDescription || course.description}</p>
                    
                    <h2 className="course-title">Программа курса</h2>
                    <ul className='ul-course-page'>
                        {course.lessons.map((lesson, index) => (
                            <li key={index}>
                                <span className={course.id === 1 ? "circle-1" : course.id === 2 ? "circle-2" : "nnn"} style={{
                                    display: 'inline-block',
                                    width: '30px',
                                    height: '30px',
                                    color: 'white',
                                    borderRadius: '50%',
                                    textAlign: 'center',
                                    lineHeight: '30px',
                                    marginRight: '10px'
                                }}>{index + 1}</span>
                                {lesson}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="button-area">
                    <div className={course.id === 1 ? "btn-1-wrapper" : course.id === 2 ? "btn-2-wrapper" : "nnn"}>
                        <button className={course.id === 1 ? "btn-1" : course.id === 2 ? "btn-2" : "nnn"}>▶</button>
                        <div className={course.id === 1 ? "btn-1-text" : course.id === 2 ? "btn-2-text" : "nnn"}>К первому уроку →</div>
                    </div>
                </div>
        </div>
    );
}

export default CoursePage;
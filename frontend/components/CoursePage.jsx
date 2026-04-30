import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CoursePage({ user, onLogout }) {
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
            duration: "8 недель",
            level: "Начинающий",
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
            duration: "10 недель",
            level: "Средний",
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
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '10px',
                marginBottom: '30px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <button 
                    onClick={handleBackToDashboard}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#f3f4f6',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    ← Назад к курсам
                </button>
                <button 
                    onClick={onLogout}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Выйти
                </button>
            </header>
            
            {/* Course Content */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h1 style={{ marginBottom: '20px' }}>{course.title}</h1>
                    <img 
                        src={course.image} 
                        alt={course.title}
                        style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', marginBottom: '20px' }}
                    />
                    
                    <div style={{ marginBottom: '20px' }}>
                        <span style={{ display: 'inline-block', padding: '5px 10px', backgroundColor: '#e0e7ff', borderRadius: '5px', marginRight: '10px' }}>
                            {course.duration}
                        </span>
                        <span style={{ display: 'inline-block', padding: '5px 10px', backgroundColor: '#e0e7ff', borderRadius: '5px' }}>
                            {course.level}
                        </span>
                    </div>
                    
                    <h2>Описание курса</h2>
                    <p style={{ lineHeight: '1.6', marginBottom: '30px' }}>{course.fullDescription || course.description}</p>
                    
                    <h2>Программа курса</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {course.lessons.map((lesson, index) => (
                            <li key={index} style={{
                                padding: '10px',
                                margin: '10px 0',
                                backgroundColor: '#f9fafb',
                                borderRadius: '5px',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <span style={{
                                    display: 'inline-block',
                                    width: '30px',
                                    height: '30px',
                                    backgroundColor: '#4f46e5',
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
                
                <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', height: 'fit-content' }}>
                    {!enrolled ? (
                        <>
                            <h3>Готовы начать обучение?</h3>
                            <p style={{ margin: '20px 0', color: '#6b7280' }}>
                                После записи вам откроется доступ ко всем материалам курса.
                            </p>
                            <button 
                                onClick={handleConfirmEnrollment}
                                style={{
                                    width: '100%',
                                    padding: '15px',
                                    backgroundColor: '#4f46e5',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    cursor: 'pointer'
                                }}
                            >
                                Подтвердить запись
                            </button>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '50px', marginBottom: '20px' }}>✓</div>
                            <h3 style={{ color: '#10b981', marginBottom: '10px' }}>Вы успешно записаны!</h3>
                            <p style={{ marginBottom: '20px' }}>Доступ к курсу открыт. Приятного обучения!</p>
                            <button 
                                onClick={handleBackToDashboard}
                                style={{
                                    width: '100%',
                                    padding: '15px',
                                    backgroundColor: '#4f46e5',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                            >
                                Вернуться к курсам
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CoursePage;
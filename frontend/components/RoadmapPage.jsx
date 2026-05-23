// components/RoadmapPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@components/ThemeContext';
import '@styles/RoadmapPage.css';
import ChapterCard from '@components/ChapterCard';
import sunIcon from '@public/sun.svg';
import moonIcon from '@public/moon.svg';
import outIcon from '@public/out.svg';
import logoIcon from '@public/logo.svg';
import logoLightIcon from '@public/logo-light.svg';

// Данные roadmap для разных курсов
const roadmapsData = {
  1: { // React курс
    id: 1,
    title: "📘 React Roadmap",
    description: "Путь от новичка до профи · главы с подтемами и ответвлениями",
    chapters: [
      {
        id: 1,
        number: 'Глава 1',
        title: 'Основы React',
        description: 'Компоненты, JSX, состояние, пропсы — фундамент библиотеки.',
        subsections: ['⚛️ Виртуальный DOM', '📦 Компоненты', '🧩 JSX синтаксис', '🎨 PropTypes'],
        branches: [
          { name: 'React без JSX', desc: 'createElement вручную' },
          { name: 'Стилизация', desc: 'CSS-modules, Styled Components' }
        ]
      },
      {
        id: 2,
        number: 'Глава 2',
        title: 'Хуки (Hooks)',
        description: 'useState, useEffect, useContext — вся мощь функциональных компонентов.',
        subsections: ['🔁 useState', '🔄 useEffect', '🌐 useContext', '⚡ useRef, useMemo'],
        branches: [
          { name: 'Кастомные хуки', desc: 'Переиспользование логики' },
          { name: 'Хуки + TS', desc: 'Типизация useState' }
        ]
      },
      {
        id: 3,
        number: 'Глава 3',
        title: 'Управление состоянием',
        description: 'Redux, Zustand, Context API — выбираем инструмент под задачу.',
        subsections: ['📊 Context + useReducer', '🍓 Zustand', '🔴 Redux Toolkit', '🔄 RTK Query'],
        branches: [
          { name: 'Redux Saga', desc: 'Асинхронные действия' },
          { name: 'MobX', desc: 'Реактивные хранилища' }
        ]
      },
      {
        id: 4,
        number: 'Глава 4',
        title: 'Маршрутизация',
        description: 'React Router — навигация, защищённые маршруты, вложенные роуты.',
        subsections: ['🧭 BrowserRouter', '📄 Routes, Route', '🔗 Link, NavLink', '🛡️ Protected routes'],
        branches: [
          { name: 'React Router v7', desc: 'Новые возможности' },
          { name: 'TanStack Router', desc: 'Альтернатива' }
        ]
      },
      {
        id: 5,
        number: 'Глава 5',
        title: 'Работа с API',
        description: 'fetch, axios, React Query, кеширование и оптимизация запросов.',
        subsections: ['🌐 fetch / axios', '💾 React Query (TanStack)', '🔄 useSWR', '📡 WebSockets'],
        branches: [
          { name: 'GraphQL', desc: 'Apollo Client, Relay' },
          { name: 'RTK Query', desc: 'Встроенный в Redux' }
        ]
      }
    ]
  },
  2: { // JavaScript курс
    id: 2,
    title: "📘 JavaScript Roadmap",
    description: "Путь от новичка до JavaScript-профи · главы с подтемами и ответвлениями",
    chapters: [
      {
        id: 1,
        number: 'Глава 1',
        title: 'Основы JavaScript',
        description: 'Переменные, типы данных, функции, область видимости — база языка.',
        subsections: ['📦 var/let/const', '🔁 Циклы и условия', '🎯 Функции', '📚 Массивы и объекты'],
        branches: [
          { name: 'Строгий режим', desc: '"use strict" и его влияние' },
          { name: 'Замыкания', desc: 'Функции внутри функций' }
        ]
      },
      {
        id: 2,
        number: 'Глава 2',
        title: 'Асинхронность',
        description: 'Callback, Promise, async/await — учимся работать с асинхронным кодом.',
        subsections: ['⏰ Callback функции', '💫 Promise', '⚡ async/await', '🔄 Event Loop'],
        branches: [
          { name: 'Promise.all / race', desc: 'Работа с несколькими промисами' },
          { name: 'AbortController', desc: 'Отмена запросов' }
        ]
      },
      {
        id: 3,
        number: 'Глава 3',
        title: 'Работа с API',
        description: 'fetch, axios, обработка ошибок, интерцепторы.',
        subsections: ['🌐 fetch API', '📡 axios', '🔄 HTTP методы', '🎯 Обработка ошибок'],
        branches: [
          { name: 'WebSocket', desc: 'Двусторонняя связь' },
          { name: 'GraphQL', desc: 'Альтернатива REST' }
        ]
      },
      {
        id: 4,
        number: 'Глава 4',
        title: 'ООП в JavaScript',
        description: 'Прототипы, классы, наследование, инкапсуляция.',
        subsections: ['🧬 Прототипное наследование', '🏗️ Классы ES6', '🔒 Приватные поля', '🎨 Полиморфизм'],
        branches: [
          { name: 'Миксины', desc: 'Примеси в классах' },
          { name: 'Декораторы', desc: 'Новый стандарт' }
        ]
      },
      {
        id: 5,
        number: 'Глава 5',
        title: 'Модули и сборка',
        description: 'ES Modules, CommonJS, Webpack, Vite.',
        subsections: ['📦 import/export', '🔧 Webpack настройка', '⚡ Vite быстрый старт', '🎯 Tree shaking'],
        branches: [
          { name: 'Rollup', desc: 'Для библиотек' },
          { name: 'esbuild', desc: 'Максимальная скорость' }
        ]
      }
    ]
  }
};

function RoadmapPage({ user, onLogout }) {
  const { theme, toggleTheme } = useTheme();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    // Загружаем roadmap для конкретного курса
    setTimeout(() => {
      const foundRoadmap = roadmapsData[courseId];
      if (foundRoadmap) {
        setRoadmap(foundRoadmap);
      }
      setLoading(false);
    }, 300);
  }, [courseId]);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="roadmap-loading">
        <div>Загрузка roadmap...</div>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="roadmap-error">
        <h2>Roadmap не найден для этого курса</h2>
        <button onClick={handleBackToDashboard}>Вернуться к курсам</button>
      </div>
    );
  }

  return (
    <div className="roadmap-page-container">
      {/* Header - такой же как в CoursePage для единообразия */}
      <header className="dashboard-header">
        <div className="header-content">
          <button className="top-menu-button logo-btn" onClick={handleBackToDashboard}>
            <img src={theme === 'light' ? logoIcon : logoLightIcon} alt="" />
            <span>SchoolDev</span>
          </button>
          <div className="header-buttons">
            <button className="top-menu-button" onClick={toggleTheme}>
              <img src={theme === 'light' ? moonIcon : sunIcon} alt="" />
            </button>
            <button className="top-menu-button" onClick={onLogout}>
              <img src={outIcon} alt="" />
            </button>
          </div>
        </div>
      </header>

      {/* Основной контент roadmap */}
      <div className="roadmap-page">
        <div className="roadmap-header">
          <h1 className="roadmap-title">{roadmap.title}</h1>
          <p className="roadmap-subtitle">{roadmap.description}</p>
        </div>

        <div className="chapters-grid">
          {roadmap.chapters.map(chapter => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>

        <div className="roadmap-footer">
          <span>💡 Подтемы — для понимания основ</span>
          <span>🔀 Ответвления — для углублённого изучения</span>
        </div>
      </div>
    </div>
  );
}

export default RoadmapPage;
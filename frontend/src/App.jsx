import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import Dashboard from '../components/Dashboard';
import CoursePage from '../components/CoursePage';
import { ThemeProvider } from '../components/ThemeContext';
import RoadmapPage from '../components/RoadmapPage';
import ScrollToTop from '../components/ScrollToTop';

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
    
    const ProtectedRoute = ({ children }) => {
        return user ? children : <Navigate to="/login" />;
    };
    
    if (loading) return <div>Загрузка...</div>;
    
    return (
        <ThemeProvider>
        <Router>
             <ScrollToTop />
            <Routes>
                <Route path="/login" element={
                    !user ? <AuthForm onLogin={handleLogin} /> : <Navigate to="/dashboard" />
                } />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard user={user} onLogout={handleLogout} />
                    </ProtectedRoute>
                } />
                <Route path="/course/:courseId" element={
                    <ProtectedRoute>
                        <CoursePage user={user} onLogout={handleLogout} />
                    </ProtectedRoute>
                } />
                <Route path="/course/:courseId/roadmap" element={
                    <ProtectedRoute>
                        <RoadmapPage user={user} onLogout={handleLogout} />
                    </ProtectedRoute>
                } />
                <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
            </Routes>
        </Router>
        </ThemeProvider>
    );
}

export default App;
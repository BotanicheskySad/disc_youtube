// components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 'smooth' если хотите плавную прокрутку
    });
  }, [pathname]); // Срабатывает при каждом изменении пути

  return null;
}

export default ScrollToTop;
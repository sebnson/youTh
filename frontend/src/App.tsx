import './App.css';
import LNB from './pages/components/LNB';
import CardLayout from './pages/components/CardLayout';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation(); // useParams 대신 useLocation 사용

  useEffect(() => {
    // URL 경로가 '/login'인지 확인
    if (location.pathname === '/login') {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [location]);

  if (isLogin) {
    return <Outlet />; // 자식 라우트(Login 컴포넌트)만 렌더링
  }

  return (
    <>
      <LNB />
      <CardLayout>
        <Outlet />
      </CardLayout>
    </>
  );
};

export default App;

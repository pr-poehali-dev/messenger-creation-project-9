import { useState, useEffect } from 'react';
import Landing from '@/pages/Landing';
import Auth from '@/pages/Auth';
import Game from '@/pages/Game';
import AdminPanel from '@/pages/AdminPanel';
import { User } from '@/types/game';
import { getUser } from '@/utils/storage';

type Page = 'landing' | 'login' | 'register' | 'game' | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getUser();
    if (user) {
      setCurrentUser(user);
      setCurrentPage('game');
    }
  }, []);

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('game');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('landing');
  };

  useEffect(() => {
    if (window.location.hash === '#admin') {
      setCurrentPage('admin');
    }
  }, []);

  if (currentPage === 'admin') {
    return <AdminPanel />;
  }

  if (currentPage === 'game' && currentUser) {
    return <Game user={currentUser} onLogout={handleLogout} />;
  }

  if (currentPage === 'login') {
    return (
      <Auth
        mode="login"
        onSuccess={handleAuthSuccess}
        onBack={() => setCurrentPage('landing')}
      />
    );
  }

  if (currentPage === 'register') {
    return (
      <Auth
        mode="register"
        onSuccess={handleAuthSuccess}
        onBack={() => setCurrentPage('landing')}
      />
    );
  }

  return <Landing onNavigate={(page) => setCurrentPage(page)} />;
}
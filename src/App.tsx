import { useState, useEffect } from 'react';
import Landing from '@/pages/Landing';
import Auth from '@/pages/Auth';
import Game from '@/pages/Game';
import { User } from '@/types/game';
import { getUser } from '@/utils/storage';

type Page = 'landing' | 'login' | 'register' | 'game';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      console.log('[App] Loading user from storage...');
      const user = getUser();
      if (user) {
        console.log('[App] User found:', user.username);
        setCurrentUser(user);
        setCurrentPage('game');
      } else {
        console.log('[App] No user found, showing landing');
      }
    } catch (error) {
      console.error('[App] Error loading user:', error);
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
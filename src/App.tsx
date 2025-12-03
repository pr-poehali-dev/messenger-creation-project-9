import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import AuthScreen from './components/AuthScreen';
import FarmScreen from './components/FarmScreen';
import MarketplaceScreen from './components/MarketplaceScreen';

interface Player {
  id: number;
  username: string;
  session_token: string;
}

type Screen = 'menu' | 'farm' | 'marketplace';

export default function App() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [screen, setScreen] = useState<Screen>('menu');

  useEffect(() => {
    const savedPlayer = localStorage.getItem('nanofarm_player');
    if (savedPlayer) {
      setPlayer(JSON.parse(savedPlayer));
    }
  }, []);

  const handleLogin = (playerId: number, username: string, sessionToken: string) => {
    const playerData: Player = { id: playerId, username, session_token: sessionToken };
    setPlayer(playerData);
    localStorage.setItem('nanofarm_player', JSON.stringify(playerData));
  };

  const handleLogout = () => {
    setPlayer(null);
    localStorage.removeItem('nanofarm_player');
    setScreen('menu');
  };

  if (!player) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  if (screen === 'farm') {
    return <FarmScreen playerId={player.id} username={player.username} onLogout={handleLogout} />;
  }

  if (screen === 'marketplace') {
    return <MarketplaceScreen onBack={() => setScreen('menu')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-8xl animate-bounce">🧬</div>
        <div className="absolute top-20 right-20 text-7xl animate-pulse">🛍️</div>
        <div className="absolute bottom-20 left-20 text-9xl animate-spin-slow">🌻</div>
        <div className="absolute bottom-10 right-10 text-8xl animate-bounce">🚀</div>
      </div>

      <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-purple-800 mb-2">🎮 Игровой портал</h1>
          <p className="text-purple-600 text-lg">Привет, {player.username}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <button
            onClick={() => setScreen('farm')}
            className="group relative overflow-hidden bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-8 text-left transition-transform hover:scale-105 active:scale-95"
          >
            <div className="text-6xl mb-4">🧬</div>
            <h2 className="text-2xl font-bold text-white mb-2">Нано-Ферма</h2>
            <p className="text-emerald-100">Выращивай растения и создавай гибриды</p>
            <div className="absolute top-4 right-4 text-white/20 text-8xl group-hover:rotate-12 transition-transform">
              🌱
            </div>
          </button>

          <button
            onClick={() => setScreen('marketplace')}
            className="group relative overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl p-8 text-left transition-transform hover:scale-105 active:scale-95"
          >
            <div className="text-6xl mb-4">🛍️</div>
            <h2 className="text-2xl font-bold text-white mb-2">Маркетплейс</h2>
            <p className="text-blue-100">Покупай товары из 6 категорий</p>
            <div className="absolute top-4 right-4 text-white/20 text-8xl group-hover:-rotate-12 transition-transform">
              💳
            </div>
          </button>
        </div>

        <Button variant="outline" onClick={handleLogout} className="w-full">
          Выйти из аккаунта
        </Button>
      </div>

      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
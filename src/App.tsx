import { useState, useEffect } from 'react';
import AuthScreen from './components/AuthScreen';
import GameScreen from './components/GameScreen';
import { Player } from './types/game';

export default function App() {
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const savedPlayer = localStorage.getItem('player');
    if (savedPlayer) {
      setPlayer(JSON.parse(savedPlayer));
    }
  }, []);

  const handleLogin = (playerId: number, username: string, sessionToken: string) => {
    const playerData: Player = { id: playerId, username, session_token: sessionToken };
    setPlayer(playerData);
    localStorage.setItem('player', JSON.stringify(playerData));
  };

  const handleLogout = () => {
    setPlayer(null);
    localStorage.removeItem('player');
  };

  if (!player) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return <GameScreen player={player} onLogout={handleLogout} />;
}

import { useState, useEffect } from 'react';
import AuthScreen from './components/AuthScreen';
import MarketplaceScreen from './components/MarketplaceScreen';

interface Player {
  id: number;
  username: string;
  session_token: string;
}

export default function App() {
  const [player, setPlayer] = useState<Player | null>(null);

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
  };

  if (!player) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return <MarketplaceScreen username={player.username} onLogout={handleLogout} />;
}
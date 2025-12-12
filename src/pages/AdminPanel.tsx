import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [goldCoins, setGoldCoins] = useState('');
  const [coins, setCoins] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey.length > 0) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Введите ключ администратора');
    }
  };

  const handleGrantBonus = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('https://functions.poehali.dev/f7faeda8-8a63-4017-802f-7953bb643b76', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': adminKey,
        },
        body: JSON.stringify({
          username,
          gold_coins: parseInt(goldCoins) || 0,
          coins: parseInt(coins) || 0,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка начисления бонуса');
      }

      setMessage(
        `✅ Успешно начислено игроку ${data.username}:\n` +
        `Золотых монет: +${data.added_gold_coins} (всего: ${data.total_gold_coins})\n` +
        `Обычных монет: +${data.added_coins} (всего: ${data.total_coins})`
      );
      setUsername('');
      setGoldCoins('');
      setCoins('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
        <div className="bg-black/60 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-purple-500/30">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="Shield" size={32} className="text-purple-400" />
            <h1 className="text-2xl font-bold text-white">Админ-панель</h1>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm text-purple-300 mb-2">
                Секретный ключ администратора
              </label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full bg-white/10 text-white px-4 py-3 rounded-xl border border-purple-500/30 focus:border-purple-500 focus:outline-none"
                placeholder="Введите ключ..."
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-200 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              Войти
            </button>
          </form>

          <button
            onClick={() => navigate('/game')}
            className="w-full mt-4 text-purple-300 hover:text-white transition-colors text-sm"
          >
            ← Вернуться к игре
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-black/60 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Icon name="Crown" size={32} className="text-yellow-400" />
              <h1 className="text-3xl font-bold text-white">Панель администратора</h1>
            </div>
            <button
              onClick={() => navigate('/game')}
              className="text-purple-300 hover:text-white transition-colors"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          <form onSubmit={handleGrantBonus} className="space-y-6">
            <div>
              <label className="block text-sm text-purple-300 mb-2 font-semibold">
                Имя игрока (username)
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/10 text-white px-4 py-3 rounded-xl border border-purple-500/30 focus:border-purple-500 focus:outline-none"
                placeholder="Введите username..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-yellow-400 mb-2 font-semibold">
                  Золотые монеты
                </label>
                <input
                  type="number"
                  value={goldCoins}
                  onChange={(e) => setGoldCoins(e.target.value)}
                  className="w-full bg-white/10 text-white px-4 py-3 rounded-xl border border-yellow-500/30 focus:border-yellow-500 focus:outline-none"
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm text-blue-400 mb-2 font-semibold">
                  Обычные монеты
                </label>
                <input
                  type="number"
                  value={coins}
                  onChange={(e) => setCoins(e.target.value)}
                  className="w-full bg-white/10 text-white px-4 py-3 rounded-xl border border-blue-500/30 focus:border-blue-500 focus:outline-none"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            {message && (
              <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-green-200 text-sm whitespace-pre-line">
                {message}
              </div>
            )}

            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-200 text-sm">
                ❌ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Начисление...' : '💰 Начислить бонус'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-purple-500/30">
            <div className="text-sm text-purple-300 space-y-2">
              <p className="font-semibold">📋 Инструкция:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Введите username игрока из базы данных</li>
                <li>Укажите количество золотых и/или обычных монет</li>
                <li>Бонус будет добавлен к текущему балансу игрока</li>
                <li>Игрок увидит обновленный баланс при следующем входе</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
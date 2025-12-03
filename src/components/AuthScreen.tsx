import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface AuthScreenProps {
  onLogin: (playerId: number, username: string, sessionToken: string) => void;
}

export default function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/6fa55cf5-f8a6-4405-9007-73fbfdd881e0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isLogin ? 'login' : 'register',
          username,
          email: !isLogin ? email : undefined,
          password
        })
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.player_id, data.username, data.session_token);
      } else {
        setError(data.error || 'Ошибка');
      }
    } catch (err) {
      setError('Ошибка подключения');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-300 to-cyan-400 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-8xl animate-bounce">🌱</div>
        <div className="absolute top-20 right-20 text-7xl animate-pulse">🧪</div>
        <div className="absolute bottom-20 left-20 text-9xl animate-spin-slow">🌻</div>
        <div className="absolute bottom-10 right-10 text-8xl animate-bounce">🔬</div>
      </div>

      <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border-4 border-emerald-500">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-emerald-800 mb-2">🧬 Нано-Ферма</h1>
          <p className="text-emerald-600 text-lg">Лаборатория генетика</p>
        </div>

        <div className="flex gap-2 mb-6">
          <Button
            variant={isLogin ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setIsLogin(true)}
          >
            Вход
          </Button>
          <Button
            variant={!isLogin ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setIsLogin(false)}
          >
            Регистрация
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Имя пользователя"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
          )}

          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Загрузка...' : isLogin ? 'Войти' : 'Создать аккаунт'}
          </Button>
        </form>
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

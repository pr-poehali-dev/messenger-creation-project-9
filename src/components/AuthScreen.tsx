import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login, register } from '@/lib/api';

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
      if (isLogin) {
        const result = await login(username, password);
        onLogin(result.player_id, result.username, result.session_token);
      } else {
        const result = await register(username, email, password);
        onLogin(result.player_id, result.username, result.session_token);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-blue-300 to-green-400">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-600 to-green-500"></div>
          
          <div className="absolute top-20 left-10 animate-float">
            <div className="text-6xl drop-shadow-lg">☁️</div>
          </div>
          <div className="absolute top-32 right-20 animate-float-delayed">
            <div className="text-7xl drop-shadow-lg">☁️</div>
          </div>
          <div className="absolute top-16 left-1/3 animate-float-slow">
            <div className="text-5xl drop-shadow-lg">☁️</div>
          </div>
          
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 animate-pulse-slow">
            <div className="text-8xl drop-shadow-2xl">🏰</div>
          </div>
          
          <div className="absolute bottom-24 left-1/3 animate-bounce-slow">
            <div className="text-6xl drop-shadow-xl">🏠</div>
          </div>
          
          <div className="absolute bottom-32 right-1/4 animate-pulse-slow">
            <div className="text-7xl drop-shadow-xl">🌾</div>
          </div>
          
          <div className="absolute bottom-28 right-1/3 animate-wiggle">
            <div className="text-5xl drop-shadow-lg">🚜</div>
          </div>
          
          <div className="absolute bottom-20 left-1/2 animate-bounce-slow">
            <div className="text-4xl drop-shadow-lg">🌳</div>
          </div>
          
          <div className="absolute top-1/3 right-1/3 animate-float">
            <div className="text-5xl drop-shadow-lg">🌻</div>
          </div>
          
          <div className="absolute bottom-40 left-20 animate-wiggle-delayed">
            <div className="text-3xl drop-shadow-md">👷</div>
          </div>
          
          <div className="absolute bottom-36 right-28 animate-walk">
            <div className="text-3xl drop-shadow-md">🧑‍🌾</div>
          </div>
          
          <div className="absolute top-1/4 left-1/2 animate-fly">
            <div className="text-3xl drop-shadow-md">🦅</div>
          </div>
          
          <div className="absolute bottom-24 left-1/4 animate-pulse-slow">
            <div className="text-5xl drop-shadow-lg">🏛️</div>
          </div>
          
          <div className="absolute bottom-28 right-1/2 animate-bounce-slow">
            <div className="text-4xl drop-shadow-lg">🍎</div>
          </div>
          
          <div className="absolute top-40 right-1/4 animate-rotate-slow">
            <div className="text-5xl drop-shadow-lg">☀️</div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-200/20 via-transparent to-transparent animate-shimmer"></div>
        </div>
      </div>

      <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border-4 border-yellow-400">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2 drop-shadow-md animate-bounce-subtle">
            🏰 City Builder
          </h1>
          <p className="text-gray-600 text-lg">
            Построй свой город и ферму
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          <Button
            variant={isLogin ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => {
              setIsLogin(true);
              setError('');
            }}
          >
            Вход
          </Button>
          <Button
            variant={!isLogin ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => {
              setIsLogin(false);
              setError('');
            }}
          >
            Регистрация
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Имя пользователя
            </label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите имя"
              required
              minLength={3}
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Пароль
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </form>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        
        @keyframes walk {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(30px); }
        }
        
        @keyframes fly {
          0% { transform: translate(0, 0); }
          25% { transform: translate(100px, -50px); }
          50% { transform: translate(200px, 0); }
          75% { transform: translate(300px, -30px); }
          100% { transform: translate(400px, 0); }
        }
        
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 8s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }
        
        .animate-wiggle {
          animation: wiggle 3s ease-in-out infinite;
        }
        
        .animate-wiggle-delayed {
          animation: wiggle 4s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-walk {
          animation: walk 8s ease-in-out infinite;
        }
        
        .animate-fly {
          animation: fly 20s linear infinite;
        }
        
        .animate-rotate-slow {
          animation: rotate-slow 30s linear infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

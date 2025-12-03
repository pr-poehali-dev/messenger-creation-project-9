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
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-green-700 via-green-600 to-green-500"></div>
          
          <div className="absolute top-20 left-10 animate-float">
            <div className="text-9xl drop-shadow-2xl filter brightness-110">☁️</div>
          </div>
          <div className="absolute top-32 right-20 animate-float-delayed">
            <div className="text-[140px] drop-shadow-2xl filter brightness-110">☁️</div>
          </div>
          <div className="absolute top-16 left-1/3 animate-float-slow">
            <div className="text-8xl drop-shadow-2xl filter brightness-110">☁️</div>
          </div>
          <div className="absolute top-48 right-1/3 animate-float-very-slow">
            <div className="text-7xl drop-shadow-2xl filter brightness-110">☁️</div>
          </div>
          
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 animate-pulse-glow">
            <div className="text-[160px] drop-shadow-2xl">🏰</div>
          </div>
          
          <div className="absolute bottom-32 left-1/3 animate-bounce-realistic">
            <div className="text-9xl drop-shadow-2xl">🏠</div>
          </div>
          
          <div className="absolute bottom-40 right-1/4 animate-sway">
            <div className="text-[120px] drop-shadow-2xl">🌾</div>
          </div>
          
          <div className="absolute bottom-36 right-1/3 animate-drive">
            <div className="text-8xl drop-shadow-2xl">🚜</div>
          </div>
          
          <div className="absolute bottom-28 left-1/2 animate-tree-sway">
            <div className="text-7xl drop-shadow-2xl">🌳</div>
          </div>
          
          <div className="absolute top-1/3 right-1/3 animate-grow">
            <div className="text-8xl drop-shadow-2xl">🌻</div>
          </div>
          
          <div className="absolute bottom-48 left-20 animate-work">
            <div className="text-6xl drop-shadow-xl">👷</div>
          </div>
          
          <div className="absolute bottom-44 right-28 animate-walk-smooth">
            <div className="text-6xl drop-shadow-xl">🧑‍🌾</div>
          </div>
          
          <div className="absolute top-1/4 left-1/2 animate-bird-fly">
            <div className="text-5xl drop-shadow-lg">🦅</div>
          </div>
          
          <div className="absolute bottom-32 left-1/4 animate-glow">
            <div className="text-8xl drop-shadow-2xl">🏛️</div>
          </div>
          
          <div className="absolute bottom-36 right-1/2 animate-apple-swing">
            <div className="text-7xl drop-shadow-xl">🍎</div>
          </div>
          
          <div className="absolute top-40 right-1/4 animate-sun-rotate">
            <div className="text-9xl drop-shadow-2xl filter brightness-125">☀️</div>
          </div>
          
          <div className="absolute bottom-20 left-16 animate-grow-delayed">
            <div className="text-5xl drop-shadow-lg">🌿</div>
          </div>
          
          <div className="absolute bottom-24 right-16 animate-sway-delayed">
            <div className="text-6xl drop-shadow-lg">🌷</div>
          </div>
          
          <div className="absolute top-1/3 left-20 animate-float-gentle">
            <div className="text-4xl drop-shadow-md">🦋</div>
          </div>
          
          <div className="absolute bottom-40 left-1/2 animate-hop">
            <div className="text-4xl drop-shadow-md">🐰</div>
          </div>
          
          <div className="absolute top-2/3 right-20 animate-buzz">
            <div className="text-3xl drop-shadow-md">🐝</div>
          </div>
          
          <div className="absolute bottom-52 left-1/3 animate-glow-pulse">
            <div className="text-6xl drop-shadow-xl">💎</div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-200/30 via-transparent to-transparent animate-shimmer-wave"></div>
          
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-sparkle"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full animate-sparkle-delayed"></div>
            <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-white rounded-full animate-sparkle-slow"></div>
          </div>
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
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-25px) scale(1.05); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-40px) scale(1.08); }
        }
        
        @keyframes float-very-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-35px) scale(1.06); }
        }
        
        @keyframes float-gentle {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(50px, -30px) rotate(5deg); }
          50% { transform: translate(100px, 0) rotate(0deg); }
          75% { transform: translate(50px, 30px) rotate(-5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        @keyframes bounce-realistic {
          0%, 100% { transform: translateY(0px) scale(1, 1); }
          10% { transform: translateY(-20px) scale(1.05, 0.95); }
          30% { transform: translateY(-30px) scale(0.95, 1.05); }
          50% { transform: translateY(-25px) scale(1, 1); }
          70% { transform: translateY(0px) scale(1.02, 0.98); }
          85% { transform: translateY(-10px) scale(0.98, 1.02); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); filter: brightness(1) drop-shadow(0 0 0 rgba(255, 215, 0, 0)); }
          50% { transform: scale(1.15); filter: brightness(1.2) drop-shadow(0 0 30px rgba(255, 215, 0, 0.8)); }
        }
        
        @keyframes glow {
          0%, 100% { filter: brightness(1) drop-shadow(0 0 0 rgba(255, 255, 255, 0)); }
          50% { filter: brightness(1.3) drop-shadow(0 0 20px rgba(255, 255, 255, 0.6)); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { transform: scale(1); filter: brightness(1) drop-shadow(0 0 0 rgba(138, 43, 226, 0)); }
          50% { transform: scale(1.2); filter: brightness(1.4) drop-shadow(0 0 40px rgba(138, 43, 226, 0.9)); }
        }
        
        @keyframes sway {
          0%, 100% { transform: rotate(-5deg) scale(1); }
          50% { transform: rotate(5deg) scale(1.05); }
        }
        
        @keyframes sway-delayed {
          0%, 100% { transform: rotate(-3deg) scale(1); }
          50% { transform: rotate(3deg) scale(1.08); }
        }
        
        @keyframes tree-sway {
          0%, 100% { transform: rotate(-2deg); transform-origin: bottom center; }
          50% { transform: rotate(2deg); transform-origin: bottom center; }
        }
        
        @keyframes drive {
          0%, 100% { transform: translateX(0px) rotate(-2deg); }
          50% { transform: translateX(50px) rotate(2deg); }
        }
        
        @keyframes work {
          0%, 100% { transform: rotate(-5deg) translateY(0); }
          25% { transform: rotate(5deg) translateY(-10px); }
          50% { transform: rotate(-5deg) translateY(0); }
          75% { transform: rotate(5deg) translateY(-10px); }
        }
        
        @keyframes walk-smooth {
          0% { transform: translateX(0px) scaleX(1); }
          25% { transform: translateX(30px) scaleX(1) translateY(-5px); }
          50% { transform: translateX(60px) scaleX(-1); }
          75% { transform: translateX(30px) scaleX(-1) translateY(-5px); }
          100% { transform: translateX(0px) scaleX(1); }
        }
        
        @keyframes bird-fly {
          0% { transform: translate(0, 0) rotate(-10deg); }
          15% { transform: translate(150px, -80px) rotate(5deg); }
          30% { transform: translate(300px, -40px) rotate(-5deg); }
          45% { transform: translate(450px, -100px) rotate(10deg); }
          60% { transform: translate(600px, -60px) rotate(-10deg); }
          75% { transform: translate(750px, -90px) rotate(5deg); }
          100% { transform: translate(900px, -50px) rotate(0deg); }
        }
        
        @keyframes grow {
          0%, 100% { transform: scale(0.9); }
          50% { transform: scale(1.15); }
        }
        
        @keyframes grow-delayed {
          0%, 100% { transform: scale(0.85); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes apple-swing {
          0%, 100% { transform: rotate(-10deg); transform-origin: top center; }
          50% { transform: rotate(10deg); transform-origin: top center; }
        }
        
        @keyframes sun-rotate {
          0% { transform: rotate(0deg) scale(1); filter: brightness(1.2); }
          50% { transform: rotate(180deg) scale(1.1); filter: brightness(1.4); }
          100% { transform: rotate(360deg) scale(1); filter: brightness(1.2); }
        }
        
        @keyframes hop {
          0%, 100% { transform: translateX(0) translateY(0) scaleX(1); }
          25% { transform: translateX(20px) translateY(-20px) scaleX(1); }
          50% { transform: translateX(40px) translateY(0) scaleX(-1); }
          75% { transform: translateX(20px) translateY(-15px) scaleX(-1); }
        }
        
        @keyframes buzz {
          0% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(5px, -5px) rotate(10deg); }
          20% { transform: translate(-5px, 5px) rotate(-10deg); }
          30% { transform: translate(10px, 0) rotate(5deg); }
          40% { transform: translate(-10px, -5px) rotate(-5deg); }
          50% { transform: translate(0, 10px) rotate(0deg); }
          60% { transform: translate(8px, -8px) rotate(8deg); }
          70% { transform: translate(-8px, 8px) rotate(-8deg); }
          80% { transform: translate(6px, -3px) rotate(6deg); }
          90% { transform: translate(-6px, 3px) rotate(-6deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        @keyframes shimmer-wave {
          0%, 100% { opacity: 0.2; transform: translateY(0); }
          50% { opacity: 0.5; transform: translateY(-10px); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes sparkle-delayed {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(2) rotate(180deg); }
        }
        
        @keyframes sparkle-slow {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.8); }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        .animate-float { animation: float 7s ease-in-out infinite; }
        .animate-float-delayed { animation: float 9s ease-in-out infinite; animation-delay: 2s; }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
        .animate-float-very-slow { animation: float-very-slow 15s ease-in-out infinite; animation-delay: 3s; }
        .animate-float-gentle { animation: float-gentle 20s ease-in-out infinite; }
        .animate-bounce-realistic { animation: bounce-realistic 5s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 6s ease-in-out infinite; }
        .animate-glow { animation: glow 5s ease-in-out infinite; }
        .animate-glow-pulse { animation: glow-pulse 4s ease-in-out infinite; }
        .animate-sway { animation: sway 4s ease-in-out infinite; }
        .animate-sway-delayed { animation: sway-delayed 5s ease-in-out infinite; animation-delay: 1s; }
        .animate-tree-sway { animation: tree-sway 6s ease-in-out infinite; }
        .animate-drive { animation: drive 10s ease-in-out infinite; }
        .animate-work { animation: work 3s ease-in-out infinite; }
        .animate-walk-smooth { animation: walk-smooth 12s ease-in-out infinite; }
        .animate-bird-fly { animation: bird-fly 25s linear infinite; }
        .animate-grow { animation: grow 6s ease-in-out infinite; }
        .animate-grow-delayed { animation: grow-delayed 7s ease-in-out infinite; animation-delay: 2s; }
        .animate-apple-swing { animation: apple-swing 4s ease-in-out infinite; }
        .animate-sun-rotate { animation: sun-rotate 40s linear infinite; }
        .animate-hop { animation: hop 6s ease-in-out infinite; }
        .animate-buzz { animation: buzz 2s ease-in-out infinite; }
        .animate-shimmer-wave { animation: shimmer-wave 4s ease-in-out infinite; }
        .animate-sparkle { animation: sparkle 3s ease-in-out infinite; }
        .animate-sparkle-delayed { animation: sparkle-delayed 4s ease-in-out infinite; animation-delay: 1.5s; }
        .animate-sparkle-slow { animation: sparkle-slow 5s ease-in-out infinite; animation-delay: 2.5s; }
        .animate-bounce-subtle { animation: bounce-subtle 2.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
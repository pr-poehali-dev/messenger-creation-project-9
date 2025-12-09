import Icon from '@/components/ui/icon';

interface LandingProps {
  onNavigate: (page: 'login' | 'register') => void;
}

export default function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <div className="text-8xl mb-6 animate-bounce">🐉</div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Peeky
          </h1>
          <p className="text-2xl text-purple-300 mb-8">
            Стань повелителем драконов и построй свою Peeky!
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => onNavigate('login')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-xl
                hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-105"
            >
              Войти
            </button>
            <button
              onClick={() => onNavigate('register')}
              className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl font-bold text-xl
                hover:from-yellow-500 hover:to-orange-500 transition-all transform hover:scale-105"
            >
              Начать игру
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center">
              <Icon name="Flame" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Кликай и зарабатывай</h3>
            <p className="text-purple-300">
              Нажимай на дракона, получай монеты и прокачивай свою силу
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Icon name="TrendingUp" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Покупай улучшения</h3>
            <p className="text-purple-300">
              Развивай свою империю через магазин улучшений и получай пассивный доход
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-600 to-green-600 rounded-full flex items-center justify-center">
              <Icon name="Crown" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Прокачивай уровень</h3>
            <p className="text-purple-300">
              Повышай уровень и становись величайшим драконьим императором
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-12 border border-purple-500/30">
          <h2 className="text-3xl font-bold mb-6 text-center">Особенности игры</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Icon name="Check" size={24} className="text-green-400 mt-1" />
              <div>
                <h4 className="font-bold mb-1">Автосохранение</h4>
                <p className="text-purple-300 text-sm">Твой прогресс сохраняется автоматически</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Icon name="Check" size={24} className="text-green-400 mt-1" />
              <div>
                <h4 className="font-bold mb-1">Пассивный доход</h4>
                <p className="text-purple-300 text-sm">Зарабатывай монеты даже когда не играешь</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Icon name="Check" size={24} className="text-green-400 mt-1" />
              <div>
                <h4 className="font-bold mb-1">Система энергии</h4>
                <p className="text-purple-300 text-sm">Энергия восстанавливается со временем</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Icon name="Check" size={24} className="text-green-400 mt-1" />
              <div>
                <h4 className="font-bold mb-1">Множество улучшений</h4>
                <p className="text-purple-300 text-sm">6 уникальных улучшений для развития</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 text-purple-400">
          <p>© 2024 Peeky. Все права защищены.</p>
        </div>
      </div>
    </div>
  );
}
import Icon from '@/components/ui/icon';

interface GameHeaderProps {
  username: string;
  level: number;
  coins: number;
  goldCoins: number;
  coinsPerSecond: number;
  passiveIncomeIndicator: boolean;
  onShopClick: () => void;
  onProfileClick: () => void;
  onGoldClick: () => void;
  onQuestClick: () => void;
  onLeaderboardClick: () => void;
  onAchievementsClick: () => void;
  onLogout: () => void;
  formatNumber: (num: number) => string;
}

export default function GameHeader({
  username,
  level,
  coins,
  goldCoins,
  coinsPerSecond,
  passiveIncomeIndicator,
  onShopClick,
  onProfileClick,
  onGoldClick,
  onQuestClick,
  onLeaderboardClick,
  onAchievementsClick,
  onLogout,
  formatNumber
}: GameHeaderProps) {
  return (
    <div className="relative bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-blue-900/40 backdrop-blur-sm border-b-2 border-blue-300/50 p-3 sm:p-4 shadow-lg shadow-blue-500/20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none"></div>
      <div className="absolute top-0 left-4 text-2xl">❄️</div>
      <div className="absolute top-1 right-8 text-xl animate-pulse">⭐</div>
      <div className="absolute bottom-1 left-1/4 text-lg opacity-70">✨</div>
      <div className="absolute top-2 left-1/3 text-sm opacity-50">❄️</div>
      <div className="absolute bottom-2 right-1/4 text-lg opacity-60">🎄</div>
      
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 relative z-10">
        <div className="w-full sm:w-auto">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] flex items-center gap-2">
            🎅 Peeky 🎄
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 font-medium">Игрок: {username} • Уровень {level}</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={onShopClick}
            className="p-2 bg-gradient-to-br from-red-500 to-green-600 border-2 border-green-300/50 rounded-lg hover:from-red-400 hover:to-green-500 transition-all shadow-lg shadow-green-500/30"
            title="Магазин"
          >
            <Icon name="ShoppingBag" size={20} />
          </button>
          <button
            onClick={onQuestClick}
            className="p-2 bg-purple-600/40 border-2 border-purple-400/50 rounded-lg hover:bg-purple-500/50 transition-all shadow-lg shadow-purple-500/30"
            title="Квесты"
          >
            <Icon name="Trophy" size={20} />
          </button>
          <button
            onClick={onLeaderboardClick}
            className="p-2 bg-yellow-600/40 border-2 border-yellow-400/50 rounded-lg hover:bg-yellow-500/50 transition-all shadow-lg shadow-yellow-500/30"
            title="Таблица лидеров"
          >
            <Icon name="Award" size={20} />
          </button>
          <button
            onClick={onAchievementsClick}
            className="p-2 bg-amber-600/40 border-2 border-amber-400/50 rounded-lg hover:bg-amber-500/50 transition-all shadow-lg shadow-amber-500/30"
            title="Достижения"
          >
            <Icon name="Medal" size={20} />
          </button>
          <button
            onClick={onGoldClick}
            className="relative w-[44px] h-[44px] bg-gradient-to-br from-yellow-400 to-amber-500 border-2 border-yellow-200/70 rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all shadow-lg shadow-yellow-400/50 flex flex-col items-center justify-center gap-0.5 p-1"
            title="Золотые монеты"
          >
            <img 
              src="https://cdn.poehali.dev/files/2e73c9fd56f11f0b2426676413dfd84_1 копия.png"
              alt="Gold"
              className="w-5 h-5"
            />
            <span className="text-amber-900 text-[10px] font-bold leading-none">{goldCoins}</span>
          </button>
          <button
            onClick={onProfileClick}
            className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-blue-300/50 rounded-lg hover:from-blue-400 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/30"
            title="Профиль"
          >
            <Icon name="User" size={20} />
          </button>
          <div className="text-right relative">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]">
              {formatNumber(coins)}
            </div>
            <div className="text-xs sm:text-sm text-blue-200 flex items-center justify-end gap-1">
              <Icon name="Zap" size={12} />
              {coinsPerSecond}/с
              {passiveIncomeIndicator && coinsPerSecond > 0 && (
                <span className="absolute -top-2 right-0 text-green-300 font-bold text-xs animate-pulse drop-shadow-lg">
                  +{coinsPerSecond}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-2 bg-red-600/40 border-2 border-red-400/50 rounded-lg hover:bg-red-500/50 transition-all shadow-lg shadow-red-500/30"
            title="Выход"
          >
            <Icon name="LogOut" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
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
  onLogout,
  formatNumber
}: GameHeaderProps) {
  return (
    <div className="bg-black/30 backdrop-blur-sm border-b border-purple-500/30 p-3 sm:p-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="w-full sm:w-auto">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Peeky
          </h1>
          <p className="text-xs sm:text-sm text-purple-300">Игрок: {username} • Уровень {level}</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end flex-wrap">
          <button
            onClick={onProfileClick}
            className="px-3 py-2 sm:px-4 bg-gradient-to-r from-purple-600 to-pink-600 border border-purple-500/30 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all flex items-center gap-1 sm:gap-2 font-bold text-sm sm:text-base"
          >
            <Icon name="User" size={18} />
            <span className="hidden sm:inline">Профиль</span>
          </button>
          <button
            onClick={onShopClick}
            className="px-3 py-2 sm:px-4 bg-gradient-to-r from-yellow-600 to-orange-600 border border-yellow-500/30 rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all flex items-center gap-1 sm:gap-2 font-bold text-sm sm:text-base"
          >
            <Icon name="ShoppingBag" size={18} />
            <span className="hidden sm:inline">Магазин</span>
          </button>
          <button
            onClick={onGoldClick}
            className="relative px-2 py-2 sm:px-4 bg-gradient-to-r from-amber-600 to-yellow-600 border-2 border-yellow-500/50 rounded-lg hover:from-amber-500 hover:to-yellow-500 transition-all flex items-center gap-1 sm:gap-2 font-bold shadow-lg shadow-yellow-500/30 text-sm sm:text-base"
          >
            <img 
              src="https://cdn.poehali.dev/files/2e73c9fd56f11f0b2426676413dfd84_1 копия.png"
              alt="Gold"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
            <span className="text-white">{goldCoins}</span>
          </button>
          <div className="text-right relative">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-400">
              {formatNumber(coins)}
            </div>
            <div className="text-xs sm:text-sm text-purple-300 flex items-center justify-end gap-1">
              <Icon name="Zap" size={12} />
              {coinsPerSecond}/с
              {passiveIncomeIndicator && coinsPerSecond > 0 && (
                <span className="absolute -top-2 right-0 text-green-400 font-bold text-xs animate-pulse">
                  +{coinsPerSecond}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-2 bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-colors"
          >
            <Icon name="LogOut" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
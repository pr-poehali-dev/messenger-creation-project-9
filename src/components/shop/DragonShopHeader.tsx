import Icon from '@/components/ui/icon';

interface DragonShopHeaderProps {
  coins: number;
  goldCoins: number;
  onBack: () => void;
  formatNumber: (num: number) => string;
}

export default function DragonShopHeader({ coins, goldCoins, onBack, formatNumber }: DragonShopHeaderProps) {
  return (
    <div className="bg-black/30 backdrop-blur-sm border-b border-purple-500/30 p-3 sm:p-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={onBack}
            className="px-3 py-2 sm:px-4 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors flex items-center gap-2 text-sm sm:text-base"
          >
            <Icon name="ArrowLeft" size={18} />
            <span className="hidden sm:inline">Назад</span>
          </button>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Магазин драконов
            </h1>
            <p className="text-xs sm:text-sm text-purple-300">Выбери своего дракона</p>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-end">
          <div className="text-right">
            <div className="text-xl sm:text-2xl font-bold text-yellow-400">
              {formatNumber(coins)}
            </div>
            <div className="text-xs text-purple-300">Монет</div>
          </div>
          <div className="text-right">
            <div className="text-xl sm:text-2xl font-bold text-yellow-300 flex items-center justify-end gap-1 sm:gap-2">
              <img 
                src="https://cdn.poehali.dev/files/2e73c9fd56f11f0b2426676413dfd84_1 копия.png"
                alt="Gold"
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
              {goldCoins}
            </div>
            <div className="text-xs text-amber-300">Золотых</div>
          </div>
        </div>
      </div>
    </div>
  );
}

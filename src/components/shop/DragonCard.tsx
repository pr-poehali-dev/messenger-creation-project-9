import Icon from '@/components/ui/icon';
import { Dragon } from '@/types/game';

interface DragonCardProps {
  dragon: Dragon;
  isOwned: boolean;
  isCurrent: boolean;
  isGoldDragon: boolean;
  canBuy: boolean;
  onBuyDragon: (dragon: Dragon) => void;
  onSelectDragon: (dragonId: string) => void;
  formatNumber: (num: number) => string;
}

export default function DragonCard({
  dragon,
  isOwned,
  isCurrent,
  isGoldDragon,
  canBuy,
  onBuyDragon,
  onSelectDragon,
  formatNumber,
}: DragonCardProps) {
  return (
    <div
      key={dragon.id}
      className={`bg-black/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 transition-all ${
        isCurrent
          ? 'border-yellow-500 shadow-xl shadow-yellow-500/30'
          : isOwned
          ? 'border-purple-500/50 hover:border-purple-400'
          : canBuy
          ? 'border-green-500/50 hover:border-green-400'
          : 'border-gray-700/30 opacity-60'
      }`}
    >
      <div className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4 border-2 border-purple-500/30">
        <img
          src={dragon.image}
          alt={dragon.name}
          className="w-full h-full object-cover"
        />
        {dragon.isTemporary && (
          <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg shadow-orange-500/50 animate-pulse">
            <Icon name="Sparkles" size={14} />
            <span className="hidden sm:inline">Новый год!</span>
            <span className="sm:hidden">2026</span>
          </div>
        )}
        {isGoldDragon && !dragon.isTemporary && (
          <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-gradient-to-r from-yellow-600 to-amber-600 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg shadow-yellow-500/50">
            <img 
              src="https://cdn.poehali.dev/files/2e73c9fd56f11f0b2426676413dfd84_1 копия.png"
              alt="Gold"
              className="w-3 h-3 sm:w-4 sm:h-4"
            />
            <span className="hidden sm:inline">Легенда</span>
          </div>
        )}
        {isCurrent && (
          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-yellow-500 text-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Icon name="Check" size={12} />
            <span className="hidden sm:inline">Текущий</span>
          </div>
        )}
        {isOwned && !isCurrent && (
          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-purple-500 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-bold">
            <span className="hidden sm:inline">Куплен</span>
            <Icon name="Check" size={12} className="sm:hidden" />
          </div>
        )}
      </div>

      <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-3 text-center">{dragon.name}</h3>

      <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
        <div className="flex justify-between items-center bg-purple-900/30 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2">
          <span className="text-purple-300 text-xs sm:text-sm flex items-center gap-1">
            <Icon name="HandCoins" size={14} />
            Клик
          </span>
          <span className="font-bold text-yellow-400 text-sm sm:text-base">+{dragon.coinsPerTap}</span>
        </div>
        <div className="flex justify-between items-center bg-purple-900/30 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2">
          <span className="text-purple-300 text-xs sm:text-sm flex items-center gap-1">
            <Icon name="Battery" size={14} />
            Энергия
          </span>
          <span className="font-bold text-cyan-400 text-sm sm:text-base">{dragon.maxEnergy}</span>
        </div>
        {dragon.isTemporary && (
          <div className="bg-gradient-to-r from-orange-900/40 to-red-900/40 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 border border-orange-500/30">
            <p className="text-orange-300 text-xs sm:text-sm text-center font-semibold flex items-center justify-center gap-1">
              <Icon name="Clock" size={14} />
              Доступен только 31.12.2025
            </p>
            <p className="text-orange-400/80 text-xs text-center mt-0.5">
              Автоматически заменится 1.01.2026
            </p>
          </div>
        )}
      </div>

      {!isOwned ? (
        <button
          onClick={() => onBuyDragon(dragon)}
          disabled={!canBuy}
          className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
            canBuy
              ? dragon.isTemporary
                ? 'bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 hover:from-orange-500 hover:via-red-500 hover:to-yellow-500 active:scale-95 cursor-pointer shadow-lg shadow-orange-500/50 animate-pulse'
                : isGoldDragon
                ? 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 active:scale-95 cursor-pointer shadow-lg shadow-yellow-500/30'
                : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 active:scale-95 cursor-pointer'
              : 'bg-gray-700/50 cursor-not-allowed'
          }`}
        >
          {dragon.isTemporary ? (
            <>
              <Icon name="Gift" size={18} />
              <span>Бесплатно! 🎆</span>
            </>
          ) : isGoldDragon ? (
            <>
              <img 
                src="https://cdn.poehali.dev/files/2e73c9fd56f11f0b2426676413dfd84_1 копия.png"
                alt="Gold"
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
              <span>{dragon.goldCost}</span>
            </>
          ) : (
            <>
              <Icon name="ShoppingCart" size={18} />
              <span>
                {dragon.cost === 0 ? 'Бесплатно' : formatNumber(dragon.cost)}
              </span>
            </>
          )}
        </button>
      ) : isCurrent ? (
        <div className="w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold bg-yellow-500/20 border-2 border-yellow-500 text-yellow-400 text-center text-sm sm:text-base">
          Используется
        </div>
      ) : (
        <button
          onClick={() => onSelectDragon(dragon.id)}
          className="w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <Icon name="Check" size={20} />
          Выбрать
        </button>
      )}
    </div>
  );
}

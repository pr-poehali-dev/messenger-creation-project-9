import Icon from '@/components/ui/icon';
import { Dragon } from '@/types/game';

interface DragonShopProps {
  coins: number;
  goldCoins: number;
  currentDragonId: string;
  ownedDragons: string[];
  onBuyDragon: (dragon: Dragon) => void;
  onSelectDragon: (dragonId: string) => void;
  onBack: () => void;
}

export const DRAGONS: Dragon[] = [
  {
    id: 'dragon-1',
    name: 'Огненный дракон',
    image: 'https://cdn.poehali.dev/files/4a35708d3e611f087bb1e26e9a8e171_1.jpeg',
    cost: 0,
    coinsPerTap: 1,
    maxEnergy: 1000,
    owned: true,
  },
  {
    id: 'dragon-2',
    name: 'Ледяной дракон',
    image: 'https://cdn.poehali.dev/files/2e540cbd3e811f0a213028eb002377b_1.jpeg',
    cost: 50000,
    coinsPerTap: 5,
    maxEnergy: 2000,
    owned: false,
  },
  {
    id: 'dragon-3',
    name: 'Зимний дракон',
    image: 'https://cdn.poehali.dev/files/7ccf205d3e711f0b2c16af0f00ccae1_1.jpeg',
    cost: 200000,
    coinsPerTap: 15,
    maxEnergy: 3500,
    owned: false,
  },
  {
    id: 'dragon-4',
    name: 'Лавовый дракон',
    image: 'https://cdn.poehali.dev/files/335ada2d3e611f0a213028eb002377b_1.jpeg',
    cost: 500000,
    coinsPerTap: 30,
    maxEnergy: 5000,
    owned: false,
  },
  {
    id: 'dragon-5',
    name: 'Лунный дракон',
    image: 'https://cdn.poehali.dev/files/ece7781d3e811f0ba85820c80db2f69_1.jpeg',
    cost: 1000000,
    coinsPerTap: 50,
    maxEnergy: 7500,
    owned: false,
  },
  {
    id: 'dragon-6',
    name: 'Новогодний дракон',
    image: 'https://cdn.poehali.dev/files/343af73d4ff11f0b680ba0335ae5acb_1.jpeg',
    cost: 2500000,
    coinsPerTap: 100,
    maxEnergy: 10000,
    owned: false,
  },
  {
    id: 'dragon-7',
    name: 'Закатный дракон',
    image: 'https://cdn.poehali.dev/files/emixed_ec6b7d50d56d11f09838ca2b5e920a99_1839530447_generation_0.jpeg',
    cost: 5000000,
    coinsPerTap: 200,
    maxEnergy: 15000,
    owned: false,
  },
  {
    id: 'dragon-8',
    name: 'Золотой дракон',
    image: 'https://cdn.poehali.dev/files/8.jpeg',
    cost: 10000000,
    coinsPerTap: 350,
    maxEnergy: 20000,
    owned: false,
  },
  {
    id: 'dragon-9',
    name: 'Аметистовый дракон',
    image: 'https://cdn.poehali.dev/files/9.jpeg',
    cost: 20000000,
    coinsPerTap: 500,
    maxEnergy: 25000,
    owned: false,
  },
  {
    id: 'dragon-10',
    name: 'Неоновый дракон',
    image: 'https://cdn.poehali.dev/files/02.jpeg',
    cost: 0,
    goldCost: 5,
    coinsPerTap: 1000,
    maxEnergy: 50000,
    owned: false,
  },
  {
    id: 'dragon-11',
    name: 'Кибер-дракон',
    image: 'https://cdn.poehali.dev/files/25.jpeg',
    cost: 0,
    goldCost: 10,
    coinsPerTap: 2000,
    maxEnergy: 75000,
    owned: false,
  },
  {
    id: 'dragon-12',
    name: 'Мехадракон',
    image: 'https://cdn.poehali.dev/files/85.jpeg',
    cost: 0,
    goldCost: 20,
    coinsPerTap: 5000,
    maxEnergy: 100000,
    owned: false,
  },
  {
    id: 'dragon-13',
    name: 'Космический дракон',
    image: 'https://cdn.poehali.dev/files/97.jpeg',
    cost: 0,
    goldCost: 50,
    coinsPerTap: 10000,
    maxEnergy: 150000,
    owned: false,
  },
  {
    id: 'dragon-14',
    name: 'Мультяшный дракон',
    image: 'https://cdn.poehali.dev/files/396.jpeg',
    cost: 0,
    goldCost: 100,
    coinsPerTap: 25000,
    maxEnergy: 250000,
    owned: false,
  },
  {
    id: 'dragon-15',
    name: 'Электрический дракон',
    image: 'https://cdn.poehali.dev/files/78.jpeg',
    cost: 35000000,
    coinsPerTap: 750,
    maxEnergy: 30000,
    owned: false,
  },
  {
    id: 'dragon-16',
    name: 'Неоновый защитник',
    image: 'https://cdn.poehali.dev/files/089.jpeg',
    cost: 50000000,
    coinsPerTap: 1200,
    maxEnergy: 35000,
    owned: false,
  },
  {
    id: 'dragon-17',
    name: 'Снежный хранитель',
    image: 'https://cdn.poehali.dev/files/109.jpeg',
    cost: 75000000,
    coinsPerTap: 1800,
    maxEnergy: 40000,
    owned: false,
  },
  {
    id: 'dragon-18',
    name: 'Весенний дракон',
    image: 'https://cdn.poehali.dev/files/203.jpeg',
    cost: 100000000,
    coinsPerTap: 2500,
    maxEnergy: 45000,
    owned: false,
  },
  {
    id: 'dragon-19',
    name: 'Цветочный страж',
    image: 'https://cdn.poehali.dev/files/678.jpeg',
    cost: 150000000,
    coinsPerTap: 3500,
    maxEnergy: 50000,
    owned: false,
  },
];

export default function DragonShop({
  coins,
  goldCoins,
  currentDragonId,
  ownedDragons,
  onBuyDragon,
  onSelectDragon,
  onBack,
}: DragonShopProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return Math.floor(num).toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white">
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

      <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-6 pb-20 md:pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {DRAGONS.map((dragon) => {
            const isOwned = ownedDragons.includes(dragon.id);
            const isCurrent = currentDragonId === dragon.id;
            const isGoldDragon = dragon.goldCost !== undefined && dragon.goldCost > 0;
            const canBuy = isGoldDragon 
              ? goldCoins >= (dragon.goldCost || 0) && !isOwned
              : coins >= dragon.cost && !isOwned;

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
                  {isGoldDragon && (
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
                </div>

                {!isOwned ? (
                  <button
                    onClick={() => onBuyDragon(dragon)}
                    disabled={!canBuy}
                    className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
                      canBuy
                        ? isGoldDragon
                          ? 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 active:scale-95 cursor-pointer shadow-lg shadow-yellow-500/30'
                          : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 active:scale-95 cursor-pointer'
                        : 'bg-gray-700/50 cursor-not-allowed'
                    }`}
                  >
                    {isGoldDragon ? (
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
          })}
        </div>
      </div>
    </div>
  );
}
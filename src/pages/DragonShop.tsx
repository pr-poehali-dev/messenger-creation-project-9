import Icon from '@/components/ui/icon';
import { Dragon } from '@/types/game';

interface DragonShopProps {
  coins: number;
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
];

export default function DragonShop({
  coins,
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
      <div className="bg-black/30 backdrop-blur-sm border-b border-purple-500/30 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors flex items-center gap-2"
            >
              <Icon name="ArrowLeft" size={20} />
              Назад
            </button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Магазин драконов
              </h1>
              <p className="text-sm text-purple-300">Выбери своего дракона</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-yellow-400">
              {formatNumber(coins)}
            </div>
            <div className="text-sm text-purple-300">Монет</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DRAGONS.map((dragon) => {
            const isOwned = ownedDragons.includes(dragon.id);
            const isCurrent = currentDragonId === dragon.id;
            const canBuy = coins >= dragon.cost && !isOwned;

            return (
              <div
                key={dragon.id}
                className={`bg-black/40 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all ${
                  isCurrent
                    ? 'border-yellow-500 shadow-xl shadow-yellow-500/30'
                    : isOwned
                    ? 'border-purple-500/50 hover:border-purple-400'
                    : canBuy
                    ? 'border-green-500/50 hover:border-green-400'
                    : 'border-gray-700/30 opacity-60'
                }`}
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 border-2 border-purple-500/30">
                  <img
                    src={dragon.image}
                    alt={dragon.name}
                    className="w-full h-full object-cover"
                  />
                  {isCurrent && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Icon name="Check" size={14} />
                      Текущий
                    </div>
                  )}
                  {isOwned && !isCurrent && (
                    <div className="absolute top-2 right-2 bg-purple-500 px-3 py-1 rounded-full text-xs font-bold">
                      Куплен
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-3 text-center">{dragon.name}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center bg-purple-900/30 rounded-lg px-3 py-2">
                    <span className="text-purple-300 text-sm flex items-center gap-1">
                      <Icon name="HandCoins" size={16} />
                      Клик
                    </span>
                    <span className="font-bold text-yellow-400">+{dragon.coinsPerTap}</span>
                  </div>
                  <div className="flex justify-between items-center bg-purple-900/30 rounded-lg px-3 py-2">
                    <span className="text-purple-300 text-sm flex items-center gap-1">
                      <Icon name="Battery" size={16} />
                      Энергия
                    </span>
                    <span className="font-bold text-cyan-400">{dragon.maxEnergy}</span>
                  </div>
                </div>

                {!isOwned ? (
                  <button
                    onClick={() => onBuyDragon(dragon)}
                    disabled={!canBuy}
                    className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                      canBuy
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 cursor-pointer'
                        : 'bg-gray-700/50 cursor-not-allowed'
                    }`}
                  >
                    <Icon name="ShoppingCart" size={20} />
                    <span>
                      {dragon.cost === 0 ? 'Бесплатно' : formatNumber(dragon.cost)}
                    </span>
                  </button>
                ) : isCurrent ? (
                  <div className="w-full py-3 rounded-xl font-bold bg-yellow-500/20 border-2 border-yellow-500 text-yellow-400 text-center">
                    Используется
                  </div>
                ) : (
                  <button
                    onClick={() => onSelectDragon(dragon.id)}
                    className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all flex items-center justify-center gap-2"
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

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import DragonImage from '@/components/DragonImage';
import { User, GameState, Upgrade } from '@/types/game';
import { saveGameState, getGameState, removeUser } from '@/utils/storage';

interface GameProps {
  user: User;
  onLogout: () => void;
}

const DEFAULT_UPGRADES: Upgrade[] = [
  { id: '1', name: 'Огненное дыхание', cost: 100, profit: 1, owned: 0, icon: 'Flame' },
  { id: '2', name: 'Драконья пещера', cost: 500, profit: 5, owned: 0, icon: 'Mountain' },
  { id: '3', name: 'Сокровищница', cost: 2000, profit: 20, owned: 0, icon: 'Gem' },
  { id: '4', name: 'Армия драконов', cost: 10000, profit: 100, owned: 0, icon: 'Users' },
  { id: '5', name: 'Драконий замок', cost: 50000, profit: 500, owned: 0, icon: 'Castle' },
  { id: '6', name: 'Магический портал', cost: 200000, profit: 2000, owned: 0, icon: 'Sparkles' },
];

export default function Game({ user, onLogout }: GameProps) {
  const [coins, setCoins] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [coinsPerTap, setCoinsPerTap] = useState(1);
  const [coinsPerSecond, setCoinsPerSecond] = useState(0);
  const [energy, setEnergy] = useState(1000);
  const [maxEnergy] = useState(1000);
  const [level, setLevel] = useState(1);
  const [clickAnimation, setClickAnimation] = useState(false);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(DEFAULT_UPGRADES);

  useEffect(() => {
    const savedState = getGameState();
    if (savedState && savedState.userId === user.id) {
      setCoins(savedState.coins);
      setTotalCoins(savedState.totalCoins);
      setCoinsPerTap(savedState.coinsPerTap);
      setCoinsPerSecond(savedState.coinsPerSecond);
      setEnergy(savedState.energy);
      setLevel(savedState.level);
      setUpgrades(savedState.upgrades);
    }
  }, [user.id]);

  useEffect(() => {
    const state: GameState = {
      userId: user.id,
      coins,
      totalCoins,
      coinsPerTap,
      coinsPerSecond,
      energy,
      level,
      upgrades,
      lastSaved: new Date().toISOString(),
    };
    saveGameState(state);
  }, [user.id, coins, totalCoins, coinsPerTap, coinsPerSecond, energy, level, upgrades]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (coinsPerSecond > 0) {
        setCoins(prev => prev + coinsPerSecond);
        setTotalCoins(prev => prev + coinsPerSecond);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [coinsPerSecond]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy(prev => Math.min(prev + 5, maxEnergy));
    }, 1000);
    return () => clearInterval(interval);
  }, [maxEnergy]);

  useEffect(() => {
    setLevel(Math.floor(totalCoins / 10000) + 1);
  }, [totalCoins]);

  const handleDragonClick = () => {
    if (energy >= 10) {
      setCoins(prev => prev + coinsPerTap);
      setTotalCoins(prev => prev + coinsPerTap);
      setEnergy(prev => prev - 10);
      setClickAnimation(true);
      setTimeout(() => setClickAnimation(false), 100);
    }
  };

  const handleBuyUpgrade = (upgrade: Upgrade) => {
    if (coins >= upgrade.cost) {
      setCoins(prev => prev - upgrade.cost);
      setCoinsPerSecond(prev => prev + upgrade.profit);
      setUpgrades(prev =>
        prev.map(u =>
          u.id === upgrade.id
            ? { ...u, owned: u.owned + 1, cost: Math.floor(u.cost * 1.5) }
            : u
        )
      );
    }
  };

  const handleLogout = () => {
    removeUser();
    onLogout();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return Math.floor(num).toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white">
      <div className="bg-black/30 backdrop-blur-sm border-b border-purple-500/30 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Dragon Empire
            </h1>
            <p className="text-sm text-purple-300">Игрок: {user.username} • Уровень {level}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-3xl font-bold text-yellow-400">
                {formatNumber(coins)}
              </div>
              <div className="text-sm text-purple-300 flex items-center justify-end gap-1">
                <Icon name="Zap" size={14} />
                {coinsPerSecond}/сек
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-colors"
            >
              <Icon name="LogOut" size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 p-6">
        <div className="space-y-6">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-purple-500/30">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-purple-300">Энергия</span>
              <span className="text-white font-bold">{energy}/{maxEnergy}</span>
            </div>
            <div className="h-3 bg-purple-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                style={{ width: `${(energy / maxEnergy) * 100}%` }}
              />
            </div>
          </div>

          <div className="relative">
            <button
              onClick={handleDragonClick}
              disabled={energy < 10}
              className={`w-full aspect-square rounded-3xl overflow-hidden relative
                shadow-2xl shadow-orange-500/50 border-4 border-yellow-500/30 
                transition-all duration-100
                ${energy >= 10 ? 'hover:scale-105 active:scale-95 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
                ${clickAnimation ? 'scale-110' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-purple-900 to-orange-600">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,200,100,0.3) 0%, transparent 50%)',
                }}></div>
              </div>
              
              <img 
                src="https://cdn.poehali.dev/files/4a35708d3e611f087bb1e26e9a8e171_1.jpeg"
                alt="Dragon"
                className="absolute inset-0 w-full h-full object-contain"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center z-10">
                <div className="text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] 
                  bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent
                  [text-shadow:_0_2px_20px_rgb(0_0_0_/_80%)]"
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}
                >
                  +{coinsPerTap}
                </div>
              </div>
            </button>

            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full border-2 border-purple-400 shadow-lg">
              <span className="font-bold">Клик: +{coinsPerTap}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Улучшения
          </h2>
          
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {upgrades.map(upgrade => {
              const canBuy = coins >= upgrade.cost;
              return (
                <button
                  key={upgrade.id}
                  onClick={() => handleBuyUpgrade(upgrade)}
                  disabled={!canBuy}
                  className={`w-full bg-black/40 backdrop-blur-sm rounded-xl p-4 border-2 
                    transition-all ${
                      canBuy
                        ? 'border-purple-500/50 hover:border-purple-400 hover:bg-purple-900/20 cursor-pointer'
                        : 'border-gray-700/30 opacity-50 cursor-not-allowed'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                      <Icon name={upgrade.icon as any} size={24} />
                    </div>
                    
                    <div className="flex-1 text-left">
                      <div className="font-bold text-white">{upgrade.name}</div>
                      <div className="text-sm text-purple-300">
                        +{upgrade.profit} монет/сек
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-yellow-400 font-bold">
                        {formatNumber(upgrade.cost)}
                      </div>
                      {upgrade.owned > 0 && (
                        <div className="text-xs text-purple-400">
                          Куплено: {upgrade.owned}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #a855f7, #ec4899);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
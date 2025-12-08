import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import DragonImage from '@/components/DragonImage';
import { User, GameState, Upgrade, Dragon } from '@/types/game';
import { saveGameState, getGameState, removeUser } from '@/utils/storage';
import DragonShop, { DRAGONS } from '@/pages/DragonShop';

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
  const [showShop, setShowShop] = useState(false);
  const [coins, setCoins] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [coinsPerTap, setCoinsPerTap] = useState(1);
  const [coinsPerSecond, setCoinsPerSecond] = useState(0);
  const [energy, setEnergy] = useState(1000);
  const [maxEnergy, setMaxEnergy] = useState(1000);
  const [level, setLevel] = useState(1);
  const [clickAnimation, setClickAnimation] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState<Array<{ id: number; value: number; x: number; y: number }>>([]);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(DEFAULT_UPGRADES);
  const [energyRestoreTime, setEnergyRestoreTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [currentDragonId, setCurrentDragonId] = useState('dragon-1');
  const [ownedDragons, setOwnedDragons] = useState<string[]>(['dragon-1']);
  const [dragonChangeAnimation, setDragonChangeAnimation] = useState(false);

  useEffect(() => {
    const savedState = getGameState();
    if (savedState && savedState.userId === user.id) {
      setCoins(savedState.coins);
      setTotalCoins(savedState.totalCoins);
      setCoinsPerTap(savedState.coinsPerTap);
      setCoinsPerSecond(savedState.coinsPerSecond);
      setEnergy(savedState.energy);
      setMaxEnergy(savedState.maxEnergy || 1000);
      setLevel(savedState.level);
      setUpgrades(savedState.upgrades);
      setCurrentDragonId(savedState.currentDragonId || 'dragon-1');
      setOwnedDragons(savedState.ownedDragons || ['dragon-1']);
      if (savedState.energyRestoreTime) {
        setEnergyRestoreTime(savedState.energyRestoreTime);
      }
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
      maxEnergy,
      level,
      upgrades,
      lastSaved: new Date().toISOString(),
      energyRestoreTime,
      currentDragonId,
      ownedDragons,
    };
    saveGameState(state);
  }, [user.id, coins, totalCoins, coinsPerTap, coinsPerSecond, energy, maxEnergy, level, upgrades, energyRestoreTime, currentDragonId, ownedDragons]);

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
      if (energyRestoreTime) {
        const now = Date.now();
        if (now >= energyRestoreTime) {
          setEnergy(maxEnergy);
          setEnergyRestoreTime(null);
          setTimeRemaining('');
        } else {
          const diff = energyRestoreTime - now;
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeRemaining(`${hours}ч ${minutes}м ${seconds}с`);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [energyRestoreTime, maxEnergy]);

  useEffect(() => {
    setLevel(Math.floor(totalCoins / 10000) + 1);
  }, [totalCoins]);

  const handleDragonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (energy >= 10 && !energyRestoreTime) {
      const newEnergy = energy - 10;
      setCoins(prev => prev + coinsPerTap);
      setTotalCoins(prev => prev + coinsPerTap);
      setEnergy(newEnergy);
      setClickAnimation(true);
      
      if (newEnergy === 0) {
        const restoreTime = Date.now() + (3 * 60 * 60 * 1000);
        setEnergyRestoreTime(restoreTime);
      }
      
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newText = {
        id: Date.now(),
        value: coinsPerTap,
        x,
        y
      };
      setFloatingTexts(prev => [...prev, newText]);
      
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn77BfGAg+ltzy0YMwBSZ9y/DVijYIHGu87+Wc');
      audio.volume = 0.3;
      audio.play().catch(() => {});
      
      setTimeout(() => setClickAnimation(false), 100);
      setTimeout(() => {
        setFloatingTexts(prev => prev.filter(t => t.id !== newText.id));
      }, 1000);
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

  const handleBuyDragon = (dragon: Dragon) => {
    if (coins >= dragon.cost && !ownedDragons.includes(dragon.id)) {
      setCoins(prev => prev - dragon.cost);
      setOwnedDragons(prev => [...prev, dragon.id]);
      
      setDragonChangeAnimation(true);
      setTimeout(() => {
        setCurrentDragonId(dragon.id);
        setCoinsPerTap(dragon.coinsPerTap);
        setMaxEnergy(dragon.maxEnergy);
        setEnergy(dragon.maxEnergy);
        setEnergyRestoreTime(null);
        setTimeout(() => setDragonChangeAnimation(false), 600);
      }, 300);
    }
  };

  const handleSelectDragon = (dragonId: string) => {
    const dragon = DRAGONS.find(d => d.id === dragonId);
    if (dragon && ownedDragons.includes(dragonId)) {
      setDragonChangeAnimation(true);
      setTimeout(() => {
        setCurrentDragonId(dragonId);
        setCoinsPerTap(dragon.coinsPerTap);
        setMaxEnergy(dragon.maxEnergy);
        setEnergy(dragon.maxEnergy);
        setEnergyRestoreTime(null);
        setTimeout(() => setDragonChangeAnimation(false), 600);
      }, 300);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return Math.floor(num).toString();
  };

  const currentDragon = DRAGONS.find(d => d.id === currentDragonId) || DRAGONS[0];

  if (showShop) {
    return (
      <DragonShop
        coins={coins}
        currentDragonId={currentDragonId}
        ownedDragons={ownedDragons}
        onBuyDragon={handleBuyDragon}
        onSelectDragon={handleSelectDragon}
        onBack={() => setShowShop(false)}
      />
    );
  }

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
            <button
              onClick={() => setShowShop(true)}
              className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 border border-yellow-500/30 rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all flex items-center gap-2 font-bold"
            >
              <Icon name="ShoppingBag" size={20} />
              Магазин
            </button>
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
              {energyRestoreTime ? (
                <span className="text-orange-400 font-bold flex items-center gap-1">
                  <Icon name="Clock" size={16} />
                  {timeRemaining}
                </span>
              ) : (
                <span className="text-white font-bold">{energy}/{maxEnergy}</span>
              )}
            </div>
            <div className="h-3 bg-purple-950 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  energyRestoreTime 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}
                style={{ width: `${energyRestoreTime ? 0 : (energy / maxEnergy) * 100}%` }}
              />
            </div>
            {energyRestoreTime && (
              <div className="mt-2 text-center text-sm text-orange-300">
                ⏳ Энергия восстанавливается...
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={handleDragonClick}
              disabled={energy < 10 || !!energyRestoreTime}
              className={`w-full aspect-square rounded-3xl overflow-hidden relative
                shadow-2xl shadow-orange-500/50 border-4 border-yellow-500/30 
                transition-all duration-100
                ${energy >= 10 && !energyRestoreTime ? 'hover:scale-105 active:scale-95 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
                ${clickAnimation ? 'scale-110' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-purple-900 to-orange-600">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,200,100,0.3) 0%, transparent 50%)',
                }}></div>
              </div>
              
              <img 
                src={currentDragon.image}
                alt={currentDragon.name}
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-500
                  ${dragonChangeAnimation ? 'opacity-0 scale-50 rotate-180' : 'opacity-100 scale-100 rotate-0'}`}
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

              {floatingTexts.map(text => (
                <div
                  key={text.id}
                  className="absolute pointer-events-none z-20 animate-float"
                  style={{
                    left: text.x,
                    top: text.y,
                    animation: 'floatUp 1s ease-out forwards'
                  }}
                >
                  <div className="text-3xl font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"
                    style={{ 
                      WebkitTextStroke: '1px rgba(255,100,0,0.8)',
                      filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.8))'
                    }}
                  >
                    +{text.value}
                  </div>
                </div>
              ))}
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
        
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
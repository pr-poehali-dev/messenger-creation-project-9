import { useState, useEffect } from 'react';
import { User, GameState, Upgrade, Dragon } from '@/types/game';
import { saveGameState, getGameState, removeUser } from '@/utils/storage';
import DragonShop, { DRAGONS } from '@/pages/DragonShop';
import GameHeader from '@/components/game/GameHeader';
import DragonClicker from '@/components/game/DragonClicker';
import UpgradesList from '@/components/game/UpgradesList';
import PlayerProfile from '@/components/game/PlayerProfile';

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
  const [showProfile, setShowProfile] = useState(false);
  const [coins, setCoins] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [coinsPerTap, setCoinsPerTap] = useState(1);
  const [coinsPerSecond, setCoinsPerSecond] = useState(0);
  const [energy, setEnergy] = useState(1000);
  const [maxEnergy, setMaxEnergy] = useState(1000);
  const [level, setLevel] = useState(1);
  const [clickAnimation, setClickAnimation] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState<Array<{ id: number; value: number; x: number; y: number; isNewYear?: boolean; isGolden?: boolean; isAmethyst?: boolean }>>([]);
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [passiveIncomeIndicator, setPassiveIncomeIndicator] = useState(false);
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
      if (coinsPerSecond > 0 && !energyRestoreTime) {
        setCoins(prev => prev + coinsPerSecond);
        setTotalCoins(prev => prev + coinsPerSecond);
        setPassiveIncomeIndicator(true);
        setTimeout(() => setPassiveIncomeIndicator(false), 800);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [coinsPerSecond, energyRestoreTime]);

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
        const restoreTime = Date.now() + (5 * 60 * 1000);
        setEnergyRestoreTime(restoreTime);
      }
      
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const isNewYearDragon = currentDragonId === 'dragon-6';
      const isGoldenDragon = currentDragonId === 'dragon-8';
      const isAmethystDragon = currentDragonId === 'dragon-9';
      
      const newText = {
        id: Date.now(),
        value: coinsPerTap,
        x,
        y,
        isNewYear: isNewYearDragon,
        isGolden: isGoldenDragon,
        isAmethyst: isAmethystDragon
      };
      setFloatingTexts(prev => [...prev, newText]);
      
      if (isNewYearDragon) {
        const newSnowflakes = Array.from({ length: 8 }, (_, i) => ({
          id: Date.now() + i,
          x: x + (Math.random() - 0.5) * 100,
          y: y + (Math.random() - 0.5) * 100,
          size: 10 + Math.random() * 15
        }));
        setSnowflakes(prev => [...prev, ...newSnowflakes]);
        setTimeout(() => {
          setSnowflakes(prev => prev.filter(s => !newSnowflakes.find(ns => ns.id === s.id)));
        }, 1500);
        
        const ctx = new AudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.frequency.setValueAtTime(1046.5, ctx.currentTime);
        oscillator.frequency.setValueAtTime(1318.5, ctx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.5);
      } else if (isGoldenDragon) {
        const newSnowflakes = Array.from({ length: 12 }, (_, i) => ({
          id: Date.now() + i,
          x: x + (Math.random() - 0.5) * 120,
          y: y + (Math.random() - 0.5) * 120,
          size: 15 + Math.random() * 20
        }));
        setSnowflakes(prev => [...prev, ...newSnowflakes]);
        setTimeout(() => {
          setSnowflakes(prev => prev.filter(s => !newSnowflakes.find(ns => ns.id === s.id)));
        }, 1500);
        
        const ctx = new AudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, ctx.currentTime);
        oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.6);
      } else if (isAmethystDragon) {
        const newSnowflakes = Array.from({ length: 16 }, (_, i) => ({
          id: Date.now() + i,
          x: x + (Math.random() - 0.5) * 150,
          y: y + (Math.random() - 0.5) * 150,
          size: 20 + Math.random() * 25
        }));
        setSnowflakes(prev => [...prev, ...newSnowflakes]);
        setTimeout(() => {
          setSnowflakes(prev => prev.filter(s => !newSnowflakes.find(ns => ns.id === s.id)));
        }, 1500);
        
        const ctx = new AudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(830.61, ctx.currentTime);
        oscillator.frequency.setValueAtTime(987.77, ctx.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.2);
        oscillator.frequency.setValueAtTime(1396.91, ctx.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.8);
      } else {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn77BfGAg+ltzy0YMwBSZ9y/DVijYIHGu87+Wc');
        audio.volume = 0.3;
        audio.play().catch(() => {});
      }
      
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
  const upgradesOwned = upgrades.reduce((sum, u) => sum + u.owned, 0);
  const isNewYearDragon = currentDragonId === 'dragon-6';

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
    <div className={`min-h-screen text-white relative overflow-hidden ${
      isNewYearDragon 
        ? 'bg-gradient-to-b from-blue-900 via-cyan-900 to-indigo-950'
        : 'bg-gradient-to-b from-purple-900 via-indigo-900 to-black'
    }`}>
      {showProfile && (
        <PlayerProfile
          username={user.username}
          level={level}
          totalCoins={totalCoins}
          coins={coins}
          coinsPerTap={coinsPerTap}
          coinsPerSecond={coinsPerSecond}
          energy={energy}
          maxEnergy={maxEnergy}
          currentDragonName={currentDragon.name}
          ownedDragonsCount={ownedDragons.length}
          upgradesOwned={upgradesOwned}
          onClose={() => setShowProfile(false)}
          formatNumber={formatNumber}
        />
      )}
      
      {isNewYearDragon && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                fontSize: `${10 + Math.random() * 10}px`,
                animation: `backgroundSnowfall ${5 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              ❄️
            </div>
          ))}
        </div>
      )}
      
      <div className="relative z-10">
        <GameHeader
          username={user.username}
          level={level}
          coins={coins}
          coinsPerSecond={coinsPerSecond}
          passiveIncomeIndicator={passiveIncomeIndicator}
          onShopClick={() => setShowShop(true)}
          onProfileClick={() => setShowProfile(true)}
          onLogout={handleLogout}
          formatNumber={formatNumber}
        />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 p-6">
          <DragonClicker
            currentDragon={currentDragon}
            currentDragonId={currentDragonId}
            energy={energy}
            maxEnergy={maxEnergy}
            energyRestoreTime={energyRestoreTime}
            timeRemaining={timeRemaining}
            coinsPerTap={coinsPerTap}
            clickAnimation={clickAnimation}
            dragonChangeAnimation={dragonChangeAnimation}
            floatingTexts={floatingTexts}
            snowflakes={snowflakes}
            onDragonClick={handleDragonClick}
          />

          <UpgradesList
            upgrades={upgrades}
            coins={coins}
            onBuyUpgrade={handleBuyUpgrade}
            formatNumber={formatNumber}
          />
        </div>
      </div>
    </div>
  );
}
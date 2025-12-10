import { useState, useEffect } from 'react';
import { User, GameState, Upgrade, Dragon } from '@/types/game';
import { saveGameState, getGameState, removeUser } from '@/utils/storage';
import DragonShop, { DRAGONS } from '@/pages/DragonShop';
import GameHeader from '@/components/game/GameHeader';
import DragonClicker from '@/components/game/DragonClicker';
import UpgradesList from '@/components/game/UpgradesList';
import PlayerProfile from '@/components/game/PlayerProfile';
import GoldExchange from '@/components/game/GoldExchange';

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
  const [showGoldExchange, setShowGoldExchange] = useState(false);
  const [coins, setCoins] = useState(0);
  const [goldCoins, setGoldCoins] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [coinsPerTap, setCoinsPerTap] = useState(1);
  const [coinsPerSecond, setCoinsPerSecond] = useState(0);
  const [energy, setEnergy] = useState(1000);
  const [maxEnergy, setMaxEnergy] = useState(1000);
  const [level, setLevel] = useState(1);
  const [clickAnimation, setClickAnimation] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState<Array<{ id: number; value: number; x: number; y: number; dragonType?: string }>>([]);
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
      setGoldCoins(savedState.goldCoins || 0);
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
      goldCoins,
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
  }, [user.id, coins, goldCoins, totalCoins, coinsPerTap, coinsPerSecond, energy, maxEnergy, level, upgrades, energyRestoreTime, currentDragonId, ownedDragons]);

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
      
      const newText = {
        id: Date.now(),
        value: coinsPerTap,
        x,
        y,
        dragonType: currentDragonId
      };
      setFloatingTexts(prev => [...prev, newText]);
      
      const playDragonEffect = (dragonId: string) => {
        const ctx = new AudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        switch(dragonId) {
          case 'dragon-6':
            const snowflakes6 = Array.from({ length: 8 }, (_, i) => ({
              id: Date.now() + i,
              x: x + (Math.random() - 0.5) * 100,
              y: y + (Math.random() - 0.5) * 100,
              size: 10 + Math.random() * 15
            }));
            setSnowflakes(prev => [...prev, ...snowflakes6]);
            setTimeout(() => setSnowflakes(prev => prev.filter(s => !snowflakes6.find(ns => ns.id === s.id))), 1500);
            oscillator.frequency.setValueAtTime(1046.5, ctx.currentTime);
            oscillator.frequency.setValueAtTime(1318.5, ctx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.5);
            break;
          case 'dragon-8':
            const goldFlakes = Array.from({ length: 12 }, (_, i) => ({
              id: Date.now() + i,
              x: x + (Math.random() - 0.5) * 120,
              y: y + (Math.random() - 0.5) * 120,
              size: 15 + Math.random() * 20
            }));
            setSnowflakes(prev => [...prev, ...goldFlakes]);
            setTimeout(() => setSnowflakes(prev => prev.filter(s => !goldFlakes.find(ns => ns.id === s.id))), 1500);
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523.25, ctx.currentTime);
            oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.6);
            break;
          case 'dragon-9':
            const amethystFlakes = Array.from({ length: 16 }, (_, i) => ({
              id: Date.now() + i,
              x: x + (Math.random() - 0.5) * 150,
              y: y + (Math.random() - 0.5) * 150,
              size: 20 + Math.random() * 25
            }));
            setSnowflakes(prev => [...prev, ...amethystFlakes]);
            setTimeout(() => setSnowflakes(prev => prev.filter(s => !amethystFlakes.find(ns => ns.id === s.id))), 1500);
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(830.61, ctx.currentTime);
            oscillator.frequency.setValueAtTime(987.77, ctx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.2);
            oscillator.frequency.setValueAtTime(1396.91, ctx.currentTime + 0.3);
            gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.8);
            break;
          case 'dragon-10':
            const neonFlakes = Array.from({ length: 20 }, (_, i) => ({
              id: Date.now() + i,
              x: x + (Math.random() - 0.5) * 160,
              y: y + (Math.random() - 0.5) * 160,
              size: 18 + Math.random() * 22
            }));
            setSnowflakes(prev => [...prev, ...neonFlakes]);
            setTimeout(() => setSnowflakes(prev => prev.filter(s => !neonFlakes.find(ns => ns.id === s.id))), 1500);
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(440, ctx.currentTime);
            oscillator.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2);
            oscillator.frequency.setValueAtTime(880, ctx.currentTime + 0.3);
            gainNode.gain.setValueAtTime(0.35, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.7);
            break;
          case 'dragon-11':
            const cyberFlakes = Array.from({ length: 24 }, (_, i) => ({
              id: Date.now() + i,
              x: x + (Math.random() - 0.5) * 180,
              y: y + (Math.random() - 0.5) * 180,
              size: 20 + Math.random() * 25
            }));
            setSnowflakes(prev => [...prev, ...cyberFlakes]);
            setTimeout(() => setSnowflakes(prev => prev.filter(s => !cyberFlakes.find(ns => ns.id === s.id))), 1500);
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(329.63, ctx.currentTime);
            oscillator.frequency.setValueAtTime(392, ctx.currentTime + 0.08);
            oscillator.frequency.setValueAtTime(493.88, ctx.currentTime + 0.16);
            oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.24);
            gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.8);
            break;
          case 'dragon-12':
            const mechaFlakes = Array.from({ length: 28 }, (_, i) => ({
              id: Date.now() + i,
              x: x + (Math.random() - 0.5) * 200,
              y: y + (Math.random() - 0.5) * 200,
              size: 22 + Math.random() * 28
            }));
            setSnowflakes(prev => [...prev, ...mechaFlakes]);
            setTimeout(() => setSnowflakes(prev => prev.filter(s => !mechaFlakes.find(ns => ns.id === s.id))), 1500);
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(261.63, ctx.currentTime);
            oscillator.frequency.setValueAtTime(329.63, ctx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(392, ctx.currentTime + 0.2);
            oscillator.frequency.setValueAtTime(523.25, ctx.currentTime + 0.3);
            oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.4);
            gainNode.gain.setValueAtTime(0.45, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.9);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.9);
            break;
          case 'dragon-13':
            const spaceFlakes = Array.from({ length: 32 }, (_, i) => ({
              id: Date.now() + i,
              x: x + (Math.random() - 0.5) * 220,
              y: y + (Math.random() - 0.5) * 220,
              size: 24 + Math.random() * 30
            }));
            setSnowflakes(prev => [...prev, ...spaceFlakes]);
            setTimeout(() => setSnowflakes(prev => prev.filter(s => !spaceFlakes.find(ns => ns.id === s.id))), 1500);
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(220, ctx.currentTime);
            oscillator.frequency.setValueAtTime(277.18, ctx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(329.63, ctx.currentTime + 0.2);
            oscillator.frequency.setValueAtTime(440, ctx.currentTime + 0.3);
            oscillator.frequency.setValueAtTime(554.37, ctx.currentTime + 0.4);
            oscillator.frequency.setValueAtTime(880, ctx.currentTime + 0.5);
            gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 1);
            break;
          case 'dragon-14':
            const cartoonFlakes = Array.from({ length: 36 }, (_, i) => ({
              id: Date.now() + i,
              x: x + (Math.random() - 0.5) * 240,
              y: y + (Math.random() - 0.5) * 240,
              size: 26 + Math.random() * 32
            }));
            setSnowflakes(prev => [...prev, ...cartoonFlakes]);
            setTimeout(() => setSnowflakes(prev => prev.filter(s => !cartoonFlakes.find(ns => ns.id === s.id))), 1500);
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(523.25, ctx.currentTime);
            oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
            oscillator.frequency.setValueAtTime(1046.5, ctx.currentTime + 0.3);
            oscillator.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.4);
            oscillator.frequency.setValueAtTime(1567.98, ctx.currentTime + 0.5);
            gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.1);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 1.1);
            break;
          case 'dragon-15':
            const electricFlakes = Array.from({ length: 18 }, (_, i) => ({
              id: Date.now() + i,
              x: x + (Math.random() - 0.5) * 140,
              y: y + (Math.random() - 0.5) * 140,
              size: 16 + Math.random() * 20
            }));
            setSnowflakes(prev => [...prev, ...electricFlakes]);
            setTimeout(() => setSnowflakes(prev => prev.filter(s => !electricFlakes.find(ns => ns.id === s.id))), 1500);
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(987.77, ctx.currentTime);
            oscillator.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.05);
            oscillator.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.35, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.4);
            break;
          case 'dragon-16':
            const neonDefenderFlakes = Array.from({ length: 22 }, (_, i) => ({
              id: Date.now() + i,
              x: x + (Math.random() - 0.5) * 160,
              y: y + (Math.random() - 0.5) * 160,
              size: 18 + Math.random() * 24
            }));
            setSnowflakes(prev => [...prev, ...neonDefenderFlakes]);
            setTimeout(() => setSnowflakes(prev => prev.filter(s => !neonDefenderFlakes.find(ns => ns.id === s.id))), 1500);
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(659.25, ctx.currentTime);
            oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.08);
            oscillator.frequency.setValueAtTime(987.77, ctx.currentTime + 0.16);
            gainNode.gain.setValueAtTime(0.38, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.5);
            break;
          case 'dragon-17':
            const snowGuardianFlakes = Array.from({ length: 26 }, (_, i) => ({
              id: Date.now() + i,
              x: x + (Math.random() - 0.5) * 180,
              y: y + (Math.random() - 0.5) * 180,
              size: 20 + Math.random() * 26
            }));
            setSnowflakes(prev => [...prev, ...snowGuardianFlakes]);
            setTimeout(() => setSnowflakes(prev => prev.filter(s => !snowGuardianFlakes.find(ns => ns.id === s.id))), 1500);
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(440, ctx.currentTime);
            oscillator.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2);
            oscillator.frequency.setValueAtTime(880, ctx.currentTime + 0.3);
            gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.6);
            break;
          case 'dragon-18':
            const springFlakes = Array.from({ length: 30 }, (_, i) => ({
              id: Date.now() + i,
              x: x + (Math.random() - 0.5) * 200,
              y: y + (Math.random() - 0.5) * 200,
              size: 22 + Math.random() * 28
            }));
            setSnowflakes(prev => [...prev, ...springFlakes]);
            setTimeout(() => setSnowflakes(prev => prev.filter(s => !springFlakes.find(ns => ns.id === s.id))), 1500);
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(523.25, ctx.currentTime);
            oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
            oscillator.frequency.setValueAtTime(1046.5, ctx.currentTime + 0.3);
            gainNode.gain.setValueAtTime(0.42, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.7);
            break;
          case 'dragon-19':
            const flowerFlakes = Array.from({ length: 34 }, (_, i) => ({
              id: Date.now() + i,
              x: x + (Math.random() - 0.5) * 220,
              y: y + (Math.random() - 0.5) * 220,
              size: 24 + Math.random() * 30
            }));
            setSnowflakes(prev => [...prev, ...flowerFlakes]);
            setTimeout(() => setSnowflakes(prev => prev.filter(s => !flowerFlakes.find(ns => ns.id === s.id))), 1500);
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(392, ctx.currentTime);
            oscillator.frequency.setValueAtTime(493.88, ctx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(587.33, ctx.currentTime + 0.2);
            oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.3);
            oscillator.frequency.setValueAtTime(987.77, ctx.currentTime + 0.4);
            gainNode.gain.setValueAtTime(0.45, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.8);
            break;
          default:
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn77BfGAg+ltzy0YMwBSZ9y/DVijYIHGu87+Wc');
            audio.volume = 0.3;
            audio.play().catch(() => {});
        }
      };
      
      playDragonEffect(currentDragonId);
      
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

  const handleGoldExchange = (amount: number) => {
    const cost = amount * 15000000000;
    if (coins >= cost) {
      setCoins(prev => prev - cost);
      setGoldCoins(prev => prev + amount);
    }
  };

  const handleLogout = () => {
    removeUser();
    onLogout();
  };

  const handleBuyDragon = (dragon: Dragon) => {
    const isGoldDragon = dragon.goldCost !== undefined && dragon.goldCost > 0;
    const canAfford = isGoldDragon 
      ? goldCoins >= (dragon.goldCost || 0)
      : coins >= dragon.cost;
    
    if (canAfford && !ownedDragons.includes(dragon.id)) {
      if (isGoldDragon) {
        setGoldCoins(prev => prev - (dragon.goldCost || 0));
      } else {
        setCoins(prev => prev - dragon.cost);
      }
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

  if (showShop) {
    return (
      <DragonShop
        coins={coins}
        goldCoins={goldCoins}
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
      currentDragonId === 'dragon-6' 
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

      {showGoldExchange && (
        <GoldExchange
          coins={coins}
          goldCoins={goldCoins}
          onExchange={handleGoldExchange}
          onClose={() => setShowGoldExchange(false)}
          formatNumber={formatNumber}
        />
      )}
      
      {currentDragonId === 'dragon-6' && (
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
          goldCoins={goldCoins}
          coinsPerSecond={coinsPerSecond}
          passiveIncomeIndicator={passiveIncomeIndicator}
          onShopClick={() => setShowShop(true)}
          onProfileClick={() => setShowProfile(true)}
          onGoldClick={() => setShowGoldExchange(true)}
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
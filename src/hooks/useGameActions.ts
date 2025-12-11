import { Dragon, Upgrade } from '@/types/game';
import { DRAGONS } from '@/data/dragons';

interface UseGameActionsProps {
  energy: number;
  energyRestoreTime: number | null;
  coinsPerTap: number;
  currentDragonId: string;
  coins: number;
  goldCoins: number;
  ownedDragons: string[];
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  setTotalCoins: React.Dispatch<React.SetStateAction<number>>;
  setEnergy: React.Dispatch<React.SetStateAction<number>>;
  setClickAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  setEnergyRestoreTime: React.Dispatch<React.SetStateAction<number | null>>;
  setFloatingTexts: React.Dispatch<React.SetStateAction<Array<{ id: number; value: number; x: number; y: number; dragonType?: string }>>>;
  setSnowflakes: React.Dispatch<React.SetStateAction<Array<{ id: number; x: number; y: number; size: number }>>>;
  setCoinsPerSecond: React.Dispatch<React.SetStateAction<number>>;
  setUpgrades: React.Dispatch<React.SetStateAction<Upgrade[]>>;
  setGoldCoins: React.Dispatch<React.SetStateAction<number>>;
  setOwnedDragons: React.Dispatch<React.SetStateAction<string[]>>;
  setDragonChangeAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentDragonId: React.Dispatch<React.SetStateAction<string>>;
  setCoinsPerTap: React.Dispatch<React.SetStateAction<number>>;
  setMaxEnergy: React.Dispatch<React.SetStateAction<number>>;
  setTotalClicks: React.Dispatch<React.SetStateAction<number>>;
  setTotalEnergyUsed: React.Dispatch<React.SetStateAction<number>>;
  setTotalUpgrades: React.Dispatch<React.SetStateAction<number>>;
}

export function useGameActions({
  energy,
  energyRestoreTime,
  coinsPerTap,
  currentDragonId,
  coins,
  goldCoins,
  ownedDragons,
  setCoins,
  setTotalCoins,
  setEnergy,
  setClickAnimation,
  setEnergyRestoreTime,
  setFloatingTexts,
  setSnowflakes,
  setCoinsPerSecond,
  setUpgrades,
  setGoldCoins,
  setOwnedDragons,
  setDragonChangeAnimation,
  setCurrentDragonId,
  setCoinsPerTap,
  setMaxEnergy,
  setTotalClicks,
  setTotalEnergyUsed,
  setTotalUpgrades,
}: UseGameActionsProps) {
  const handleDragonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (energy >= 10 && !energyRestoreTime) {
      const newEnergy = energy - 10;
      setCoins(prev => prev + coinsPerTap);
      setTotalCoins(prev => prev + coinsPerTap);
      setEnergy(newEnergy);
      setClickAnimation(true);
      setTotalClicks(prev => prev + 1);
      setTotalEnergyUsed(prev => prev + 10);
      
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
          case 'dragon-25':
            const infernoFlames = Array.from({ length: 40 }, (_, i) => ({
              id: Date.now() + i,
              x: x + (Math.random() - 0.5) * 250,
              y: y + (Math.random() - 0.5) * 250,
              size: 28 + Math.random() * 35
            }));
            setSnowflakes(prev => [...prev, ...infernoFlames]);
            setTimeout(() => setSnowflakes(prev => prev.filter(s => !infernoFlames.find(ns => ns.id === s.id))), 2000);
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(220, ctx.currentTime);
            oscillator.frequency.setValueAtTime(329.63, ctx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(440, ctx.currentTime + 0.2);
            oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.3);
            oscillator.frequency.setValueAtTime(880, ctx.currentTime + 0.4);
            oscillator.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.5);
            gainNode.gain.setValueAtTime(0.55, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 1.2);
            break;
          case 'dragon-26':
            const hellFireFlames = Array.from({ length: 50 }, (_, i) => ({
              id: Date.now() + i,
              x: x + (Math.random() - 0.5) * 300,
              y: y + (Math.random() - 0.5) * 300,
              size: 32 + Math.random() * 40
            }));
            setSnowflakes(prev => [...prev, ...hellFireFlames]);
            setTimeout(() => setSnowflakes(prev => prev.filter(s => !hellFireFlames.find(ns => ns.id === s.id))), 2500);
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(110, ctx.currentTime);
            oscillator.frequency.setValueAtTime(164.81, ctx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(220, ctx.currentTime + 0.2);
            oscillator.frequency.setValueAtTime(329.63, ctx.currentTime + 0.3);
            oscillator.frequency.setValueAtTime(440, ctx.currentTime + 0.4);
            oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.5);
            oscillator.frequency.setValueAtTime(880, ctx.currentTime + 0.6);
            oscillator.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.7);
            gainNode.gain.setValueAtTime(0.6, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 1.5);
            break;
          case 'dragon-27':
            const cosmicStars = Array.from({ length: 45 }, (_, i) => ({
              id: Date.now() + i,
              x: x + (Math.random() - 0.5) * 280,
              y: y + (Math.random() - 0.5) * 280,
              size: 30 + Math.random() * 38
            }));
            setSnowflakes(prev => [...prev, ...cosmicStars]);
            setTimeout(() => setSnowflakes(prev => prev.filter(s => !cosmicStars.find(ns => ns.id === s.id))), 2200);
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(174.61, ctx.currentTime);
            oscillator.frequency.setValueAtTime(261.63, ctx.currentTime + 0.12);
            oscillator.frequency.setValueAtTime(392, ctx.currentTime + 0.24);
            oscillator.frequency.setValueAtTime(523.25, ctx.currentTime + 0.36);
            oscillator.frequency.setValueAtTime(698.46, ctx.currentTime + 0.48);
            oscillator.frequency.setValueAtTime(880, ctx.currentTime + 0.6);
            oscillator.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.72);
            gainNode.gain.setValueAtTime(0.58, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.3);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 1.3);
            break;
          case 'dragon-28':
            const pinkRoses = Array.from({ length: 55 }, (_, i) => ({
              id: Date.now() + i,
              x: x + (Math.random() - 0.5) * 320,
              y: y + (Math.random() - 0.5) * 320,
              size: 34 + Math.random() * 42
            }));
            setSnowflakes(prev => [...prev, ...pinkRoses]);
            setTimeout(() => setSnowflakes(prev => prev.filter(s => !pinkRoses.find(ns => ns.id === s.id))), 2800);
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(261.63, ctx.currentTime);
            oscillator.frequency.setValueAtTime(329.63, ctx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(392, ctx.currentTime + 0.2);
            oscillator.frequency.setValueAtTime(523.25, ctx.currentTime + 0.3);
            oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.4);
            oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.5);
            oscillator.frequency.setValueAtTime(1046.5, ctx.currentTime + 0.6);
            oscillator.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.7);
            oscillator.frequency.setValueAtTime(1567.98, ctx.currentTime + 0.8);
            gainNode.gain.setValueAtTime(0.62, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.6);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 1.6);
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
      setTotalUpgrades(prev => prev + 1);
    }
  };

  const handleGoldExchange = (amount: number) => {
    const cost = amount * 15000000000;
    if (coins >= cost) {
      setCoins(prev => prev - cost);
      setGoldCoins(prev => prev + amount);
    }
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
      setTotalUpgrades(prev => prev + 1);
      
      // Save previous dragon if this is a temporary dragon
      if (dragon.isTemporary) {
        const gameState = localStorage.getItem('gameState');
        if (gameState) {
          const state = JSON.parse(gameState);
          state.previousDragonId = currentDragonId;
          localStorage.setItem('gameState', JSON.stringify(state));
        }
      }
      
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

  return {
    handleDragonClick,
    handleBuyUpgrade,
    handleGoldExchange,
    handleBuyDragon,
    handleSelectDragon,
  };
}
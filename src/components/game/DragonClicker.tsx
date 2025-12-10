import Icon from '@/components/ui/icon';
import { Dragon } from '@/types/game';

interface DragonClickerProps {
  currentDragon: Dragon;
  currentDragonId: string;
  energy: number;
  maxEnergy: number;
  energyRestoreTime: number | null;
  timeRemaining: string;
  coinsPerTap: number;
  clickAnimation: boolean;
  dragonChangeAnimation: boolean;
  floatingTexts: Array<{ id: number; value: number; x: number; y: number; isNewYear?: boolean; isGolden?: boolean; isAmethyst?: boolean }>;
  snowflakes: Array<{ id: number; x: number; y: number; size: number }>;
  onDragonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function DragonClicker({
  currentDragon,
  currentDragonId,
  energy,
  maxEnergy,
  energyRestoreTime,
  timeRemaining,
  coinsPerTap,
  clickAnimation,
  dragonChangeAnimation,
  floatingTexts,
  snowflakes,
  onDragonClick
}: DragonClickerProps) {
  return (
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
          onClick={onDragonClick}
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
          
          {currentDragonId === 'dragon-6' && (
            <>
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full animate-twinkle"
                  style={{
                    left: `${10 + (i * 7)}%`,
                    top: `${5 + Math.sin(i) * 15}%`,
                    background: ['#ff0000', '#00ff00', '#ffff00', '#0000ff'][i % 4],
                    boxShadow: `0 0 10px ${['#ff0000', '#00ff00', '#ffff00', '#0000ff'][i % 4]}`,
                    animation: `twinkle ${1 + (i % 3) * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
              {[...Array(12)].map((_, i) => (
                <div
                  key={`bottom-${i}`}
                  className="absolute w-3 h-3 rounded-full animate-twinkle"
                  style={{
                    left: `${10 + (i * 7)}%`,
                    bottom: `${5 + Math.sin(i) * 15}%`,
                    background: ['#ff0000', '#00ff00', '#ffff00', '#0000ff'][i % 4],
                    boxShadow: `0 0 10px ${['#ff0000', '#00ff00', '#ffff00', '#0000ff'][i % 4]}`,
                    animation: `twinkle ${1 + (i % 3) * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </>
          )}
          
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
              <div className={`text-3xl font-bold ${
                text.isNewYear ? 'text-white' : 
                text.isGolden ? 'text-yellow-300' : 
                text.isAmethyst ? 'text-purple-300' : 
                'text-yellow-400'
              } drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]`}
                style={{ 
                  WebkitTextStroke: text.isNewYear ? '1px rgba(0,200,255,0.8)' : 
                                    text.isGolden ? '1px rgba(255,215,0,1)' :
                                    text.isAmethyst ? '1px rgba(147,51,234,1)' :
                                    '1px rgba(255,100,0,0.8)',
                  filter: text.isNewYear ? 'drop-shadow(0 0 10px rgba(0,200,255,0.8))' : 
                         text.isGolden ? 'drop-shadow(0 0 20px rgba(255,215,0,1)) drop-shadow(0 0 30px rgba(255,165,0,0.8))' :
                         text.isAmethyst ? 'drop-shadow(0 0 20px rgba(147,51,234,1)) drop-shadow(0 0 30px rgba(192,38,211,0.8))' :
                         'drop-shadow(0 0 10px rgba(255,215,0,0.8))'
                }}
              >
                {text.isNewYear && '❄️'}
                {text.isGolden && '💰'}
                {text.isAmethyst && '💎'}
                +{text.value}
                {text.isNewYear && '🎄'}
                {text.isGolden && '✨'}
                {text.isAmethyst && '🔮'}
              </div>
            </div>
          ))}
          
          {snowflakes.map(flake => {
            const isGolden = currentDragonId === 'dragon-8';
            const isAmethyst = currentDragonId === 'dragon-9';
            const emoji = isGolden ? '✨' : isAmethyst ? '💎' : '❄️';
            
            return (
              <div
                key={flake.id}
                className="absolute pointer-events-none z-20 animate-snowfall"
                style={{
                  left: flake.x,
                  top: flake.y,
                  fontSize: flake.size,
                  animation: 'snowfall 1.5s ease-out forwards'
                }}
              >
                {emoji}
              </div>
            );
          })}
        </button>

        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full border-2 border-purple-400 shadow-lg">
          <span className="font-bold">Клик: +{coinsPerTap}</span>
        </div>
      </div>
    </div>
  );
}
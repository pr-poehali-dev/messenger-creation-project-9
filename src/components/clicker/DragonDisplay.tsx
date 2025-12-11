import { Dragon } from '@/types/game';
import FloatingEffects from './FloatingEffects';

interface DragonDisplayProps {
  currentDragon: Dragon;
  currentDragonId: string;
  energy: number;
  energyRestoreTime: number | null;
  coinsPerTap: number;
  clickAnimation: boolean;
  dragonChangeAnimation: boolean;
  floatingTexts: Array<{ id: number; value: number; x: number; y: number; dragonType?: string }>;
  snowflakes: Array<{ id: number; x: number; y: number; size: number }>;
  onDragonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function DragonDisplay({
  currentDragon,
  currentDragonId,
  energy,
  energyRestoreTime,
  coinsPerTap,
  clickAnimation,
  dragonChangeAnimation,
  floatingTexts,
  snowflakes,
  onDragonClick
}: DragonDisplayProps) {
  return (
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
        
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-center z-10">
          <div className="text-3xl sm:text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] 
            bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent
            [text-shadow:_0_2px_20px_rgb(0_0_0_/_80%)]"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}
          >
            +{coinsPerTap}
          </div>
        </div>

        <FloatingEffects 
          floatingTexts={floatingTexts}
          snowflakes={snowflakes}
          currentDragonId={currentDragonId}
        />
      </button>
    </div>
  );
}

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

        {currentDragonId === 'dragon-30' && (
          <>
            {[...Array(8)].map((_, i) => (
              <div
                key={`clock-${i}`}
                className="absolute"
                style={{
                  left: `${15 + (i * 10)}%`,
                  top: `${10 + Math.sin(i * 0.8) * 20}%`,
                  width: '40px',
                  height: '40px',
                  animation: `float ${3 + (i % 2)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                  opacity: 0.6,
                }}
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 rounded-full border-2 border-amber-400 bg-amber-900/30 backdrop-blur-sm" />
                  <div 
                    className="absolute top-1/2 left-1/2 w-0.5 h-3 bg-amber-300 origin-bottom"
                    style={{
                      transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </>
        )}

        {(currentDragonId === 'dragon-31' || currentDragonId === 'dragon-32') && (
          <>
            {[...Array(20)].map((_, i) => (
              <div
                key={`snow-${i}`}
                className="absolute animate-snowfall"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                  width: '8px',
                  height: '8px',
                  animation: `snowfall ${5 + Math.random() * 5}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              >
                <div className="w-full h-full bg-white rounded-full opacity-80 blur-[1px]" 
                  style={{
                    boxShadow: '0 0 8px rgba(255,255,255,0.8)',
                  }}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-transparent to-transparent animate-pulse" />
          </>
        )}

        {currentDragonId === 'dragon-33' && (
          <>
            {[...Array(30)].map((_, i) => {
              const colors = ['#ff0000', '#ff6600', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff'];
              return (
                <div
                  key={`mosaic-${i}`}
                  className="absolute animate-sparkle"
                  style={{
                    left: `${5 + (i * 3)}%`,
                    top: `${10 + Math.sin(i * 0.5) * 30}%`,
                    width: `${6 + Math.random() * 8}px`,
                    height: `${6 + Math.random() * 8}px`,
                    background: colors[i % colors.length],
                    boxShadow: `0 0 15px ${colors[i % colors.length]}`,
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    animation: `sparkle ${1.5 + (i % 3) * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`,
                    opacity: 0.7,
                  }}
                />
              );
            })}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-yellow-500/10 to-cyan-500/10" />
          </>
        )}

        {currentDragonId === 'dragon-34' && (
          <>
            {[...Array(15)].map((_, i) => {
              const petalColors = ['#ff69b4', '#ff1493', '#ff85c1', '#ffc0cb'];
              return (
                <div
                  key={`petal-${i}`}
                  className="absolute animate-float"
                  style={{
                    left: `${Math.random() * 90}%`,
                    top: `${Math.random() * 90}%`,
                    width: '12px',
                    height: '12px',
                    background: petalColors[i % petalColors.length],
                    borderRadius: '50% 0% 50% 0%',
                    transform: `rotate(${i * 24}deg)`,
                    boxShadow: `0 0 10px ${petalColors[i % petalColors.length]}`,
                    animation: `float ${4 + (i % 3)}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                    opacity: 0.6,
                  }}
                />
              );
            })}
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 via-transparent to-green-500/10" />
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
interface FloatingText {
  id: number;
  value: number;
  x: number;
  y: number;
  dragonType?: string;
}

interface FloatingEffectsProps {
  floatingTexts: FloatingText[];
  snowflakes: Array<{ id: number; x: number; y: number; size: number }>;
  currentDragonId: string;
}

export default function FloatingEffects({ floatingTexts, snowflakes, currentDragonId }: FloatingEffectsProps) {
  const getDragonStyle = (dragonId?: string) => {
    switch(dragonId) {
      case 'dragon-6':
        return { color: 'text-white', stroke: '1px rgba(0,200,255,0.8)', filter: 'drop-shadow(0 0 10px rgba(0,200,255,0.8))', emoji: '❄️🎄' };
      case 'dragon-8':
        return { color: 'text-yellow-300', stroke: '1px rgba(255,215,0,1)', filter: 'drop-shadow(0 0 20px rgba(255,215,0,1)) drop-shadow(0 0 30px rgba(255,165,0,0.8))', emoji: '💰✨' };
      case 'dragon-9':
        return { color: 'text-purple-300', stroke: '1px rgba(147,51,234,1)', filter: 'drop-shadow(0 0 20px rgba(147,51,234,1)) drop-shadow(0 0 30px rgba(192,38,211,0.8))', emoji: '💎🔮' };
      case 'dragon-10':
        return { color: 'text-cyan-400', stroke: '1px rgba(0,255,255,1)', filter: 'drop-shadow(0 0 20px rgba(0,255,255,1))', emoji: '⚡🌟' };
      case 'dragon-11':
        return { color: 'text-blue-400', stroke: '1px rgba(59,130,246,1)', filter: 'drop-shadow(0 0 20px rgba(59,130,246,1))', emoji: '🤖💠' };
      case 'dragon-12':
        return { color: 'text-gray-300', stroke: '1px rgba(156,163,175,1)', filter: 'drop-shadow(0 0 20px rgba(156,163,175,1))', emoji: '⚙️🔧' };
      case 'dragon-13':
        return { color: 'text-indigo-400', stroke: '1px rgba(99,102,241,1)', filter: 'drop-shadow(0 0 20px rgba(99,102,241,1))', emoji: '🌌🚀' };
      case 'dragon-14':
        return { color: 'text-pink-400', stroke: '1px rgba(244,114,182,1)', filter: 'drop-shadow(0 0 20px rgba(244,114,182,1))', emoji: '🎨🎭' };
      case 'dragon-15':
        return { color: 'text-violet-400', stroke: '1px rgba(139,92,246,1)', filter: 'drop-shadow(0 0 20px rgba(139,92,246,1))', emoji: '⚡💜' };
      case 'dragon-16':
        return { color: 'text-teal-400', stroke: '1px rgba(20,184,166,1)', filter: 'drop-shadow(0 0 20px rgba(20,184,166,1))', emoji: '🛡️💠' };
      case 'dragon-17':
        return { color: 'text-slate-300', stroke: '1px rgba(203,213,225,1)', filter: 'drop-shadow(0 0 20px rgba(203,213,225,1))', emoji: '❄️🏔️' };
      case 'dragon-18':
        return { color: 'text-green-400', stroke: '1px rgba(74,222,128,1)', filter: 'drop-shadow(0 0 20px rgba(74,222,128,1))', emoji: '🌸🌿' };
      case 'dragon-19':
        return { color: 'text-rose-400', stroke: '1px rgba(251,113,133,1)', filter: 'drop-shadow(0 0 20px rgba(251,113,133,1))', emoji: '🌺🌹' };
      case 'dragon-25':
        return { color: 'text-orange-400', stroke: '2px rgba(255,69,0,1)', filter: 'drop-shadow(0 0 25px rgba(255,69,0,1)) drop-shadow(0 0 40px rgba(255,140,0,0.9))', emoji: '🔥💥' };
      case 'dragon-26':
        return { color: 'text-red-500', stroke: '2px rgba(220,38,38,1)', filter: 'drop-shadow(0 0 30px rgba(220,38,38,1)) drop-shadow(0 0 50px rgba(239,68,68,1))', emoji: '🔥⚡' };
      case 'dragon-27':
        return { color: 'text-cyan-300', stroke: '2px rgba(103,232,249,1)', filter: 'drop-shadow(0 0 28px rgba(103,232,249,1)) drop-shadow(0 0 45px rgba(34,211,238,1))', emoji: '⭐🌌' };
      case 'dragon-28':
        return { color: 'text-pink-300', stroke: '2px rgba(249,168,212,1)', filter: 'drop-shadow(0 0 32px rgba(249,168,212,1)) drop-shadow(0 0 55px rgba(244,114,182,1))', emoji: '🌹💖' };
      default:
        return { color: 'text-yellow-400', stroke: '1px rgba(255,100,0,0.8)', filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.8))', emoji: '' };
    }
  };

  const getEmoji = (dragonId: string) => {
    const emojiMap: Record<string, string> = {
      'dragon-6': '❄️',
      'dragon-8': '✨',
      'dragon-9': '💎',
      'dragon-10': '⚡',
      'dragon-11': '💠',
      'dragon-12': '⚙️',
      'dragon-13': '🌌',
      'dragon-14': '🎨',
      'dragon-15': '⚡',
      'dragon-16': '💠',
      'dragon-17': '❄️',
      'dragon-18': '🌸',
      'dragon-19': '🌺',
      'dragon-25': '🔥',
      'dragon-26': '💥',
      'dragon-27': '⭐',
      'dragon-28': '🌹'
    };
    return emojiMap[dragonId] || '✨';
  };

  return (
    <>
      {floatingTexts.map(text => {
        const style = getDragonStyle(text.dragonType);
        const [emojiStart, emojiEnd] = style.emoji.split('');
        
        return (
          <div
            key={text.id}
            className="absolute pointer-events-none z-20 animate-float"
            style={{
              left: text.x,
              top: text.y,
              animation: 'floatUp 1s ease-out forwards'
            }}
          >
            <div className={`text-3xl font-bold ${style.color} drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]`}
              style={{ 
                WebkitTextStroke: style.stroke,
                filter: style.filter
              }}
            >
              {emojiStart}+{text.value}{emojiEnd}
            </div>
          </div>
        );
      })}
      
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="absolute pointer-events-none z-20 animate-snowfall"
          style={{
            left: flake.x,
            top: flake.y,
            fontSize: `${flake.size}px`,
            animation: 'snowfall 1.5s linear forwards'
          }}
        >
          {getEmoji(currentDragonId)}
        </div>
      ))}
    </>
  );
}

import Icon from '@/components/ui/icon';

interface EnergyBarProps {
  energy: number;
  maxEnergy: number;
  energyRestoreTime: number | null;
  timeRemaining: string;
}

export default function EnergyBar({ energy, maxEnergy, energyRestoreTime, timeRemaining }: EnergyBarProps) {
  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-purple-500/30">
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
  );
}

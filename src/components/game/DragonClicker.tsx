import { Dragon } from '@/types/game';
import EnergyBar from '@/components/clicker/EnergyBar';
import DragonDisplay from '@/components/clicker/DragonDisplay';

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
  floatingTexts: Array<{ id: number; value: number; x: number; y: number; dragonType?: string }>;
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
    <div className="space-y-4 sm:space-y-6">
      <EnergyBar
        energy={energy}
        maxEnergy={maxEnergy}
        energyRestoreTime={energyRestoreTime}
        timeRemaining={timeRemaining}
      />

      <DragonDisplay
        currentDragon={currentDragon}
        currentDragonId={currentDragonId}
        energy={energy}
        energyRestoreTime={energyRestoreTime}
        coinsPerTap={coinsPerTap}
        clickAnimation={clickAnimation}
        dragonChangeAnimation={dragonChangeAnimation}
        floatingTexts={floatingTexts}
        snowflakes={snowflakes}
        onDragonClick={onDragonClick}
      />
    </div>
  );
}

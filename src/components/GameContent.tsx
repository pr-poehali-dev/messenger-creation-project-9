import { Building, BuildingType, GameState, Quest } from '@/types/game';
import GameMap from './GameMap';
import BuildMenu from './BuildMenu';
import QuestsPanel from './QuestsPanel';

interface GameContentProps {
  gameState: GameState;
  buildingTypes: BuildingType[];
  quests: Quest[];
  buildMode: boolean;
  showQuests: boolean;
  selectedBuildingType: BuildingType | null;
  onBuild: (x: number, y: number) => void;
  onCollect: (building: Building) => void;
  onCompleteBuilding: (buildingId: number) => void;
  onUpgrade: (building: Building) => void;
  onSelectType: (type: BuildingType) => void;
  onCancelBuild: () => void;
  onStartQuest: (questId: number) => void;
  onClaimQuest: (questId: number) => void;
}

export default function GameContent({
  gameState,
  buildingTypes,
  quests,
  buildMode,
  showQuests,
  selectedBuildingType,
  onBuild,
  onCollect,
  onCompleteBuilding,
  onUpgrade,
  onSelectType,
  onCancelBuild,
  onStartQuest,
  onClaimQuest
}: GameContentProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className={showQuests ? 'lg:col-span-2' : 'lg:col-span-3'}>
          <GameMap
            buildings={gameState.buildings}
            buildMode={buildMode}
            selectedBuildingType={selectedBuildingType}
            onBuild={onBuild}
            onCollect={onCollect}
            onCompleteBuilding={onCompleteBuilding}
            onUpgrade={onUpgrade}
          />
        </div>
        
        {showQuests && (
          <div className="lg:col-span-1">
            <QuestsPanel
              quests={quests}
              onStart={onStartQuest}
              onClaim={onClaimQuest}
            />
          </div>
        )}
        
        <div className="lg:col-span-1">
          <BuildMenu
            buildingTypes={buildingTypes}
            resources={gameState.resources}
            selectedType={selectedBuildingType}
            onSelectType={onSelectType}
            onCancel={onCancelBuild}
            buildMode={buildMode}
          />
        </div>
      </div>
    </div>
  );
}

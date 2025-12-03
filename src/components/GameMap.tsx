import { Building, BuildingType } from '@/types/game';
import { Button } from './ui/button';

interface GameMapProps {
  buildings: Building[];
  buildMode: boolean;
  selectedBuildingType: BuildingType | null;
  onBuild: (x: number, y: number) => void;
  onCollect: (building: Building) => void;
  onCompleteBuilding: (buildingId: number) => void;
  onUpgrade: (building: Building) => void;
}

export default function GameMap({
  buildings,
  buildMode,
  selectedBuildingType,
  onBuild,
  onCollect,
  onCompleteBuilding,
  onUpgrade
}: GameMapProps) {
  const GRID_SIZE = 10;
  const CELL_SIZE = 80;

  const getBuildingAt = (x: number, y: number) => {
    return buildings.find(b => b.x === x && b.y === y);
  };

  const canCollect = (building: Building) => {
    if (!building.produces || building.is_building) return false;
    
    const lastCollected = new Date(building.last_collected || 0);
    const now = new Date();
    const secondsPassed = (now.getTime() - lastCollected.getTime()) / 1000;
    
    return secondsPassed >= building.production_interval;
  };

  const getTimeUntilReady = (building: Building) => {
    if (building.is_building && building.build_complete_at) {
      const completeAt = new Date(building.build_complete_at);
      const now = new Date();
      const secondsLeft = Math.max(0, (completeAt.getTime() - now.getTime()) / 1000);
      return Math.ceil(secondsLeft);
    }
    
    if (building.produces && !building.is_building) {
      const lastCollected = new Date(building.last_collected || 0);
      const now = new Date();
      const secondsPassed = (now.getTime() - lastCollected.getTime()) / 1000;
      const secondsLeft = Math.max(0, building.production_interval - secondsPassed);
      return Math.ceil(secondsLeft);
    }
    
    return 0;
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}с`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}м ${secs}с`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {buildMode ? '🏗️ Выберите место для строительства' : '🗺️ Ваша территория'}
      </h2>
      
      <div 
        className="grid gap-1 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          maxWidth: `${GRID_SIZE * CELL_SIZE + (GRID_SIZE - 1) * 4}px`
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const building = getBuildingAt(x, y);
          const timeLeft = building ? getTimeUntilReady(building) : 0;

          return (
            <div
              key={i}
              className={`
                relative border-2 rounded-lg transition-all cursor-pointer
                ${building ? 'bg-green-100 border-green-300' : 'bg-gray-50 border-gray-200'}
                ${buildMode && !building ? 'hover:bg-blue-100 hover:border-blue-400' : ''}
                ${building && !building.is_building && canCollect(building) ? 'animate-pulse border-yellow-400' : ''}
              `}
              style={{ width: CELL_SIZE, height: CELL_SIZE }}
              onClick={() => {
                if (buildMode && !building && selectedBuildingType) {
                  onBuild(x, y);
                }
              }}
            >
              {building ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                  <div className="flex items-center gap-1">
                    <div className="text-3xl">{building.image}</div>
                    {building.level > 1 && (
                      <div className="text-xs font-bold bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                        {building.level}
                      </div>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-gray-700 text-center truncate w-full px-1">
                    {building.name}
                  </div>
                  
                  {building.is_building ? (
                    <div className="mt-1">
                      {timeLeft === 0 ? (
                        <Button
                          size="sm"
                          className="text-xs py-0 h-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            onCompleteBuilding(building.id);
                          }}
                        >
                          Готово!
                        </Button>
                      ) : (
                        <div className="text-xs text-orange-600 font-medium">
                          ⏳ {formatTime(timeLeft)}
                        </div>
                      )}
                    </div>
                  ) : building.produces ? (
                    <div className="mt-1 flex gap-1">
                      {canCollect(building) ? (
                        <Button
                          size="sm"
                          variant="default"
                          className="text-xs py-0 h-6 bg-yellow-500 hover:bg-yellow-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            onCollect(building);
                          }}
                        >
                          Собрать
                        </Button>
                      ) : (
                        <div className="text-xs text-blue-600 font-medium">
                          ⏱️ {formatTime(timeLeft)}
                        </div>
                      )}
                      {building.level < building.max_level && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs py-0 h-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpgrade(building);
                          }}
                        >
                          ⬆️
                        </Button>
                      )}
                    </div>
                  ) : (
                    building.level < building.max_level && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs py-0 h-6 mt-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpgrade(building);
                        }}
                      >
                        ⬆️ Улучшить
                      </Button>
                    )
                  )}
                </div>
              ) : buildMode && selectedBuildingType ? (
                <div className="absolute inset-0 flex items-center justify-center opacity-50">
                  <div className="text-4xl">{selectedBuildingType.image}</div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                  {x},{y}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
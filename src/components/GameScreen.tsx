import { useState, useEffect, useCallback } from 'react';
import { Building, BuildingType, GameState, Player } from '@/types/game';
import { getGameState, getBuildingTypes, buildBuilding, collectResources, completeBuilding } from '@/lib/api';
import ResourceBar from './ResourceBar';
import GameMap from './GameMap';
import BuildMenu from './BuildMenu';
import { Button } from './ui/button';

interface GameScreenProps {
  player: Player;
  onLogout: () => void;
}

export default function GameScreen({ player, onLogout }: GameScreenProps) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [buildingTypes, setBuildingTypes] = useState<BuildingType[]>([]);
  const [selectedBuildingType, setSelectedBuildingType] = useState<BuildingType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [buildMode, setBuildMode] = useState(false);

  const loadGameData = useCallback(async () => {
    try {
      const [state, types] = await Promise.all([
        getGameState(player.id.toString()),
        getBuildingTypes(player.id.toString())
      ]);
      setGameState(state);
      setBuildingTypes(types.building_types);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
      setLoading(false);
    }
  }, [player.id]);

  useEffect(() => {
    loadGameData();
    const interval = setInterval(loadGameData, 5000);
    return () => clearInterval(interval);
  }, [loadGameData]);

  const handleBuild = async (x: number, y: number) => {
    if (!selectedBuildingType || !gameState) return;

    try {
      await buildBuilding(player.id.toString(), selectedBuildingType.id, x, y);
      await loadGameData();
      setBuildMode(false);
      setSelectedBuildingType(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка строительства');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleCollect = async (building: Building) => {
    try {
      const result = await collectResources(player.id.toString(), building.id);
      setError(`Собрано: ${result.collected.amount} ${result.collected.resource}`);
      setTimeout(() => setError(''), 2000);
      await loadGameData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка сбора');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleCompleteBuilding = async (buildingId: number) => {
    try {
      await completeBuilding(player.id.toString(), buildingId);
      await loadGameData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка завершения');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-700">Загрузка игры...</div>
      </div>
    );
  }

  if (!gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-red-700">Ошибка загрузки игры</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">🏰 City Builder</h1>
            <span className="text-gray-600">Игрок: {player.username}</span>
          </div>
          <Button variant="outline" onClick={onLogout}>
            Выход
          </Button>
        </div>
        <ResourceBar resources={gameState.resources} />
      </div>

      {error && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <GameMap
              buildings={gameState.buildings}
              buildMode={buildMode}
              selectedBuildingType={selectedBuildingType}
              onBuild={handleBuild}
              onCollect={handleCollect}
              onCompleteBuilding={handleCompleteBuilding}
            />
          </div>
          
          <div className="lg:col-span-1">
            <BuildMenu
              buildingTypes={buildingTypes}
              resources={gameState.resources}
              selectedType={selectedBuildingType}
              onSelectType={(type) => {
                setSelectedBuildingType(type);
                setBuildMode(true);
              }}
              onCancel={() => {
                setBuildMode(false);
                setSelectedBuildingType(null);
              }}
              buildMode={buildMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

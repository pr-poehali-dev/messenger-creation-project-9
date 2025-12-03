import { useState, useEffect, useCallback } from 'react';
import { Building, BuildingType, GameState, Player, Quest } from '@/types/game';
import { getGameState, getBuildingTypes, buildBuilding, collectResources, completeBuilding, upgradeBuilding, getQuests, startQuest, claimQuestReward } from '@/lib/api';
import ResourceBar from './ResourceBar';
import GameMap from './GameMap';
import BuildMenu from './BuildMenu';
import QuestsPanel from './QuestsPanel';
import { Button } from './ui/button';
import Icon from './ui/icon';

interface GameScreenProps {
  player: Player;
  onLogout: () => void;
}

export default function GameScreen({ player, onLogout }: GameScreenProps) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [buildingTypes, setBuildingTypes] = useState<BuildingType[]>([]);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [selectedBuildingType, setSelectedBuildingType] = useState<BuildingType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [buildMode, setBuildMode] = useState(false);
  const [showQuests, setShowQuests] = useState(false);

  const loadGameData = useCallback(async () => {
    try {
      const [state, types, questsData] = await Promise.all([
        getGameState(player.id.toString()),
        getBuildingTypes(player.id.toString()),
        getQuests(player.id.toString())
      ]);
      setGameState(state);
      setBuildingTypes(types.building_types);
      setQuests(questsData.quests);
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

  const handleUpgrade = async (building: Building) => {
    try {
      const result = await upgradeBuilding(player.id.toString(), building.id);
      setError(result.message);
      setTimeout(() => setError(''), 2000);
      await loadGameData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка улучшения');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleStartQuest = async (questId: number) => {
    try {
      await startQuest(player.id.toString(), questId);
      await loadGameData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка начала квеста');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleClaimQuest = async (questId: number) => {
    try {
      const result = await claimQuestReward(player.id.toString(), questId);
      setError(`Награда получена! 🎁`);
      setTimeout(() => setError(''), 2000);
      await loadGameData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка получения награды');
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
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowQuests(!showQuests)}
            >
              <Icon name="ScrollText" size={20} />
              Квесты
              {quests.filter(q => q.progress >= q.target && !q.completed).length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {quests.filter(q => q.progress >= q.target && !q.completed).length}
                </span>
              )}
            </Button>
            <Button variant="outline" onClick={onLogout}>
              Выход
            </Button>
          </div>
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
          <div className={showQuests ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <GameMap
              buildings={gameState.buildings}
              buildMode={buildMode}
              selectedBuildingType={selectedBuildingType}
              onBuild={handleBuild}
              onCollect={handleCollect}
              onCompleteBuilding={handleCompleteBuilding}
              onUpgrade={handleUpgrade}
            />
          </div>
          
          {showQuests && (
            <div className="lg:col-span-1">
              <QuestsPanel
                quests={quests}
                onStart={handleStartQuest}
                onClaim={handleClaimQuest}
              />
            </div>
          )}
          
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
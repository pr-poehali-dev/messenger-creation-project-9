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
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-300 via-green-200 to-yellow-100">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-green-600 via-green-500 to-transparent"></div>
          
          <div className="absolute top-10 left-[5%] animate-cloud-float-1">
            <div className="text-8xl drop-shadow-2xl opacity-80">☁️</div>
          </div>
          <div className="absolute top-20 right-[10%] animate-cloud-float-2">
            <div className="text-9xl drop-shadow-2xl opacity-90">☁️</div>
          </div>
          <div className="absolute top-32 left-[40%] animate-cloud-float-3">
            <div className="text-7xl drop-shadow-2xl opacity-75">☁️</div>
          </div>
          <div className="absolute top-40 right-[30%] animate-cloud-float-4">
            <div className="text-8xl drop-shadow-2xl opacity-85">☁️</div>
          </div>
          
          <div className="absolute top-16 right-[15%] animate-sun-shine">
            <div className="text-9xl filter brightness-125 drop-shadow-2xl">☀️</div>
          </div>
          
          <div className="absolute bottom-32 left-[8%] animate-building-glow">
            <div className="text-9xl drop-shadow-2xl">🏰</div>
          </div>
          
          <div className="absolute bottom-28 left-[25%] animate-house-bounce">
            <div className="text-7xl drop-shadow-xl">🏠</div>
          </div>
          
          <div className="absolute bottom-36 right-[20%] animate-wheat-wave">
            <div className="text-8xl drop-shadow-xl">🌾</div>
          </div>
          
          <div className="absolute bottom-32 right-[35%] animate-tractor-move">
            <div className="text-7xl drop-shadow-xl">🚜</div>
          </div>
          
          <div className="absolute bottom-24 left-[45%] animate-tree-sway-natural">
            <div className="text-8xl drop-shadow-xl">🌳</div>
          </div>
          
          <div className="absolute bottom-28 right-[50%] animate-flower-grow">
            <div className="text-7xl drop-shadow-lg">🌻</div>
          </div>
          
          <div className="absolute bottom-40 left-[15%] animate-worker-build">
            <div className="text-6xl drop-shadow-lg">👷</div>
          </div>
          
          <div className="absolute bottom-36 right-[12%] animate-farmer-walk">
            <div className="text-6xl drop-shadow-lg">🧑‍🌾</div>
          </div>
          
          <div className="absolute top-[30%] left-[20%] animate-bird-soar">
            <div className="text-5xl drop-shadow-md">🦅</div>
          </div>
          
          <div className="absolute bottom-30 left-[35%] animate-monument-pulse">
            <div className="text-8xl drop-shadow-xl">🏛️</div>
          </div>
          
          <div className="absolute bottom-24 right-[45%] animate-apple-swing">
            <div className="text-6xl drop-shadow-lg">🍎</div>
          </div>
          
          <div className="absolute bottom-20 left-[60%] animate-bush-rustle">
            <div className="text-6xl drop-shadow-lg">🌿</div>
          </div>
          
          <div className="absolute bottom-26 right-[25%] animate-flower-bloom">
            <div className="text-6xl drop-shadow-lg">🌷</div>
          </div>
          
          <div className="absolute top-[40%] right-[40%] animate-butterfly-flutter">
            <div className="text-5xl drop-shadow-md">🦋</div>
          </div>
          
          <div className="absolute bottom-34 left-[50%] animate-rabbit-hop">
            <div className="text-5xl drop-shadow-md">🐰</div>
          </div>
          
          <div className="absolute top-[50%] right-[15%] animate-bee-buzz">
            <div className="text-4xl drop-shadow-md">🐝</div>
          </div>
          
          <div className="absolute bottom-44 left-[30%] animate-gem-sparkle">
            <div className="text-7xl drop-shadow-xl">💎</div>
          </div>
          
          <div className="absolute bottom-22 right-[60%] animate-windmill-spin">
            <div className="text-7xl drop-shadow-lg">🏭</div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-100/30 via-transparent to-transparent animate-light-shimmer pointer-events-none"></div>
          
          <div className="absolute top-[25%] left-[30%] w-3 h-3 bg-white rounded-full animate-star-twinkle-1"></div>
          <div className="absolute top-[35%] right-[25%] w-2 h-2 bg-yellow-200 rounded-full animate-star-twinkle-2"></div>
          <div className="absolute bottom-[40%] left-[50%] w-3 h-3 bg-white rounded-full animate-star-twinkle-3"></div>
        </div>
      </div>

      <div className="relative z-10 bg-white/80 backdrop-blur-sm shadow-md">
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

      <style>{`
        @keyframes cloud-float-1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(100px, -20px); }
        }
        
        @keyframes cloud-float-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-80px, -30px); }
        }
        
        @keyframes cloud-float-3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(60px, -25px); }
        }
        
        @keyframes cloud-float-4 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-70px, -15px); }
        }
        
        @keyframes sun-shine {
          0%, 100% { transform: rotate(0deg) scale(1); filter: brightness(1.3); }
          50% { transform: rotate(180deg) scale(1.15); filter: brightness(1.5); }
        }
        
        @keyframes building-glow {
          0%, 100% { transform: scale(1); filter: brightness(1) drop-shadow(0 0 0 rgba(255, 215, 0, 0)); }
          50% { transform: scale(1.1); filter: brightness(1.2) drop-shadow(0 0 40px rgba(255, 215, 0, 0.9)); }
        }
        
        @keyframes house-bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          25% { transform: translateY(-20px) scale(1.05, 0.95); }
          50% { transform: translateY(-30px) scale(0.95, 1.05); }
          75% { transform: translateY(-15px) scale(1.02, 0.98); }
        }
        
        @keyframes wheat-wave {
          0%, 100% { transform: rotate(-8deg) scale(1); }
          50% { transform: rotate(8deg) scale(1.08); }
        }
        
        @keyframes tractor-move {
          0%, 100% { transform: translateX(0) rotate(-3deg); }
          50% { transform: translateX(80px) rotate(3deg); }
        }
        
        @keyframes tree-sway-natural {
          0%, 100% { transform: rotate(-3deg); transform-origin: bottom center; }
          50% { transform: rotate(3deg); transform-origin: bottom center; }
        }
        
        @keyframes flower-grow {
          0%, 100% { transform: scale(0.9) rotate(-5deg); }
          50% { transform: scale(1.15) rotate(5deg); }
        }
        
        @keyframes worker-build {
          0%, 100% { transform: rotate(-8deg) translateY(0); }
          25% { transform: rotate(8deg) translateY(-15px); }
          50% { transform: rotate(-8deg) translateY(0); }
          75% { transform: rotate(8deg) translateY(-15px); }
        }
        
        @keyframes farmer-walk {
          0% { transform: translateX(0) scaleX(1); }
          25% { transform: translateX(40px) scaleX(1) translateY(-8px); }
          50% { transform: translateX(80px) scaleX(-1); }
          75% { transform: translateX(40px) scaleX(-1) translateY(-8px); }
          100% { transform: translateX(0) scaleX(1); }
        }
        
        @keyframes bird-soar {
          0% { transform: translate(0, 0) rotate(-15deg); }
          20% { transform: translate(200px, -100px) rotate(10deg); }
          40% { transform: translate(400px, -60px) rotate(-10deg); }
          60% { transform: translate(600px, -120px) rotate(15deg); }
          80% { transform: translate(800px, -80px) rotate(-5deg); }
          100% { transform: translate(1000px, -100px) rotate(10deg); }
        }
        
        @keyframes monument-pulse {
          0%, 100% { filter: brightness(1) drop-shadow(0 0 0 rgba(255, 255, 255, 0)); }
          50% { filter: brightness(1.3) drop-shadow(0 0 25px rgba(255, 255, 255, 0.7)); }
        }
        
        @keyframes apple-swing {
          0%, 100% { transform: rotate(-12deg); transform-origin: top center; }
          50% { transform: rotate(12deg); transform-origin: top center; }
        }
        
        @keyframes bush-rustle {
          0%, 100% { transform: scale(1) rotate(-2deg); }
          25% { transform: scale(1.05) rotate(2deg); }
          50% { transform: scale(1) rotate(-2deg); }
          75% { transform: scale(1.05) rotate(2deg); }
        }
        
        @keyframes flower-bloom {
          0%, 100% { transform: scale(0.95); }
          50% { transform: scale(1.12); }
        }
        
        @keyframes butterfly-flutter {
          0% { transform: translate(0, 0) rotate(0deg); }
          15% { transform: translate(60px, -40px) rotate(15deg); }
          30% { transform: translate(120px, -20px) rotate(-10deg); }
          45% { transform: translate(180px, -60px) rotate(20deg); }
          60% { transform: translate(240px, -30px) rotate(-15deg); }
          75% { transform: translate(300px, -50px) rotate(10deg); }
          100% { transform: translate(360px, -40px) rotate(0deg); }
        }
        
        @keyframes rabbit-hop {
          0%, 100% { transform: translateX(0) translateY(0) scaleX(1); }
          25% { transform: translateX(30px) translateY(-25px) scaleX(1); }
          50% { transform: translateX(60px) translateY(0) scaleX(-1); }
          75% { transform: translateX(30px) translateY(-20px) scaleX(-1); }
        }
        
        @keyframes bee-buzz {
          0% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(8px, -8px) rotate(15deg); }
          20% { transform: translate(-8px, 8px) rotate(-15deg); }
          30% { transform: translate(15px, 0) rotate(10deg); }
          40% { transform: translate(-15px, -8px) rotate(-10deg); }
          50% { transform: translate(0, 15px) rotate(0deg); }
          60% { transform: translate(12px, -12px) rotate(12deg); }
          70% { transform: translate(-12px, 12px) rotate(-12deg); }
          80% { transform: translate(10px, -5px) rotate(8deg); }
          90% { transform: translate(-10px, 5px) rotate(-8deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        @keyframes gem-sparkle {
          0%, 100% { transform: scale(1); filter: brightness(1) drop-shadow(0 0 0 rgba(138, 43, 226, 0)); }
          50% { transform: scale(1.25); filter: brightness(1.5) drop-shadow(0 0 50px rgba(138, 43, 226, 1)); }
        }
        
        @keyframes windmill-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes light-shimmer {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        
        @keyframes star-twinkle-1 {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(2); }
        }
        
        @keyframes star-twinkle-2 {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(2.5) rotate(180deg); }
        }
        
        @keyframes star-twinkle-3 {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(2.2); }
        }
        
        .animate-cloud-float-1 { animation: cloud-float-1 20s ease-in-out infinite; }
        .animate-cloud-float-2 { animation: cloud-float-2 25s ease-in-out infinite; animation-delay: 2s; }
        .animate-cloud-float-3 { animation: cloud-float-3 22s ease-in-out infinite; animation-delay: 5s; }
        .animate-cloud-float-4 { animation: cloud-float-4 28s ease-in-out infinite; animation-delay: 7s; }
        .animate-sun-shine { animation: sun-shine 50s linear infinite; }
        .animate-building-glow { animation: building-glow 7s ease-in-out infinite; }
        .animate-house-bounce { animation: house-bounce 6s ease-in-out infinite; }
        .animate-wheat-wave { animation: wheat-wave 5s ease-in-out infinite; }
        .animate-tractor-move { animation: tractor-move 12s ease-in-out infinite; }
        .animate-tree-sway-natural { animation: tree-sway-natural 7s ease-in-out infinite; }
        .animate-flower-grow { animation: flower-grow 8s ease-in-out infinite; }
        .animate-worker-build { animation: worker-build 3.5s ease-in-out infinite; }
        .animate-farmer-walk { animation: farmer-walk 14s ease-in-out infinite; }
        .animate-bird-soar { animation: bird-soar 30s linear infinite; }
        .animate-monument-pulse { animation: monument-pulse 6s ease-in-out infinite; }
        .animate-apple-swing { animation: apple-swing 4.5s ease-in-out infinite; }
        .animate-bush-rustle { animation: bush-rustle 4s ease-in-out infinite; }
        .animate-flower-bloom { animation: flower-bloom 7s ease-in-out infinite; animation-delay: 1s; }
        .animate-butterfly-flutter { animation: butterfly-flutter 25s ease-in-out infinite; }
        .animate-rabbit-hop { animation: rabbit-hop 7s ease-in-out infinite; }
        .animate-bee-buzz { animation: bee-buzz 2.5s ease-in-out infinite; }
        .animate-gem-sparkle { animation: gem-sparkle 5s ease-in-out infinite; }
        .animate-windmill-spin { animation: windmill-spin 8s linear infinite; }
        .animate-light-shimmer { animation: light-shimmer 5s ease-in-out infinite; }
        .animate-star-twinkle-1 { animation: star-twinkle-1 3s ease-in-out infinite; }
        .animate-star-twinkle-2 { animation: star-twinkle-2 4s ease-in-out infinite; animation-delay: 1.5s; }
        .animate-star-twinkle-3 { animation: star-twinkle-3 5s ease-in-out infinite; animation-delay: 2.5s; }
      `}</style>
    </div>
  );
}
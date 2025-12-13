import { useState } from 'react';
import { Frame } from '@/data/frames';
import { FRAMES } from '@/data/frames';
import { DRAGONS } from '@/data/dragons';
import Icon from '@/components/ui/icon';

interface FrameShopProps {
  coins: number;
  goldCoins: number;
  currentFrameId: string;
  ownedFrames: string[];
  ownedDragons: string[];
  currentDragonId: string;
  onBuyFrame: (frame: Frame) => void;
  onSelectFrame: (frameId: string) => void;
  onBack: () => void;
}

export { FRAMES };

export default function FrameShop({
  coins,
  goldCoins,
  currentFrameId,
  ownedFrames,
  ownedDragons,
  currentDragonId,
  onBuyFrame,
  onSelectFrame,
  onBack,
}: FrameShopProps) {
  const [previewDragonId, setPreviewDragonId] = useState(currentDragonId);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return Math.floor(num).toString();
  };

  const ownedDragonsList = DRAGONS.filter(d => ownedDragons.includes(d.id));
  const previewDragon = DRAGONS.find(d => d.id === previewDragonId) || ownedDragonsList[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-900 via-purple-900 to-black text-white">
      <div className="relative bg-gradient-to-r from-pink-900/40 via-purple-900/40 to-pink-900/40 backdrop-blur-sm border-b-2 border-pink-300/50 p-3 sm:p-4 shadow-lg shadow-pink-500/20">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={onBack}
            className="p-2 bg-purple-600/40 border-2 border-purple-400/50 rounded-lg hover:bg-purple-500/50 transition-all shadow-lg"
          >
            <Icon name="ArrowLeft" size={24} />
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-200 via-white to-pink-200 bg-clip-text text-transparent drop-shadow-lg">
            🖼️ Магазин рамок
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-purple-800/50 px-4 py-2 rounded-xl border-2 border-purple-400/50">
              <Icon name="Coins" size={20} className="text-yellow-400" />
              <span className="text-xl font-bold text-yellow-300">{formatNumber(coins)}</span>
            </div>
            <div className="flex items-center gap-2 bg-amber-800/50 px-4 py-2 rounded-xl border-2 border-amber-400/50">
              <img 
                src="https://cdn.poehali.dev/files/2e73c9fd56f11f0b2426676413dfd84_1 копия.png"
                alt="Gold"
                className="w-5 h-5"
              />
              <span className="text-xl font-bold text-amber-300">{goldCoins}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-6 pb-20 md:pb-6">
        {ownedDragonsList.length > 1 && (
          <div className="mb-6 bg-purple-800/30 rounded-2xl p-4 border-2 border-purple-500/50">
            <h3 className="text-lg font-bold text-center mb-3 text-purple-200">
              Выберите дракона для превью
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {ownedDragonsList.map((dragon) => (
                <button
                  key={dragon.id}
                  onClick={() => setPreviewDragonId(dragon.id)}
                  className={`flex-shrink-0 relative transition-all ${
                    previewDragonId === dragon.id
                      ? 'scale-110 ring-4 ring-pink-500'
                      : 'hover:scale-105 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={dragon.image}
                    alt={dragon.name}
                    className="w-20 h-20 rounded-xl object-cover border-2 border-purple-400"
                  />
                  {previewDragonId === dragon.id && (
                    <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {FRAMES.map((frame) => {
            const isOwned = ownedFrames.includes(frame.id);
            const isCurrent = currentFrameId === frame.id;
            const isGoldFrame = frame.goldCost !== undefined && frame.goldCost > 0;
            const canBuy = isGoldFrame 
              ? goldCoins >= (frame.goldCost || 0) && !isOwned
              : coins >= frame.cost && !isOwned;

            return (
              <div
                key={frame.id}
                className={`relative p-4 rounded-2xl border-4 transition-all duration-300 ${
                  isCurrent
                    ? 'bg-gradient-to-br from-pink-600/30 to-purple-600/30 border-pink-400 shadow-2xl shadow-pink-500/50'
                    : isOwned
                    ? 'bg-gradient-to-br from-purple-800/50 to-indigo-900/50 border-purple-600/50 hover:border-purple-400/70'
                    : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-600/50 hover:border-gray-400/70'
                }`}
              >
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg border-2 border-white/30">
                    ✓ Активна
                  </div>
                )}

                <div className="mb-3">
                  <div className="text-5xl text-center mb-2">{frame.preview}</div>
                  <h3 className="text-xl font-bold text-center mb-2">{frame.name}</h3>
                  
                  <div 
                    className="w-full aspect-square rounded-2xl overflow-hidden mx-auto mb-3 relative"
                    style={{
                      ...frame.style,
                      backgroundColor: '#1a1a2e',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-purple-900 to-orange-600">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,200,100,0.3) 0%, transparent 50%)',
                      }}></div>
                    </div>
                    <img
                      src={previewDragon.image}
                      alt={previewDragon.name}
                      className="w-full h-full object-cover relative z-10"
                    />
                  </div>
                </div>

                {!isOwned && (
                  <div className="text-center mb-3">
                    {isGoldFrame ? (
                      <div className="flex items-center justify-center gap-2 text-2xl font-bold text-amber-300">
                        <img 
                          src="https://cdn.poehali.dev/files/2e73c9fd56f11f0b2426676413dfd84_1 копия.png"
                          alt="Gold"
                          className="w-6 h-6"
                        />
                        {frame.goldCost}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-2xl font-bold text-yellow-300">
                        <Icon name="Coins" size={24} />
                        {formatNumber(frame.cost)}
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  {!isOwned ? (
                    <button
                      onClick={() => canBuy && onBuyFrame(frame)}
                      disabled={!canBuy}
                      className={`w-full py-3 rounded-xl font-bold transition-all text-lg ${
                        canBuy
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                          : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {canBuy ? 'Купить' : 'Недостаточно средств'}
                    </button>
                  ) : !isCurrent ? (
                    <button
                      onClick={() => onSelectFrame(frame.id)}
                      className="w-full py-3 rounded-xl font-bold transition-all text-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      Использовать
                    </button>
                  ) : (
                    <div className="w-full py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center shadow-lg">
                      Активна
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
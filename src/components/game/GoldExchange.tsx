import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface GoldExchangeProps {
  coins: number;
  goldCoins: number;
  onExchange: (amount: number) => void;
  onClose: () => void;
  formatNumber: (num: number) => string;
}

const EXCHANGE_RATE = 15000000000; // 15B обычных монет = 1 золотая

export default function GoldExchange({
  coins,
  goldCoins,
  onExchange,
  onClose,
  formatNumber
}: GoldExchangeProps) {
  const [exchangeAmount, setExchangeAmount] = useState(1);
  
  const maxExchange = Math.floor(coins / EXCHANGE_RATE);
  const totalCost = exchangeAmount * EXCHANGE_RATE;
  const canExchange = coins >= totalCost && exchangeAmount > 0;

  const handleExchange = () => {
    if (canExchange) {
      onExchange(exchangeAmount);
      setExchangeAmount(1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-gradient-to-b from-yellow-900 via-amber-900 to-orange-950 border-2 border-yellow-500/50 rounded-3xl max-w-2xl w-full p-4 sm:p-6 md:p-8 relative animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-colors flex items-center justify-center"
        >
          <Icon name="X" size={20} />
        </button>

        <div className="text-center mb-6">
          <img 
            src="https://cdn.poehali.dev/files/2e73c9fd56f11f0b2426676413dfd84_1 копия.png"
            alt="Золотая монета"
            className="w-24 h-24 mx-auto mb-4 drop-shadow-[0_0_30px_rgba(255,215,0,0.8)]"
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-2">
            Обмен на золотые монеты
          </h2>
          <p className="text-amber-200/80 text-sm">
            Обменяй обычные монеты на золотые для покупки легендарных драконов
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-yellow-500/30 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-4 text-center">
              <div className="text-xs sm:text-sm text-purple-300 mb-2">Обычные монеты</div>
              <div className="text-xl sm:text-2xl font-bold text-yellow-400">{formatNumber(coins)}</div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-xl p-4 text-center">
              <div className="text-xs sm:text-sm text-amber-300 mb-2">Золотые монеты</div>
              <div className="text-xl sm:text-2xl font-bold text-yellow-300 flex items-center justify-center gap-2">
                <img 
                  src="https://cdn.poehali.dev/files/2e73c9fd56f11f0b2426676413dfd84_1 копия.png"
                  alt="Gold"
                  className="w-6 h-6"
                />
                {goldCoins}
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
            <div className="text-center mb-4">
              <div className="text-amber-200 text-sm mb-2">Курс обмена</div>
              <div className="text-2xl font-bold text-yellow-300">
                {formatNumber(EXCHANGE_RATE)} = 1 
                <img 
                  src="https://cdn.poehali.dev/files/2e73c9fd56f11f0b2426676413dfd84_1 копия.png"
                  alt="Gold"
                  className="w-6 h-6 inline-block ml-2"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-amber-200 text-sm mb-2 block">
                  Количество золотых монет для обмена
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setExchangeAmount(Math.max(1, exchangeAmount - 1))}
                    className="w-12 h-12 bg-yellow-600/20 border border-yellow-500/30 rounded-lg hover:bg-yellow-600/30 transition-colors flex items-center justify-center text-yellow-300 font-bold text-xl"
                  >
                    -
                  </button>
                  
                  <input
                    type="number"
                    value={exchangeAmount}
                    onChange={(e) => setExchangeAmount(Math.max(1, Math.min(maxExchange, parseInt(e.target.value) || 1)))}
                    className="flex-1 bg-black/40 border border-yellow-500/30 rounded-lg px-4 py-3 text-center text-yellow-300 font-bold text-xl focus:outline-none focus:border-yellow-400"
                    min="1"
                    max={maxExchange}
                  />
                  
                  <button
                    onClick={() => setExchangeAmount(Math.min(maxExchange, exchangeAmount + 1))}
                    disabled={exchangeAmount >= maxExchange}
                    className="w-12 h-12 bg-yellow-600/20 border border-yellow-500/30 rounded-lg hover:bg-yellow-600/30 transition-colors flex items-center justify-center text-yellow-300 font-bold text-xl disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => setExchangeAmount(maxExchange)}
                disabled={maxExchange === 0}
                className="w-full py-2 bg-amber-600/20 border border-amber-500/30 rounded-lg hover:bg-amber-600/30 transition-colors text-amber-200 text-sm disabled:opacity-50"
              >
                Максимум ({maxExchange} 
                <img 
                  src="https://cdn.poehali.dev/files/2e73c9fd56f11f0b2426676413dfd84_1 копия.png"
                  alt="Gold"
                  className="w-4 h-4 inline-block mx-1"
                />)
              </button>

              <div className="bg-black/40 rounded-lg p-3 border border-yellow-500/20">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-amber-300">Стоимость:</span>
                  <span className="font-bold text-yellow-400">{formatNumber(totalCost)}</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-amber-300">Получишь:</span>
                  <span className="font-bold text-yellow-300 flex items-center gap-1">
                    {exchangeAmount}
                    <img 
                      src="https://cdn.poehali.dev/files/2e73c9fd56f11f0b2426676413dfd84_1 копия.png"
                      alt="Gold"
                      className="w-5 h-5"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleExchange}
            disabled={!canExchange}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
              canExchange
                ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white'
                : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Icon name="ArrowLeftRight" size={24} />
            {canExchange ? 'Обменять' : 'Недостаточно монет'}
          </button>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
          <p className="text-amber-200 text-xs sm:text-sm text-center">
            💡 За золотые монеты можно купить легендарных драконов с огромной силой!
          </p>
        </div>
      </div>
    </div>
  );
}

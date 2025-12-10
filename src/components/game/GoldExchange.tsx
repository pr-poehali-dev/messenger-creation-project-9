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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-gradient-to-b from-yellow-900 via-amber-900 to-orange-950 border-2 border-yellow-500/50 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 lg:p-10 relative animate-scaleIn"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(234, 179, 8, 0.5) rgba(0, 0, 0, 0.3)'
        }}>
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 bg-red-600/20 border border-red-500/30 rounded-xl hover:bg-red-600/40 hover:scale-110 transition-all flex items-center justify-center"
        >
          <Icon name="X" size={24} />
        </button>

        <div className="text-center mb-8">
          <img 
            src="https://cdn.poehali.dev/files/2e73c9fd56f11f0b2426676413dfd84_1 копия.png"
            alt="Золотая монета"
            className="w-32 h-32 lg:w-40 lg:h-40 mx-auto mb-6 drop-shadow-[0_0_40px_rgba(255,215,0,0.9)] animate-pulse"
          />
          <h2 className="text-3xl lg:text-5xl font-bold text-yellow-300 mb-3">
            Обмен на золотые монеты
          </h2>
          <p className="text-amber-200/90 text-base lg:text-lg max-w-2xl mx-auto">
            Обменяй обычные монеты на золотые для покупки легендарных драконов
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-yellow-500/30 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-2 border-purple-500/40 rounded-2xl p-6 lg:p-8 text-center hover:scale-105 transition-transform">
              <div className="text-sm lg:text-base text-purple-300 mb-3">Обычные монеты</div>
              <div className="text-3xl lg:text-4xl font-bold text-yellow-400">{formatNumber(coins)}</div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-600/30 to-orange-600/30 border-2 border-yellow-500/40 rounded-2xl p-6 lg:p-8 text-center hover:scale-105 transition-transform">
              <div className="text-sm lg:text-base text-amber-300 mb-3">Золотые монеты</div>
              <div className="text-3xl lg:text-4xl font-bold text-yellow-300 flex items-center justify-center gap-3">
                <img 
                  src="https://cdn.poehali.dev/files/2e73c9fd56f11f0b2426676413dfd84_1 копия.png"
                  alt="Gold"
                  className="w-8 h-8 lg:w-10 lg:h-10"
                />
                {goldCoins}
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/20 border-2 border-yellow-500/40 rounded-2xl p-6 lg:p-8 mb-8">
            <div className="text-center mb-6">
              <div className="text-amber-200 text-base lg:text-lg mb-3">Курс обмена</div>
              <div className="text-3xl lg:text-4xl font-bold text-yellow-300 flex items-center justify-center gap-3">
                {formatNumber(EXCHANGE_RATE)} = 1 
                <img 
                  src="https://cdn.poehali.dev/files/2e73c9fd56f11f0b2426676413dfd84_1 копия.png"
                  alt="Gold"
                  className="w-8 h-8 lg:w-10 lg:h-10"
                />
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-amber-200 text-base lg:text-lg mb-3 block font-semibold">
                  Количество золотых монет для обмена
                </label>
                <div className="flex items-center gap-4 max-w-2xl mx-auto">
                  <button
                    onClick={() => setExchangeAmount(Math.max(1, exchangeAmount - 1))}
                    className="w-14 h-14 lg:w-16 lg:h-16 bg-yellow-600/30 border-2 border-yellow-500/40 rounded-xl hover:bg-yellow-600/50 hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-yellow-300 font-bold text-2xl"
                  >
                    -
                  </button>
                  
                  <input
                    type="number"
                    value={exchangeAmount}
                    onChange={(e) => setExchangeAmount(Math.max(1, Math.min(maxExchange, parseInt(e.target.value) || 1)))}
                    className="flex-1 bg-black/50 border-2 border-yellow-500/40 rounded-xl px-6 py-4 text-center text-yellow-300 font-bold text-2xl lg:text-3xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30"
                    min="1"
                    max={maxExchange}
                  />
                  
                  <button
                    onClick={() => setExchangeAmount(Math.min(maxExchange, exchangeAmount + 1))}
                    disabled={exchangeAmount >= maxExchange}
                    className="w-14 h-14 lg:w-16 lg:h-16 bg-yellow-600/30 border-2 border-yellow-500/40 rounded-xl hover:bg-yellow-600/50 hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-yellow-300 font-bold text-2xl disabled:opacity-50 disabled:hover:scale-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => setExchangeAmount(maxExchange)}
                disabled={maxExchange === 0}
                className="w-full py-3 lg:py-4 bg-amber-600/30 border-2 border-amber-500/40 rounded-xl hover:bg-amber-600/50 hover:scale-105 active:scale-95 transition-all text-amber-200 text-base lg:text-lg font-semibold disabled:opacity-50 disabled:hover:scale-100"
              >
                Максимум ({maxExchange} 
                <img 
                  src="https://cdn.poehali.dev/files/2e73c9fd56f11f0b2426676413dfd84_1 копия.png"
                  alt="Gold"
                  className="w-5 h-5 lg:w-6 lg:h-6 inline-block mx-2"
                />)
              </button>

              <div className="bg-black/60 rounded-2xl p-5 lg:p-6 border-2 border-yellow-500/30">
                <div className="flex justify-between items-center text-base lg:text-lg mb-3">
                  <span className="text-amber-300 font-medium">Стоимость:</span>
                  <span className="font-bold text-yellow-400 text-xl lg:text-2xl">{formatNumber(totalCost)}</span>
                </div>
                <div className="flex justify-between items-center text-base lg:text-lg">
                  <span className="text-amber-300 font-medium">Получишь:</span>
                  <span className="font-bold text-yellow-300 text-xl lg:text-2xl flex items-center gap-2">
                    {exchangeAmount}
                    <img 
                      src="https://cdn.poehali.dev/files/2e73c9fd56f11f0b2426676413dfd84_1 копия.png"
                      alt="Gold"
                      className="w-6 h-6 lg:w-7 lg:h-7"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleExchange}
            disabled={!canExchange}
            className={`w-full py-5 lg:py-6 rounded-2xl font-bold text-xl lg:text-2xl transition-all flex items-center justify-center gap-3 shadow-lg ${
              canExchange
                ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 hover:scale-105 active:scale-95 text-white hover:shadow-2xl hover:shadow-yellow-500/50'
                : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Icon name="ArrowLeftRight" size={28} />
            {canExchange ? 'Обменять' : 'Недостаточно монет'}
          </button>
        </div>

        <div className="bg-amber-500/20 border-2 border-amber-500/40 rounded-2xl p-5 lg:p-6">
          <p className="text-amber-200 text-base lg:text-lg text-center font-medium">
            💡 За золотые монеты можно купить легендарных драконов с огромной силой!
          </p>
        </div>
      </div>
    </div>
  );
}
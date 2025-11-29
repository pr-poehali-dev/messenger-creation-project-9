import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { STORY_PRICES, getStoryDuration } from '@/lib/stories';
import type { Product } from '@/lib/products';
import type { StoryPromotion } from '@/lib/stories';

interface StoriesTabProps {
  products: Product[];
  storyPromotions: StoryPromotion[];
  onCreatePromotion: (productId: string, duration: keyof typeof STORY_PRICES) => void;
  onPayStory: (promotionId: string) => void;
  onDeleteStory: (promotionId: string) => void;
}

export default function StoriesTab({ products, storyPromotions, onCreatePromotion, onPayStory, onDeleteStory }: StoriesTabProps) {
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [storyDuration, setStoryDuration] = useState<keyof typeof STORY_PRICES>('3days');

  const handleCreateStoryPromotion = () => {
    if (!selectedProduct) return;
    onCreatePromotion(selectedProduct.id, storyDuration);
    setShowStoryForm(false);
    setSelectedProduct(null);
  };

  const handlePayStory = (promotionId: string) => {
    if (confirm('Оплатить размещение в Stories?')) {
      onPayStory(promotionId);
    }
  };

  const handleDeleteStory = (promotionId: string) => {
    if (confirm('Удалить размещение?')) {
      onDeleteStory(promotionId);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Размещение в Stories</h2>
        <Button 
          onClick={() => setShowStoryForm(true)}
          className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Icon name="Plus" size={20} />
          Создать размещение
        </Button>
      </div>

      <div className="grid gap-4 mb-8">
        <Card className="shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-xl">
                <Icon name="Sparkles" size={32} className="text-white" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Продвижение в Stories</h3>
                <p className="text-gray-700 mb-4">
                  Разместите ваш товар в Stories на главной странице и увеличьте продажи в 3 раза!
                  Ваша история будет показана всем покупателям маркетплейса.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{storyPromotions.filter(s => s.status === 'active').length}</p>
                    <p className="text-sm text-gray-600">Активных размещений</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {storyPromotions.reduce((sum, s) => sum + s.views, 0)}
                    </p>
                    <p className="text-sm text-gray-600">Всего просмотров</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {storyPromotions.reduce((sum, s) => sum + s.clicks, 0)}
                    </p>
                    <p className="text-sm text-gray-600">Переходов на товар</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showStoryForm && (
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>Создать размещение в Stories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Выберите товар для рекламы
                </label>
                <div className="grid gap-3">
                  {products.filter(p => p.inStock).map(product => (
                    <button
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                        selectedProduct?.id === product.id
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-grow text-left">
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-purple-600 font-bold">{product.price.toLocaleString('ru-RU')} ₽</p>
                      </div>
                      {selectedProduct?.id === product.id && (
                        <Icon name="CheckCircle" size={24} className="text-purple-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {selectedProduct && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Выберите длительность размещения
                    </label>
                    <div className="grid md:grid-cols-5 gap-3">
                      {Object.entries(STORY_PRICES).map(([key, price]) => {
                        const days = parseInt(key.replace('days', '').replace('day', ''));
                        return (
                          <button
                            key={key}
                            onClick={() => setStoryDuration(key as keyof typeof STORY_PRICES)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              storyDuration === key
                                ? 'border-purple-600 bg-purple-50'
                                : 'border-gray-200 hover:border-purple-300'
                            }`}
                          >
                            <p className="font-bold text-lg mb-1">{getStoryDuration(days)}</p>
                            <p className="text-purple-600 font-bold">{price} ₽</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold">Итого к оплате</h4>
                      <p className="text-3xl font-bold text-purple-600">
                        {STORY_PRICES[storyDuration]} ₽
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={handleCreateStoryPromotion}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        Создать и оплатить
                      </Button>
                      <Button
                        onClick={() => {
                          setShowStoryForm(false);
                          setSelectedProduct(null);
                        }}
                        variant="outline"
                      >
                        Отмена
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Мои размещения</CardTitle>
        </CardHeader>
        <CardContent>
          {storyPromotions.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Sparkles" size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg mb-2">У вас пока нет размещений в Stories</p>
              <p className="text-gray-400">Создайте первое размещение и увеличьте продажи!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {storyPromotions.map(promo => (
                <div key={promo.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <img
                    src={promo.productImage}
                    alt={promo.productName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold mb-1">{promo.productName}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Icon name="Eye" size={14} />
                        {promo.views} просмотров
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="MousePointerClick" size={14} />
                        {promo.clicks} кликов
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Calendar" size={14} />
                        до {new Date(promo.endDate).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {promo.status === 'pending' && !promo.paid && (
                      <Button 
                        size="sm" 
                        onClick={() => handlePayStory(promo.id)}
                        className="gap-2 bg-green-600 hover:bg-green-700"
                      >
                        <Icon name="CreditCard" size={16} />
                        Оплатить {promo.price} ₽
                      </Button>
                    )}
                    {promo.status === 'active' && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        Активно
                      </span>
                    )}
                    {promo.status === 'expired' && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                        Завершено
                      </span>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDeleteStory(promo.id)}
                      className="gap-2 text-red-600"
                    >
                      <Icon name="Trash2" size={16} />
                      Удалить
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

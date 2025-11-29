import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import MobileMenu from '@/components/MobileMenu';
import { getAuthState } from '@/lib/auth';
import { getProductsBySeller, addProduct, updateProduct, deleteProduct, Product } from '@/lib/products';
import { getSellerStoryPromotions, createStoryPromotion, payForStoryPromotion, deleteStoryPromotion, STORY_PRICES, getStoryDuration, StoryPromotion } from '@/lib/stories';

export default function SellerDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = getAuthState();
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'stories'>('products');
  const [storyPromotions, setStoryPromotions] = useState<StoryPromotion[]>([]);
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [storyDuration, setStoryDuration] = useState<keyof typeof STORY_PRICES>('3days');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    oldPrice: '',
    image: '',
    category: 'Смартфоны',
    inStock: true
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'seller') {
      navigate('/auth');
      return;
    }
    loadProducts();
  }, [isAuthenticated, user, navigate]);

  const loadProducts = () => {
    if (user) {
      setProducts(getProductsBySeller(user.id));
      setStoryPromotions(getSellerStoryPromotions(user.id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : undefined,
      image: formData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      category: formData.category,
      rating: 4.5,
      reviews: 0,
      sellerId: user.id,
      sellerName: user.name,
      inStock: formData.inStock
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }

    resetForm();
    loadProducts();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      oldPrice: product.oldPrice?.toString() || '',
      image: product.image,
      category: product.category,
      inStock: product.inStock
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить товар?')) {
      deleteProduct(id);
      loadProducts();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      oldPrice: '',
      image: '',
      category: 'Смартфоны',
      inStock: true
    });
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const handleCreateStoryPromotion = () => {
    if (!user || !selectedProduct) return;

    const daysMap = {
      '1day': 1,
      '3days': 3,
      '7days': 7,
      '14days': 14,
      '30days': 30
    };

    const days = daysMap[storyDuration];
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    createStoryPromotion({
      sellerId: user.id,
      sellerName: user.name,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      productImage: selectedProduct.image,
      productPrice: selectedProduct.price,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      paid: false,
      price: STORY_PRICES[storyDuration]
    });

    setShowStoryForm(false);
    setSelectedProduct(null);
    loadProducts();
  };

  const handlePayStory = (promotionId: string) => {
    if (confirm('Оплатить размещение в Stories?')) {
      payForStoryPromotion(promotionId);
      loadProducts();
    }
  };

  const handleDeleteStory = (promotionId: string) => {
    if (confirm('Удалить размещение?')) {
      deleteStoryPromotion(promotionId);
      loadProducts();
    }
  };

  if (!user) return null;

  const categories = ['Смартфоны', 'Наушники', 'Ноутбуки', 'Часы', 'Планшеты', 'Консоли', 'Камеры', 'Умный дом'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-purple-600">
              <Icon name="ArrowLeft" size={24} />
              <span className="font-medium">Профиль</span>
            </Link>
            <div className="flex items-center gap-2">
              <Icon name="Store" size={24} className="text-purple-600" />
              <h1 className="text-xl font-bold">Кабинет продавца</h1>
            </div>
            <Link to="/">
              <Button variant="ghost" size="icon">
                <Icon name="Home" size={22} />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Icon name="Package" size={28} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Товаров</p>
                  <p className="text-3xl font-bold text-gray-900">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Icon name="CheckCircle" size={28} className="text-green-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">В наличии</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {products.filter(p => p.inStock).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Icon name="TrendingUp" size={28} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Просмотров</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {products.reduce((sum, p) => sum + p.reviews, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'products'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon name="Package" size={20} />
              Товары
            </div>
          </button>
          <button
            onClick={() => setActiveTab('stories')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'stories'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon name="Sparkles" size={20} />
              Stories
            </div>
          </button>
        </div>

        {activeTab === 'products' && (
          <>
            <div className="mb-6">
              <Button onClick={() => setShowAddForm(!showAddForm)} className="gap-2">
                <Icon name="Plus" size={20} />
                Добавить товар
              </Button>
            </div>

        {showAddForm && (
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle>{editingProduct ? 'Редактировать товар' : 'Новый товар'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Название товара
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Например: Смартфон Samsung Galaxy"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Категория
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Цена (₽)
                    </label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      placeholder="9990"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Старая цена (₽)
                    </label>
                    <Input
                      type="number"
                      value={formData.oldPrice}
                      onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                      placeholder="12990"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Описание
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                    className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Подробное описание товара..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL изображения
                  </label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    В наличии
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="gap-2">
                    <Icon name="Save" size={18} />
                    {editingProduct ? 'Сохранить' : 'Добавить'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Отмена
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Мои товары ({products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Package" size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Нет товаров</h3>
                <p className="text-gray-500">Добавьте первый товар</p>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-1">{product.description}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-purple-600">
                          {product.price.toLocaleString('ru-RU')} ₽
                        </span>
                        <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                          {product.inStock ? 'В наличии' : 'Нет в наличии'}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(product)} className="gap-2">
                        <Icon name="Edit" size={16} />
                        Изменить
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(product.id)} className="gap-2 text-red-600 hover:text-red-700">
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
        )}

        {activeTab === 'stories' && (
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
        )}
      </div>
      
      <MobileMenu />
    </div>
  );
}
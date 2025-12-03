import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { Product } from '@/lib/products';

interface ProductsTabProps {
  products: Product[];
  onAddProduct: (productData: any) => void;
  onUpdateProduct: (id: string, productData: any) => void;
  onDeleteProduct: (id: string) => void;
}

export default function ProductsTab({ products, onAddProduct, onUpdateProduct, onDeleteProduct }: ProductsTabProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    oldPrice: '',
    image: '',
    category: 'Смартфоны',
    inStock: true
  });
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);

  const categories = ['Смартфоны', 'Наушники', 'Ноутбуки', 'Часы', 'Планшеты', 'Консоли', 'Камеры', 'Умный дом'];

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (mediaFiles.length + files.length > 10) {
      alert('Можно загрузить максимум 10 файлов');
      return;
    }

    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        alert(`${file.name}: Пожалуйста, выберите изображение или видео`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name}: Размер файла не должен превышать 10 МБ`);
        return false;
      }
      return true;
    });

    const newFiles = [...mediaFiles, ...validFiles];
    setMediaFiles(newFiles);

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreviews(prev => {
          const updated = [...prev, reader.result as string];
          if (updated.length === 1) {
            setFormData({ ...formData, image: updated[0], images: updated });
          } else {
            setFormData({ ...formData, images: updated });
          }
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMedia = (index: number) => {
    const newFiles = mediaFiles.filter((_, i) => i !== index);
    const newPreviews = mediaPreviews.filter((_, i) => i !== index);
    setMediaFiles(newFiles);
    setMediaPreviews(newPreviews);
    
    if (newPreviews.length > 0) {
      setFormData({ ...formData, image: newPreviews[0], images: newPreviews });
    } else {
      setFormData({ ...formData, image: '', images: [] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : undefined,
      image: formData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      category: formData.category,
      inStock: formData.inStock
    };

    if (editingProduct) {
      onUpdateProduct(editingProduct.id, productData);
    } else {
      onAddProduct(productData);
    }

    resetForm();
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
    if (product.images && product.images.length > 0) {
      setMediaPreviews(product.images);
    } else {
      setMediaPreviews(product.image ? [product.image] : []);
    }
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить товар?')) {
      onDeleteProduct(id);
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
    setMediaFiles([]);
    setMediaPreviews([]);
    setEditingProduct(null);
    setShowAddForm(false);
  };

  return (
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
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="iPhone 15 Pro Max"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Категория
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Подробное описание товара"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цена (₽)
                  </label>
                  <Input
                    required
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="99990"
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
                    placeholder="119990"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Фото или видео товара (до 10 файлов)
                </label>
                
                {mediaPreviews.length > 0 && (
                  <div className="grid grid-cols-5 gap-3 mb-4">
                    {mediaPreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        {mediaFiles[index]?.type.startsWith('video/') ? (
                          <video src={preview} className="w-full h-24 object-cover rounded-lg" />
                        ) : (
                          <img src={preview} alt={`Фото ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                        )}
                        <button
                          type="button"
                          onClick={() => removeMedia(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Icon name="X" size={16} />
                        </button>
                        {index === 0 && (
                          <span className="absolute bottom-1 left-1 bg-purple-600 text-white text-xs px-2 py-0.5 rounded">Главное</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {mediaPreviews.length < 10 && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleMediaChange}
                        className="hidden"
                      />
                      <div className="space-y-2">
                        <Icon name="Upload" size={48} className="mx-auto text-gray-400" />
                        <p className="text-sm text-gray-600">
                          <span className="text-purple-600 font-semibold">Нажмите для загрузки</span>
                          {' '}или перетащите файлы
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF, MP4 до 10 МБ • {mediaPreviews.length}/10 файлов
                        </p>
                      </div>
                    </label>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                />
                <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
                  В наличии
                </label>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1">
                  {editingProduct ? 'Сохранить' : 'Добавить товар'}
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
          <CardTitle>Мои товары</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Package" size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg mb-2">У вас пока нет товаров</p>
              <p className="text-gray-400">Добавьте первый товар для продажи</p>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map(product => (
                <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
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
  );
}
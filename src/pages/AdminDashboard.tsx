import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { getProducts, deleteProduct, toggleProductBlock } from '@/lib/products';
import { getAllUsers, toggleUserBlock } from '@/lib/auth';
import type { Product } from '@/lib/products';
import type { User } from '@/lib/auth';
import Icon from '@/components/ui/icon';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { admin, logout } = useAdmin();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'sellers'>('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!admin?.isAuthenticated) {
      navigate('/admin/auth');
      return;
    }
    loadData();
  }, [admin, navigate]);

  const loadData = () => {
    setProducts(getProducts());
    setUsers(getAllUsers());
  };

  const handleToggleProductBlock = (id: string) => {
    toggleProductBlock(id);
    loadData();
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Удалить товар "${name}"?`)) {
      deleteProduct(id);
      loadData();
    }
  };

  const handleToggleUserBlock = (email: string) => {
    toggleUserBlock(email);
    loadData();
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/auth');
  };

  if (!admin?.isAuthenticated) {
    return null;
  }

  const sellers = users.filter(u => u.role === 'seller');
  const buyers = users.filter(u => u.role === 'buyer');
  const blockedProducts = products.filter(p => p.isBlocked);
  const blockedSellers = sellers.filter(s => s.isBlocked);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="bg-slate-800/50 backdrop-blur-lg border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Админ-панель</h1>
                <p className="text-slate-400 text-xs">{admin.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              <Icon name="LogOut" size={18} />
              Выйти
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 mb-6 bg-slate-800/30 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Обзор
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Товары
          </button>
          <button
            onClick={() => setActiveTab('sellers')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'sellers'
                ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Продавцы
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Package" size={24} className="text-blue-400" />
                  <span className="text-3xl font-bold text-white">{products.length}</span>
                </div>
                <p className="text-slate-400 text-sm">Всего товаров</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Store" size={24} className="text-purple-400" />
                  <span className="text-3xl font-bold text-white">{sellers.length}</span>
                </div>
                <p className="text-slate-400 text-sm">Продавцов</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Users" size={24} className="text-green-400" />
                  <span className="text-3xl font-bold text-white">{buyers.length}</span>
                </div>
                <p className="text-slate-400 text-sm">Покупателей</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="ShieldAlert" size={24} className="text-red-400" />
                  <span className="text-3xl font-bold text-white">{blockedProducts.length + blockedSellers.length}</span>
                </div>
                <p className="text-slate-400 text-sm">Заблокировано</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} className="text-green-400" />
                  Последние товары
                </h3>
                <div className="space-y-3">
                  {products.slice(0, 5).map(product => (
                    <div key={product.id} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{product.name}</p>
                        <p className="text-slate-400 text-sm">{product.price.toLocaleString()} ₽</p>
                      </div>
                      {product.isBlocked && (
                        <Icon name="Ban" size={16} className="text-red-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="AlertTriangle" size={20} className="text-yellow-400" />
                  Требуют внимания
                </h3>
                <div className="space-y-3">
                  {blockedProducts.length > 0 && (
                    <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                      <p className="text-red-400 font-medium">Заблокировано товаров: {blockedProducts.length}</p>
                    </div>
                  )}
                  {blockedSellers.length > 0 && (
                    <div className="p-3 bg-orange-500/10 border border-orange-500/50 rounded-lg">
                      <p className="text-orange-400 font-medium">Заблокировано продавцов: {blockedSellers.length}</p>
                    </div>
                  )}
                  {blockedProducts.length === 0 && blockedSellers.length === 0 && (
                    <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-lg">
                      <p className="text-green-400 font-medium">Все в порядке!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-2xl">Управление товарами</h2>
              <div className="text-slate-400 text-sm">
                Всего: {products.length} | Заблокировано: {blockedProducts.length}
              </div>
            </div>

            <div className="grid gap-4">
              {products.map(product => (
                <div
                  key={product.id}
                  className={`bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border transition-all ${
                    product.isBlocked ? 'border-red-500/50 bg-red-500/5' : 'border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-white font-bold text-lg">{product.name}</h3>
                          <p className="text-slate-400 text-sm">ID: {product.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold text-xl">{product.price.toLocaleString()} ₽</p>
                          <p className="text-slate-400 text-sm">Категория: {product.category}</p>
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm mb-4">{product.description}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Store" size={16} className="text-slate-400" />
                        <span className="text-slate-400">Продавец: {product.sellerId}</span>
                        {product.isBlocked && (
                          <span className="ml-auto px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-medium">
                            Заблокирован
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-slate-700">
                    <button
                      onClick={() => handleToggleProductBlock(product.id)}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                        product.isBlocked
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : 'bg-orange-500 hover:bg-orange-600 text-white'
                      }`}
                    >
                      <Icon name={product.isBlocked ? 'Unlock' : 'Lock'} size={18} />
                      {product.isBlocked ? 'Разблокировать' : 'Заблокировать'}
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id, product.name)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all flex items-center gap-2"
                    >
                      <Icon name="Trash2" size={18} />
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sellers' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-2xl">Управление продавцами</h2>
              <div className="text-slate-400 text-sm">
                Всего: {sellers.length} | Заблокировано: {blockedSellers.length}
              </div>
            </div>

            <div className="grid gap-4">
              {sellers.map(seller => {
                const sellerProducts = products.filter(p => p.sellerId === seller.email);
                return (
                  <div
                    key={seller.email}
                    className={`bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border transition-all ${
                      seller.isBlocked ? 'border-red-500/50 bg-red-500/5' : 'border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-white font-bold text-lg">{seller.email}</h3>
                        <p className="text-slate-400 text-sm">Магазин: {seller.storeName || 'Не указан'}</p>
                        <p className="text-slate-400 text-sm">Категория: {seller.category || 'Не указана'}</p>
                      </div>
                      {seller.isBlocked && (
                        <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-medium">
                          Заблокирован
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-slate-900/50 rounded-lg">
                      <div>
                        <p className="text-slate-400 text-xs mb-1">Товаров</p>
                        <p className="text-white font-bold text-xl">{sellerProducts.length}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs mb-1">Заблокировано</p>
                        <p className="text-white font-bold text-xl">
                          {sellerProducts.filter(p => p.isBlocked).length}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs mb-1">Рейтинг</p>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={16} className="text-yellow-400 fill-yellow-400" />
                          <p className="text-white font-bold text-xl">4.8</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleUserBlock(seller.email)}
                      className={`w-full px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                        seller.isBlocked
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : 'bg-orange-500 hover:bg-orange-600 text-white'
                      }`}
                    >
                      <Icon name={seller.isBlocked ? 'Unlock' : 'Lock'} size={18} />
                      {seller.isBlocked ? 'Разблокировать продавца' : 'Заблокировать продавца'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

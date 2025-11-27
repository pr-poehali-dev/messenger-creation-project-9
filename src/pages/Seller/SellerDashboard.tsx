import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';

interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  shopName: string;
  registeredAt: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface SellerDashboardProps {
  seller: Seller;
  products: Product[];
  showAddProduct: boolean;
  productName: string;
  productDesc: string;
  productPrice: string;
  productImage: string;
  onProductNameChange: (value: string) => void;
  onProductDescChange: (value: string) => void;
  onProductPriceChange: (value: string) => void;
  onProductImageChange: (value: string) => void;
  onShowAddProduct: (show: boolean) => void;
  onAddProduct: () => void;
  onDeleteProduct: (id: string) => void;
  onLogout: () => void;
}

export default function SellerDashboard({
  seller,
  products,
  showAddProduct,
  productName,
  productDesc,
  productPrice,
  productImage,
  onProductNameChange,
  onProductDescChange,
  onProductPriceChange,
  onProductImageChange,
  onShowAddProduct,
  onAddProduct,
  onDeleteProduct,
  onLogout
}: SellerDashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/20 dark:via-purple-900/40 dark:to-pink-900/40">
      <header className="backdrop-blur-xl bg-white/80 dark:bg-[#1a1a2e]/80 border-b border-purple-100/50 dark:border-purple-800/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors group">
              <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">На главную</span>
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button 
                onClick={onLogout} 
                variant="outline"
                className="border-2 border-purple-200 dark:border-purple-800"
              >
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="bg-white dark:bg-[#252538] rounded-3xl shadow-xl border border-purple-100 dark:border-purple-800/30 p-8 mb-8 animate-fade-in">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <Icon name="Store" size={40} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">{seller.shopName}</h1>
                <p className="text-muted-foreground">{seller.name}</p>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-2">
                    <Icon name="Mail" size={12} />
                    <span>{seller.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" size={12} />
                    <span>{seller.phone}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => onShowAddProduct(true)}
              className="bg-gradient-to-r from-primary to-accent text-white shadow-lg h-12 px-6"
            >
              <Icon name="Plus" size={20} className="mr-2" />
              Добавить товар
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-[#252538] rounded-2xl p-6 border border-purple-100 dark:border-purple-800/30 text-center">
            <Icon name="Package" size={32} className="text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-primary mb-1">{products.length}</div>
            <div className="text-sm text-muted-foreground">Товаров</div>
          </div>
          <div className="bg-white dark:bg-[#252538] rounded-2xl p-6 border border-purple-100 dark:border-purple-800/30 text-center">
            <Icon name="ShoppingCart" size={32} className="text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-primary mb-1">0</div>
            <div className="text-sm text-muted-foreground">Заказов</div>
          </div>
          <div className="bg-white dark:bg-[#252538] rounded-2xl p-6 border border-purple-100 dark:border-purple-800/30 text-center">
            <Icon name="Eye" size={32} className="text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-primary mb-1">0</div>
            <div className="text-sm text-muted-foreground">Просмотров</div>
          </div>
          <div className="bg-white dark:bg-[#252538] rounded-2xl p-6 border border-purple-100 dark:border-purple-800/30 text-center">
            <Icon name="DollarSign" size={32} className="text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-primary mb-1">0 ₽</div>
            <div className="text-sm text-muted-foreground">Продаж</div>
          </div>
        </div>

        {showAddProduct && (
          <div className="bg-white dark:bg-[#252538] rounded-3xl shadow-xl border border-purple-100 dark:border-purple-800/30 p-8 mb-8 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Icon name="Plus" size={24} className="text-primary" />
                Новый товар
              </h2>
              <Button
                onClick={() => onShowAddProduct(false)}
                variant="outline"
                size="sm"
              >
                <Icon name="X" size={18} />
              </Button>
            </div>
            <div className="space-y-4">
              <Input
                placeholder="Название товара"
                value={productName}
                onChange={(e) => onProductNameChange(e.target.value)}
                className="h-12 rounded-xl border-2 border-purple-100 dark:border-purple-800/30"
              />
              <Textarea
                placeholder="Описание товара"
                value={productDesc}
                onChange={(e) => onProductDescChange(e.target.value)}
                className="rounded-xl border-2 border-purple-100 dark:border-purple-800/30 min-h-24 dark:bg-[#2a2a40]"
              />
              <Input
                type="number"
                placeholder="Цена в рублях"
                value={productPrice}
                onChange={(e) => onProductPriceChange(e.target.value)}
                className="h-12 rounded-xl border-2 border-purple-100 dark:border-purple-800/30"
              />
              <Input
                placeholder="URL изображения"
                value={productImage}
                onChange={(e) => onProductImageChange(e.target.value)}
                className="h-12 rounded-xl border-2 border-purple-100 dark:border-purple-800/30"
              />
              <Button 
                onClick={onAddProduct}
                className="w-full h-12 bg-gradient-to-r from-primary to-accent text-white"
              >
                <Icon name="Check" size={20} className="mr-2" />
                Добавить товар
              </Button>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-[#252538] rounded-3xl shadow-xl border border-purple-100 dark:border-purple-800/30 p-8">
          <h2 className="text-2xl font-bold mb-6">Мои товары</h2>
          
          {products.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Package" size={64} className="text-muted-foreground mx-auto mb-4 opacity-30" />
              <p className="text-muted-foreground">У вас пока нет товаров</p>
              <Button 
                onClick={() => onShowAddProduct(true)}
                className="mt-4 bg-gradient-to-r from-primary to-accent text-white"
              >
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить первый товар
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="border-2 border-purple-100 dark:border-purple-900/30 rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
                  <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/20 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">{product.price.toLocaleString()} ₽</span>
                      <Button
                        onClick={() => onDeleteProduct(product.id)}
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
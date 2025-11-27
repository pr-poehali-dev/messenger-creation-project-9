import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ThemeToggle from '@/components/ThemeToggle';
import MobileNav from '@/components/MobileNav';
import Footer from '@/components/Footer';

interface SellerAuthFormProps {
  isLogin: boolean;
  loading: boolean;
  name: string;
  email: string;
  phone: string;
  shopName: string;
  password: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onShopNameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onToggleMode: () => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function SellerAuthForm({
  isLogin,
  loading,
  name,
  email,
  phone,
  shopName,
  password,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onShopNameChange,
  onPasswordChange,
  onToggleMode,
  onSubmit,
  onBack
}: SellerAuthFormProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/20 dark:via-purple-950/20 dark:to-pink-950/10">
      <header className="backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-purple-100/50 dark:border-purple-900/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
            >
              <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Назад</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <div className="w-full max-w-md animate-scale-in">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-purple-100 dark:border-purple-900/30 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-accent p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                  <Icon name="Store" size={40} className="text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {isLogin ? 'Вход для продавцов' : 'Регистрация продавца'}
                </h1>
                <p className="text-white/90">
                  {isLogin ? 'Войдите в панель управления' : 'Создайте магазин на Peeky'}
                </p>
              </div>
              
              <div className="p-8 space-y-6">
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Icon name="User" size={16} className="text-primary" />
                        Ваше имя
                      </label>
                      <Input
                        type="text"
                        placeholder="Иван Иванов"
                        value={name}
                        onChange={(e) => onNameChange(e.target.value)}
                        className="h-12 rounded-xl border-2 border-purple-100 dark:border-purple-900 focus:border-primary dark:bg-gray-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Icon name="Store" size={16} className="text-primary" />
                        Название магазина
                      </label>
                      <Input
                        type="text"
                        placeholder="Мой магазин"
                        value={shopName}
                        onChange={(e) => onShopNameChange(e.target.value)}
                        className="h-12 rounded-xl border-2 border-purple-100 dark:border-purple-900 focus:border-primary dark:bg-gray-800"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Icon name="Mail" size={16} className="text-primary" />
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    className="h-12 rounded-xl border-2 border-purple-100 dark:border-purple-900 focus:border-primary dark:bg-gray-800"
                  />
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Icon name="Phone" size={16} className="text-primary" />
                      Телефон
                    </label>
                    <Input
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={phone}
                      onChange={(e) => onPhoneChange(e.target.value)}
                      className="h-12 rounded-xl border-2 border-purple-100 dark:border-purple-900 focus:border-primary dark:bg-gray-800"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Icon name="Lock" size={16} className="text-primary" />
                    Пароль
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    className="h-12 rounded-xl border-2 border-purple-100 dark:border-purple-900 focus:border-primary dark:bg-gray-800"
                  />
                </div>

                <Button 
                  onClick={onSubmit} 
                  disabled={loading} 
                  className="w-full h-12 bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl transition-all"
                >
                  {loading ? (
                    <Icon name="Loader" className="animate-spin" size={20} />
                  ) : (
                    <>
                      <Icon name={isLogin ? "LogIn" : "Rocket"} size={20} className="mr-2" />
                      {isLogin ? 'Войти' : 'Создать магазин'}
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <button
                    onClick={onToggleMode}
                    className="text-sm text-primary hover:text-accent transition-colors"
                  >
                    {isLogin ? 'Нет магазина? Зарегистрируйтесь' : 'Уже есть магазин? Войдите'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
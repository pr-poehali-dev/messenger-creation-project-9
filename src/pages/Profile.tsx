import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ThemeToggle from '@/components/ThemeToggle';
import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('customer_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleRegister = () => {
    if (!name || !email || !phone || !password) {
      alert('Заполните все поля');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        registeredAt: new Date().toISOString()
      };
      
      const users = JSON.parse(localStorage.getItem('customers') || '[]');
      users.push({ ...newUser, password });
      localStorage.setItem('customers', JSON.stringify(users));
      localStorage.setItem('customer_user', JSON.stringify(newUser));
      
      setUser(newUser);
      setLoading(false);
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
    }, 800);
  };

  const handleLogin = () => {
    if (!email || !password) {
      alert('Заполните email и пароль');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('customers') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        localStorage.setItem('customer_user', JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
      } else {
        alert('Неверный email или пароль');
      }
      
      setLoading(false);
      setEmail('');
      setPassword('');
    }, 800);
  };

  const handleLogout = () => {
    localStorage.removeItem('customer_user');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/20 dark:via-purple-950/20 dark:to-pink-950/10">
      <header className="backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-purple-100/50 dark:border-purple-900/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors group">
              <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">На главную</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-5rem)]">
        {!user ? (
          <div className="w-full max-w-md animate-scale-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-purple-100 dark:border-purple-900/30 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-accent p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                    <Icon name="User" size={40} className="text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {isLogin ? 'Добро пожаловать!' : 'Регистрация'}
                  </h1>
                  <p className="text-white/90">
                    {isLogin ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт'}
                  </p>
                </div>
                
                <div className="p-8 space-y-6">
                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Icon name="User" size={16} className="text-primary" />
                        Ваше имя
                      </label>
                      <Input
                        type="text"
                        placeholder="Иван Иванов"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-12 rounded-xl border-2 border-purple-100 dark:border-purple-900 focus:border-primary dark:bg-gray-800"
                      />
                    </div>
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
                      onChange={(e) => setEmail(e.target.value)}
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
                        onChange={(e) => setPhone(e.target.value)}
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
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 rounded-xl border-2 border-purple-100 dark:border-purple-900 focus:border-primary dark:bg-gray-800"
                    />
                  </div>

                  <Button 
                    onClick={isLogin ? handleLogin : handleRegister} 
                    disabled={loading} 
                    className="w-full h-12 bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    {loading ? (
                      <Icon name="Loader" className="animate-spin" size={20} />
                    ) : (
                      <>
                        <Icon name={isLogin ? "LogIn" : "UserPlus"} size={20} className="mr-2" />
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-sm text-primary hover:text-accent transition-colors"
                    >
                      {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
                    </button>
                  </div>

                  <div className="pt-4 text-center border-t border-purple-100 dark:border-purple-900/30">
                    <p className="text-xs text-muted-foreground">
                      Продолжая, вы соглашаетесь с условиями использования
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl animate-scale-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-purple-100 dark:border-purple-900/30 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-accent p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <Icon name="User" size={48} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                        <div className="flex flex-col gap-1 text-white/90 text-sm">
                          <div className="flex items-center gap-2">
                            <Icon name="Mail" size={14} />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Phone" size={14} />
                            <span>{user.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={handleLogout} 
                      variant="outline"
                      className="border-2 border-white/30 text-white hover:bg-white/10"
                    >
                      <Icon name="LogOut" size={18} className="mr-2" />
                      Выйти
                    </Button>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 text-center">
                      <Icon name="Package" size={32} className="text-primary mx-auto mb-3" />
                      <div className="text-3xl font-bold text-primary mb-1">0</div>
                      <div className="text-sm text-muted-foreground">Заказов</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 text-center">
                      <Icon name="ShoppingCart" size={32} className="text-primary mx-auto mb-3" />
                      <div className="text-3xl font-bold text-primary mb-1">0</div>
                      <div className="text-sm text-muted-foreground">В корзине</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 text-center">
                      <Icon name="Heart" size={32} className="text-primary mx-auto mb-3" />
                      <div className="text-3xl font-bold text-primary mb-1">0</div>
                      <div className="text-sm text-muted-foreground">Избранное</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <Link to="/" className="flex items-center justify-between p-5 rounded-2xl border-2 border-purple-100 dark:border-purple-900/30 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <Icon name="Package" size={24} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-bold text-lg mb-1">Мои заказы</div>
                          <div className="text-sm text-muted-foreground">История покупок</div>
                        </div>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link to="/" className="flex items-center justify-between p-5 rounded-2xl border-2 border-purple-100 dark:border-purple-900/30 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <Icon name="Heart" size={24} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-bold text-lg mb-1">Избранное</div>
                          <div className="text-sm text-muted-foreground">Отложенные товары</div>
                        </div>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link to="/" className="flex items-center justify-between p-5 rounded-2xl border-2 border-purple-100 dark:border-purple-900/30 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <Icon name="MapPin" size={24} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-bold text-lg mb-1">Адреса доставки</div>
                          <div className="text-sm text-muted-foreground">Управление адресами</div>
                        </div>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link to="/" className="flex items-center justify-between p-5 rounded-2xl border-2 border-purple-100 dark:border-purple-900/30 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <Icon name="CreditCard" size={24} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-bold text-lg mb-1">Способы оплаты</div>
                          <div className="text-sm text-muted-foreground">Карты и кошельки</div>
                        </div>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link to="/" className="flex items-center justify-between p-5 rounded-2xl border-2 border-purple-100 dark:border-purple-900/30 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <Icon name="Bell" size={24} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-bold text-lg mb-1">Уведомления</div>
                          <div className="text-sm text-muted-foreground">Настройка уведомлений</div>
                        </div>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link to="/" className="flex items-center justify-between p-5 rounded-2xl border-2 border-purple-100 dark:border-purple-900/30 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <Icon name="Settings" size={24} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-bold text-lg mb-1">Настройки</div>
                          <div className="text-sm text-muted-foreground">Параметры аккаунта</div>
                        </div>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-900/30">
                    <div className="flex items-start gap-4">
                      <Icon name="Info" size={24} className="text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-lg mb-2">Информация об аккаунте</h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Icon name="Calendar" size={14} className="text-primary" />
                            <span>Дата регистрации: {new Date(user.registeredAt).toLocaleDateString('ru-RU')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Shield" size={14} className="text-primary" />
                            <span>ID пользователя: {user.id}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

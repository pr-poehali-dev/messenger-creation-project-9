import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = () => {
    if (!phone || !name) {
      alert('Заполните все поля');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newUser = { id: '1', name, phone };
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      setLoading(false);
    }, 800);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/20">
      <header className="backdrop-blur-xl bg-white/80 border-b border-purple-100/50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors group">
            <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Назад</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-5rem)]">
        {!user ? (
          <div className="w-full max-w-md animate-scale-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-accent p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                    <Icon name="User" size={40} className="text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2">Добро пожаловать!</h1>
                  <p className="text-white/90">Войдите, чтобы начать покупки</p>
                </div>
                
                <div className="p-8 space-y-6">
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
                      className="h-12 rounded-xl border-2 border-purple-100 focus:border-primary"
                    />
                  </div>

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
                      className="h-12 rounded-xl border-2 border-purple-100 focus:border-primary"
                    />
                  </div>

                  <Button 
                    onClick={handleLogin} 
                    disabled={loading} 
                    className="w-full h-12 bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    {loading ? (
                      <Icon name="Loader" className="animate-spin" size={20} />
                    ) : (
                      <>
                        <Icon name="LogIn" size={20} className="mr-2" />
                        Войти
                      </>
                    )}
                  </Button>

                  <div className="pt-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      Продолжая, вы соглашаетесь с условиями использования
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-2xl animate-scale-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-accent p-8">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <Icon name="User" size={48} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                      <div className="flex items-center gap-2 text-white/90">
                        <Icon name="Phone" size={16} />
                        <span>{user.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">0</div>
                      <div className="text-sm text-muted-foreground">Заказов</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">0</div>
                      <div className="text-sm text-muted-foreground">В корзине</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">0</div>
                      <div className="text-sm text-muted-foreground">Избранное</div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Link to="/" className="flex items-center justify-between p-4 rounded-xl hover:bg-purple-50 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <Icon name="Package" size={20} className="text-primary" />
                        </div>
                        <span className="font-medium">Мои заказы</span>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link to="/" className="flex items-center justify-between p-4 rounded-xl hover:bg-purple-50 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <Icon name="Heart" size={20} className="text-primary" />
                        </div>
                        <span className="font-medium">Избранное</span>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link to="/" className="flex items-center justify-between p-4 rounded-xl hover:bg-purple-50 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <Icon name="Settings" size={20} className="text-primary" />
                        </div>
                        <span className="font-medium">Настройки</span>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <div className="pt-4 border-t border-purple-100">
                    <Button 
                      onClick={handleLogout} 
                      variant="outline" 
                      className="w-full h-12 border-2 border-purple-100 hover:border-accent hover:bg-accent/5 hover:text-accent"
                    >
                      <Icon name="LogOut" size={20} className="mr-2" />
                      Выйти
                    </Button>
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

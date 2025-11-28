import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { login, register } from '@/lib/auth';

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    role: 'buyer' as 'buyer' | 'seller'
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const result = login(formData.email, formData.password);
      if (result.success && result.user) {
        navigate(result.user.role === 'seller' ? '/seller/dashboard' : '/');
      } else {
        setError(result.error || 'Ошибка входа');
      }
    } else {
      if (!formData.name || !formData.phone) {
        setError('Заполните все поля');
        return;
      }
      const result = register(formData.email, formData.password, formData.name, formData.phone, formData.role);
      if (result.success && result.user) {
        navigate(result.user.role === 'seller' ? '/seller/dashboard' : '/');
      } else {
        setError(result.error || 'Ошибка регистрации');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="relative w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="bg-white p-3 rounded-2xl shadow-2xl">
            <Icon name="Sparkles" size={32} className="text-purple-600" />
          </div>
          <span className="text-4xl font-bold text-white drop-shadow-lg">Peeky</span>
        </Link>

        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {isLogin ? 'Вход в аккаунт' : 'Регистрация'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
                  <Icon name="AlertCircle" size={20} />
                  <span>{error}</span>
                </div>
              )}

              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иван Иванов"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (999) 123-45-67"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Тип аккаунта
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'buyer' })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.role === 'buyer'
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon name="ShoppingBag" size={24} className="mx-auto mb-2" />
                        <div className="font-medium">Покупатель</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'seller' })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.role === 'seller'
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon name="Store" size={24} className="mx-auto mb-2" />
                        <div className="font-medium">Продавец</div>
                      </button>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Пароль
                </label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>

              <Button type="submit" className="w-full h-12 text-lg font-semibold">
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                  }}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
                </button>
              </div>

              <Link to="/">
                <Button variant="ghost" className="w-full">
                  Вернуться на главную
                </Button>
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

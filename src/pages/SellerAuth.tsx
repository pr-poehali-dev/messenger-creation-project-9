import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { register, login } from '@/lib/auth';
import Icon from '@/components/ui/icon';

export default function SellerAuth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const result = login(email, password);
      if (result.success) {
        if (result.user?.role === 'seller') {
          navigate('/seller/dashboard');
        } else {
          setError('Этот аккаунт зарегистрирован как покупатель');
        }
      } else {
        setError(result.error || 'Ошибка входа');
      }
    } else {
      if (!name || !phone) {
        setError('Заполните все поля');
        return;
      }
      const result = register(email, password, name, phone, 'seller');
      if (result.success) {
        navigate('/seller/dashboard');
      } else {
        setError(result.error || 'Ошибка регистрации');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/seller-info')}
              className="gap-2"
            >
              <Icon name="ArrowLeft" size={16} />
              Назад
            </Button>
          </div>
          <CardTitle className="text-2xl text-center">
            {isLogin ? 'Вход для продавцов' : 'Регистрация продавца'}
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Начните продавать на Peeky
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@business.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Пароль</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Название магазина</label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Мой магазин"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Телефон</label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                    required
                  />
                </div>
              </>
            )}

            <Button type="submit" className="w-full">
              {isLogin ? 'Войти' : 'Начать продавать'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

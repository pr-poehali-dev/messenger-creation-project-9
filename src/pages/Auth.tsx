import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { User } from '@/types/game';
import { findUserByEmail, findUserByUsername, addUserToDB, saveUser } from '@/utils/storage';

interface AuthProps {
  mode: 'login' | 'register';
  onSuccess: (user: User) => void;
  onBack: () => void;
}

export default function Auth({ mode, onSuccess, onBack }: AuthProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'register') {
      if (!formData.username || !formData.email || !formData.password) {
        setError('Заполните все поля');
        return;
      }

      if (formData.password.length < 6) {
        setError('Пароль должен быть минимум 6 символов');
        return;
      }

      if (findUserByEmail(formData.email)) {
        setError('Email уже зарегистрирован');
        return;
      }

      if (findUserByUsername(formData.username)) {
        setError('Это имя уже занято');
        return;
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        username: formData.username,
        email: formData.email,
        createdAt: new Date().toISOString(),
      };

      addUserToDB(newUser);
      saveUser(newUser);
      onSuccess(newUser);
    } else {
      if (!formData.email || !formData.password) {
        setError('Заполните все поля');
        return;
      }

      const user = findUserByEmail(formData.email);
      if (!user) {
        setError('Пользователь не найден');
        return;
      }

      saveUser(user);
      onSuccess(user);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
        >
          <Icon name="ArrowLeft" size={20} />
          Назад
        </button>

        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">👀</div>
            <h2 className="text-3xl font-bold mb-2">
              {mode === 'register' ? 'Регистрация' : 'Вход'}
            </h2>
            <p className="text-purple-300">
              {mode === 'register' 
                ? 'Создай аккаунт и начни строить империю' 
                : 'Войди в свой аккаунт'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Имя пользователя
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-xl
                    focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Введи своё имя"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-xl
                  focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="example@mail.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Пароль
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-xl
                  focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Минимум 6 символов"
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold
                hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-105"
            >
              {mode === 'register' ? 'Создать аккаунт' : 'Войти'}
            </button>

            <div className="text-center text-sm text-purple-300">
              {mode === 'register' ? (
                <>
                  Уже есть аккаунт?{' '}
                  <button
                    type="button"
                    onClick={onBack}
                    className="text-purple-400 hover:text-white font-medium"
                  >
                    Войти
                  </button>
                </>
              ) : (
                <>
                  Нет аккаунта?{' '}
                  <button
                    type="button"
                    onClick={onBack}
                    className="text-purple-400 hover:text-white font-medium"
                  >
                    Создать
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { AuthMode } from '@/types';

type AuthFormProps = {
  authMode: AuthMode;
  email: string;
  password: string;
  username: string;
  error: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onUsernameChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleMode: () => void;
};

export default function AuthForm({
  authMode,
  email,
  password,
  username,
  error,
  onEmailChange,
  onPasswordChange,
  onUsernameChange,
  onSubmit,
  onToggleMode
}: AuthFormProps) {
  return (
    <div className="flex h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md glass border-border">
        <CardHeader className="space-y-1">
          <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-2xl flex items-center justify-center text-3xl font-bold">
            T
          </div>
          <CardTitle className="text-2xl text-center gradient-text">
            {authMode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
          </CardTitle>
          <CardDescription className="text-center">
            {authMode === 'login' 
              ? 'Войдите, чтобы продолжить общение' 
              : 'Создайте аккаунт для начала'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            {authMode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="username">Имя пользователя</Label>
                <Input
                  id="username"
                  placeholder="Ваше имя"
                  value={username}
                  onChange={(e) => onUsernameChange(e.target.value)}
                  required
                  className="bg-muted border-0"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                required
                className="bg-muted border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                required
                minLength={6}
                className="bg-muted border-0"
              />
            </div>
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full gradient-primary border-0 hover:opacity-90">
              {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </Button>
            <div className="text-center text-sm">
              <button
                type="button"
                onClick={onToggleMode}
                className="text-primary hover:underline"
              >
                {authMode === 'login' 
                  ? 'Нет аккаунта? Зарегистрируйтесь' 
                  : 'Уже есть аккаунт? Войдите'}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
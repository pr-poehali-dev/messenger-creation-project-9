import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Icon from '@/components/ui/icon'
import { useCustomerAuth } from '@/contexts/CustomerAuthContext'
import { toast } from 'sonner'

export default function CustomerLoginPage() {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, register } = useCustomerAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const success = await login(loginEmail, loginPassword)
    
    if (success) {
      toast.success('Добро пожаловать!', {
        description: 'Вход выполнен успешно',
        icon: '✅',
      })
      navigate('/profile')
    } else {
      toast.error('Ошибка входа', {
        description: 'Неверный email или пароль',
        icon: '❌',
      })
    }
    
    setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (registerPassword !== registerPasswordConfirm) {
      toast.error('Ошибка регистрации', {
        description: 'Пароли не совпадают',
        icon: '❌',
      })
      return
    }

    if (registerPassword.length < 6) {
      toast.error('Ошибка регистрации', {
        description: 'Пароль должен быть не менее 6 символов',
        icon: '❌',
      })
      return
    }

    setIsLoading(true)

    const success = await register(registerName, registerEmail, registerPassword)
    
    if (success) {
      toast.success('Регистрация успешна!', {
        description: 'Добро пожаловать в Peeky!',
        icon: '🎉',
      })
      navigate('/profile')
    } else {
      toast.error('Ошибка регистрации', {
        description: 'Пользователь с таким email уже существует',
        icon: '❌',
      })
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6 group">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
            <Icon name="Store" className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Маркетплейс</span>
        </Link>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 h-12">
            <TabsTrigger value="login" className="text-base font-semibold">Вход</TabsTrigger>
            <TabsTrigger value="register" className="text-base font-semibold">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold">С возвращением!</CardTitle>
                <CardDescription>Войдите в свой аккаунт</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-gray-700 font-semibold">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="example@mail.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="h-11 rounded-xl border-2 border-purple-200 focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-gray-700 font-semibold">Пароль</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="h-11 rounded-xl border-2 border-purple-200 focus:border-purple-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Icon name="Loader2" className="h-5 w-5 animate-spin" />
                        Вход...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Icon name="LogIn" className="h-5 w-5" />
                        Войти
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold">Создать аккаунт</CardTitle>
                <CardDescription>Присоединяйтесь к нам</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="text-gray-700 font-semibold">Имя</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Иван Иванов"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                      className="h-11 rounded-xl border-2 border-purple-200 focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-gray-700 font-semibold">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="example@mail.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                      className="h-11 rounded-xl border-2 border-purple-200 focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-gray-700 font-semibold">Пароль</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                      minLength={6}
                      className="h-11 rounded-xl border-2 border-purple-200 focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password-confirm" className="text-gray-700 font-semibold">Повторите пароль</Label>
                    <Input
                      id="register-password-confirm"
                      type="password"
                      placeholder="••••••••"
                      value={registerPasswordConfirm}
                      onChange={(e) => setRegisterPasswordConfirm(e.target.value)}
                      required
                      minLength={6}
                      className="h-11 rounded-xl border-2 border-purple-200 focus:border-purple-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Icon name="Loader2" className="h-5 w-5 animate-spin" />
                        Регистрация...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Icon name="UserPlus" className="h-5 w-5" />
                        Зарегистрироваться
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

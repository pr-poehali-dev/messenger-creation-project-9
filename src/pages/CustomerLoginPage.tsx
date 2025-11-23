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

  const handleSocialLogin = async (provider: 'google' | 'vk') => {
    setIsLoading(true)
    
    const providerNames = {
      google: 'Google',
      vk: 'ВКонтакте'
    }

    setTimeout(async () => {
      const mockEmail = provider === 'google' 
        ? 'user@gmail.com' 
        : 'user@vk.com'
      const mockName = provider === 'google' 
        ? 'Google User' 
        : 'VK User'

      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
      let user = existingUsers.find((u: any) => u.email === mockEmail)

      if (!user) {
        const newUser = {
          id: Date.now(),
          name: mockName,
          email: mockEmail,
          password: Math.random().toString(36),
          provider: provider,
        }
        existingUsers.push(newUser)
        localStorage.setItem('users', JSON.stringify(existingUsers))
        user = newUser
      }

      const success = await register(user.name, user.email, user.password || Math.random().toString(36))

      if (success || await login(mockEmail, user.password)) {
        toast.success('Добро пожаловать!', {
          description: `Вход через ${providerNames[provider]} выполнен успешно`,
          icon: '✅',
        })
        navigate('/profile')
      }
      
      setIsLoading(false)
    }, 1500)
  }

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 flex items-center justify-center p-4">
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

                  <div className="text-center mt-4">
                    <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                      Забыли пароль?
                    </Link>
                  </div>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white/90 text-gray-600 font-medium">или войдите через</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin('google')}
                      disabled={isLoading}
                      className="h-11 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 rounded-xl font-semibold transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin('vk')}
                      disabled={isLoading}
                      className="h-11 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl font-semibold transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#0077FF">
                        <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.39 14.73h-1.48c-.67 0-.87-.54-2.07-1.76-1.05-1.03-1.51-1.16-1.77-1.16-.36 0-.47.11-.47.64v1.6c0 .43-.14.69-1.26.69-1.86 0-3.92-1.13-5.37-3.23-2.18-3.17-2.78-5.55-2.78-6.03 0-.26.11-.5.64-.5h1.48c.48 0 .66.21.84.72.96 2.68 2.57 5.03 3.23 5.03.25 0 .36-.11.36-.74V9.38c-.09-1.56-.91-1.69-.91-2.24 0-.21.18-.42.46-.42h2.33c.4 0 .55.22.55.69v3.71c0 .4.18.55.3.55.25 0 .45-.15.91-.61 1.4-1.58 2.41-4.03 2.41-4.03.13-.29.35-.5.83-.5h1.48c.59 0 .72.3.59.71-.19.99-2.35 4.12-2.35 4.12-.21.34-.29.49 0 .88.21.29.89.87 1.34 1.4.81.94 1.43 1.73 1.6 2.27.16.54-.09.81-.62.81z"/>
                      </svg>
                      VK
                    </Button>
                  </div>
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

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white/90 text-gray-600 font-medium">или зарегистрируйтесь через</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin('google')}
                      disabled={isLoading}
                      className="h-11 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 rounded-xl font-semibold transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin('vk')}
                      disabled={isLoading}
                      className="h-11 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl font-semibold transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#0077FF">
                        <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.39 14.73h-1.48c-.67 0-.87-.54-2.07-1.76-1.05-1.03-1.51-1.16-1.77-1.16-.36 0-.47.11-.47.64v1.6c0 .43-.14.69-1.26.69-1.86 0-3.92-1.13-5.37-3.23-2.18-3.17-2.78-5.55-2.78-6.03 0-.26.11-.5.64-.5h1.48c.48 0 .66.21.84.72.96 2.68 2.57 5.03 3.23 5.03.25 0 .36-.11.36-.74V9.38c-.09-1.56-.91-1.69-.91-2.24 0-.21.18-.42.46-.42h2.33c.4 0 .55.22.55.69v3.71c0 .4.18.55.3.55.25 0 .45-.15.91-.61 1.4-1.58 2.41-4.03 2.41-4.03.13-.29.35-.5.83-.5h1.48c.59 0 .72.3.59.71-.19.99-2.35 4.12-2.35 4.12-.21.34-.29.49 0 .88.21.29.89.87 1.34 1.4.81.94 1.43 1.73 1.6 2.27.16.54-.09.81-.62.81z"/>
                      </svg>
                      VK
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Icon from '@/components/ui/icon'
import { toast } from 'sonner'

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<'email' | 'code' | 'newPassword'>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')
  const navigate = useNavigate()

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const user = existingUsers.find((u: any) => u.email === email)

    if (!user) {
      toast.error('Ошибка', {
        description: 'Пользователь с таким email не найден',
        icon: '❌',
      })
      setIsLoading(false)
      return
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedCode(resetCode)

    setTimeout(() => {
      toast.success('Код отправлен!', {
        description: `Код восстановления: ${resetCode}`,
        icon: '📧',
        duration: 10000,
      })
      setStep('code')
      setIsLoading(false)
    }, 1500)
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (code === generatedCode) {
        toast.success('Код подтверждён!', {
          description: 'Теперь установите новый пароль',
          icon: '✅',
        })
        setStep('newPassword')
      } else {
        toast.error('Неверный код', {
          description: 'Проверьте правильность введённого кода',
          icon: '❌',
        })
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast.error('Ошибка', {
        description: 'Пароли не совпадают',
        icon: '❌',
      })
      return
    }

    if (newPassword.length < 6) {
      toast.error('Ошибка', {
        description: 'Пароль должен быть не менее 6 символов',
        icon: '❌',
      })
      return
    }

    setIsLoading(true)

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedUsers = existingUsers.map((u: any) => 
      u.email === email ? { ...u, password: newPassword } : u
    )
    localStorage.setItem('users', JSON.stringify(updatedUsers))

    setTimeout(() => {
      toast.success('Пароль изменён!', {
        description: 'Теперь вы можете войти с новым паролем',
        icon: '🎉',
      })
      setIsLoading(false)
      navigate('/login')
    }, 1000)
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

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
          <CardHeader className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-2">
              <Icon name="KeyRound" className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Восстановление пароля</CardTitle>
            <CardDescription>
              {step === 'email' && 'Введите email для получения кода'}
              {step === 'code' && 'Введите код из уведомления'}
              {step === 'newPassword' && 'Установите новый пароль'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'email' && (
              <form onSubmit={handleSendCode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-semibold">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                      Отправка...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Icon name="Mail" className="h-5 w-5" />
                      Отправить код
                    </div>
                  )}
                </Button>

                <div className="text-center">
                  <Link to="/login" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                    ← Вернуться к входу
                  </Link>
                </div>
              </form>
            )}

            {step === 'code' && (
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-gray-700 font-semibold">Код подтверждения</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="123456"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    maxLength={6}
                    className="h-11 rounded-xl border-2 border-purple-200 focus:border-purple-500 text-center text-2xl font-bold tracking-widest"
                  />
                  <p className="text-xs text-gray-600 text-center">
                    Код отправлен на {email}
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Icon name="Loader2" className="h-5 w-5 animate-spin" />
                      Проверка...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Icon name="Check" className="h-5 w-5" />
                      Подтвердить код
                    </div>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleSendCode}
                  className="w-full"
                  disabled={isLoading}
                >
                  <Icon name="RefreshCw" className="h-4 w-4 mr-2" />
                  Отправить код повторно
                </Button>
              </form>
            )}

            {step === 'newPassword' && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-gray-700 font-semibold">Новый пароль</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    className="h-11 rounded-xl border-2 border-purple-200 focus:border-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-gray-700 font-semibold">Повторите пароль</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                      Сохранение...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Icon name="Check" className="h-5 w-5" />
                      Сохранить пароль
                    </div>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

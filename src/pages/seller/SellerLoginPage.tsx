import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Icon from '@/components/ui/icon'
import { useSellerAuth } from '@/contexts/SellerAuthContext'
import { toast } from 'sonner'

export default function SellerLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useSellerAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const success = await login(email, password)
    
    if (success) {
      toast.success('Добро пожаловать!', {
        description: 'Вход выполнен успешно',
        icon: '✅',
      })
      navigate('/seller/dashboard')
    } else {
      toast.error('Ошибка входа', {
        description: 'Неверный email или пароль',
        icon: '❌',
      })
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
        <CardHeader className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-lg">
            <Icon name="Store" className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Кабинет продавца
          </CardTitle>
          <CardDescription className="text-lg">
            Войдите в систему управления магазином
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-semibold">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seller@peeky.ru"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border-2 border-purple-200 focus:border-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-semibold">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 rounded-xl border-2 border-purple-200 focus:border-purple-500"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
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

          <div className="mt-6 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Демо-доступ:</strong>
            </p>
            <p className="text-sm text-gray-600">Email: seller@peeky.ru</p>
            <p className="text-sm text-gray-600">Пароль: admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

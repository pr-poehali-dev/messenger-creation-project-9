import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Icon from '@/components/ui/icon'

export default function ProfilePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
      setTimeout(() => setShowContent(true), 50)
    }, 600)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="h-10 w-24 bg-gray-200 rounded-full mb-6 skeleton-box skeleton-box-fast"></div>
            <div className="h-10 w-64 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg mb-6 skeleton-box skeleton-box-slow"></div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 bg-purple-200 rounded skeleton-box"></div>
                      <div className="h-6 w-32 bg-gray-200 rounded skeleton-box"></div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4 skeleton-box skeleton-box-fast"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 skeleton-box skeleton-box-fast"></div>
                    <div className="h-10 bg-purple-100 rounded-lg w-full mt-4 skeleton-box"></div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 bg-purple-200 rounded skeleton-box"></div>
                  <div className="h-6 w-32 bg-gray-200 rounded skeleton-box"></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 bg-gray-100 rounded-lg skeleton-box skeleton-box-fast"></div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />

      <main className={`container mx-auto px-4 py-8 transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <Icon name="ArrowLeft" className="h-4 w-4 mr-2" />
            Назад
          </Button>

          <h1 className="text-3xl font-bold mb-6">Личный кабинет</h1>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" className="h-5 w-5" />
                  Профиль
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Имя</p>
                  <p className="font-medium">Гость</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">guest@example.com</p>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Редактировать профиль
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Package" className="h-5 w-5" />
                  Мои заказы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  У вас пока нет заказов
                </p>
                <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
                  Перейти к покупкам
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MapPin" className="h-5 w-5" />
                  Адреса доставки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Адреса не добавлены
                </p>
                <Button variant="outline" className="w-full">
                  Добавить адрес
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Heart" className="h-5 w-5" />
                  Избранное
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Список избранного пуст
                </p>
                <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
                  Посмотреть товары
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Settings" className="h-5 w-5" />
                Настройки
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Icon name="Bell" className="h-4 w-4 mr-2" />
                Уведомления
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Icon name="CreditCard" className="h-4 w-4 mr-2" />
                Способы оплаты
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Icon name="HelpCircle" className="h-4 w-4 mr-2" />
                Помощь и поддержка
              </Button>
              <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
                <Icon name="LogOut" className="h-4 w-4 mr-2" />
                Выйти
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
import { useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Icon from '@/components/ui/icon'

export default function ProfilePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
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

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SellerHeader from '@/components/SellerHeader'
import { useSwipeable } from 'react-swipeable'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import Icon from '@/components/ui/icon'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'

export default function SellerSettingsPage() {
  const navigate = useNavigate()
  const [shopSettings, setShopSettings] = useState({
    name: 'Peeky Shop',
    description: 'Интернет-магазин электроники и товаров для дома',
    email: 'info@peeky.ru',
    phone: '+7 (800) 555-35-35',
    address: 'Москва, ул. Примерная, д. 1',
    workingHours: 'Пн-Вс: 9:00 - 21:00',
  })

  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    reviews: false,
    promotions: true,
  })

  const [deliverySettings, setDeliverySettings] = useState({
    freeDeliveryFrom: '3000',
    deliveryCost: '300',
    deliveryTime: '1-3 дня',
  })

  const handleSaveShopInfo = () => {
    toast.success('Настройки магазина сохранены', {
      description: 'Информация обновлена успешно',
      icon: '✅',
    })
  }

  const handleSaveNotifications = () => {
    toast.success('Настройки уведомлений сохранены', {
      icon: '🔔',
    })
  }

  const handleSaveDelivery = () => {
    toast.success('Настройки доставки сохранены', {
      icon: '🚚',
    })
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      navigate('/seller/dashboard')
    },
    onSwipedRight: () => {
      navigate('/seller/analytics')
    },
    preventScrollOnSwipe: true,
    trackMouse: false,
    delta: 50,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <SellerHeader />

      <main {...swipeHandlers} className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Настройки
          </h1>
          <p className="text-gray-600">Управление параметрами магазина</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Store" className="h-5 w-5 text-purple-600" />
                  Информация о магазине
                </CardTitle>
                <CardDescription>
                  Основные данные вашего магазина
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shop-name">Название магазина</Label>
                  <Input
                    id="shop-name"
                    value={shopSettings.name}
                    onChange={(e) => setShopSettings({ ...shopSettings, name: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shop-description">Описание</Label>
                  <Textarea
                    id="shop-description"
                    value={shopSettings.description}
                    onChange={(e) => setShopSettings({ ...shopSettings, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shop-email">Email</Label>
                    <Input
                      id="shop-email"
                      type="email"
                      value={shopSettings.email}
                      onChange={(e) => setShopSettings({ ...shopSettings, email: e.target.value })}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shop-phone">Телефон</Label>
                    <Input
                      id="shop-phone"
                      value={shopSettings.phone}
                      onChange={(e) => setShopSettings({ ...shopSettings, phone: e.target.value })}
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shop-address">Адрес</Label>
                  <Input
                    id="shop-address"
                    value={shopSettings.address}
                    onChange={(e) => setShopSettings({ ...shopSettings, address: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shop-hours">Часы работы</Label>
                  <Input
                    id="shop-hours"
                    value={shopSettings.workingHours}
                    onChange={(e) => setShopSettings({ ...shopSettings, workingHours: e.target.value })}
                    className="h-11"
                  />
                </div>

                <Button
                  onClick={handleSaveShopInfo}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
                >
                  <Icon name="Save" className="h-4 w-4 mr-2" />
                  Сохранить изменения
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Truck" className="h-5 w-5 text-purple-600" />
                  Настройки доставки
                </CardTitle>
                <CardDescription>
                  Параметры доставки товаров
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="free-delivery">Бесплатная доставка от (₽)</Label>
                    <Input
                      id="free-delivery"
                      type="number"
                      value={deliverySettings.freeDeliveryFrom}
                      onChange={(e) => setDeliverySettings({ ...deliverySettings, freeDeliveryFrom: e.target.value })}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="delivery-cost">Стоимость доставки (₽)</Label>
                    <Input
                      id="delivery-cost"
                      type="number"
                      value={deliverySettings.deliveryCost}
                      onChange={(e) => setDeliverySettings({ ...deliverySettings, deliveryCost: e.target.value })}
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delivery-time">Срок доставки</Label>
                  <Input
                    id="delivery-time"
                    value={deliverySettings.deliveryTime}
                    onChange={(e) => setDeliverySettings({ ...deliverySettings, deliveryTime: e.target.value })}
                    className="h-11"
                    placeholder="1-3 дня"
                  />
                </div>

                <Button
                  onClick={handleSaveDelivery}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
                >
                  <Icon name="Save" className="h-4 w-4 mr-2" />
                  Сохранить изменения
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Bell" className="h-5 w-5 text-purple-600" />
                  Уведомления
                </CardTitle>
                <CardDescription>
                  Настройте получение уведомлений
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-orders" className="text-base">Новые заказы</Label>
                    <p className="text-sm text-muted-foreground">
                      Уведомления о новых заказах
                    </p>
                  </div>
                  <Switch
                    id="notif-orders"
                    checked={notifications.newOrders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, newOrders: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-stock" className="text-base">Остатки на складе</Label>
                    <p className="text-sm text-muted-foreground">
                      Предупреждения о низких остатках
                    </p>
                  </div>
                  <Switch
                    id="notif-stock"
                    checked={notifications.lowStock}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, lowStock: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-reviews" className="text-base">Отзывы</Label>
                    <p className="text-sm text-muted-foreground">
                      Новые отзывы о товарах
                    </p>
                  </div>
                  <Switch
                    id="notif-reviews"
                    checked={notifications.reviews}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, reviews: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-promo" className="text-base">Акции</Label>
                    <p className="text-sm text-muted-foreground">
                      Информация об акциях
                    </p>
                  </div>
                  <Switch
                    id="notif-promo"
                    checked={notifications.promotions}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
                  />
                </div>

                <Button
                  onClick={handleSaveNotifications}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold mt-4"
                >
                  <Icon name="Save" className="h-4 w-4 mr-2" />
                  Сохранить
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Shield" className="h-5 w-5 text-purple-600" />
                  Безопасность
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Key" className="h-4 w-4 mr-2" />
                  Сменить пароль
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Smartphone" className="h-4 w-4 mr-2" />
                  Двухфакторная аутентификация
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="FileText" className="h-4 w-4 mr-2" />
                  История активности
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
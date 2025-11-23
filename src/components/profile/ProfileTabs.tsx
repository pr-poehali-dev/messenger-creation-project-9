import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Icon from '@/components/ui/icon'
import { toast } from 'sonner'

interface Order {
  id: number
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: number
}

interface Address {
  id: number
  title: string
  address: string
  isDefault: boolean
}

interface Notification {
  id: number
  type: 'order' | 'promo' | 'system'
  title: string
  message: string
  date: string
  isRead: boolean
  icon: string
}

interface ProfileTabsProps {
  orders: Order[]
  addresses: Address[]
  setAddresses: (addresses: Address[]) => void
  notifications: Notification[]
  setNotifications: (notifications: Notification[]) => void
}

const statusLabels = {
  pending: { text: 'Ожидает', color: 'bg-yellow-100 text-yellow-800' },
  processing: { text: 'В обработке', color: 'bg-blue-100 text-blue-800' },
  shipped: { text: 'Отправлен', color: 'bg-purple-100 text-purple-800' },
  delivered: { text: 'Доставлен', color: 'bg-green-100 text-green-800' },
  cancelled: { text: 'Отменён', color: 'bg-red-100 text-red-800' },
}

export default function ProfileTabs({ 
  orders, 
  addresses, 
  setAddresses, 
  notifications, 
  setNotifications 
}: ProfileTabsProps) {
  const [newAddressTitle, setNewAddressTitle] = useState('')
  const [newAddressText, setNewAddressText] = useState('')
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false)

  const handleAddAddress = () => {
    if (!newAddressTitle || !newAddressText) {
      toast.error('Заполните все поля')
      return
    }

    const newAddress: Address = {
      id: Date.now(),
      title: newAddressTitle,
      address: newAddressText,
      isDefault: addresses.length === 0,
    }

    setAddresses([...addresses, newAddress])
    setNewAddressTitle('')
    setNewAddressText('')
    setIsAddAddressOpen(false)
    toast.success('Адрес добавлен', {
      icon: '✅',
    })
  }

  const handleSetDefaultAddress = (id: number) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })))
    toast.success('Адрес установлен как основной', {
      icon: '✅',
    })
  }

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id))
    toast.success('Адрес удалён', {
      icon: '🗑️',
    })
  }

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })))
    toast.success('Все уведомления прочитаны', {
      icon: '✅',
    })
  }

  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
    toast.success('Уведомление удалено', {
      icon: '🗑️',
    })
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order': return 'bg-blue-50 border-blue-200'
      case 'promo': return 'bg-pink-50 border-pink-200'
      case 'system': return 'bg-purple-50 border-purple-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <Tabs defaultValue="orders" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-6 h-12 bg-white/90">
        <TabsTrigger value="orders" className="text-base font-semibold">
          <Icon name="Package" className="h-4 w-4 mr-2" />
          Заказы
        </TabsTrigger>
        <TabsTrigger value="addresses" className="text-base font-semibold">
          <Icon name="MapPin" className="h-4 w-4 mr-2" />
          Адреса
        </TabsTrigger>
        <TabsTrigger value="favorites" className="text-base font-semibold">
          <Icon name="Heart" className="h-4 w-4 mr-2" />
          Избранное
        </TabsTrigger>
        <TabsTrigger value="notifications" className="text-base font-semibold relative">
          <Icon name="Bell" className="h-4 w-4 mr-2" />
          Уведомления
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
              {unreadCount}
            </span>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="orders">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Мои заказы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="p-4 border-2 border-purple-100 rounded-xl hover:border-purple-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-lg">Заказ #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusLabels[order.status].color}`}>
                      {statusLabels[order.status].text}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">
                      Товаров: {order.items} • {order.total.toLocaleString()} ₽
                    </p>
                    <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                      Подробнее
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="addresses">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Адреса доставки</CardTitle>
              <Dialog open={isAddAddressOpen} onOpenChange={setIsAddAddressOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Icon name="Plus" className="h-4 w-4 mr-2" />
                    Добавить адрес
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Новый адрес доставки</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address-title">Название</Label>
                      <Input
                        id="address-title"
                        placeholder="Дом, Работа, Дача..."
                        value={newAddressTitle}
                        onChange={(e) => setNewAddressTitle(e.target.value)}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address-text">Адрес</Label>
                      <Input
                        id="address-text"
                        placeholder="г. Москва, ул. Ленина, д. 10, кв. 5"
                        value={newAddressText}
                        onChange={(e) => setNewAddressText(e.target.value)}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>
                    <Button 
                      onClick={handleAddAddress}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Добавить
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {addresses.map((address) => (
                <div key={address.id} className="p-4 border-2 border-purple-100 rounded-xl hover:border-purple-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-lg">{address.title}</p>
                        {address.isDefault && (
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                            Основной
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600">{address.address}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Icon name="Trash2" className="h-4 w-4" />
                    </Button>
                  </div>
                  {!address.isDefault && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSetDefaultAddress(address.id)}
                      className="border-purple-200 hover:bg-purple-50"
                    >
                      Сделать основным
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="favorites">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Избранное</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Icon name="Heart" className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Список избранного пуст</p>
              <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Link to="/">
                  <Icon name="ShoppingBag" className="h-4 w-4 mr-2" />
                  Перейти к покупкам
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                Уведомления
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                    {unreadCount} новых
                  </span>
                )}
              </CardTitle>
              {unreadCount > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  className="border-purple-200 hover:bg-purple-50"
                >
                  <Icon name="CheckCheck" className="h-4 w-4 mr-2" />
                  Прочитать все
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Bell" className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Нет уведомлений</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      notif.isRead ? 'bg-gray-50 border-gray-200 opacity-70' : getNotificationColor(notif.type)
                    }`}
                    onClick={() => !notif.isRead && handleMarkAsRead(notif.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        notif.type === 'order' ? 'bg-blue-100' :
                        notif.type === 'promo' ? 'bg-pink-100' : 'bg-purple-100'
                      }`}>
                        <Icon 
                          name={notif.icon as any} 
                          className={`h-5 w-5 ${
                            notif.type === 'order' ? 'text-blue-600' :
                            notif.type === 'promo' ? 'text-pink-600' : 'text-purple-600'
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{notif.title}</h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-400 hover:text-red-600 flex-shrink-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteNotification(notif.id)
                            }}
                          >
                            <Icon name="X" className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{notif.date}</span>
                          {!notif.isRead && (
                            <span className="text-xs font-medium text-purple-600">Новое</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

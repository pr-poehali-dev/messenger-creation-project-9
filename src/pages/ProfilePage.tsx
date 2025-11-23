import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Icon from '@/components/ui/icon'
import { useCustomerAuth } from '@/contexts/CustomerAuthContext'
import { toast } from 'sonner'
import ProfileInfoCard from '@/components/profile/ProfileInfoCard'
import ProfileStatsCards from '@/components/profile/ProfileStatsCards'
import ProfileTabs from '@/components/profile/ProfileTabs'

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

export default function ProfilePage() {
  const navigate = useNavigate()
  const { customer, logout, updateProfile, isAuthenticated } = useCustomerAuth()
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'order',
      title: 'Заказ отправлен',
      message: 'Ваш заказ #2 отправлен и будет доставлен 25 ноября',
      date: '2 часа назад',
      isRead: false,
      icon: 'Package'
    },
    {
      id: 2,
      type: 'promo',
      title: 'Скидка 20% на всё!',
      message: 'Специальное предложение только для вас! Скидка действует до конца недели',
      date: '5 часов назад',
      isRead: false,
      icon: 'Tag'
    },
    {
      id: 3,
      type: 'order',
      title: 'Заказ в обработке',
      message: 'Ваш заказ #3 принят и находится в обработке',
      date: '1 день назад',
      isRead: true,
      icon: 'Clock'
    },
    {
      id: 4,
      type: 'promo',
      title: 'Новая коллекция',
      message: 'Поступление новой коллекции товаров. Успейте купить первыми!',
      date: '2 дня назад',
      isRead: true,
      icon: 'Sparkles'
    },
    {
      id: 5,
      type: 'order',
      title: 'Заказ доставлен',
      message: 'Ваш заказ #1 успешно доставлен. Спасибо за покупку!',
      date: '3 дня назад',
      isRead: true,
      icon: 'CheckCircle'
    },
  ])
  
  const [orders] = useState<Order[]>([
    { id: 1, date: '15.11.2024', status: 'delivered', total: 15990, items: 3 },
    { id: 2, date: '18.11.2024', status: 'shipped', total: 8490, items: 2 },
    { id: 3, date: '20.11.2024', status: 'processing', total: 23450, items: 5 },
  ])

  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, title: 'Дом', address: 'г. Москва, ул. Ленина, д. 10, кв. 5', isDefault: true },
    { id: 2, title: 'Работа', address: 'г. Москва, ул. Пушкина, д. 20, офис 305', isDefault: false },
  ])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    setTimeout(() => {
      setLoading(false)
      setTimeout(() => setShowContent(true), 50)
    }, 600)
  }, [isAuthenticated, navigate])

  const handleLogout = () => {
    logout()
    toast.success('Вы вышли из аккаунта', {
      icon: '👋',
    })
    navigate('/')
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="h-10 w-24 bg-gray-200 rounded-full mb-6 skeleton-box skeleton-box-fast"></div>
            <div className="h-10 w-64 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg mb-6 skeleton-box skeleton-box-slow"></div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />

      <main className={`container mx-auto px-4 py-8 transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 hover:bg-white/50">
            <Icon name="ArrowLeft" className="h-4 w-4 mr-2" />
            Назад
          </Button>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Личный кабинет
            </h1>
            <div className="flex items-center gap-2">
              <Dialog open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="relative hover:bg-purple-50">
                    <Icon name="Bell" className="h-5 w-5 text-purple-600" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="flex items-center justify-between">
                      <DialogTitle className="flex items-center gap-2">
                        <Icon name="Bell" className="h-5 w-5 text-purple-600" />
                        Уведомления
                        {unreadCount > 0 && (
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                            {unreadCount} новых
                          </span>
                        )}
                      </DialogTitle>
                      {unreadCount > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={handleMarkAllAsRead}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          Прочитать все
                        </Button>
                      )}
                    </div>
                  </DialogHeader>
                  <div className="space-y-3 mt-4">
                    {notifications.length === 0 ? (
                      <div className="text-center py-12">
                        <Icon name="Bell" className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600">Нет уведомлений</p>
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-4 rounded-xl border-2 transition-all ${
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
                </DialogContent>
              </Dialog>

              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="text-red-600 hover:bg-red-50"
              >
                <Icon name="LogOut" className="h-4 w-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <ProfileInfoCard 
              customer={{ name: customer?.name || '', email: customer?.email || '', phone: customer?.phone }}
              updateProfile={updateProfile}
            />
            <ProfileStatsCards 
              orders={orders}
              addressesCount={addresses.length}
            />
          </div>

          <ProfileTabs 
            orders={orders}
            addresses={addresses}
            setAddresses={setAddresses}
            notifications={notifications}
            setNotifications={setNotifications}
          />
        </div>
      </main>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Icon from '@/components/ui/icon'
import { useCustomerAuth } from '@/contexts/CustomerAuthContext'
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

const statusLabels = {
  pending: { text: 'Ожидает', color: 'bg-yellow-100 text-yellow-800' },
  processing: { text: 'В обработке', color: 'bg-blue-100 text-blue-800' },
  shipped: { text: 'Отправлен', color: 'bg-purple-100 text-purple-800' },
  delivered: { text: 'Доставлен', color: 'bg-green-100 text-green-800' },
  cancelled: { text: 'Отменён', color: 'bg-red-100 text-red-800' },
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const { customer, logout, updateProfile, isAuthenticated } = useCustomerAuth()
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState(customer?.name || '')
  const [phone, setPhone] = useState(customer?.phone || '')
  const [newAddressTitle, setNewAddressTitle] = useState('')
  const [newAddressText, setNewAddressText] = useState('')
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false)
  
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

    setName(customer?.name || '')
    setPhone(customer?.phone || '')

    setTimeout(() => {
      setLoading(false)
      setTimeout(() => setShowContent(true), 50)
    }, 600)
  }, [isAuthenticated, navigate, customer])

  const handleLogout = () => {
    logout()
    toast.success('Вы вышли из аккаунта', {
      icon: '👋',
    })
    navigate('/')
  }

  const handleSaveProfile = () => {
    updateProfile({ name, phone })
    setEditMode(false)
    toast.success('Профиль обновлён', {
      description: 'Ваши данные успешно сохранены',
      icon: '✅',
    })
  }

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
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="text-red-600 hover:bg-red-50"
            >
              <Icon name="LogOut" className="h-4 w-4 mr-2" />
              Выйти
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" className="h-5 w-5 text-purple-600" />
                  Профиль
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {editMode ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={customer?.email}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+7 (999) 123-45-67"
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        Сохранить
                      </Button>
                      <Button onClick={() => setEditMode(false)} variant="outline">
                        Отмена
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Имя</p>
                      <p className="font-medium">{customer?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{customer?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Телефон</p>
                      <p className="font-medium">{customer?.phone || 'Не указан'}</p>
                    </div>
                    <Button 
                      onClick={() => setEditMode(true)} 
                      variant="outline" 
                      className="w-full border-purple-200 hover:bg-purple-50"
                    >
                      <Icon name="Edit" className="h-4 w-4 mr-2" />
                      Редактировать профиль
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Award" className="h-5 w-5 text-purple-600" />
                  Статистика
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm text-gray-600">Всего заказов</span>
                  <span className="font-bold text-lg text-purple-600">{orders.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                  <span className="text-sm text-gray-600">Потрачено</span>
                  <span className="font-bold text-lg text-pink-600">
                    {orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()} ₽
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-gray-600">Адресов</span>
                  <span className="font-bold text-lg text-blue-600">{addresses.length}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Gift" className="h-5 w-5 text-purple-600" />
                  Бонусы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl">
                  <p className="text-sm text-gray-600 mb-2">Ваши бонусы</p>
                  <p className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    350
                  </p>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Icon name="Sparkles" className="h-4 w-4 mr-2" />
                  Потратить бонусы
                </Button>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 h-12 bg-white/90">
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
          </Tabs>
        </div>
      </main>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SellerHeader from '@/components/SellerHeader'
import { useSwipeable } from 'react-swipeable'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image_url: string
}

interface Order {
  id: number
  customer: string
  email: string
  phone: string
  address: string
  total: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  date: string
  items: OrderItem[]
}

export default function SellerOrdersPage() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      customer: 'Анна Смирнова',
      email: 'anna@example.com',
      phone: '+7 (999) 123-45-67',
      address: 'Москва, ул. Ленина, д. 10, кв. 5',
      total: 45990,
      status: 'pending',
      date: '2025-11-23',
      items: [
        {
          id: 1,
          name: 'iPhone 15 Pro Max',
          price: 129990,
          quantity: 1,
          image_url: 'https://picsum.photos/seed/iphone15/100'
        }
      ]
    },
    {
      id: 2,
      customer: 'Петр Иванов',
      email: 'petr@example.com',
      phone: '+7 (999) 234-56-78',
      address: 'Санкт-Петербург, Невский пр., д. 50, кв. 12',
      total: 32500,
      status: 'processing',
      date: '2025-11-23',
      items: [
        {
          id: 2,
          name: 'Samsung Galaxy S24',
          price: 89990,
          quantity: 1,
          image_url: 'https://picsum.photos/seed/samsung24/100'
        }
      ]
    },
    {
      id: 3,
      customer: 'Мария Петрова',
      email: 'maria@example.com',
      phone: '+7 (999) 345-67-89',
      address: 'Екатеринбург, пр. Ленина, д. 25, кв. 8',
      total: 67800,
      status: 'completed',
      date: '2025-11-22',
      items: [
        {
          id: 3,
          name: 'MacBook Pro M3',
          price: 159990,
          quantity: 1,
          image_url: 'https://picsum.photos/seed/macbookm3/100'
        }
      ]
    },
    {
      id: 4,
      customer: 'Дмитрий Козлов',
      email: 'dmitry@example.com',
      phone: '+7 (999) 456-78-90',
      address: 'Казань, ул. Баумана, д. 30, кв. 15',
      total: 21300,
      status: 'completed',
      date: '2025-11-22',
      items: [
        {
          id: 4,
          name: 'AirPods Pro 2',
          price: 24990,
          quantity: 3,
          image_url: 'https://picsum.photos/seed/airpods2/100'
        }
      ]
    },
    {
      id: 5,
      customer: 'Елена Волкова',
      email: 'elena@example.com',
      phone: '+7 (999) 567-89-01',
      address: 'Новосибирск, ул. Красный пр., д. 40, кв. 22',
      total: 54200,
      status: 'processing',
      date: '2025-11-22',
      items: [
        {
          id: 1,
          name: 'iPhone 15 Pro Max',
          price: 129990,
          quantity: 1,
          image_url: 'https://picsum.photos/seed/iphone15/100'
        }
      ]
    }
  ])

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      navigate('/seller/analytics')
    },
    onSwipedRight: () => {
      navigate('/seller/products')
    },
    preventScrollOnSwipe: true,
    trackMouse: false,
    delta: 50,
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'processing':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-300'
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Ожидает'
      case 'processing':
        return 'В обработке'
      case 'completed':
        return 'Завершён'
      case 'cancelled':
        return 'Отменён'
      default:
        return status
    }
  }

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  const handleUpdateStatus = (orderId: number, newStatus: 'pending' | 'processing' | 'completed' | 'cancelled') => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    ))
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
    toast.success('Статус заказа обновлён', {
      description: `Заказ #${orderId} → ${getStatusLabel(newStatus)}`,
      icon: '✅',
    })
  }

  const filterOrders = (status?: string) => {
    if (!status || status === 'all') return orders
    return orders.filter(o => o.status === status)
  }

  const getOrderStats = () => {
    return {
      all: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing').length,
      completed: orders.filter(o => o.status === 'completed').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
    }
  }

  const stats = getOrderStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <SellerHeader />

      <main {...swipeHandlers} className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Заказы
          </h1>
          <p className="text-gray-600">Управление заказами клиентов</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="all">Все ({stats.all})</TabsTrigger>
            <TabsTrigger value="pending">Ожидают ({stats.pending})</TabsTrigger>
            <TabsTrigger value="processing">В обработке ({stats.processing})</TabsTrigger>
            <TabsTrigger value="completed">Завершены ({stats.completed})</TabsTrigger>
            <TabsTrigger value="cancelled">Отменены ({stats.cancelled})</TabsTrigger>
          </TabsList>

          {['all', 'pending', 'processing', 'completed', 'cancelled'].map(tab => (
            <TabsContent key={tab} value={tab}>
              <div className="space-y-4">
                {filterOrders(tab === 'all' ? undefined : tab).map((order) => (
                  <Card key={order.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">
                                Заказ #{order.id}
                              </h3>
                              <p className="text-sm text-gray-600">{order.date}</p>
                            </div>
                            <Badge className={`${getStatusColor(order.status)} border`}>
                              {getStatusLabel(order.status)}
                            </Badge>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2">
                              <Icon name="User" className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-semibold text-gray-900">{order.customer}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon name="Mail" className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{order.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon name="Phone" className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{order.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon name="MapPin" className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{order.address}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-4">
                            <Icon name="Package" className="h-4 w-4 text-purple-600" />
                            <span className="text-sm text-gray-600">
                              {order.items.reduce((sum, item) => sum + item.quantity, 0)} товаров
                            </span>
                          </div>

                          <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-sm text-gray-600">Сумма заказа:</span>
                            <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              {order.total.toLocaleString()} ₽
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewOrder(order)}
                            >
                              <Icon name="Eye" className="h-4 w-4 mr-1" />
                              Подробнее
                            </Button>

                            {order.status === 'pending' && (
                              <Button
                                size="sm"
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => handleUpdateStatus(order.id, 'processing')}
                              >
                                <Icon name="Clock" className="h-4 w-4 mr-1" />
                                В обработку
                              </Button>
                            )}

                            {order.status === 'processing' && (
                              <Button
                                size="sm"
                                className="bg-green-500 hover:bg-green-600 text-white"
                                onClick={() => handleUpdateStatus(order.id, 'completed')}
                              >
                                <Icon name="Check" className="h-4 w-4 mr-1" />
                                Завершить
                              </Button>
                            )}

                            {(order.status === 'pending' || order.status === 'processing') && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:bg-red-50"
                                onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                              >
                                <Icon name="X" className="h-4 w-4 mr-1" />
                                Отменить
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="md:w-64 space-y-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex gap-2 p-2 bg-purple-50 rounded-lg">
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold line-clamp-2">{item.name}</p>
                                <p className="text-xs text-gray-600">x{item.quantity}</p>
                                <p className="text-sm font-bold text-purple-600">
                                  {item.price.toLocaleString()} ₽
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filterOrders(tab === 'all' ? undefined : tab).length === 0 && (
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
                    <CardContent className="p-12 text-center">
                      <Icon name="Package" className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-600 text-lg">Заказов не найдено</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Заказ #{selectedOrder?.id}
              </DialogTitle>
              <DialogDescription>
                Подробная информация о заказе
              </DialogDescription>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Текущий статус</p>
                    <Badge className={`${getStatusColor(selectedOrder.status)} border text-base`}>
                      {getStatusLabel(selectedOrder.status)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Изменить статус</p>
                    <Select
                      value={selectedOrder.status}
                      onValueChange={(value: any) => handleUpdateStatus(selectedOrder.id, value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Ожидает</SelectItem>
                        <SelectItem value="processing">В обработке</SelectItem>
                        <SelectItem value="completed">Завершён</SelectItem>
                        <SelectItem value="cancelled">Отменён</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-lg">Информация о клиенте</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="User" className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-semibold">{selectedOrder.customer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Mail" className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{selectedOrder.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Phone" className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{selectedOrder.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="MapPin" className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{selectedOrder.address}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-lg">Товары в заказе</h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 bg-purple-50 rounded-xl">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-bold">{item.name}</p>
                          <p className="text-sm text-gray-600">Количество: {item.quantity}</p>
                          <p className="font-bold text-purple-600 mt-1">
                            {item.price.toLocaleString()} ₽
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Итого</p>
                          <p className="font-black text-lg text-purple-600">
                            {(item.price * item.quantity).toLocaleString()} ₽
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Итого к оплате</span>
                    <span className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {selectedOrder.total.toLocaleString()} ₽
                    </span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
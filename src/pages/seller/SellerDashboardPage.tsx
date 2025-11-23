import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SellerHeader from '@/components/SellerHeader'
import SwipeHint from '@/components/SwipeHint'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Icon from '@/components/ui/icon'
import { Badge } from '@/components/ui/badge'
import { useSwipeable } from 'react-swipeable'

interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  pendingOrders: number
  revenueGrowth: number
  ordersGrowth: number
}

interface RecentOrder {
  id: number
  customer: string
  total: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  date: string
}

interface TopProduct {
  id: number
  name: string
  sales: number
  revenue: number
}

export default function SellerDashboardPage() {
  const navigate = useNavigate()
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 1250000,
    totalOrders: 342,
    totalProducts: 48,
    pendingOrders: 12,
    revenueGrowth: 23.5,
    ordersGrowth: 18.2
  })

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      navigate('/seller/products')
    },
    onSwipedRight: () => {
      navigate('/seller/settings')
    },
    preventScrollOnSwipe: true,
    trackMouse: false,
    delta: 50,
  })

  const [recentOrders] = useState<RecentOrder[]>([
    { id: 1, customer: 'Анна Смирнова', total: 45990, status: 'pending', date: '2025-11-23' },
    { id: 2, customer: 'Петр Иванов', total: 32500, status: 'processing', date: '2025-11-23' },
    { id: 3, customer: 'Мария Петрова', total: 67800, status: 'completed', date: '2025-11-22' },
    { id: 4, customer: 'Дмитрий Козлов', total: 21300, status: 'completed', date: '2025-11-22' },
    { id: 5, customer: 'Елена Волкова', total: 54200, status: 'processing', date: '2025-11-22' }
  ])

  const [topProducts] = useState<TopProduct[]>([
    { id: 1, name: 'iPhone 15 Pro Max', sales: 48, revenue: 624000 },
    { id: 2, name: 'Samsung Galaxy S24', sales: 36, revenue: 432000 },
    { id: 3, name: 'MacBook Pro M3', sales: 24, revenue: 384000 },
    { id: 4, name: 'AirPods Pro 2', sales: 72, revenue: 216000 }
  ])

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <SellerHeader />
      <SwipeHint 
        storageKey="seller-swipe-hint-seen"
        leftText="Товары"
        rightText="Настройки"
      />

      <main {...swipeHandlers} className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Дашборд
          </h1>
          <p className="text-gray-600">Аналитика и статистика вашего магазина</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Общая выручка</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
                <Icon name="DollarSign" className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {stats.totalRevenue.toLocaleString()} ₽
              </div>
              <p className="text-xs text-green-600 font-semibold mt-1">
                <Icon name="TrendingUp" className="h-3 w-3 inline mr-1" />
                +{stats.revenueGrowth}% за месяц
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Всего заказов</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
                <Icon name="ShoppingBag" className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {stats.totalOrders}
              </div>
              <p className="text-xs text-green-600 font-semibold mt-1">
                <Icon name="TrendingUp" className="h-3 w-3 inline mr-1" />
                +{stats.ordersGrowth}% за месяц
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Товаров в каталоге</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                <Icon name="Package" className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {stats.totalProducts}
              </div>
              <p className="text-xs text-gray-500 font-medium mt-1">Активных товаров</p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Ожидают обработки</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-md">
                <Icon name="Clock" className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {stats.pendingOrders}
              </div>
              <p className="text-xs text-orange-600 font-semibold mt-1">Требуют внимания</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="ShoppingBag" className="h-5 w-5 text-purple-600" />
                Последние заказы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:shadow-md transition-all"
                  >
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{order.customer}</p>
                      <p className="text-sm text-gray-600">Заказ #{order.id}</p>
                      <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="font-black text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {order.total.toLocaleString()} ₽
                      </p>
                      <Badge className={`${getStatusColor(order.status)} border`}>
                        {getStatusLabel(order.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="TrendingUp" className="h-5 w-5 text-purple-600" />
                Топ товаров
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-black shadow-md">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} продаж</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {product.revenue.toLocaleString()} ₽
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
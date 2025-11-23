import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SellerHeader from '@/components/SellerHeader'
import { useSwipeable } from 'react-swipeable'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Icon from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const dailySalesData = [
  { date: '18.11', revenue: 45000, orders: 12 },
  { date: '19.11', revenue: 52000, orders: 15 },
  { date: '20.11', revenue: 38000, orders: 10 },
  { date: '21.11', revenue: 67000, orders: 18 },
  { date: '22.11', revenue: 72000, orders: 21 },
  { date: '23.11', revenue: 85000, orders: 24 },
  { date: '24.11', revenue: 91000, orders: 26 },
]

const weeklySalesData = [
  { week: 'Нед 1', revenue: 280000, orders: 76 },
  { week: 'Нед 2', revenue: 320000, orders: 89 },
  { week: 'Нед 3', revenue: 295000, orders: 82 },
  { week: 'Нед 4', revenue: 380000, orders: 95 },
]

const monthlySalesData = [
  { month: 'Июл', revenue: 980000, orders: 342 },
  { month: 'Авг', revenue: 1120000, orders: 398 },
  { month: 'Сен', revenue: 1050000, orders: 367 },
  { month: 'Окт', revenue: 1280000, orders: 421 },
  { month: 'Ноя', revenue: 1450000, orders: 489 },
]

const categoryData = [
  { name: 'Электроника', value: 520000, orders: 156 },
  { name: 'Одежда', value: 280000, orders: 89 },
  { name: 'Дом и сад', value: 195000, orders: 67 },
  { name: 'Спорт', value: 165000, orders: 54 },
  { name: 'Красота', value: 145000, orders: 48 },
  { name: 'Книги', value: 95000, orders: 32 },
]

const COLORS = ['#9333ea', '#ec4899', '#8b5cf6', '#d946ef', '#a855f7', '#c026d3']

const topProducts = [
  { name: 'iPhone 15 Pro Max', sales: 48, revenue: 624000 },
  { name: 'Samsung Galaxy S24', sales: 36, revenue: 432000 },
  { name: 'MacBook Pro M3', sales: 24, revenue: 384000 },
  { name: 'AirPods Pro 2', sales: 72, revenue: 216000 },
  { name: 'iPad Air', sales: 31, revenue: 186000 },
]

export default function SellerAnalyticsPage() {
  const navigate = useNavigate()
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily')

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      navigate('/seller/settings')
    },
    onSwipedRight: () => {
      navigate('/seller/orders')
    },
    preventScrollOnSwipe: true,
    trackMouse: false,
    delta: 50,
  })

  const getSalesData = () => {
    switch (period) {
      case 'weekly':
        return weeklySalesData
      case 'monthly':
        return monthlySalesData
      default:
        return dailySalesData
    }
  }

  const getXAxisKey = () => {
    switch (period) {
      case 'weekly':
        return 'week'
      case 'monthly':
        return 'month'
      default:
        return 'date'
    }
  }

  const totalRevenue = categoryData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <SellerHeader />

      <main {...swipeHandlers} className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Аналитика продаж
            </h1>
            <p className="text-gray-600">Детальная статистика по периодам</p>
          </div>

          <Select value={period} onValueChange={(value: any) => setPeriod(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">По дням</SelectItem>
              <SelectItem value="weekly">По неделям</SelectItem>
              <SelectItem value="monthly">По месяцам</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Средняя выручка</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
                <Icon name="TrendingUp" className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {Math.round(getSalesData().reduce((sum, item) => sum + item.revenue, 0) / getSalesData().length).toLocaleString()} ₽
              </div>
              <p className="text-xs text-gray-500 font-medium mt-1">За {period === 'daily' ? 'день' : period === 'weekly' ? 'неделю' : 'месяц'}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Средний чек</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
                <Icon name="DollarSign" className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {Math.round(
                  getSalesData().reduce((sum, item) => sum + item.revenue, 0) /
                  getSalesData().reduce((sum, item) => sum + item.orders, 0)
                ).toLocaleString()} ₽
              </div>
              <p className="text-xs text-gray-500 font-medium mt-1">На один заказ</p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Всего заказов</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                <Icon name="ShoppingBag" className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {getSalesData().reduce((sum, item) => sum + item.orders, 0)}
              </div>
              <p className="text-xs text-gray-500 font-medium mt-1">За выбранный период</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="TrendingUp" className="h-5 w-5 text-purple-600" />
                График выручки
              </CardTitle>
              <CardDescription>
                Динамика выручки за период
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getSalesData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey={getXAxisKey()} stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="Выручка (₽)"
                    stroke="#9333ea"
                    strokeWidth={3}
                    dot={{ fill: '#9333ea', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="BarChart" className="h-5 w-5 text-purple-600" />
                График заказов
              </CardTitle>
              <CardDescription>
                Количество заказов за период
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getSalesData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey={getXAxisKey()} stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="orders"
                    name="Заказов"
                    fill="#ec4899"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="PieChart" className="h-5 w-5 text-purple-600" />
                Продажи по категориям
              </CardTitle>
              <CardDescription>
                Распределение выручки по категориям
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => `${value.toLocaleString()} ₽`}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Award" className="h-5 w-5 text-purple-600" />
                Топ-5 товаров
              </CardTitle>
              <CardDescription>
                Самые продаваемые товары
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:shadow-md transition-all"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black shadow-md"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    >
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

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="List" className="h-5 w-5 text-purple-600" />
              Категории товаров
            </CardTitle>
            <CardDescription>
              Детальная статистика по категориям
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryData.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    >
                      <Icon name="Package" className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{category.name}</p>
                      <p className="text-sm text-gray-600">{category.orders} заказов</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {category.value.toLocaleString()} ₽
                    </p>
                    <p className="text-xs text-gray-600">
                      {((category.value / totalRevenue) * 100).toFixed(1)}% от общей выручки
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
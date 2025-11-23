import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'

interface Order {
  id: number
  total: number
}

interface ProfileStatsCardsProps {
  orders: Order[]
  addressesCount: number
}

export default function ProfileStatsCards({ orders, addressesCount }: ProfileStatsCardsProps) {
  return (
    <>
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
            <span className="font-bold text-lg text-blue-600">{addressesCount}</span>
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
    </>
  )
}

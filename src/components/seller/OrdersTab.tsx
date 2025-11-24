interface Order {
  id: number
  product_id: number
  product_name: string
  product_image: string
  quantity: number
  total_price: number
  status: string
  customer_email: string
  customer_phone: string
  created_at: string
}

interface OrdersTabProps {
  orders: Order[]
  onUpdateOrderStatus: (orderId: number, newStatus: string) => void
}

export default function OrdersTab({ orders, onUpdateOrderStatus }: OrdersTabProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'processing':
        return 'bg-blue-100 text-blue-700'
      case 'shipped':
        return 'bg-purple-100 text-purple-700'
      case 'delivered':
        return 'bg-green-100 text-green-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Ожидает'
      case 'processing':
        return 'В обработке'
      case 'shipped':
        return 'Отправлен'
      case 'delivered':
        return 'Доставлен'
      case 'cancelled':
        return 'Отменен'
      default:
        return status
    }
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
      <h2 className="text-2xl font-black text-slate-800 mb-6">Заказы</h2>
      
      {orders.length === 0 ? (
        <p className="text-center text-slate-400 py-12">Нет заказов</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex gap-4">
                <img 
                  src={order.product_image || 'https://via.placeholder.com/100'} 
                  alt={order.product_name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-slate-800">{order.product_name}</h3>
                      <p className="text-sm text-slate-500">Заказ #{order.id}</p>
                    </div>
                    <p className="text-xl font-black text-violet-600">{order.total_price} ₽</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-500">Покупатель</p>
                      <p className="text-sm font-semibold text-slate-800">{order.customer_email}</p>
                      <p className="text-sm text-slate-600">{order.customer_phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Количество</p>
                      <p className="text-sm font-semibold text-slate-800">{order.quantity} шт.</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(order.created_at).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 focus:outline-none focus:border-violet-500"
                    >
                      <option value="pending">Ожидает</option>
                      <option value="processing">В обработке</option>
                      <option value="shipped">Отправлен</option>
                      <option value="delivered">Доставлен</option>
                      <option value="cancelled">Отменен</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

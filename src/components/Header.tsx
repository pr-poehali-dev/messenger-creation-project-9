import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'
import { useCart } from '@/contexts/CartContext'
import { useCustomerAuth } from '@/contexts/CustomerAuthContext'

export default function Header() {
  const { totalItems } = useCart()
  const { isAuthenticated } = useCustomerAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-200/50 bg-white/80 backdrop-blur-xl shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
              <Icon name="Store" className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Маркетплейс</span>
          </Link>

          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400" />
              <Input
                placeholder="Поиск товаров..."
                className="pl-12 h-11 rounded-full border-2 border-purple-200 bg-white/50 backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Button variant="ghost" size="icon" className="hover:bg-purple-100 transition-colors rounded-full" asChild>
                <Link to="/profile">
                  <Icon name="User" className="h-5 w-5 text-purple-600" />
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" className="hover:bg-purple-100 transition-colors rounded-full" asChild>
                <Link to="/login">
                  <Icon name="LogIn" className="h-4 w-4 mr-2" />
                  Войти
                </Link>
              </Button>
            )}
            
            <Button variant="ghost" size="icon" className="relative hover:bg-purple-100 transition-colors rounded-full" asChild>
              <Link to="/cart">
                <Icon name="ShoppingCart" className="h-5 w-5 text-purple-600" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-pink-500 to-purple-500 border-0 shadow-lg">
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
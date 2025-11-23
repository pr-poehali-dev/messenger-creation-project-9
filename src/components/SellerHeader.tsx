import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { useSellerAuth } from '@/contexts/SellerAuthContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function SellerHeader() {
  const { seller, logout } = useSellerAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/seller/login')
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-200 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/seller/dashboard" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Icon name="Store" className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Peeky Seller
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              asChild
              className="rounded-xl hover:bg-purple-100 transition-all"
            >
              <Link to="/seller/dashboard">
                <Icon name="LayoutDashboard" className="h-4 w-4 mr-2" />
                Дашборд
              </Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="rounded-xl hover:bg-purple-100 transition-all"
            >
              <Link to="/seller/products">
                <Icon name="Package" className="h-4 w-4 mr-2" />
                Товары
              </Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="rounded-xl hover:bg-purple-100 transition-all"
            >
              <Link to="/seller/orders">
                <Icon name="ShoppingBag" className="h-4 w-4 mr-2" />
                Заказы
              </Link>
            </Button>
          </nav>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105">
                <Icon name="User" className="h-4 w-4 mr-2" />
                {seller?.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{seller?.name}</p>
                  <p className="text-xs text-muted-foreground">{seller?.email}</p>
                  <p className="text-xs font-semibold text-purple-600">{seller?.shop_name}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/seller/settings" className="cursor-pointer">
                  <Icon name="Settings" className="h-4 w-4 mr-2" />
                  Настройки
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/" className="cursor-pointer">
                  <Icon name="ExternalLink" className="h-4 w-4 mr-2" />
                  Перейти в магазин
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                <Icon name="LogOut" className="h-4 w-4 mr-2" />
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

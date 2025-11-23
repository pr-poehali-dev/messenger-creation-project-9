import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { useSellerAuth } from '@/contexts/SellerAuthContext'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export default function SellerHeader() {
  const { seller, logout } = useSellerAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
            <span className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hidden sm:inline">
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
            <Button
              variant="ghost"
              asChild
              className="rounded-xl hover:bg-purple-100 transition-all"
            >
              <Link to="/seller/analytics">
                <Icon name="BarChart" className="h-4 w-4 mr-2" />
                Аналитика
              </Link>
            </Button>
          </nav>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="hidden md:flex bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105">
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

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-purple-100 transition-colors rounded-full">
                  <Icon name="Menu" className="h-6 w-6 text-purple-600" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                      <Icon name="Store" className="h-4 w-4 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Меню продавца</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-8 flex flex-col gap-2">
                  <div className="mb-4 p-4 bg-purple-50 rounded-xl">
                    <p className="text-sm font-medium text-gray-900">{seller?.name}</p>
                    <p className="text-xs text-gray-600">{seller?.email}</p>
                    <p className="text-xs font-semibold text-purple-600 mt-1">{seller?.shop_name}</p>
                  </div>

                  <Button 
                    variant="ghost" 
                    className="justify-start hover:bg-purple-100 transition-colors rounded-xl h-12" 
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/seller/dashboard">
                      <Icon name="LayoutDashboard" className="h-5 w-5 mr-3 text-purple-600" />
                      Дашборд
                    </Link>
                  </Button>

                  <Button 
                    variant="ghost" 
                    className="justify-start hover:bg-purple-100 transition-colors rounded-xl h-12" 
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/seller/products">
                      <Icon name="Package" className="h-5 w-5 mr-3 text-purple-600" />
                      Товары
                    </Link>
                  </Button>

                  <Button 
                    variant="ghost" 
                    className="justify-start hover:bg-purple-100 transition-colors rounded-xl h-12" 
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/seller/orders">
                      <Icon name="ShoppingBag" className="h-5 w-5 mr-3 text-purple-600" />
                      Заказы
                    </Link>
                  </Button>

                  <Button 
                    variant="ghost" 
                    className="justify-start hover:bg-purple-100 transition-colors rounded-xl h-12" 
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/seller/analytics">
                      <Icon name="BarChart" className="h-5 w-5 mr-3 text-purple-600" />
                      Аналитика
                    </Link>
                  </Button>

                  <div className="border-t border-gray-200 my-2"></div>

                  <Button 
                    variant="ghost" 
                    className="justify-start hover:bg-purple-100 transition-colors rounded-xl h-12" 
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/seller/settings">
                      <Icon name="Settings" className="h-5 w-5 mr-3 text-purple-600" />
                      Настройки
                    </Link>
                  </Button>

                  <Button 
                    variant="ghost" 
                    className="justify-start hover:bg-purple-100 transition-colors rounded-xl h-12" 
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/">
                      <Icon name="ExternalLink" className="h-5 w-5 mr-3 text-purple-600" />
                      Перейти в магазин
                    </Link>
                  </Button>

                  <Button 
                    variant="ghost" 
                    className="justify-start hover:bg-red-100 transition-colors rounded-xl h-12 text-red-600" 
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handleLogout()
                    }}
                  >
                    <Icon name="LogOut" className="h-5 w-5 mr-3" />
                    Выйти
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'
import { useCart } from '@/contexts/CartContext'
import { useCustomerAuth } from '@/contexts/CustomerAuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export default function Header() {
  const { totalItems } = useCart()
  const { isAuthenticated } = useCustomerAuth()
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-200/50 dark:border-purple-900/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
              <Icon name="Store" className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hidden sm:inline">Маркетплейс</span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400" />
              <Input
                placeholder="Поиск товаров..."
                className="pl-12 h-11 rounded-full border-2 border-purple-200 bg-white/50 backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <Button 
                variant="ghost" 
                className="hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors rounded-full" 
                asChild
              >
                <Link to="/seller">
                  <Icon name="Store" className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                  Продавцам
                </Link>
              </Button>

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                className="hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors rounded-full"
              >
                <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </Button>

              {isAuthenticated ? (
                <Button variant="ghost" size="icon" className="hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors rounded-full" asChild>
                  <Link to="/profile">
                    <Icon name="User" className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </Link>
                </Button>
              ) : (
                <Button variant="ghost" className="hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors rounded-full" asChild>
                  <Link to="/login">
                    <Icon name="LogIn" className="h-4 w-4 mr-2" />
                    Войти
                  </Link>
                </Button>
              )}
              
              <Button variant="ghost" size="icon" className="relative hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors rounded-full" asChild>
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
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Меню</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-8 flex flex-col gap-4">
                  <div className="relative">
                    <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400" />
                    <Input
                      placeholder="Поиск товаров..."
                      className="pl-12 h-11 rounded-full border-2 border-purple-200 bg-white/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <Button 
                      variant="ghost" 
                      className="justify-start hover:bg-purple-100 transition-colors rounded-xl h-12" 
                      asChild
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link to="/">
                        <Icon name="Home" className="h-5 w-5 mr-3 text-purple-600" />
                        Главная
                      </Link>
                    </Button>

                    <Button 
                      variant="ghost" 
                      className="justify-start hover:bg-purple-100 transition-colors rounded-xl h-12" 
                      asChild
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link to="/seller">
                        <Icon name="Store" className="h-5 w-5 mr-3 text-purple-600" />
                        Продавцам
                      </Link>
                    </Button>

                    <Button 
                      variant="ghost" 
                      onClick={toggleTheme}
                      className="justify-start hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors rounded-xl h-12"
                    >
                      <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} className="h-5 w-5 mr-3 text-purple-600 dark:text-purple-400" />
                      {theme === 'dark' ? 'Светлая тема' : 'Темная тема'}
                    </Button>

                    {isAuthenticated ? (
                      <Button 
                        variant="ghost" 
                        className="justify-start hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors rounded-xl h-12" 
                        asChild
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Link to="/profile">
                          <Icon name="User" className="h-5 w-5 mr-3 text-purple-600 dark:text-purple-400" />
                          Профиль
                        </Link>
                      </Button>
                    ) : (
                      <Button 
                        variant="ghost" 
                        className="justify-start hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors rounded-xl h-12" 
                        asChild
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Link to="/login">
                          <Icon name="LogIn" className="h-5 w-5 mr-3 text-purple-600" />
                          Войти
                        </Link>
                      </Button>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      className="justify-start hover:bg-purple-100 transition-colors rounded-xl h-12 relative" 
                      asChild
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link to="/cart">
                        <Icon name="ShoppingCart" className="h-5 w-5 mr-3 text-purple-600" />
                        Корзина
                        {totalItems > 0 && (
                          <Badge className="ml-auto h-6 w-6 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-pink-500 to-purple-500 border-0">
                            {totalItems}
                          </Badge>
                        )}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div className="md:hidden">
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
      </div>
    </header>
  )
}
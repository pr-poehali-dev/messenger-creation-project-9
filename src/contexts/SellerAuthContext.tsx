import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Seller {
  id: number
  email: string
  name: string
  shop_name: string
}

interface SellerAuthContextType {
  seller: Seller | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const SellerAuthContext = createContext<SellerAuthContextType | undefined>(undefined)

export function SellerAuthProvider({ children }: { children: ReactNode }) {
  const [seller, setSeller] = useState<Seller | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedSeller = localStorage.getItem('seller')
    if (storedSeller) {
      setSeller(JSON.parse(storedSeller))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (email === 'seller@peeky.ru' && password === 'admin123') {
        const sellerData: Seller = {
          id: 1,
          email: 'seller@peeky.ru',
          name: 'Иван Продавцов',
          shop_name: 'Peeky Shop'
        }
        setSeller(sellerData)
        localStorage.setItem('seller', JSON.stringify(sellerData))
        return true
      }
      return false
    } catch {
      return false
    }
  }

  const logout = () => {
    setSeller(null)
    localStorage.removeItem('seller')
  }

  return (
    <SellerAuthContext.Provider
      value={{
        seller,
        login,
        logout,
        isAuthenticated: !!seller,
        isLoading
      }}
    >
      {children}
    </SellerAuthContext.Provider>
  )
}

export function useSellerAuth() {
  const context = useContext(SellerAuthContext)
  if (context === undefined) {
    throw new Error('useSellerAuth must be used within a SellerAuthProvider')
  }
  return context
}

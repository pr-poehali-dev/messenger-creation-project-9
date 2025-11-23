import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Customer {
  id: number
  email: string
  name: string
  phone?: string
  avatar?: string
}

interface CustomerAuthContextType {
  customer: Customer | null
  register: (name: string, email: string, password: string) => Promise<boolean>
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<Customer>) => void
  isAuthenticated: boolean
  isLoading: boolean
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined)

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedCustomer = localStorage.getItem('customer')
    if (storedCustomer) {
      setCustomer(JSON.parse(storedCustomer))
    }
    setIsLoading(false)
  }, [])

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
      
      const userExists = existingUsers.some((u: any) => u.email === email)
      if (userExists) {
        return false
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
      }

      existingUsers.push(newUser)
      localStorage.setItem('users', JSON.stringify(existingUsers))

      const customerData: Customer = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      }
      setCustomer(customerData)
      localStorage.setItem('customer', JSON.stringify(customerData))
      
      return true
    } catch {
      return false
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
      const user = existingUsers.find((u: any) => u.email === email && u.password === password)
      
      if (user) {
        const customerData: Customer = {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          avatar: user.avatar,
        }
        setCustomer(customerData)
        localStorage.setItem('customer', JSON.stringify(customerData))
        return true
      }
      return false
    } catch {
      return false
    }
  }

  const logout = () => {
    setCustomer(null)
    localStorage.removeItem('customer')
  }

  const updateProfile = (data: Partial<Customer>) => {
    if (!customer) return
    
    const updatedCustomer = { ...customer, ...data }
    setCustomer(updatedCustomer)
    localStorage.setItem('customer', JSON.stringify(updatedCustomer))

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedUsers = existingUsers.map((u: any) => 
      u.id === customer.id ? { ...u, ...data } : u
    )
    localStorage.setItem('users', JSON.stringify(updatedUsers))
  }

  return (
    <CustomerAuthContext.Provider
      value={{
        customer,
        register,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!customer,
        isLoading
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  )
}

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext)
  if (context === undefined) {
    throw new Error('useCustomerAuth must be used within a CustomerAuthProvider')
  }
  return context
}

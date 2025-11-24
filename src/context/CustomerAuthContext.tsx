import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

const CUSTOMER_API = 'https://functions.poehali.dev/8ddebd19-d89f-4be7-b465-1663cb539eb0'

interface Customer {
  id: number
  email: string
  full_name: string
  phone?: string
  avatar_url?: string
  address?: string
  city?: string
  created_at: string
}

interface CustomerAuthContextType {
  customer: Customer | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, full_name: string, phone?: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<Customer>) => Promise<void>
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined)

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('customerToken'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('customerToken')
      if (savedToken) {
        try {
          const response = await fetch(CUSTOMER_API, {
            headers: { 'X-Customer-Token': savedToken }
          })
          
          if (response.ok) {
            const customerData = await response.json()
            setCustomer(customerData)
            setToken(savedToken)
          } else {
            localStorage.removeItem('customerToken')
            localStorage.removeItem('customerData')
            setToken(null)
          }
        } catch (error) {
          console.error('Auth init failed:', error)
          localStorage.removeItem('customerToken')
          localStorage.removeItem('customerData')
          setToken(null)
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await fetch(CUSTOMER_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', email, password })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Login failed')
    }

    const { token: newToken, customer: customerData } = await response.json()
    
    localStorage.setItem('customerToken', newToken)
    localStorage.setItem('customerData', JSON.stringify(customerData))
    
    setToken(newToken)
    setCustomer(customerData)
  }

  const register = async (email: string, password: string, full_name: string, phone?: string) => {
    const response = await fetch(CUSTOMER_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'register', email, password, full_name, phone })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Registration failed')
    }

    const { token: newToken, customer: customerData } = await response.json()
    
    localStorage.setItem('customerToken', newToken)
    localStorage.setItem('customerData', JSON.stringify(customerData))
    
    setToken(newToken)
    setCustomer(customerData)
  }

  const logout = () => {
    localStorage.removeItem('customerToken')
    localStorage.removeItem('customerData')
    setToken(null)
    setCustomer(null)
  }

  const updateProfile = async (data: Partial<Customer>) => {
    if (!token) throw new Error('Not authenticated')

    const response = await fetch(CUSTOMER_API, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Customer-Token': token
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Update failed')
    }

    const updatedCustomer = await response.json()
    setCustomer(updatedCustomer)
    localStorage.setItem('customerData', JSON.stringify(updatedCustomer))
  }

  return (
    <CustomerAuthContext.Provider
      value={{
        customer,
        token,
        isAuthenticated: !!customer,
        loading,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  )
}

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext)
  if (!context) {
    throw new Error('useCustomerAuth must be used within CustomerAuthProvider')
  }
  return context
}

import { Navigate } from 'react-router-dom'
import { useSellerAuth } from '@/contexts/SellerAuthContext'
import { ReactNode } from 'react'

interface SellerProtectedRouteProps {
  children: ReactNode
}

export default function SellerProtectedRoute({ children }: SellerProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useSellerAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Загрузка...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/seller/login" replace />
  }

  return <>{children}</>
}

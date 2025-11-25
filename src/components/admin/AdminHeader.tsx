import { LogOut, Sparkles } from 'lucide-react'

interface AdminHeaderProps {
  email: string | null
  onLogout: () => void
}

export default function AdminHeader({ email, onLogout }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl blur-sm"></div>
              <div className="relative bg-gradient-to-br from-violet-600 to-fuchsia-600 p-2 rounded-2xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Peeky Admin
              </h1>
              <p className="text-sm text-slate-600">{email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-semibold transition-all active:scale-95"
          >
            <LogOut className="w-5 h-5" />
            Выйти
          </button>
        </div>
      </div>
    </header>
  )
}

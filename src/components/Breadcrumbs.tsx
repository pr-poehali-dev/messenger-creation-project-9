import { Link } from 'react-router-dom'
import Icon from '@/components/ui/icon'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6 animate-slide-in-left">
      <Link 
        to="/" 
        className="text-purple-600 hover:text-purple-800 font-medium transition-colors flex items-center gap-1"
      >
        <Icon name="Home" className="h-4 w-4" />
        Главная
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <Icon name="ChevronRight" className="h-4 w-4 text-gray-400" />
          {item.href ? (
            <Link 
              to={item.href}
              className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-700 font-semibold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

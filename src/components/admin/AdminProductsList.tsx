import { Edit2, Trash2 } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  rating: number
  reviews_count: number
  image_url: string
  category_id: number
  category_slug: string
  description: string
  stock: number
  created_at: string
}

interface AdminProductsListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
}

export default function AdminProductsList({ products, onEdit, onDelete }: AdminProductsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-slate-200">
          <div className="aspect-square bg-slate-100">
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-black text-violet-600">{product.price.toLocaleString()} ₽</span>
              <span className="text-sm text-slate-600">⭐ {product.rating}</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-slate-600">Остаток: {product.stock}</span>
              <span className="text-sm text-slate-400">•</span>
              <span className="text-sm text-slate-600">{product.reviews_count} отз.</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(product)}
                className="flex-1 flex items-center justify-center gap-2 bg-violet-50 text-violet-600 hover:bg-violet-100 py-2 px-4 rounded-xl font-semibold transition-all"
              >
                <Edit2 className="w-4 h-4" />
                Изменить
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 py-2 px-4 rounded-xl font-semibold transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

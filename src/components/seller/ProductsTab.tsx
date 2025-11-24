import { Plus, Edit2, Trash2 } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  rating: number
  reviews_count: number
  image_url: string
  category_id: number
  category_slug: string
  category_name: string
  description: string
  stock: number
  created_at: string
}

interface ProductsTabProps {
  products: Product[]
  onAddProduct: () => void
  onEditProduct: (product: Product) => void
  onDeleteProduct: (id: number) => void
}

export default function ProductsTab({ 
  products, 
  onAddProduct, 
  onEditProduct, 
  onDeleteProduct 
}: ProductsTabProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-slate-800">Мои товары</h2>
        <button
          onClick={onAddProduct}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-violet-500/50 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Добавить товар
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-slate-400 py-12">Нет товаров</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-all">
              <img 
                src={product.image_url || 'https://via.placeholder.com/300'} 
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-bold text-lg text-slate-800 mb-2">{product.name}</h3>
              <p className="text-sm text-slate-500 mb-2">{product.category_name}</p>
              <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-black text-violet-600">{product.price} ₽</p>
                <p className="text-sm text-slate-500">На складе: {product.stock}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEditProduct(product)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-semibold transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                  Редактировать
                </button>
                <button
                  onClick={() => onDeleteProduct(product.id)}
                  className="flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-semibold transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

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

interface ProductModalProps {
  isOpen: boolean
  editingProduct: Product | null
  onClose: () => void
  onSave: (data: any) => void
}

export default function ProductModal({ 
  isOpen, 
  editingProduct, 
  onClose, 
  onSave 
}: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category_id: 1,
    description: '',
    stock: 10,
    image_url: ''
  })

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: editingProduct.price,
        category_id: editingProduct.category_id,
        description: editingProduct.description,
        stock: editingProduct.stock,
        image_url: editingProduct.image_url
      })
    } else {
      setFormData({
        name: '',
        price: 0,
        category_id: 1,
        description: '',
        stock: 10,
        image_url: ''
      })
    }
  }, [editingProduct, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <h3 className="text-2xl font-black text-slate-800">
            {editingProduct ? 'Редактировать товар' : 'Добавить товар'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-all"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Название
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-violet-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Цена (₽)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-violet-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                На складе
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-violet-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Категория
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-violet-500"
            >
              <option value={1}>Электроника</option>
              <option value={2}>Одежда</option>
              <option value={3}>Продукты</option>
              <option value={4}>Книги</option>
              <option value={5}>Спорт</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              URL изображения
            </label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-violet-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Описание
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:border-violet-500 h-32 resize-none"
              placeholder="Описание товара..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all active:scale-95"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-violet-500/50 transition-all active:scale-95"
            >
              {editingProduct ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

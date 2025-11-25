import { Edit2, Trash2 } from 'lucide-react'

interface Category {
  id: number
  slug: string
  name: string
  image_url: string
  created_at: string
}

interface AdminCategoriesListProps {
  categories: Category[]
  onEdit: (category: Category) => void
  onDelete: (id: number) => void
}

export default function AdminCategoriesList({ categories, onEdit, onDelete }: AdminCategoriesListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div key={category.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-slate-200">
          <div className="aspect-video bg-slate-100">
            <img src={category.image_url} alt={category.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-xl mb-2">{category.name}</h3>
            <p className="text-sm text-slate-500 mb-4">Slug: {category.slug}</p>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(category)}
                className="flex-1 flex items-center justify-center gap-2 bg-violet-50 text-violet-600 hover:bg-violet-100 py-2 px-4 rounded-xl font-semibold transition-all"
              >
                <Edit2 className="w-4 h-4" />
                Изменить
              </button>
              <button
                onClick={() => onDelete(category.id)}
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

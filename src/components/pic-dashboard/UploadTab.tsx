import { Upload } from 'lucide-react'

export default function UploadTab() {
  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-slate-100">
      <h2 className="text-2xl font-black text-slate-800 mb-6">
        Загрузить новые изображения
      </h2>

      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-all cursor-pointer">
        <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Перетащите файлы сюда
        </h3>
        <p className="text-slate-600 mb-4">
          или нажмите для выбора файлов
        </p>
        <p className="text-sm text-slate-500">
          Поддерживаемые форматы: JPG, PNG, WEBP. Минимальное разрешение: 4K
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-800 mb-2">
            Название изображения
          </label>
          <input
            type="text"
            placeholder="Например: Закат в горах"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-800 mb-2">
            Описание
          </label>
          <textarea
            placeholder="Опишите ваше изображение для лучшего SEO"
            rows={4}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 outline-none transition resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Категория
            </label>
            <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 outline-none transition">
              <option>Природа</option>
              <option>Город</option>
              <option>Люди</option>
              <option>Абстракция</option>
              <option>Еда</option>
              <option>Животные</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Цена (₽)
            </label>
            <input
              type="number"
              placeholder="300"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-800 mb-2">
            Теги (через запятую)
          </label>
          <input
            type="text"
            placeholder="закат, горы, природа, пейзаж"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 outline-none transition"
          />
        </div>

        <button className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all active:scale-95">
          Загрузить изображение
        </button>
      </div>
    </div>
  )
}

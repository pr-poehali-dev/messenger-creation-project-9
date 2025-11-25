import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Trash2, CheckCircle, XCircle } from 'lucide-react'

export default function AdminClearData() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [adminKey, setAdminKey] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const handleClearData = async () => {
    if (!adminKey.trim()) {
      setError('Введите админ-ключ')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('https://functions.poehali.dev/6397b43d-6e05-47bc-8888-98528c2a20ab', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': adminKey
        }
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data)
        setShowConfirm(false)
      } else {
        setError(data.error || 'Ошибка при очистке данных')
      }
    } catch (err) {
      setError('Ошибка подключения к серверу')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            ← Назад в админ-панель
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Очистка данных</h1>
                <p className="text-gray-600">Удаление всех демо-данных из системы</p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Внимание! Необратимое действие
              </h3>
              <p className="text-red-800 mb-3">
                Эта операция удалит все данные из следующих таблиц:
              </p>
              <ul className="text-red-800 space-y-1 ml-4">
                <li>• Товары и категории</li>
                <li>• Заказы и корзины</li>
                <li>• Продавцы и покупатели</li>
                <li>• Сессии пользователей</li>
              </ul>
            </div>

            {!showConfirm ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Админ-ключ
                  </label>
                  <input
                    type="password"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    placeholder="Введите админ-ключ"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  />
                </div>

                <button
                  onClick={() => setShowConfirm(true)}
                  disabled={!adminKey.trim()}
                  className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Очистить все данные
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-center text-lg font-medium text-gray-900">
                  Вы уверены? Это действие нельзя отменить!
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 bg-gray-200 text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleClearData}
                    disabled={loading}
                    className="flex-1 bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 disabled:bg-red-400 transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Очистка...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-5 h-5" />
                        Да, удалить всё
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-red-900 mb-1">Ошибка</h4>
                  <p className="text-red-800">{error}</p>
                </div>
              </div>
            )}

            {result && (
              <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-green-900 mb-1">Успешно очищено!</h4>
                    <p className="text-green-800">{result.message}</p>
                  </div>
                </div>
                
                {result.deleted && (
                  <div className="bg-white rounded-lg p-4 mt-3">
                    <p className="font-medium text-gray-900 mb-2">Удалено записей:</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(result.deleted).map(([table, count]) => (
                        <div key={table} className="flex justify-between">
                          <span className="text-gray-600">{table}:</span>
                          <span className="font-bold text-gray-900">{count as number}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

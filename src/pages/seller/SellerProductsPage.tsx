import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SellerHeader from '@/components/SellerHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Icon from '@/components/ui/icon'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { useSwipeable } from 'react-swipeable'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Product {
  id: number
  name: string
  price: number
  old_price: number | null
  stock: number
  category: string
  image_url: string
  status: 'active' | 'inactive'
}

export default function SellerProductsPage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: 129990,
      old_price: 149990,
      stock: 15,
      category: 'Электроника',
      image_url: 'https://picsum.photos/seed/iphone15/300',
      status: 'active'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      price: 89990,
      old_price: null,
      stock: 22,
      category: 'Электроника',
      image_url: 'https://picsum.photos/seed/samsung24/300',
      status: 'active'
    },
    {
      id: 3,
      name: 'MacBook Pro M3',
      price: 159990,
      old_price: 179990,
      stock: 8,
      category: 'Электроника',
      image_url: 'https://picsum.photos/seed/macbookm3/300',
      status: 'active'
    },
    {
      id: 4,
      name: 'AirPods Pro 2',
      price: 24990,
      old_price: null,
      stock: 0,
      category: 'Электроника',
      image_url: 'https://picsum.photos/seed/airpods2/300',
      status: 'inactive'
    }
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    old_price: '',
    stock: '',
    category: '',
    image_url: '',
    status: 'active' as 'active' | 'inactive'
  })

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      navigate('/seller/orders')
    },
    onSwipedRight: () => {
      navigate('/seller/dashboard')
    },
    preventScrollOnSwipe: true,
    trackMouse: false,
    delta: 50,
  })

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: String(product.price),
      old_price: product.old_price ? String(product.old_price) : '',
      stock: String(product.stock),
      category: product.category,
      image_url: product.image_url,
      status: product.status
    })
    setIsDialogOpen(true)
  }

  const handleAdd = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      price: '',
      old_price: '',
      stock: '',
      category: 'Электроника',
      image_url: '',
      status: 'active'
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? {
              ...p,
              name: formData.name,
              price: Number(formData.price),
              old_price: formData.old_price ? Number(formData.old_price) : null,
              stock: Number(formData.stock),
              category: formData.category,
              image_url: formData.image_url,
              status: formData.status
            }
          : p
      ))
      toast.success('Товар обновлён!', {
        description: formData.name,
        icon: '✅',
      })
    } else {
      const newProduct: Product = {
        id: Math.max(...products.map(p => p.id)) + 1,
        name: formData.name,
        price: Number(formData.price),
        old_price: formData.old_price ? Number(formData.old_price) : null,
        stock: Number(formData.stock),
        category: formData.category,
        image_url: formData.image_url || 'https://picsum.photos/seed/new/300',
        status: formData.status
      }
      setProducts([...products, newProduct])
      toast.success('Товар добавлен!', {
        description: formData.name,
        icon: '🎉',
      })
    }

    setIsDialogOpen(false)
  }

  const handleDelete = (id: number) => {
    const product = products.find(p => p.id === id)
    setProducts(products.filter(p => p.id !== id))
    toast.error('Товар удалён', {
      description: product?.name,
      icon: '🗑️',
    })
  }

  const handleToggleStatus = (id: number) => {
    setProducts(products.map(p => 
      p.id === id 
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
        : p
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <SellerHeader />

      <main {...swipeHandlers} className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Товары
            </h1>
            <p className="text-gray-600">Управление каталогом товаров</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleAdd}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Icon name="Plus" className="h-5 w-5 mr-2" />
                Добавить товар
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {editingProduct ? 'Редактировать товар' : 'Добавить товар'}
                </DialogTitle>
                <DialogDescription>
                  Заполните информацию о товаре
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Название товара</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="iPhone 15 Pro Max"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Цена (₽)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      placeholder="129990"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="old_price">Старая цена (₽)</Label>
                    <Input
                      id="old_price"
                      type="number"
                      value={formData.old_price}
                      onChange={(e) => setFormData({ ...formData, old_price: e.target.value })}
                      placeholder="149990"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Количество на складе</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      required
                      placeholder="15"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Категория</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Электроника">Электроника</SelectItem>
                        <SelectItem value="Одежда">Одежда</SelectItem>
                        <SelectItem value="Дом и сад">Дом и сад</SelectItem>
                        <SelectItem value="Спорт">Спорт</SelectItem>
                        <SelectItem value="Красота">Красота</SelectItem>
                        <SelectItem value="Книги">Книги</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">URL изображения</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Статус</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'active' | 'inactive') => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Активен</SelectItem>
                      <SelectItem value="inactive">Неактивен</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
                  >
                    {editingProduct ? 'Сохранить изменения' : 'Добавить товар'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Отмена
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 relative">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Badge
                  className={`absolute top-3 right-3 ${
                    product.status === 'active'
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-gray-500 hover:bg-gray-600'
                  }`}
                >
                  {product.status === 'active' ? 'Активен' : 'Неактивен'}
                </Badge>
              </div>

              <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {product.price.toLocaleString()} ₽
                  </span>
                  {product.old_price && (
                    <span className="text-sm text-gray-400 line-through">
                      {product.old_price.toLocaleString()} ₽
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                  <Badge
                    className={product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                  >
                    Склад: {product.stock}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleEdit(product)}
                  >
                    <Icon name="Edit" className="h-4 w-4 mr-1" />
                    Изменить
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Icon name="Trash2" className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Product {
  id: number
  name: string
  price: number
  old_price: number | null
  stock: number
  category: string
  category_id: number
  image_url: string
  slug: string
  rating: number
  reviews_count: number
  status: 'active' | 'inactive'
}

interface ProductsContextType {
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (id: number, updates: Partial<Product>) => void
  deleteProduct: (id: number) => void
  getProductsByCategory: (categoryId: number) => Product[]
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('marketplace_products')
    if (saved) {
      return JSON.parse(saved)
    }
    
    return [
      {
        id: 1,
        name: 'Смартфон Galaxy S24',
        price: 89990,
        old_price: null,
        stock: 15,
        category: 'Электроника',
        category_id: 1,
        image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        slug: 'smartphone-galaxy-s24',
        rating: 4.8,
        reviews_count: 124,
        status: 'active'
      },
      {
        id: 2,
        name: 'Ноутбук MacBook Pro',
        price: 179990,
        old_price: 199990,
        stock: 8,
        category: 'Электроника',
        category_id: 1,
        image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        slug: 'notebook-macbook-pro',
        rating: 4.9,
        reviews_count: 89,
        status: 'active'
      },
      {
        id: 3,
        name: 'Беспроводные наушники',
        price: 24990,
        old_price: null,
        stock: 23,
        category: 'Электроника',
        category_id: 1,
        image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        slug: 'wireless-headphones',
        rating: 4.7,
        reviews_count: 203,
        status: 'active'
      },
      {
        id: 4,
        name: 'Футболка классическая',
        price: 1990,
        old_price: null,
        stock: 50,
        category: 'Одежда',
        category_id: 2,
        image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
        slug: 'tshirt-classic',
        rating: 4.5,
        reviews_count: 156,
        status: 'active'
      },
      {
        id: 5,
        name: 'Джинсы slim fit',
        price: 3990,
        old_price: 4990,
        stock: 30,
        category: 'Одежда',
        category_id: 2,
        image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
        slug: 'jeans-slim-fit',
        rating: 4.6,
        reviews_count: 98,
        status: 'active'
      },
      {
        id: 6,
        name: 'Гарри Поттер. Полное собрание',
        price: 4990,
        old_price: null,
        stock: 12,
        category: 'Книги',
        category_id: 3,
        image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
        slug: 'harry-potter-complete',
        rating: 4.9,
        reviews_count: 234,
        status: 'active'
      },
      {
        id: 7,
        name: 'Набор кофейных чашек',
        price: 2490,
        old_price: null,
        stock: 25,
        category: 'Дом и сад',
        category_id: 4,
        image_url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
        slug: 'coffee-cups-set',
        rating: 4.6,
        reviews_count: 67,
        status: 'active'
      },
      {
        id: 8,
        name: 'Йога-коврик',
        price: 1990,
        old_price: null,
        stock: 40,
        category: 'Спорт',
        category_id: 5,
        image_url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
        slug: 'yoga-mat',
        rating: 4.5,
        reviews_count: 145,
        status: 'active'
      },
      {
        id: 9,
        name: 'Набор кистей для макияжа',
        price: 2990,
        old_price: null,
        stock: 18,
        category: 'Красота',
        category_id: 6,
        image_url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400',
        slug: 'makeup-brushes-set',
        rating: 4.6,
        reviews_count: 178,
        status: 'active'
      }
    ]
  })

  useEffect(() => {
    localStorage.setItem('marketplace_products', JSON.stringify(products))
  }, [products])

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product])
  }

  const updateProduct = (id: number, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const getProductsByCategory = (categoryId: number) => {
    return products.filter(p => p.category_id === categoryId && p.status === 'active')
  }

  return (
    <ProductsContext.Provider value={{ 
      products, 
      addProduct, 
      updateProduct, 
      deleteProduct,
      getProductsByCategory
    }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}

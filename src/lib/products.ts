export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  reviews: number;
  sellerId: string;
  sellerName: string;
  inStock: boolean;
  characteristics?: { name: string; value: string }[];
}

const PRODUCTS_KEY = 'peeky_products';

export const getProducts = (): Product[] => {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return getDefaultProducts();
    }
  }
  return getDefaultProducts();
};

export const getDefaultProducts = (): Product[] => {
  const products: Product[] = [
    {
      id: '1',
      name: 'Смартфон Samsung Galaxy S24 Ultra 12/256GB',
      description: 'Флагманский смартфон с передовыми технологиями, мощным процессором и профессиональной камерой',
      price: 89990,
      oldPrice: 119990,
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop'
      ],
      category: 'Смартфоны',
      rating: 4.8,
      reviews: 1243,
      sellerId: 'seller1',
      sellerName: 'TechStore',
      inStock: true,
      characteristics: [
        { name: 'Диагональ экрана', value: '6.8"' },
        { name: 'Объем памяти', value: '256 ГБ' },
        { name: 'Камера', value: '200 Мп' }
      ]
    },
    {
      id: '2',
      name: 'Наушники Sony WH-1000XM5',
      description: 'Беспроводные наушники с активным шумоподавлением премиум-класса',
      price: 24990,
      oldPrice: 32990,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop',
      category: 'Наушники',
      rating: 4.9,
      reviews: 856,
      sellerId: 'seller1',
      sellerName: 'TechStore',
      inStock: true
    },
    {
      id: '3',
      name: 'Ноутбук Apple MacBook Air M2 13"',
      description: 'Легкий и мощный ноутбук на чипе M2 для работы и творчества',
      price: 109990,
      oldPrice: 129990,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
      category: 'Ноутбуки',
      rating: 4.9,
      reviews: 2341,
      sellerId: 'seller2',
      sellerName: 'AppleShop',
      inStock: true
    },
    {
      id: '4',
      name: 'Умные часы Apple Watch Series 9',
      description: 'Умные часы с расширенными функциями здоровья и фитнеса',
      price: 39990,
      image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop',
      category: 'Часы',
      rating: 4.7,
      reviews: 1567,
      sellerId: 'seller2',
      sellerName: 'AppleShop',
      inStock: true
    },
    {
      id: '5',
      name: 'Планшет Samsung Galaxy Tab S9',
      description: 'Мощный планшет для работы и развлечений с S Pen в комплекте',
      price: 54990,
      oldPrice: 64990,
      image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop',
      category: 'Планшеты',
      rating: 4.6,
      reviews: 734,
      sellerId: 'seller1',
      sellerName: 'TechStore',
      inStock: true
    },
    {
      id: '6',
      name: 'Игровая консоль PlayStation 5',
      description: 'Новое поколение игр с невероятной графикой и скоростью',
      price: 49990,
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&h=500&fit=crop',
      category: 'Консоли',
      rating: 4.8,
      reviews: 3421,
      sellerId: 'seller3',
      sellerName: 'GameWorld',
      inStock: false
    },
    {
      id: '7',
      name: 'Камера Canon EOS R6 Mark II',
      description: 'Профессиональная беззеркальная камера для фото и видео',
      price: 189990,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop',
      category: 'Камеры',
      rating: 4.9,
      reviews: 412,
      sellerId: 'seller4',
      sellerName: 'PhotoPro',
      inStock: true
    },
    {
      id: '8',
      name: 'Умная колонка Яндекс Станция Макс',
      description: 'Умная колонка с Алисой, мощным звуком и Zigbee',
      price: 19990,
      oldPrice: 24990,
      image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&h=500&fit=crop',
      category: 'Умный дом',
      rating: 4.5,
      reviews: 2156,
      sellerId: 'seller1',
      sellerName: 'TechStore',
      inStock: true
    }
  ];
  
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return products;
};

export const getProductById = (id: string): Product | undefined => {
  return getProducts().find(p => p.id === id);
};

export const addProduct = (product: Omit<Product, 'id'>): Product => {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString()
  };
  products.push(newProduct);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>): boolean => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  products[index] = { ...products[index], ...updates };
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return true;
};

export const deleteProduct = (id: string): boolean => {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  if (filtered.length === products.length) return false;
  
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
  return true;
};

export const getProductsBySeller = (sellerId: string): Product[] => {
  return getProducts().filter(p => p.sellerId === sellerId);
};

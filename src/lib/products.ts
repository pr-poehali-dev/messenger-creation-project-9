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
  isBlocked?: boolean;
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
      image: 'https://cdn.poehali.dev/projects/b0613d0d-6136-4116-a054-5a5375f64c04/files/df6f7a6f-375b-41b0-b3da-7fe41646ebb4.jpg',
      images: [
        'https://cdn.poehali.dev/projects/b0613d0d-6136-4116-a054-5a5375f64c04/files/df6f7a6f-375b-41b0-b3da-7fe41646ebb4.jpg',
        'https://cdn.poehali.dev/projects/b0613d0d-6136-4116-a054-5a5375f64c04/files/df6f7a6f-375b-41b0-b3da-7fe41646ebb4.jpg'
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
      image: 'https://cdn.poehali.dev/projects/b0613d0d-6136-4116-a054-5a5375f64c04/files/2e036dfb-274a-4416-b6d3-4f4b4a45802e.jpg',
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
      image: 'https://cdn.poehali.dev/projects/b0613d0d-6136-4116-a054-5a5375f64c04/files/51c90e14-fbf2-42a0-80ad-a22af95fd312.jpg',
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
      image: 'https://cdn.poehali.dev/projects/b0613d0d-6136-4116-a054-5a5375f64c04/files/c02ae28e-0e21-4962-a082-35b0e5d2597f.jpg',
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
      image: 'https://cdn.poehali.dev/projects/b0613d0d-6136-4116-a054-5a5375f64c04/files/e0db8ca3-2756-437e-bbb2-07e062b737cb.jpg',
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
      image: 'https://cdn.poehali.dev/projects/b0613d0d-6136-4116-a054-5a5375f64c04/files/d798918f-3c8b-4646-945e-ae528cfcb7d9.jpg',
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
      image: 'https://cdn.poehali.dev/projects/b0613d0d-6136-4116-a054-5a5375f64c04/files/af2d7304-1c16-422d-ac4a-f4b9cddeacca.jpg',
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
      image: 'https://cdn.poehali.dev/projects/b0613d0d-6136-4116-a054-5a5375f64c04/files/730b3657-ce32-40a4-92dc-3203c92d793d.jpg',
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

export const toggleProductBlock = (id: string): boolean => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  products[index] = { ...products[index], isBlocked: !products[index].isBlocked };
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return true;
};
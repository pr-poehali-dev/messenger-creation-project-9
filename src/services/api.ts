const API_URL = 'https://functions.poehali.dev/d490f8b9-04d2-4119-ac7d-9334c3d44246';

export interface Category {
  id: string;
  name: string;
  icon: string;
  gradient: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
}

export const api = {
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_URL}?endpoint=categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  },

  async getProducts(categoryId?: string): Promise<Product[]> {
    const url = categoryId 
      ? `${API_URL}?endpoint=products&category=${categoryId}`
      : `${API_URL}?endpoint=products`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${API_URL}?endpoint=product&id=${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  }
};

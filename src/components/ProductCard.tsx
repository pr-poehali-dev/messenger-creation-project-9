import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  seller_name: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-card rounded-lg border overflow-hidden transition-transform hover:scale-105 hover:shadow-lg cursor-pointer">
        <div className="aspect-square overflow-hidden bg-muted">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-1">{product.name}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Icon name="Store" size={14} />
              <span>{product.seller_name}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

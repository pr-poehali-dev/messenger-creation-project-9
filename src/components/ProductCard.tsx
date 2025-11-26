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
      <div className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-purple-100/50 dark:border-purple-900/30">
        <div className="absolute top-3 right-3 z-10">
          <div className="p-2 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-lg">
            <Icon name="Heart" size={16} className="text-accent" />
          </div>
        </div>

        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/20">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent/90 backdrop-blur-sm text-white text-xs font-bold shadow-lg">
              <Icon name="Zap" size={12} />
              ХИТ
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-bold text-white text-lg mb-1 drop-shadow-lg line-clamp-2">
              {product.name}
            </h3>
            <p className="text-white/90 text-xs line-clamp-1 drop-shadow-md">
              {product.description}
            </p>
          </div>
        </div>
        
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {product.price.toLocaleString()} ₽
            </div>
            <div className="flex items-center gap-1.5">
              <div className="p-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20">
                <Icon name="Star" size={14} className="text-amber-500" />
              </div>
              <div className="p-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20">
                <Icon name="Eye" size={14} className="text-primary" />
              </div>
              <div className="p-1.5 rounded-full bg-gradient-to-r from-primary to-accent">
                <Icon name="ShoppingCart" size={14} className="text-white" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <Icon name="Store" size={12} className="text-primary" />
            <span className="text-xs text-foreground font-medium">{product.seller_name}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
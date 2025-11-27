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
      <div className="group relative bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-purple-100/50 dark:border-purple-900/30 active:scale-95 md:active:scale-100">
        <div className="absolute top-2 md:top-3 right-2 md:right-3 z-10">
          <div className="p-1.5 md:p-2 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-lg">
            <Icon name="Heart" size={14} className="text-accent md:w-4 md:h-4" />
          </div>
        </div>

        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/20">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          
          <div className="absolute top-2 md:top-3 left-2 md:left-3 flex flex-col gap-1 md:gap-2">
            <span className="inline-flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-accent/90 backdrop-blur-sm text-white text-[10px] md:text-xs font-bold shadow-lg">
              <Icon name="Zap" size={10} className="md:w-3 md:h-3" />
              ХИТ
            </span>
          </div>

          <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 right-2 md:right-3">
            <h3 className="font-bold text-white text-sm md:text-lg mb-0.5 md:mb-1 drop-shadow-lg line-clamp-2">
              {product.name}
            </h3>
            <p className="text-white/90 text-[10px] md:text-xs line-clamp-1 drop-shadow-md">
              {product.description}
            </p>
          </div>
        </div>
        
        <div className="p-2.5 md:p-3">
          <div className="flex items-center justify-between mb-1.5 md:mb-2">
            <div className="text-base md:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {product.price.toLocaleString()} ₽
            </div>
            <div className="flex items-center gap-1 md:gap-1.5">
              <div className="p-1 md:p-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20">
                <Icon name="Star" size={12} className="text-amber-500 md:w-3.5 md:h-3.5" />
              </div>
              <div className="p-1 md:p-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20">
                <Icon name="Eye" size={12} className="text-primary md:w-3.5 md:h-3.5" />
              </div>
              <div className="p-1 md:p-1.5 rounded-full bg-gradient-to-r from-primary to-accent">
                <Icon name="ShoppingCart" size={12} className="text-white md:w-3.5 md:h-3.5" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 md:gap-1.5 px-1.5 md:px-2 py-0.5 md:py-1 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <Icon name="Store" size={10} className="text-primary md:w-3 md:h-3" />
            <span className="text-[10px] md:text-xs text-foreground font-medium truncate">{product.seller_name}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
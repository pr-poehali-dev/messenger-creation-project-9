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
      <div className="group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 cursor-pointer border border-purple-100/50 dark:border-purple-900/30">
        <div className="absolute top-3 right-3 z-10">
          <div className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <Icon name="Heart" size={18} className="text-accent" />
          </div>
        </div>

        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/20">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <Icon name="ArrowRight" size={20} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
          </div>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between pt-3 border-t border-purple-100 dark:border-purple-900/30">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {product.price.toLocaleString()} ₽
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Icon name="Store" size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{product.seller_name}</span>
              </div>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow">
              <Icon name="ShoppingCart" size={18} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
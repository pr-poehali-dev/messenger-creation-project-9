import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import ProductCard from './ProductCard';
import Icon from '@/components/ui/icon';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  seller_name: string;
}

interface SwipeableProductGridProps {
  products: Product[];
}

export default function SwipeableProductGrid({ products }: SwipeableProductGridProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const hapticFeedback = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const handleSwipeLeft = () => {
    if (currentPage < totalPages - 1) {
      hapticFeedback();
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentPage > 0) {
      hapticFeedback();
      setCurrentPage(prev => prev - 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    trackMouse: false,
    preventScrollOnSwipe: false,
    trackTouch: true,
    delta: 50
  });

  const startIndex = currentPage * itemsPerPage;
  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="md:hidden">
      <div className="mb-4 flex items-center justify-between px-2">
        <button
          onClick={handleSwipeRight}
          disabled={currentPage === 0}
          className={`p-2 rounded-full ${
            currentPage === 0 
              ? 'bg-gray-100 dark:bg-[#2a2a40] text-gray-400' 
              : 'bg-gradient-to-r from-primary to-accent text-white active:scale-95'
          } transition-all`}
        >
          <Icon name="ChevronLeft" size={20} />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentPage 
                  ? 'w-6 bg-gradient-to-r from-primary to-accent' 
                  : 'w-2 bg-gray-300 dark:bg-[#2a2a40]'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleSwipeLeft}
          disabled={currentPage === totalPages - 1}
          className={`p-2 rounded-full ${
            currentPage === totalPages - 1 
              ? 'bg-gray-100 dark:bg-[#2a2a40] text-gray-400' 
              : 'bg-gradient-to-r from-primary to-accent text-white active:scale-95'
          } transition-all`}
        >
          <Icon name="ChevronRight" size={20} />
        </button>
      </div>

      <div 
        {...swipeHandlers}
        className="relative overflow-hidden rounded-xl touch-pan-y"
      >
        <div 
          className="flex transition-all duration-500 ease-out"
          style={{ 
            transform: `translateX(-${currentPage * 100}%)`,
          }}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div 
              key={pageIndex}
              className="w-full flex-shrink-0 grid grid-cols-2 gap-4 px-1"
            >
              {products
                .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                .map((product, index) => (
                  <div 
                    key={product.id} 
                    className={`${pageIndex === currentPage ? 'animate-scale-in' : ''}`}
                    style={pageIndex === currentPage ? { animationDelay: `${index * 100}ms` } : {}}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#252538] rounded-full shadow-sm border border-purple-100 dark:border-purple-800/30">
            <Icon name="Package" size={14} className="text-primary" />
            <span className="text-xs font-bold text-foreground">
              {startIndex + 1}-{Math.min(startIndex + itemsPerPage, products.length)} из {products.length}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/40 dark:to-purple-900/40 rounded-xl border border-blue-100 dark:border-blue-800/30">
          <Icon name="HandMetal" size={18} className="text-blue-600 dark:text-blue-400" />
          <span className="text-xs text-blue-900 dark:text-blue-300 font-medium">
            Свайпните влево/вправо для просмотра
          </span>
        </div>
      </div>
    </div>
  );
}
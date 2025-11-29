import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';
import type { Product } from '@/lib/products';

interface DashboardStatsProps {
  products: Product[];
}

export default function DashboardStats({ products }: DashboardStatsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Icon name="Package" size={28} className="text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Товаров</p>
              <p className="text-3xl font-bold text-gray-900">{products.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <Icon name="CheckCircle" size={28} className="text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">В наличии</p>
              <p className="text-3xl font-bold text-gray-900">
                {products.filter(p => p.inStock).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Icon name="TrendingUp" size={28} className="text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Просмотров</p>
              <p className="text-3xl font-bold text-gray-900">
                {products.reduce((sum, p) => sum + p.reviews, 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

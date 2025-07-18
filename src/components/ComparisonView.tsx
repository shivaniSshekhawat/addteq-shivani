
import React from 'react';
import { Product } from '../types/product';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Trash2, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ComparisonViewProps {
  products: Product[];
  onRemoveProduct: (productId: number) => void;
  onClearAll: () => void;
  onAddThird: () => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({
  products,
  onRemoveProduct,
  onClearAll,
  onAddThird
}) => {
  if (products.length < 2) return null;

  const getHighlightClass = (value: string | number, allValues: (string | number)[], isPrice: boolean = false) => {
    if (typeof value === 'string') {
      const numValue = parseFloat(value);
      const numValues = allValues.map(v => parseFloat(v.toString())).filter(v => !isNaN(v));
      
      if (numValues.length <= 1) return 'bg-muted border-border';
      
      const maxValue = Math.max(...numValues);
      const minValue = Math.min(...numValues);
      
      // For price, lower is better (green), higher is worse (red)
      if (isPrice) {
        if (numValue === minValue && maxValue !== minValue) {
          return 'bg-green-100 border-green-300 text-green-900 dark:bg-green-900/30 dark:border-green-700 dark:text-green-100';
        }
        if (numValue === maxValue && maxValue !== minValue) {
          return 'bg-red-100 border-red-300 text-red-900 dark:bg-red-900/30 dark:border-red-700 dark:text-red-100';
        }
      } else {
        // For other specs, higher is better (green), lower is worse (red)
        if (numValue === maxValue && maxValue !== minValue) {
          return 'bg-green-100 border-green-300 text-green-900 dark:bg-green-900/30 dark:border-green-700 dark:text-green-100';
        }
        if (numValue === minValue && maxValue !== minValue) {
          return 'bg-red-100 border-red-300 text-red-900 dark:bg-red-900/30 dark:border-red-700 dark:text-red-100';
        }
      }
    }
    
    return 'bg-muted border-border';
  };

  const batteryValues = products.map(p => p.features.batteryLife);
  const screenValues = products.map(p => p.features.screenSize);
  const storageValues = products.map(p => p.features.storage);
  const priceValues = products.map(p => p.price.toString());
  const cameraValues = products.map(p => p.features.camera);

  return (
    <div className="mt-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Product Comparison</h2>
        <Button
          onClick={onClearAll}
          variant="outline"
          className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear All
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-full">
          {products.map((product, index) => (
            <Card key={product.id} className="relative">
              <Button
                onClick={() => onRemoveProduct(product.id)}
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 z-10 w-8 h-8 p-0 rounded-full bg-background hover:bg-red-50 border-red-200 dark:hover:bg-red-900/20"
              >
                <X className="w-4 h-4 text-red-600 dark:text-red-400" />
              </Button>
              
              <CardHeader className="pb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <Badge variant="secondary" className="w-fit">
                  {product.brand}
                </Badge>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <div className={`text-2xl font-bold p-3 rounded-lg border-2 ${getHighlightClass(product.price.toString(), priceValues, true)}`}>
                  ${product.price}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className={`p-3 rounded-lg border-2 ${getHighlightClass(product.features.batteryLife, batteryValues)}`}>
                  <div className="font-medium text-sm text-muted-foreground">Battery Life</div>
                  <div className="text-lg font-semibold">{product.features.batteryLife}</div>
                </div>
                
                <div className={`p-3 rounded-lg border-2 ${getHighlightClass(product.features.screenSize, screenValues)}`}>
                  <div className="font-medium text-sm text-muted-foreground">Screen Size</div>
                  <div className="text-lg font-semibold">{product.features.screenSize}</div>
                </div>
                
                <div className={`p-3 rounded-lg border-2 ${getHighlightClass(product.features.storage, storageValues)}`}>
                  <div className="font-medium text-sm text-muted-foreground">Storage</div>
                  <div className="text-lg font-semibold">{product.features.storage}</div>
                </div>
                
                <div className={`p-3 rounded-lg border-2 ${getHighlightClass(product.features.camera, cameraValues)}`}>
                  <div className="font-medium text-sm text-muted-foreground">Camera</div>
                  <div className="text-lg font-semibold">{product.features.camera}</div>
                </div>
                
                <div className="p-3 rounded-lg border-2 bg-muted border-border">
                  <div className="font-medium text-sm text-muted-foreground">Processor</div>
                  <div className="text-lg font-semibold">{product.features.processor}</div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Add Third Product Card */}
          {products.length === 2 && (
            <Card className="relative border-dashed border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center h-full min-h-[400px] p-6">
                <div className="text-center">
                  <Plus className="w-12 h-12 text-primary mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Add Third Product</h3>
                  <p className="text-muted-foreground mb-4">Compare up to 3 products side by side</p>
                  <Button
                    onClick={onAddThird}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;

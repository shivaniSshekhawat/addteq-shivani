
import React from 'react';
import { Product } from '../types/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onToggleCompare: (product: Product) => void;
  canAddMore: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected,
  onToggleCompare,
  canAddMore
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isSelected || canAddMore) {
        onToggleCompare(product);
      }
    }
  };

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card focus-within:ring-2 focus-within:ring-ring"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="article"
      aria-label={`${product.name} by ${product.brand}`}
    >
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge 
            variant="secondary" 
            className="absolute top-2 left-2 bg-background/90 text-foreground"
          >
            {product.brand}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-foreground">{product.name}</h3>
        <p className="text-2xl font-bold text-primary mb-3">${product.price}</p>
        
        <div className="space-y-2" role="list" aria-label="Product features">
          <div className="flex justify-between text-sm" role="listitem">
            <span className="text-muted-foreground">Battery:</span>
            <span className="font-medium">{product.features.batteryLife}</span>
          </div>
          <div className="flex justify-between text-sm" role="listitem">
            <span className="text-muted-foreground">Screen:</span>
            <span className="font-medium">{product.features.screenSize}</span>
          </div>
          <div className="flex justify-between text-sm" role="listitem">
            <span className="text-muted-foreground">Storage:</span>
            <span className="font-medium">{product.features.storage}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onToggleCompare(product)}
          disabled={!isSelected && !canAddMore}
          className={`w-full transition-all duration-200 ${
            isSelected 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-primary hover:bg-primary/90 text-primary-foreground'
          }`}
          variant={isSelected ? "default" : "default"}
          aria-label={isSelected ? `Remove ${product.name} from comparison` : `Add ${product.name} to comparison`}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Added to Compare
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Add to Compare
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

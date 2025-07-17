
import React from 'react';
import { Product } from '../types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Eye } from 'lucide-react';

interface ComparisonBarProps {
  selectedProducts: Product[];
  onRemoveProduct: (productId: number) => void;
  onToggleView: () => void;
  showComparison: boolean;
}

const ComparisonBar: React.FC<ComparisonBarProps> = ({
  selectedProducts,
  onRemoveProduct,
  onToggleView,
  showComparison
}) => {
  if (selectedProducts.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {selectedProducts.length} selected
            </Badge>
            <span className="text-sm text-muted-foreground">
              ({selectedProducts.length < 2 ? 'Select at least 2 to compare' : 'Ready to compare'})
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            {selectedProducts.map(product => (
              <div key={product.id} className="flex items-center gap-1 bg-muted rounded-full px-3 py-1">
                <span className="text-sm font-medium">{product.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveProduct(product.id)}
                  className="w-4 h-4 p-0 hover:bg-red-100 rounded-full"
                  aria-label={`Remove ${product.name} from comparison`}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        {selectedProducts.length >= 2 && (
          <Button
            onClick={onToggleView}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Eye className="w-4 h-4 mr-2" />
            {showComparison ? 'Hide Comparison' : 'Compare Products'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ComparisonBar;

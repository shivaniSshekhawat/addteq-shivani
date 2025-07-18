import { useState, useMemo } from "react";
import { products } from "../data/products";
import { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import ComparisonView from "../components/ComparisonView";
import SearchFilter from "../components/SearchFilter";
import ComparisonBar from "../components/ComparisonBar";
import ThemeToggle from "../components/ThemeToggle";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { toast } from "sonner";

const Index = () => {
  const [selectedProducts, setSelectedProducts] = useLocalStorage<Product[]>(
    "comparison-products",
    []
  );
  const [showComparison, setShowComparison] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("all");

  const brands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).sort();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand =
        brandFilter === "all" || product.brand === brandFilter;
      return matchesSearch && matchesBrand;
    });
  }, [searchTerm, brandFilter]);

  const handleToggleCompare = (product: Product) => {
    const isSelected = selectedProducts.find((p) => p.id === product.id);

    if (isSelected) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
      toast.success(`${product.name} removed from comparison`, {
        position: "top-right",
      });
    } else {
      if (selectedProducts.length >= 3) {
        toast.error("You can only compare up to 3 products", {
          position: "top-right",
        });
        return;
      }
      setSelectedProducts([...selectedProducts, product]);
      toast.success(`${product.name} added to comparison`, {
        position: "top-right",
      });
    }
  };

  const handleRemoveProduct = (productId: number) => {
    const product = selectedProducts.find((p) => p.id === productId);
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
    if (product) {
      toast.success(`${product.name} removed from comparison`, {
        position: "top-right",
      });
    }
  };

  const handleClearAll = () => {
    setSelectedProducts([]);
    setShowComparison(false);
    toast.success("Comparison cleared", {
      position: "top-right",
    });
  };

  const handleToggleView = () => {
    setShowComparison(!showComparison);
  };

  const handleAddThird = () => {
    setShowComparison(false);
    toast.info("Select a third product from the list below", {
      position: "top-right",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 transition-colors duration-300">
      <ThemeToggle />

      <div className="max-w-7xl mx-auto px-4 py-8 pb-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
            Phone Comparison Tool
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compare the latest smartphones side by side. Select up to 3 devices
            to see detailed specifications and find your perfect match.
          </p>
        </div>

        {/* Search and Filter */}
        {!(showComparison && selectedProducts.length >= 2) && (
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            brandFilter={brandFilter}
            onBrandFilterChange={setBrandFilter}
            brands={brands}
          />
        )}

        {/* Comparison View */}
        {showComparison && selectedProducts.length >= 2 && (
          <ComparisonView
            products={selectedProducts}
            onRemoveProduct={handleRemoveProduct}
            onClearAll={handleClearAll}
            onAddThird={handleAddThird}
          />
        )}

        {/* Product Grid */}
        {(!showComparison || selectedProducts.length < 2) && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                {filteredProducts.length} Products Found
              </h2>
              {selectedProducts.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  {selectedProducts.length}/3 products selected
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={
                    !!selectedProducts.find((p) => p.id === product.id)
                  }
                  onToggleCompare={handleToggleCompare}
                  canAddMore={selectedProducts.length < 3}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground text-6xl mb-4">📱</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Comparison Bar */}
        <ComparisonBar
          selectedProducts={selectedProducts}
          onRemoveProduct={handleRemoveProduct}
          onToggleView={handleToggleView}
          showComparison={showComparison}
        />
      </div>
    </div>
  );
};

export default Index;

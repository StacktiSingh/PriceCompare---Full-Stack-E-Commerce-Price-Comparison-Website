import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onTrackProduct: (product: Product) => void;
  trackedProducts: Set<string>;
}

export default function ProductGrid({ products, onTrackProduct, trackedProducts }: ProductGridProps) {
  if (products.length === 0) {
    return null;
  }

  // Find the lowest price
  const lowestPrice = Math.min(...products.map(p => p.price));

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Found {products.length} products
        </h2>
        <div className="text-sm text-gray-600">
          Updated just now
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isLowestPrice={product.price === lowestPrice}
            onTrack={onTrackProduct}
            isTracked={trackedProducts.has(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
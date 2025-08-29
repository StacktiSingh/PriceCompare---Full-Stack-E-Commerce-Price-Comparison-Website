import React from 'react';
import { Star, ExternalLink, TrendingDown, Crown, Shield } from 'lucide-react';
import { Product } from '../types';

interface CrossSiteComparisonProps {
  products: Product[];
  onTrackProduct: (product: Product) => void;
  trackedProducts: Set<string>;
}

export default function CrossSiteComparison({ products, onTrackProduct, trackedProducts }: CrossSiteComparisonProps) {
  if (products.length < 2) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getPlatformColor = (site: string) => {
    switch (site.toLowerCase()) {
      case 'amazon':
        return 'bg-orange-500';
      case 'flipkart':
        return 'bg-yellow-500';
      case 'myntra':
        return 'bg-pink-500';
      default:
        return 'bg-gray-500';
    }
  };

  const lowestPrice = Math.min(...products.map(p => p.price));
  const highestPrice = Math.max(...products.map(p => p.price));
  const savings = highestPrice - lowestPrice;
  const savingsPercent = Math.round((savings / highestPrice) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-emerald-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="h-6 w-6" />
            <div>
              <h3 className="font-bold text-lg">Cross-Site Price Comparison</h3>
              <p className="text-emerald-100 text-sm">Same product, different prices</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">Save {formatPrice(savings)}</div>
            <div className="text-emerald-100 text-sm">{savingsPercent}% difference</div>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center gap-4">
          <img
            src={products[0].image}
            alt={products[0].title}
            className="w-16 h-16 object-contain bg-white rounded-lg p-2"
          />
          <div>
            <h4 className="font-semibold text-gray-800 line-clamp-2">
              {products[0].title}
            </h4>
            <p className="text-sm text-gray-600">Available on {products.length} platforms</p>
          </div>
        </div>
      </div>

      {/* Price Comparison Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products
            .sort((a, b) => a.price - b.price) // Sort by price, lowest first
            .map((product, index) => {
              const isLowest = product.price === lowestPrice;
              const isHighest = product.price === highestPrice;
              const discountPercent = product.originalPrice 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              return (
                <div
                  key={product.id}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    isLowest 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  {isLowest && (
                    <div className="absolute -top-2 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      BEST PRICE
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getPlatformColor(product.site)}`}>
                      {product.site}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-400 fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviewCount})</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-2xl font-bold ${isLowest ? 'text-emerald-700' : 'text-gray-900'}`}>
                        {formatPrice(product.price)}
                      </span>
                      {discountPercent > 0 && (
                        <div className="flex items-center text-emerald-600 text-sm">
                          <TrendingDown className="h-4 w-4" />
                          <span className="font-medium">{discountPercent}% off</span>
                        </div>
                      )}
                    </div>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    {!isLowest && (
                      <div className="text-sm text-red-600 mt-1">
                        +{formatPrice(product.price - lowestPrice)} more expensive
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 text-center py-2 px-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 text-sm ${
                        isLowest
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-gray-600 text-white hover:bg-gray-700'
                      }`}
                    >
                      {isLowest ? 'Buy Now' : 'View Deal'}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => onTrackProduct(product)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        trackedProducts.has(product.id)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title={trackedProducts.has(product.id) ? 'Stop tracking' : 'Track price'}
                    >
                      <Shield className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
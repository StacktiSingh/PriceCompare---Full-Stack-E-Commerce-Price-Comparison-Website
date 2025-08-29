import React from 'react';
import { Star, ExternalLink, Heart, TrendingDown, TrendingUp } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isLowestPrice?: boolean;
  onTrack?: (product: Product) => void;
  isTracked?: boolean;
}

export default function ProductCard({ product, isLowestPrice, onTrack, isTracked }: ProductCardProps) {
  console.log(`ProductCard rendered - ID: ${product.id}, Title: ${product.title.substring(0, 30)}..., isTracked: ${isTracked}`);
  
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

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${
      isLowestPrice ? 'ring-2 ring-emerald-500' : ''
    }`}>
      {isLowestPrice && (
        <div className="bg-emerald-500 text-white text-center py-2 px-4 text-sm font-medium">
          🎉 Best Price!
        </div>
      )}
      
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-contain bg-gray-50 p-4"
        />
        <button
          onClick={() => onTrack?.(product)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
            isTracked 
              ? 'bg-blue-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-blue-500'
          }`}
          title={isTracked ? 'Stop tracking price' : 'Track price changes'}
        >
          <Heart className={`h-5 w-5 ${isTracked ? 'fill-current' : ''}`} />
        </button>
        

      </div>

      <div className="p-6">
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

        <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2 leading-snug">
          {product.title}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
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
          </div>
        </div>

        <div className="flex gap-2">
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-600 text-white text-center py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            View Deal
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
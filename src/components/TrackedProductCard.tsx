import React, { useState } from 'react';
import { Star, ExternalLink, TrendingDown, TrendingUp, Bell, X, Target, Calendar, AlertTriangle, BarChart3 } from 'lucide-react';
import { Product } from '../types';
import PriceHistoryChart from './PriceHistoryChart';
import SmartAlertModal from './SmartAlertModal';
import { AlertConfig } from '../types';

interface TrackedProductCardProps {
  product: Product;
  onUntrack: (productId: string) => void;
  onSetPriceAlert?: (productId: string, alertConfig: AlertConfig) => Promise<boolean>;
}

export default function TrackedProductCard({ product, onUntrack, onSetPriceAlert }: TrackedProductCardProps) {
  const [showSmartAlert, setShowSmartAlert] = useState(false);
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [targetPrice, setTargetPrice] = useState(product.alertThreshold || product.price * 0.9); // Use saved threshold or default to 10% discount
  const [hasAlert, setHasAlert] = useState(product.hasAlert || false);
  const [currentAlert, setCurrentAlert] = useState<AlertConfig | undefined>(
    product.hasAlert ? {
      type: 'fixed',
      value: product.alertThreshold || product.price * 0.9,
      description: `Alert when price drops below ${formatPrice(product.alertThreshold || product.price * 0.9)}`
    } : undefined
  );

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

  const daysSinceAdded = Math.floor((Date.now() - product.lastUpdated.getTime()) / (1000 * 60 * 60 * 24));

  const handleSetAlert = async (alertConfig: AlertConfig) => {
    if (onSetPriceAlert) {
      const success = await onSetPriceAlert(product.id, alertConfig);
      if (success) {
        setHasAlert(true);
        setCurrentAlert(alertConfig);
      }
      return success;
    }
    return false;
  };

  if (showPriceHistory) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Price History</h3>
          <button
            onClick={() => setShowPriceHistory(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4">
          <PriceHistoryChart
            productTitle={product.title}
            currentPrice={product.price}
            site={product.site}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-blue-500">
      {/* Price Tracking Header */}
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Price Tracking</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Calendar className="h-3 w-3" />
            <span>{daysSinceAdded} days tracked</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain bg-gray-50 p-4"
        />
        
        {/* Price Alert Status */}
        {hasAlert && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <Bell className="h-3 w-3" />
            Alert Set
          </div>
        )}

        {/* Remove from tracking button */}
        <button
          type="button"
          onClick={() => onUntrack(product.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all"
          title="Remove from price tracking"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4">
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

        <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2 leading-snug text-sm">
          {product.title}
        </h3>

        {/* Current Price */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold text-gray-900">
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

        {/* Price Alert Section */}
        {!hasAlert ? (
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowSmartAlert(true)}
              className="w-full bg-blue-50 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Target className="h-4 w-4" />
              Set Smart Alert
            </button>
          </div>
        ) : (
          <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-green-800 text-sm font-medium">
                  <Bell className="h-4 w-4" />
                  Smart Alert Active
                </div>
                <div className="text-green-600 text-xs mt-1">
                  {currentAlert?.description}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSmartAlert(true)}
                className="text-green-600 hover:text-green-800 text-xs underline"
              >
                Edit
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mb-4">
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-600 text-white text-center py-2 px-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center gap-1 text-sm"
          >
            Check Price
            <ExternalLink className="h-4 w-4" />
          </a>
          <button
            onClick={() => setShowPriceHistory(true)}
            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            title="View price history"
          >
            <BarChart3 className="h-4 w-4" />
          </button>
        </div>

        {/* Price Status */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Last updated: {product.lastUpdated.toLocaleDateString()}</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Monitoring</span>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Smart Alert Modal */}
      <SmartAlertModal
        isOpen={showSmartAlert}
        onClose={() => setShowSmartAlert(false)}
        onSetAlert={handleSetAlert}
        productTitle={product.title}
        currentPrice={product.price}
        existingAlert={currentAlert}
      />
    </>
  );
}
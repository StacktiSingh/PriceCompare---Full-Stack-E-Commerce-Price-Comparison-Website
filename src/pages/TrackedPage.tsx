import React from 'react';
import TrackedProductCard from '../components/TrackedProductCard';
import EmptyState from '../components/EmptyState';
import { Product } from '../types';
import { apiService } from '../services/api';
import { TrendingDown, Bell, BarChart3, AlertCircle } from 'lucide-react';
import { AlertConfig } from '../types';

interface TrackedPageProps {
  trackedProducts: Product[];
  onUntrackProduct: (productId: string) => void;
  onGoHome: () => void;
  showToast?: (message: string, type: 'success' | 'error') => void;
  onRefreshTrackedProducts?: () => void;
}

export default function TrackedPage({ trackedProducts, onUntrackProduct, onGoHome, showToast, onRefreshTrackedProducts }: TrackedPageProps) {
  if (trackedProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EmptyState type="tracked" onAction={onGoHome} />
        </div>
      </div>
    );
  }

  const handleSetPriceAlert = async (productId: string, alertConfig: AlertConfig) => {
    console.log(`Setting smart alert for ${productId}:`, alertConfig);
    try {
      // For now, we'll use the alertConfig.value as targetPrice for backward compatibility
      const targetPrice = alertConfig.type === 'fixed' ? alertConfig.value : 0;
      const response = await apiService.setPriceAlert(productId, targetPrice);
      console.log('Smart alert set successfully:', response);
      showToast?.(`Smart alert set successfully! ${alertConfig.description}`, 'success');
      
      // Refresh tracked products to get updated alert information
      onRefreshTrackedProducts?.();
      
      return true; // Return success status
    } catch (error) {
      console.error('Failed to set smart alert:', error);
      showToast?.('Failed to set smart alert. Please try again.', 'error');
      return false; // Return failure status
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Price Tracking Dashboard</h1>
          <p className="text-gray-600 mb-6">Monitor price changes and get notified when prices drop</p>
          
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Price Monitoring</h3>
                  <p className="text-sm text-gray-600">Track price changes across sites</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-emerald-500">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Bell className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Smart Alerts</h3>
                  <p className="text-sm text-gray-600">Advanced price notifications</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-amber-500">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Best Deals</h3>
                  <p className="text-sm text-gray-600">Find the lowest prices</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tracked Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trackedProducts.map((product) => (
            <TrackedProductCard
              key={product.id}
              product={product}
              onUntrack={onUntrackProduct}
              onSetPriceAlert={handleSetPriceAlert}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
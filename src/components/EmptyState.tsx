import React from 'react';
import { Search, Package } from 'lucide-react';

interface EmptyStateProps {
  type: 'search' | 'tracked';
  onAction?: () => void;
}

export default function EmptyState({ type, onAction }: EmptyStateProps) {
  if (type === 'search') {
    return (
      <div className="text-center py-16">
        <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
          <Search className="h-full w-full" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">Start Your Price Hunt</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Search for any product and we'll find the best deals across multiple e-commerce platforms.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
        <Package className="h-full w-full" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">No Tracked Products</h3>
      <p className="text-gray-600 max-w-md mx-auto mb-6">
        Start tracking products to get price alerts and never miss a good deal.
      </p>
      <button
        onClick={onAction}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
      >
        Search Products
      </button>
    </div>
  );
}
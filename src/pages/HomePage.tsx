import React, { useState } from 'react';
import { Search, Package, Star } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ProductGrid from '../components/ProductGrid';
import CrossSiteComparison from '../components/CrossSiteComparison';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import { Product } from '../types';
import { apiService } from '../services/api';
import { convertApiProductToProduct, groupProductsBySimilarity } from '../utils/productUtils';

interface HomePageProps {
  onTrackProduct: (product: Product) => void;
  trackedProducts: Set<string>;
}

export default function HomePage({ onTrackProduct, trackedProducts }: HomePageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setHasSearched(true);
    setError(null);
    
    try {
      const response = await apiService.searchProducts(query);
      const convertedProducts = response.products.map(convertApiProductToProduct);
      setProducts(convertedProducts);
    } catch (error) {
      console.error('Search failed:', error);
      setError('Failed to search products. Please check if the backend server is running.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Group products for cross-site comparison
  const productGroups = groupProductsBySimilarity(products);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Find the <span className="text-blue-600">Best Deals</span>
            <br />
            Compare <span className="text-emerald-600">Prices</span> Instantly
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Search across multiple e-commerce platforms and find the lowest prices for your favorite products.
            Save time, save money, shop smarter.
          </p>
          
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {/* Results Section */}
        <div className="mt-12">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <div className="text-center py-16">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-lg font-medium text-red-800 mb-2">Search Error</h3>
                <p className="text-red-600 text-sm">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : hasSearched && products.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Results Found</h3>
              <p className="text-gray-600">Try searching with different keywords or check the spelling.</p>
            </div>
          ) : hasSearched ? (
            <div className="space-y-8">
              {/* Cross-Site Comparisons */}
              {productGroups.map((group, index) => (
                <CrossSiteComparison
                  key={index}
                  products={group}
                  onTrackProduct={onTrackProduct}
                  trackedProducts={trackedProducts}
                />
              ))}
              
              {/* Regular Product Grid */}
              <ProductGrid
                products={products}
                onTrackProduct={onTrackProduct}
                trackedProducts={trackedProducts}
              />
            </div>
          ) : (
            <EmptyState type="search" />
          )}
        </div>

        {/* Features Section */}
        {!hasSearched && (
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Search</h3>
              <p className="text-gray-600">Advanced algorithms to find exact products across multiple platforms</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Price Tracking</h3>
              <p className="text-gray-600">Track your favorite products and get alerts when prices drop</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Best Deals</h3>
              <p className="text-gray-600">Compare prices from Amazon and Flipkart to find the best deals</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
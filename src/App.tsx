import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TrackedPage from './pages/TrackedPage';
import AboutPage from './pages/AboutPage';
import Toast from './components/Toast';
import { Product } from './types';
import { apiService } from './services/api';
import { convertApiProductToProduct, convertProductToApiProduct } from './utils/productUtils';

interface ToastState {
  message: string;
  type: 'success' | 'error';
  id: number;
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [trackedProducts, setTrackedProducts] = useState<Product[]>([]);
  const [trackedProductIds, setTrackedProductIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Function to load tracked products
  const loadTrackedProducts = async () => {
    try {
      const apiProducts = await apiService.getTrackedProducts();
      const convertedProducts = apiProducts.map(convertApiProductToProduct);
      setTrackedProducts(convertedProducts);
      setTrackedProductIds(new Set(convertedProducts.map(p => p.id)));
    } catch (error) {
      console.error('Failed to load tracked products:', error);
    }
  };

  // Load tracked products on app initialization
  useEffect(() => {
    const initializeTrackedProducts = async () => {
      await loadTrackedProducts();
      setLoading(false);
    };

    initializeTrackedProducts();
  }, []);

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts(prev => [...prev, { message, type, id }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  const handleTrackProduct = async (product: Product) => {
    console.log(`Tracking product with ID: ${product.id}`);
    console.log(`Current tracked IDs:`, Array.from(trackedProductIds));
    console.log(`Is already tracked:`, trackedProductIds.has(product.id));
    
    if (trackedProductIds.has(product.id)) {
      // Untrack product
      console.log(`Untracking product: ${product.id}`);
      await handleUntrackProduct(product.id);
    } else {
      // Track product
      console.log(`Adding product to tracking: ${product.id}`);
      try {
        const apiProduct = convertProductToApiProduct(product);
        await apiService.trackProduct(apiProduct);
        
        // Update local state only after successful API call
        setTrackedProducts(prev => [...prev, product]);
        setTrackedProductIds(prev => {
          const newSet = new Set([...prev, product.id]);
          console.log(`Updated tracked IDs:`, Array.from(newSet));
          return newSet;
        });
        
        // Show success toast
        showToast('Price tracking enabled! You\'ll be notified of price changes.', 'success');
      } catch (error) {
        console.error('Failed to track product:', error);
        showToast('Failed to track product. Please try again.', 'error');
      }
    }
  };

  const handleUntrackProduct = async (productId: string) => {
    try {
      await apiService.untrackProduct(productId);
      
      // Update local state only after successful API call
      setTrackedProducts(prev => prev.filter(p => p.id !== productId));
      setTrackedProductIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
      
      // Show success toast
      showToast('Price tracking stopped for this product.', 'success');
    } catch (error) {
      console.error('Failed to untrack product:', error);
      showToast('Failed to remove product. Please try again.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading PriceCompare...</p>
        </div>
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onTrackProduct={handleTrackProduct}
            trackedProducts={trackedProductIds}
          />
        );
      case 'tracked':
        return (
          <TrackedPage
            trackedProducts={trackedProducts}
            onUntrackProduct={handleUntrackProduct}
            onGoHome={() => setCurrentPage('home')}
            showToast={showToast}
            onRefreshTrackedProducts={loadTrackedProducts}
          />
        );
      case 'about':
        return <AboutPage />;
      default:
        return (
          <HomePage
            onTrackProduct={handleTrackProduct}
            trackedProducts={trackedProductIds}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        trackedCount={trackedProducts.length}
      />
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>
      <Footer />
      
      {/* Toast notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

export default App;
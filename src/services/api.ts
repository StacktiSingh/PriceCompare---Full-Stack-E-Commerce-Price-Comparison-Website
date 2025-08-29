const API_BASE_URL = 'https://pricecompare-api-backend-2.onrender.com/'; // Adjust this to match your Flask backend URL

export interface ApiProduct {
  id: string;
  title: string;
  image: string;
  site: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  url: string;
  inStock: boolean;
  lastUpdated: string;
  alertThreshold?: number;
  hasAlert?: boolean;
}

export interface SearchResponse {
  products: ApiProduct[];
  query: string;
  totalResults: number;
}

export interface TrackResponse {
  success: boolean;
  message: string;
}

class ApiService {

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true', // Required for ngrok
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async searchProducts(query: string): Promise<SearchResponse> {
    const response = await this.request<ApiProduct[] | SearchResponse>(`/api/search?query=${encodeURIComponent(query)}`);
    
    // Handle both array response (from Flask) and SearchResponse object
    if (Array.isArray(response)) {
      // Transform backend data to include required fields
      const products = response.map((product, index) => {
        // Create a consistent ID based on product data that will match tracked products
        // Use the exact same logic as backend - convert price to integer
        const priceInt = Math.floor(Number(product.price));
        let consistentId = `${product.site}-${product.title.replace(' ', '-').toLowerCase()}-${priceInt}`;
        consistentId = consistentId.replace(/[^a-zA-Z0-9-]/g, '');
        
        console.log(`Generated ID for "${product.title.substring(0, 30)}...": ${consistentId}`);
        console.log(`Product details - Site: ${product.site}, Price: ${product.price}, Title: ${product.title.substring(0, 50)}`);
        
        return {
          ...product,
          id: consistentId,
          rating: product.rating || 4.0,
          reviewCount: product.reviewCount || 100,
          inStock: true, // Always true since we removed out of stock logic
          lastUpdated: new Date().toISOString(),
        };
      });
      
      return {
        products,
        query,
        totalResults: products.length,
      };
    } else {
      return response;
    }
  }

  async trackProduct(product: ApiProduct): Promise<TrackResponse> {
    return this.request<TrackResponse>('/api/track', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  async getTrackedProducts(): Promise<ApiProduct[]> {
    return this.request<ApiProduct[]>('/api/tracked');
  }

  async untrackProduct(productId: string): Promise<TrackResponse> {
    // Send the hash-based ID to backend, let backend handle the lookup
    return this.request<TrackResponse>(`/api/untrack`, {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
  }

  async setPriceAlert(productId: string, targetPrice: number): Promise<TrackResponse> {
    return this.request<TrackResponse>(`/api/price-alert`, {
      method: 'POST',
      body: JSON.stringify({ productId, targetPrice }),
    });
  }
}

export const apiService = new ApiService();
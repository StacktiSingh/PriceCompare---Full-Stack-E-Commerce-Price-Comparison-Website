export interface Product {
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
  lastUpdated: Date;
  alertThreshold?: number; // Price alert threshold
  hasAlert?: boolean; // Whether price alert is set
  baseProductId?: string; // For grouping same products across sites
}

export interface TrackedProduct {
  id: string;
  productId: string;
  userId?: string;
  dateAdded: Date;
  priceHistory: PricePoint[];
  alertThreshold?: number;
  alertType?: 'fixed' | 'percentage' | 'trend';
  alertValue?: number; // For percentage alerts
}

export interface PricePoint {
  date: Date;
  price: number;
  site: string;
}

export interface SearchResult {
  query: string;
  products: Product[];
  totalResults: number;
  searchTime: number;
}

export interface ProductGroup {
  baseProductId: string;
  title: string;
  image: string;
  products: Product[];
  lowestPrice: number;
  highestPrice: number;
  priceRange: number;
}

export interface AlertConfig {
  type: 'fixed' | 'percentage' | 'trend';
  value: number;
  description: string;
}
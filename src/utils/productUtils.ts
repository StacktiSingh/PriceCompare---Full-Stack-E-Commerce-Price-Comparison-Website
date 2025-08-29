import { Product } from '../types';
import { ApiProduct } from '../services/api';

export function generateBaseProductId(title: string): string {
  // Create a normalized ID for grouping similar products
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .substring(0, 50); // Limit length
}

export function groupProductsBySimilarity(products: Product[]): Product[][] {
  const groups: { [key: string]: Product[] } = {};
  
  products.forEach(product => {
    const baseId = generateBaseProductId(product.title);
    if (!groups[baseId]) {
      groups[baseId] = [];
    }
    groups[baseId].push(product);
  });
  
  // Return only groups with multiple products (cross-site comparison)
  return Object.values(groups).filter(group => group.length > 1);
}

export function convertApiProductToProduct(apiProduct: ApiProduct): Product {
  // Handle lastUpdated field safely
  let lastUpdatedDate: Date;
  if (apiProduct.lastUpdated) {
    const parsedDate = new Date(apiProduct.lastUpdated);
    lastUpdatedDate = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
  } else {
    lastUpdatedDate = new Date();
  }

  return {
    id: apiProduct.id,
    title: apiProduct.title,
    image: apiProduct.image,
    site: apiProduct.site,
    price: apiProduct.price,
    originalPrice: apiProduct.originalPrice,
    rating: apiProduct.rating,
    reviewCount: apiProduct.reviewCount,
    url: apiProduct.url,
    inStock: apiProduct.inStock,
    lastUpdated: lastUpdatedDate,
    alertThreshold: apiProduct.alertThreshold,
    hasAlert: apiProduct.hasAlert || false,
    baseProductId: generateBaseProductId(apiProduct.title),
  };
}

export function convertProductToApiProduct(product: Product): ApiProduct {
  // Handle lastUpdated field safely
  let lastUpdatedString: string;
  if (product.lastUpdated instanceof Date && !isNaN(product.lastUpdated.getTime())) {
    lastUpdatedString = product.lastUpdated.toISOString();
  } else if (typeof product.lastUpdated === 'string') {
    lastUpdatedString = product.lastUpdated;
  } else {
    lastUpdatedString = new Date().toISOString();
  }

  return {
    id: product.id,
    title: product.title,
    image: product.image,
    site: product.site,
    price: product.price,
    originalPrice: product.originalPrice,
    rating: product.rating,
    reviewCount: product.reviewCount,
    url: product.url,
    inStock: product.inStock,
    lastUpdated: lastUpdatedString,
    alertThreshold: product.alertThreshold,
    hasAlert: product.hasAlert,
  };
}
import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
        <div className="absolute inset-0 h-12 w-12 border-4 border-blue-200 rounded-full"></div>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-700">Searching for the best deals...</p>
      <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
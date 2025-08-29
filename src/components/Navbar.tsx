import React from 'react';
import { ShoppingCart, Heart, Info } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  trackedCount: number;
}

export default function Navbar({ currentPage, onPageChange, trackedCount }: NavbarProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: ShoppingCart },
    { id: 'tracked', label: 'Tracked Products', icon: Heart, badge: trackedCount },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">PriceCompare</span>
            </div>
          </div>
          
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    currentPage === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-1" />
                  {item.label}
                  {item.badge && item.badge > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
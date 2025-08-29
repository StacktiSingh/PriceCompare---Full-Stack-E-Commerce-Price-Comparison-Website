import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">PriceCompare</h3>
            <p className="text-gray-400 text-sm">
              Find the best deals across multiple e-commerce platforms. Save time and money with our intelligent price comparison.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Price Comparison</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Product Tracking</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Price Alerts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Deal Notifications</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Supported Sites</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Amazon</li>
              <li>Flipkart</li>
              <li>Myntra</li>
              <li>More coming soon...</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 PriceCompare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
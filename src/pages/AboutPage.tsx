import React from 'react';
import { Shield, Zap, Heart, Users } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your data is safe with us. We use enterprise-grade security to protect your information.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get price comparisons in seconds with our optimized search algorithms.',
    },
    {
      icon: Heart,
      title: 'User-Focused',
      description: 'Built with love for savvy shoppers who want to find the best deals.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join thousands of users who trust us to find the best prices online.',
    },
  ];

  const stats = [
    { label: 'Products Compared', value: '10M+' },
    { label: 'Money Saved', value: '₹50Cr+' },
    { label: 'Happy Users', value: '100K+' },
    { label: 'Partner Stores', value: '50+' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">PriceCompare</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to help you find the best deals online. Our platform compares prices across 
            multiple e-commerce sites so you can save time and money on every purchase.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Shopping online shouldn't be about settling for the first price you see. At PriceCompare, 
              we believe everyone deserves access to the best deals available. Our advanced technology 
              <li className="text-gray-500">More coming soon...</li>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
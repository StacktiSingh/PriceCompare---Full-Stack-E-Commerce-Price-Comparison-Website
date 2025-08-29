import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { format, subDays } from 'date-fns';
import { TrendingDown, TrendingUp, Calendar } from 'lucide-react';

interface PricePoint {
  date: string;
  price: number;
  site: string;
}

interface PriceHistoryChartProps {
  productTitle: string;
  currentPrice: number;
  site: string;
}

export default function PriceHistoryChart({ productTitle, currentPrice, site }: PriceHistoryChartProps) {
  // Generate mock historical data for demonstration
  const generateMockData = (): PricePoint[] => {
    const data: PricePoint[] = [];
    const today = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = subDays(today, i);
      // Create realistic price fluctuations
      const basePrice = currentPrice;
      const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
      const price = Math.round(basePrice * (1 + variation));
      
      data.push({
        date: format(date, 'MMM dd'),
        price,
        site,
      });
    }
    
    return data;
  };

  const data = generateMockData();
  const minPrice = Math.min(...data.map(d => d.price));
  const maxPrice = Math.max(...data.map(d => d.price));
  const priceChange = currentPrice - data[0].price;
  const priceChangePercent = Math.round((priceChange / data[0].price) * 100);
  const savings = maxPrice - minPrice;
  const savingsPercent = Math.round((savings / maxPrice) * 100);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-blue-600">
            Price: {formatPrice(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            30-Day Price History
          </h3>
          <p className="text-sm text-gray-600 line-clamp-1">{productTitle}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {formatPrice(currentPrice)}
          </div>
          <div className={`flex items-center gap-1 text-sm ${
            priceChange >= 0 ? 'text-red-600' : 'text-emerald-600'
          }`}>
            {priceChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span>{priceChangePercent > 0 ? '+' : ''}{priceChangePercent}% (30d)</span>
          </div>
        </div>
      </div>

      {/* Price Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-emerald-50 rounded-lg">
          <div className="text-lg font-bold text-emerald-700">{formatPrice(minPrice)}</div>
          <div className="text-xs text-emerald-600">30-Day Low</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-lg font-bold text-blue-700">{formatPrice(currentPrice)}</div>
          <div className="text-xs text-blue-600">Current Price</div>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="text-lg font-bold text-red-700">{formatPrice(maxPrice)}</div>
          <div className="text-xs text-red-600">30-Day High</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="date" 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#priceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">Price Insights</h4>
        <div className="text-sm text-gray-600 space-y-1">
          {currentPrice === minPrice && (
            <p className="text-emerald-600 font-medium">🎉 Currently at 30-day low price!</p>
          )}
          {currentPrice === maxPrice && (
            <p className="text-red-600 font-medium">⚠️ Currently at 30-day high price</p>
          )}
          <p>Price range: {formatPrice(minPrice)} - {formatPrice(maxPrice)}</p>
          <p>Average savings opportunity: {formatPrice(savings)} ({savingsPercent}%)</p>
        </div>
      </div>
    </div>
  );
}
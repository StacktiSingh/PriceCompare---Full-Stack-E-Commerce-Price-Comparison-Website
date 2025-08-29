import React, { useState } from 'react';
import { X, Target, TrendingDown, Percent, Calendar, Bell } from 'lucide-react';
import { AlertConfig } from '../types';

interface SmartAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSetAlert: (config: AlertConfig) => Promise<boolean>;
  productTitle: string;
  currentPrice: number;
  existingAlert?: AlertConfig;
}

export default function SmartAlertModal({ 
  isOpen, 
  onClose, 
  onSetAlert, 
  productTitle, 
  currentPrice,
  existingAlert 
}: SmartAlertModalProps) {
  const [alertType, setAlertType] = useState<'fixed' | 'percentage' | 'trend'>(
    existingAlert?.type || 'fixed'
  );
  const [alertValue, setAlertValue] = useState(
    existingAlert?.value || (alertType === 'fixed' ? currentPrice * 0.9 : 20)
  );
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getAlertDescription = () => {
    switch (alertType) {
      case 'fixed':
        return `Alert when price drops to ${formatPrice(alertValue)} or below`;
      case 'percentage':
        return `Alert when price drops by ${alertValue}% or more from current price`;
      case 'trend':
        return `Alert when price reaches lowest point in last ${alertValue} days`;
      default:
        return '';
    }
  };

  const handleSetAlert = async () => {
    setLoading(true);
    const config: AlertConfig = {
      type: alertType,
      value: alertValue,
      description: getAlertDescription(),
    };
    
    const success = await onSetAlert(config);
    setLoading(false);
    
    if (success) {
      onClose();
    }
  };

  const alertTypes = [
    {
      id: 'fixed' as const,
      icon: Target,
      title: 'Fixed Price Alert',
      description: 'Get notified when price drops to a specific amount',
      example: `e.g., Alert when price drops to ${formatPrice(currentPrice * 0.9)}`,
    },
    {
      id: 'percentage' as const,
      icon: Percent,
      title: 'Percentage Drop Alert',
      description: 'Get notified when price drops by a certain percentage',
      example: 'e.g., Alert when price drops by 20%',
    },
    {
      id: 'trend' as const,
      icon: TrendingDown,
      title: 'Trend-Based Alert',
      description: 'Get notified when price reaches historical low',
      example: 'e.g., Alert when price is lowest in 30 days',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Bell className="h-6 w-6 text-blue-600" />
              Smart Price Alert
            </h2>
            <p className="text-sm text-gray-600 mt-1 line-clamp-1">{productTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current Price Info */}
        <div className="p-6 bg-blue-50 border-b">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900 mb-1">
              {formatPrice(currentPrice)}
            </div>
            <div className="text-sm text-blue-700">Current Price</div>
          </div>
        </div>

        {/* Alert Type Selection */}
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Choose Alert Type</h3>
          <div className="space-y-3">
            {alertTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    alertType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    setAlertType(type.id);
                    // Set default values based on alert type
                    if (type.id === 'fixed') {
                      setAlertValue(currentPrice * 0.9);
                    } else if (type.id === 'percentage') {
                      setAlertValue(20);
                    } else if (type.id === 'trend') {
                      setAlertValue(30);
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      alertType === type.id ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        alertType === type.id ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{type.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{type.example}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alert Value Input */}
        <div className="px-6 pb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Set Alert Value</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {alertType === 'fixed' && 'Target Price (₹)'}
                {alertType === 'percentage' && 'Percentage Drop (%)'}
                {alertType === 'trend' && 'Time Period (days)'}
              </label>
              <input
                type="number"
                value={alertValue}
                onChange={(e) => setAlertValue(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={
                  alertType === 'fixed' ? 'Enter target price' :
                  alertType === 'percentage' ? 'Enter percentage' :
                  'Enter number of days'
                }
                min={alertType === 'fixed' ? 1 : alertType === 'percentage' ? 1 : 1}
                max={alertType === 'fixed' ? currentPrice : alertType === 'percentage' ? 90 : 365}
              />
            </div>

            {/* Preview */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Alert Preview</h4>
              <p className="text-sm text-gray-700">{getAlertDescription()}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSetAlert}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-medium flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Setting Alert...
              </>
            ) : (
              <>
                <Bell className="h-4 w-4" />
                {existingAlert ? 'Update Alert' : 'Set Alert'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
# PriceCompare - Smart Price Tracking Application

A modern, responsive web application built with React, TypeScript, and Tailwind CSS that helps users track product prices across multiple e-commerce platforms and get notified about price changes.

## 🚀 Features

### Core Functionality
- **Product Search & Discovery** - Search for products across multiple e-commerce platforms
- **Price Tracking** - Track prices for your favorite products and get notified of changes
- **Cross-Site Comparison** - Compare prices across different retailers
- **Price History Charts** - Visualize price trends over time with interactive charts
- **Smart Alerts** - Get intelligent notifications about significant price drops

### User Experience
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Real-time Updates** - Live price updates and notifications
- **Intuitive Interface** - Clean, modern UI with smooth animations
- **Toast Notifications** - User-friendly feedback for all actions
- **Loading States** - Smooth loading experiences throughout the app

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Code Quality**: ESLint with TypeScript support

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CrossSiteComparison.tsx
│   ├── PriceHistoryChart.tsx
│   ├── ProductCard.tsx
│   ├── SearchBar.tsx
│   ├── SmartAlertModal.tsx
│   └── ...
├── pages/              # Main application pages
│   ├── HomePage.tsx
│   ├── TrackedPage.tsx
│   └── AboutPage.tsx
├── services/           # API and external service integrations
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and helpers
└── data/               # Static data and configurations
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pricecompare.git
   cd pricecompare
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🌐 Deployment

This project is configured for easy deployment on [Render](https://render.com):

1. **Push your code to GitHub**
2. **Connect to Render** and select "Static Site"
3. **Render will automatically detect** the `render.yaml` configuration
4. **Your app will be live** with automatic deployments on every push

The project includes:
- `render.yaml` - Render deployment configuration
- `public/_redirects` - Client-side routing support
- Optimized build settings for production

## 🎯 Key Features Breakdown

### 🔍 Product Search
- Multi-platform product search
- Real-time search suggestions
- Advanced filtering options

### 📊 Price Tracking
- Add/remove products from tracking list
- Historical price data visualization
- Price change notifications

### 📈 Analytics Dashboard
- Interactive price history charts
- Cross-platform price comparison
- Trend analysis and insights

### 🔔 Smart Notifications
- Customizable price alerts
- Email/push notifications
- Smart recommendation system

## 🎨 Design System

- **Color Scheme**: Modern blue and gray palette
- **Typography**: Clean, readable fonts
- **Components**: Consistent, reusable UI elements
- **Responsive**: Mobile-first design approach
- **Accessibility**: WCAG compliant interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/) for lightning-fast development
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Charts powered by [Recharts](https://recharts.org/)
- Icons from [Lucide React](https://lucide.dev/)

---

**Live Demo**: https://pricecompare-full-stack-e-commerce-price.onrender.com/

**Repository**: https://github.com/StacktiSingh/PriceCompare---Full-Stack-E-Commerce-Price-Comparison-Website

Made with ❤️ by Shakti 

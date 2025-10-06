# Pet Paradise - Modern Pet Shop Website

![CI](https://github.com/your-org-or-user/your-repo-name/actions/workflows/ci.yml/badge.svg)

A modern, responsive pet shop website built with React, TypeScript, and TailwindCSS. This website allows customers to browse pets and accessories, view product details, and place orders via WhatsApp.

## 🚀 Features

### Homepage
- **Attractive Hero Section**: Eye-catching banner with call-to-action buttons
- **Category Highlights**: Easy navigation to different pet categories (Fish, Birds, Cats, Dogs, Accessories, Food)
- **Featured Products**: Showcase of popular products in a clean grid layout
- **New Arrivals**: Display of latest products
- **About Section**: Information about the pet shop's benefits

### Product Catalog
- **Category Pages**: Dedicated pages for each product category
- **Product Cards**: Clean, informative product cards with images, names, descriptions, and prices
- **Product Details**: Comprehensive product pages with detailed information
- **Related Products**: Suggestions for similar products
- **Stock Status**: Clear indication of product availability

### Ordering System
- **WhatsApp Integration**: "Order via WhatsApp" buttons on all product pages
- **Pre-filled Messages**: Automatic message generation with product details
- **Easy Communication**: Direct link to WhatsApp for seamless ordering

### Support Section
- **Floating WhatsApp Button**: Always-visible chat button for customer support
- **Contact Page**: Complete contact information with business hours
- **Contact Form**: User-friendly form for inquiries
- **Multiple Contact Methods**: Phone, email, and WhatsApp options

### Navigation & Layout
- **Sticky Header**: Navigation bar that stays at the top
- **Responsive Design**: Mobile-friendly layout with hamburger menu
- **Footer**: Comprehensive footer with links and contact information
- **Breadcrumbs**: Easy navigation within the site

### Design Features
- **Modern UI**: Clean, professional design with soft colors
- **TailwindCSS**: Utility-first CSS framework for consistent styling
- **Animations**: Smooth hover effects and transitions
- **Typography**: Professional font (Inter) for better readability
- **Color Scheme**: Blue and purple gradient theme

## ⚡ Performance Optimizations

### Code Splitting & Lazy Loading
- **Route-based Code Splitting**: Each page component is loaded only when needed
- **Suspense Boundaries**: Smooth loading states with fallback components
- **Dynamic Imports**: Components are imported dynamically to reduce initial bundle size

### Image Optimization
- **Lazy Loading**: Images load only when they come into view
- **Progressive Loading**: Placeholder images while content loads
- **WebP Support**: Modern image format support for better compression
- **Intersection Observer**: Efficient scroll-based loading detection
- **Quality Optimization**: Automatic image quality adjustment based on device

### Caching Strategies
- **Memory Cache**: In-memory caching for frequently accessed data
- **LocalStorage Cache**: Persistent caching for offline support
- **Service Worker Cache**: Advanced caching strategies for PWA
- **Cache Decorators**: Easy-to-use caching for functions and API calls

### Virtual Scrolling
- **Large List Optimization**: Efficient rendering of long product lists
- **Viewport-based Rendering**: Only visible items are rendered
- **Overscan Support**: Pre-loading items just outside viewport
- **Performance Monitoring**: Real-time performance metrics

### Service Worker Optimization
- **Multiple Cache Strategies**: 
  - Cache First for static assets
  - Network First for API requests
  - Stale While Revalidate for dynamic content
- **Background Sync**: Offline action handling
- **Push Notifications**: Enhanced notification system
- **Automatic Cleanup**: Periodic cache maintenance

### Performance Monitoring
- **Real-time Metrics**: FPS, memory usage, render times
- **Development Tools**: Performance monitor component
- **Cache Analytics**: Hit rates and performance statistics
- **Bundle Analysis**: Webpack bundle analyzer integration

## 🛠️ Technology Stack

- **React 18**: Modern React with functional components and hooks
- **TypeScript**: Type-safe JavaScript for better development experience
- **TailwindCSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Responsive Design**: Mobile-first approach
- **PWA Support**: Progressive Web App capabilities
- **Service Worker**: Advanced caching and offline support

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pet-shop-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the website.

## 🚀 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run build:prod` - Production build without source maps
- `npm run build:analyze` - Build and analyze bundle size
- `npm run build:lighthouse` - Build and run Lighthouse audit
- `npm run performance` - Performance testing with Lighthouse
- `npm run performance:dev` - Development performance testing
- `npm run analyze:webpack` - Webpack bundle analysis
- `npm run analyze:size` - Size limit analysis
- `npm run preview:build` - Preview production build
- `npm run clean` - Clean build and cache
- `npm run cache:clear` - Clear cache and restart
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended)

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Navbar.tsx          # Navigation bar component
│   ├── Footer.tsx          # Footer component
│   ├── ProductCard.tsx     # Product card component
│   ├── WhatsAppButton.tsx  # WhatsApp integration component
│   ├── ImageOptimizer.tsx  # Optimized image component
│   ├── VirtualProductList.tsx # Virtual scrolling for large lists
│   └── PerformanceMonitor.tsx # Performance monitoring component
├── pages/                  # Page components (lazy loaded)
│   ├── HomePage.tsx        # Homepage component
│   ├── ProductDetailPage.tsx # Product detail page
│   ├── CategoryPage.tsx    # Category listing page
│   └── ContactPage.tsx     # Contact page
├── hooks/                  # Custom React hooks
│   ├── usePerformance.ts   # Performance monitoring hook
│   └── usePWA.ts          # PWA functionality hook
├── utils/                  # Utility functions
│   ├── cache.ts            # Caching utilities
│   ├── lazyLoad.ts         # Lazy loading utilities
│   └── security.ts         # Security utilities
├── data/                   # Data files
│   └── products.ts         # Product data and utilities
├── App.tsx                 # Main app component with lazy loading
├── index.tsx               # App entry point
└── index.css               # Global styles and TailwindCSS imports
```

## 🔧 Performance Configuration

### Bundle Size Limits
- JavaScript: 500 KB
- CSS: 100 KB

### Caching Configuration
- Memory Cache: 5 minutes TTL, 100 items max
- LocalStorage Cache: 24 hours TTL
- Service Worker: Multiple cache strategies

### Image Optimization
- Lazy loading threshold: 50px before viewport
- WebP format support
- Quality optimization: 80% default
- Priority loading for above-the-fold images

## 📊 Performance Monitoring

The app includes comprehensive performance monitoring:

- **Real-time FPS tracking**
- **Memory usage monitoring**
- **Render time analysis**
- **Cache hit rate statistics**
- **Component mount tracking**
- **Page load performance metrics**

Access the performance monitor in development mode (top-right corner) to view real-time metrics.

## 🚀 Deployment

### Production Build
```bash
npm run build:prod
```

### Performance Audit
```bash
npm run build:lighthouse
```

### Bundle Analysis
```bash
npm run build:analyze
```

### Deploy via GitHub + Render

1. Prepare repository
   - Ensure `render.yaml` exists at the repo root (defines Static Site with build and publish to `build/`).
   - Keep `public/_redirects` (optional). SPA rewrites are already configured in `render.yaml`.
   - GitHub Actions workflow located at `.github/workflows/ci.yml` will run tests and build on pushes/PRs.

2. Push to GitHub
   - Commit changes and push to the `main` branch.

3. Create Render Blueprint (recommended)
   - In Render dashboard: New → Blueprint → select this GitHub repo/branch.
   - Render reads `render.yaml` and creates a Static Site named `sedefak-website`.
   - Build command: `npm ci && npm run build`
   - Publish directory: `build`

4. Environment variables (if needed)
   - Add build-time env vars in the Render service settings.

5. First deploy and verify
   - Click Deploy and wait for success.
   - Verify deep links like `/category/...`, `/product/...`, `/search` load correctly.

6. Continuous deployment
   - Keep Auto-Deploy enabled so every push to `main` triggers a new build and publish.

## 📈 Performance Best Practices

1. **Use VirtualProductList for large product lists**
2. **Implement ImageOptimizer for all images**
3. **Use cache decorators for expensive operations**
4. **Monitor performance metrics in development**
5. **Regular bundle size analysis**
6. **Lighthouse audits before deployment**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run performance tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

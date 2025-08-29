# Pet Paradise - Modern Pet Shop Website

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

## 🛠️ Technology Stack

- **React 18**: Modern React with functional components and hooks
- **TypeScript**: Type-safe JavaScript for better development experience
- **TailwindCSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Responsive Design**: Mobile-first approach

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
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation bar component
│   ├── Footer.tsx      # Footer component
│   ├── ProductCard.tsx # Product card component
│   └── WhatsAppButton.tsx # WhatsApp integration component
├── pages/              # Page components
│   ├── HomePage.tsx    # Homepage component
│   ├── ProductDetailPage.tsx # Product detail page
│   ├── CategoryPage.tsx # Category listing page
│   └── ContactPage.tsx # Contact page
├── data/               # Data files
│   └── products.ts     # Product data and utilities
├── App.tsx             # Main app component
├── index.tsx           # App entry point
└── index.css           # Global styles and TailwindCSS imports
```

## 🎨 Customization

### Colors
The website uses a custom color scheme defined in `tailwind.config.js`:
- Primary: Blue shades (`primary-50` to `primary-900`)
- Secondary: Purple shades (`secondary-50` to `secondary-900`)

### Products
Add or modify products in `src/data/products.ts`:
- Update product information
- Add new categories
- Modify pricing and descriptions

### WhatsApp Integration
Update the phone number in `src/components/WhatsAppButton.tsx`:
```typescript
phoneNumber = "+1234567890" // Replace with actual phone number
```

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory for any environment-specific configurations:
```
REACT_APP_WHATSAPP_NUMBER=+1234567890
REACT_APP_STORE_NAME=Pet Paradise
```

### TailwindCSS Configuration
Customize the design system in `tailwind.config.js`:
- Colors
- Fonts
- Animations
- Breakpoints

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

## 📞 Support

For support or questions:
- Email: info@petparadise.com
- Phone: +1 (555) 123-4567
- WhatsApp: Use the floating chat button on the website

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🎯 Future Enhancements

- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Product reviews and ratings
- [ ] Advanced filtering options
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Blog section
- [ ] Newsletter subscription
- [ ] Social media integration
- [ ] Multi-language support

---

**Built with ❤️ for pet lovers everywhere**

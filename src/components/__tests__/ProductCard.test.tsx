import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { StockProvider } from '../../context/StockContext';

// Mock StockContext
jest.mock('../../context/StockContext', () => ({
  ...jest.requireActual('../../context/StockContext'),
  useStock: () => ({
    getStockQuantity: () => 10,
    getStockStatus: () => 'in-stock',
    stockItems: {},
    updateStock: jest.fn(),
    setLowStockThreshold: jest.fn(),
  }),
}));

// Mock product data
const mockProduct = {
  id: 'test-product',
  name: 'Test Product',
  category: 'fish',
  price: 25.99,
  description: 'Test product description',
  shortDescription: 'Test short description',
  image: 'test-image.jpg',
  inStock: true,
  featured: false,
  new: false,
  species: 'Test Species',
  color: 'Test Color',
  socialBehavior: 'Test Behavior',
  waterParameters: {
    temperature: '22-26°C',
    pH: '6.0-7.5',
    hardness: '1-10 dGH'
  },
  size: '3-4 cm',
  difficulty: 'Kolay',
  breeding: 'Kolay',
  diet: 'Omnivor',
  lifespan: '3-5 yıl',
  tankSize: 'Minimum 40L'
};

// Wrapper component for testing
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <StockProvider>
      {children}
    </StockProvider>
  </BrowserRouter>
);

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} />
      </TestWrapper>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText(/25\.99/)).toBeInTheDocument();
    expect(screen.getByText('₺')).toBeInTheDocument();
    expect(screen.getByText('Test short description')).toBeInTheDocument();
  });

  it('displays stock status when in stock', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} />
      </TestWrapper>
    );

    // StockContext'ten gelen durumu kontrol et
    expect(screen.getByText(/Stokta/)).toBeInTheDocument();
  });

  it('displays difficulty badge for fish products', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} showDetails={true} />
      </TestWrapper>
    );

    expect(screen.getByText('Kolay')).toBeInTheDocument();
  });

  it('renders product image with correct alt text', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} />
      </TestWrapper>
    );

    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <TestWrapper>
        <ProductCard product={mockProduct} className="custom-class" />
      </TestWrapper>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});

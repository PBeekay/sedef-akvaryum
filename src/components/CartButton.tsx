import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartModal from './CartModal';

const CartButton: React.FC = () => {
  const { getTotalItems } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalItems = getTotalItems();

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
        title="Sepeti Görüntüle"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
        </svg>
        
        {/* Sepet sayısı badge */}
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </button>

      <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default CartButton;

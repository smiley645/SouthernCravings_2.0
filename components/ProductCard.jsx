'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { user, getToken } = useAuth();
  const { lang, t, formatPrice } = useLanguage();
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState('250g');

  const displayName = lang === 'ja' && product.nameJa ? product.nameJa : product.name;
  const multiplier = selectedWeight === '1kg' ? 4 : selectedWeight === '500g' ? 2 : 1;
  const displayPrice = product.price * multiplier;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      window.dispatchEvent(new Event('openLoginModal'));
      return;
    }

    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.uid,
        },
        body: JSON.stringify({
          productId: product._id || product.slug,
          name: product.name, // Keep English name in cart DB for consistency
          nameJa: product.nameJa || '',
          price: displayPrice,
          image: product.image,
          weight: selectedWeight,
          quantity: 1,
        }),
      });
      setAddedToCart(true);
      window.dispatchEvent(new Event('cartUpdated'));
      setTimeout(() => setAddedToCart(false), 1500);
    } catch (err) {
      console.error('Cart error:', err);
    }
  };

  return (
    <div className="card">
      <Link href={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
        <div className="card_items">
          <img src={product.image} alt={displayName} />
          <h2>{displayName}</h2>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="product-price">{formatPrice(displayPrice)}</span>
            <select 
              className="form-select form-select-sm" 
              style={{ width: '85px', fontSize: '0.85rem' }}
              value={selectedWeight}
              onChange={(e) => setSelectedWeight(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            >
              <option value="250g">250g</option>
              <option value="500g">500g</option>
              <option value="1kg">1kg</option>
            </select>
          </div>
        </div>
      </Link>
      <div className="card_items">
        <button onClick={handleAddToCart} disabled={addedToCart}>
          {addedToCart ? `✓ ${t('addedToCart')}` : t('addToCart')}
        </button>
      </div>
    </div>
  );
}

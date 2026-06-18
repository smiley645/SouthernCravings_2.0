'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function CartPage() {
  const { user, getToken } = useAuth();
  const { lang, t, formatPrice } = useLanguage();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    if (user) {
      try {
        const res = await fetch('/api/cart', {
          headers: { 'x-user-id': user.uid },
        });
        const data = await res.json();
        setCartItems(data.items || []);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    } else {
      setCartItems([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const updateQuantity = async (index, newQty) => {
    if (newQty < 1) return;

    const updatedItems = [...cartItems];
    updatedItems[index].quantity = newQty;
    setCartItems(updatedItems);

    if (user) {
      try {
        await fetch('/api/cart', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': user.uid,
          },
          body: JSON.stringify({
            productId: updatedItems[index].productId,
            weight: updatedItems[index].weight || '250g',
            quantity: newQty,
          }),
        });
      } catch (err) {
        console.error('Error updating cart:', err);
      }
    } else {
      localStorage.setItem('sc_cart', JSON.stringify(updatedItems));
    }
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = async (index) => {
    const item = cartItems[index];
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);

    if (user) {
      try {
        await fetch(`/api/cart?productId=${item.productId}&weight=${item.weight || '250g'}`, {
          method: 'DELETE',
          headers: { 'x-user-id': user.uid },
        });
      } catch (err) {
        console.error('Error removing item:', err);
      }
    } else {
      localStorage.setItem('sc_cart', JSON.stringify(updatedItems));
    }
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Navbar showHome />

      <div className="cart-page">
        <Link href="/" className="back-link">← {lang === 'ja' ? 'ショッピングを続ける' : 'Continue Shopping'}</Link>
        <h1>🛒 {t('yourCart')}</h1>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px' }}>Loading your cart...</p>
        ) : !user ? (
          <div className="cart-empty">
            <h2>{lang === 'ja' ? 'ログインしてください' : 'Please log in'}</h2>
            <p>{lang === 'ja' ? 'カートを表示するにはログインする必要があります。' : 'You need to be logged in to view your cart.'}</p>
            <button onClick={() => window.dispatchEvent(new Event('openLoginModal'))} className="product-detail-btn" style={{marginTop: '20px', width: 'auto'}}>{t('login')}</button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="cart-empty">
            <h2>{t('emptyCart')}</h2>
            <p>{lang === 'ja' ? 'アイテムが追加されていません。' : 'Looks like you haven\'t added any items yet.'}</p>
            <Link href="/">{lang === 'ja' ? 'ショッピングを始める →' : 'Start Shopping →'}</Link>
          </div>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={lang === 'ja' && item.nameJa ? item.nameJa : item.name} />
                <div className="cart-item-info">
                  <h3>{(lang === 'ja' && item.nameJa ? item.nameJa : item.name)} <span style={{fontSize:'0.9rem', color:'#666', fontWeight:'normal'}}>({item.weight || '250g'})</span></h3>
                  <span className="cart-item-price">{formatPrice(item.price)}</span>
                </div>
                <div className="cart-item-controls">
                  <button
                    className="cart-qty-btn"
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="cart-qty">{item.quantity}</span>
                  <button
                    className="cart-qty-btn"
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="cart-item-subtotal">{formatPrice(item.price * item.quantity)}</span>
                <button className="cart-remove-btn" onClick={() => removeItem(index)} title="Remove">
                  ✕
                </button>
              </div>
            ))}

            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>{t('items')} ({cartItems.reduce((s, i) => s + i.quantity, 0)})</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="cart-summary-row">
                <span>{t('delivery')}</span>
                <span style={{ color: '#28a745', fontWeight: 600 }}>{t('free')}</span>
              </div>
              <div className="cart-summary-row cart-summary-total">
                <span>{t('total')}</span>
                <span style={{ color: '#E67A00' }}>{formatPrice(total)}</span>
              </div>
              <button 
                className="btn w-100 mt-4 rounded-pill fw-bold" 
                style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '12px', fontSize: '1.1rem' }}
                onClick={() => alert("Redirecting to secure checkout... (Mock)")}
              >
                {t('proceedToCheckout')}
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

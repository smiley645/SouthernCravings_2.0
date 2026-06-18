'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import LoginModal from './LoginModal';

export default function Navbar({ showHome = false }) {
  const { user, logout } = useAuth();
  const { lang, toggleLanguage, t, formatPrice } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const searchRef = useRef(null);
  const searchTimeout = useRef(null);

  // Get cart count
  useEffect(() => {
    const updateCartCount = () => {
      if (user) {
        fetch('/api/cart', { headers: { 'x-user-id': user.uid } })
          .then(res => res.json())
          .then(data => {
            const count = (data.items || []).reduce((s, i) => s + i.quantity, 0);
            setCartCount(count);
          })
          .catch(() => {
            setCartCount(0);
          });
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, [user]);

  // Search handler with debounce
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (query.trim().length < 1) {
      setSearchResults([]);
      setShowSearch(false);
      return;
    }

    searchTimeout.current = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setSearchResults(data);
            setShowSearch(true);
          }
        })
        .catch(() => {});
    }, 300);
  };

  // Click outside to close search
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
      // Close user menu
      if (!e.target.closest('.user-menu')) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Listen for open login modal event from other components
  useEffect(() => {
    const handleOpenLogin = () => setShowLoginModal(true);
    window.addEventListener('openLoginModal', handleOpenLogin);
    return () => window.removeEventListener('openLoginModal', handleOpenLogin);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-container-custom">

            {/* Logo */}
            <Link href="/" className="navbar-brand fw-bold mb-0" id="logo" style={{ color: '#ffc107', textDecoration: 'none' }}>
              {lang === 'ja' ? (
                <>サザン<span style={{ color: 'green' }}>クレイビングス</span></>
              ) : (
                <>Southern<span style={{ color: 'green' }}>Cravings</span></>
              )}
            </Link>

            {/* Search Bar */}
            <form className="flex-grow-1" onSubmit={handleSearchSubmit} ref={searchRef}>
              <div className="position-relative w-100 search-overlay-container" style={{ maxWidth: '600px' }}>
                <input
                  type="text"
                  className="form-control form-control-lg ps-5 rounded-pill"
                  placeholder={t('searchPlaceholder')}
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearch}
                  onFocus={() => searchResults.length > 0 && setShowSearch(true)}
                />
                {/* Search overlay dropdown */}
                {showSearch && (
                  <div className="search-overlay">
                    {searchResults.length === 0 ? (
                      <div className="search-no-results">
                        No results found for &ldquo;{searchQuery}&rdquo;
                      </div>
                    ) : (
                      searchResults.map((product) => (
                        <Link
                          href={`/product/${product.slug}`}
                          key={product.slug || product._id}
                          className="search-result-item"
                          onClick={() => { setShowSearch(false); setSearchQuery(''); }}
                        >
                          <img src={product.image} alt={product.name} />
                          <div className="search-result-info">
                            <h4>{lang === 'ja' && product.nameJa ? product.nameJa : product.name}</h4>
                            <span>{product.stateName}</span>
                          </div>
                          <span className="search-result-price">{formatPrice(product.price)}</span>
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </div>
            </form>

            {/* Navigation Items */}
            <div className="d-flex align-items-center gap-3 flex-shrink-0 navbar-nav-items">
              {showHome && (
                <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>{t('home')}</Link>
              )}

              {/* Language Toggle */}
              <button
                className="btn btn-outline-light d-flex align-items-center gap-1 rounded-pill"
                onClick={toggleLanguage}
                title="Toggle Language"
              >
                🌐 {lang === 'en' ? 'EN' : 'JA'}
              </button>

              {/* Login / User Menu */}
              {user ? (
                <div className="user-menu">
                  <button
                    className="user-menu-btn"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    👤 {user.displayName || 'User'} ▾
                  </button>
                  {showUserMenu && (
                    <div className="user-dropdown">
                      <button onClick={() => { logout(); setShowUserMenu(false); }}>
                        🚪 {t('logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  className="nav-link"
                  style={{ textDecoration: 'none', cursor: 'pointer' }}
                  onClick={() => setShowLoginModal(true)}
                >
                  {t('login')}
                </a>
              )}

              {/* Cart */}
              <Link href="/cart" className="btn btn-light d-flex align-items-center gap-2 rounded-pill" style={{ textDecoration: 'none' }}>
                🛒 <span>{t('cart')}</span>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
            </div>

          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
}

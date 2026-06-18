'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const STATES = [
  { name: 'Andhra', slug: 'andhra', image: '/images/Tirumala_090615.jpg.webp' },
  { name: 'Kerala', slug: 'kerala', image: '/images/Festivals-of-Kerala.jpg' },
  { name: 'Karnataka', slug: 'karnataka', image: '/images/MysorePalace1.jpeg.jpg' },
  { name: 'Telangana', slug: 'telangana', image: '/images/Charminar_Hyderabad_1.jpg' },
  { name: 'Tamil Nadu', slug: 'tamilnadu', image: '/images/tamil.jpeg.jpg' },
];

// Featured products to show on home page (fallback if DB is not connected)
const FEATURED_PRODUCTS = [
  { name: 'Bobatlu', price: 160, image: '/Ap_img/bobatlu.jpg', slug: 'bobatlu', state: 'andhra', stateName: 'Andhra Pradesh' },
  { name: 'Kozhukatta', price: 200, image: '/ker_img/kozhukattai.jpg', slug: 'kozhukatta', state: 'kerala', stateName: 'Kerala' },
  { name: 'Belgaum Kunda', price: 180, image: '/kar_img/BelgaumKunda.webp', slug: 'belgaum-kunda', state: 'karnataka', stateName: 'Karnataka' },
  { name: 'Nalla Karam', price: 300, image: '/hyb_img/karamhyb.jpg', slug: 'nalla-karam', state: 'telangana', stateName: 'Telangana' },
  { name: 'Verkkadalai Laddu', price: 150, image: '/tamil_img/Verkkadalai laddu.jpg', slug: 'verkkadalai-laddu', state: 'tamilnadu', stateName: 'Tamil Nadu' },
  { name: 'Peanut Chikki', price: 200, image: '/hyb_img/Peanut-Chikkihyb.jpg', slug: 'peanut-chikki', state: 'telangana', stateName: 'Telangana' },
  { name: 'Nippattu', price: 180, image: '/kar_img/nippattu.webp', slug: 'nippattu', state: 'karnataka', stateName: 'Karnataka' },
  { name: 'Mango Pickle', price: 150, image: '/Ap_img/pickle_img.jpg', slug: 'mango-pickle', state: 'andhra', stateName: 'Andhra Pradesh' },
];

export default function HomePage() {
  const { t, lang } = useLanguage();
  const [products, setProducts] = useState(FEATURED_PRODUCTS);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Pick one from each state for featured, plus extras
          const featured = [];
          const states = ['andhra', 'telangana', 'karnataka', 'kerala', 'tamilnadu'];
          states.forEach(state => {
            const stateProducts = data.filter(p => p.state === state);
            if (stateProducts.length > 0) {
              featured.push(stateProducts[0]);
              if (stateProducts.length > 1) featured.push(stateProducts[1]);
            }
          });
          if (featured.length > 0) {
            setProducts(featured.slice(0, 8));
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar />

      {/* Soulful Flavors Section - EXACT same as original */}
      <div className="container py-5 mt-5 states-section-card">
        <h2 className="text-center fw-semibold mb-5 display-6">
          {lang === 'ja' ? '南インドの本場の味' : 'Soulful flavors of authentic Southern States'}
        </h2>
        <div className="row justify-content-center g-4">
          {STATES.map((state) => (
            <div key={state.slug} className="col-6 col-sm-4 col-md-3 col-lg-2 text-center">
              <Link href={`/state/${state.slug}`}>
                <img
                  src={state.image}
                  alt={state.name}
                  className="img-fluid rounded-circle shadow-sm state_images"
                />
              </Link>
              <p className="mt-3 fw-medium fs-5">{t(state.slug)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Our Range Section */}
      <main className="main_container">
        <div className="section_title">
          <div className="line"></div>
          <div className="line"></div>
          <h1>{lang === 'ja' ? '商品のラインナップ' : 'Explore Our Range'}</h1>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <div className="rows">
          {products.map((product, index) => (
            <ProductCard key={product.slug || index} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

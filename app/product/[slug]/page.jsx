'use client';

import { useState, useEffect, use } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

// Complete fallback product data for all 40 items
const ALL_PRODUCTS = [
  { name: 'Kakinada Kaja', price: 120, image: '/Ap_img/kkd_kaja1.jpg', slug: 'kakinada-kaja', state: 'andhra', stateName: 'Andhra Pradesh', description: 'Crispy, flaky pastry soaked in sugar syrup — a legendary sweet from Kakinada.' },
  { name: 'Ladoo', price: 150, image: '/Ap_img/Andhra_ladoo.jpg', slug: 'ladoo', state: 'andhra', stateName: 'Andhra Pradesh', description: 'Golden, melt-in-your-mouth Boondi Ladoo made with pure ghee and love.' },
  { name: 'Mango Jelly', price: 200, image: '/Ap_img/Andhra_mango_jelly.jpg', slug: 'mango-jelly', state: 'andhra', stateName: 'Andhra Pradesh', description: 'Sweet and tangy mango jelly candy — a nostalgic Andhra treat.' },
  { name: 'Ariselu', price: 180, image: '/Ap_img/Andhra_ariselu.jpg', slug: 'ariselu', state: 'andhra', stateName: 'Andhra Pradesh', description: 'Traditional rice flour sweet fried to golden perfection with jaggery.' },
  { name: 'Jagery Potarakulu', price: 150, image: '/Ap_img/Andhra_potarakulu.jpg', slug: 'jagery-potarakulu', state: 'andhra', stateName: 'Andhra Pradesh', description: 'Paper-thin rice sheets layered with jaggery and ghee — Atreyapuram specialty.' },
  { name: 'Bobatlu', price: 160, image: '/Ap_img/bobatlu.jpg', slug: 'bobatlu', state: 'andhra', stateName: 'Andhra Pradesh', description: 'Soft flatbreads stuffed with sweet chana dal and jaggery filling.' },
  { name: 'Jantikalu', price: 140, image: '/Ap_img/jantikalu.jpg', slug: 'jantikalu', state: 'andhra', stateName: 'Andhra Pradesh', description: 'Crunchy, spiced rice flour snack shaped by hand — perfect tea-time treat.' },
  { name: 'Kaja', price: 200, image: '/Ap_img/andhra_kaja.jpg', slug: 'kaja', state: 'andhra', stateName: 'Andhra Pradesh', description: 'Diamond-shaped layered pastry dipped in sugar syrup — Andhra classic.' },
  { name: 'Mango Pickle', price: 150, image: '/Ap_img/pickle_img.jpg', slug: 'mango-pickle', state: 'andhra', stateName: 'Andhra Pradesh', description: 'Fiery Andhra-style raw mango pickle with mustard and red chili.' },
  { name: 'Peanut Chikki', price: 200, image: '/hyb_img/Peanut-Chikkihyb.jpg', slug: 'peanut-chikki', state: 'telangana', stateName: 'Telangana', description: 'Crunchy peanut brittle made with jaggery — a beloved Hyderabadi snack.' },
  { name: 'Sakinalu', price: 150, image: '/hyb_img/sakinaku.webp', slug: 'sakinalu', state: 'telangana', stateName: 'Telangana', description: 'Crispy spiral rice flour snack — a Telangana Sankranti festival essential.' },
  { name: 'Rava Laddu', price: 300, image: '/hyb_img/ravaladdu.jpeg', slug: 'rava-laddu', state: 'telangana', stateName: 'Telangana', description: 'Melt-in-mouth semolina balls with cashews, raisins, and cardamom.' },
  { name: 'Gavvalu', price: 300, image: '/hyb_img/gavvalu.webp', slug: 'gavvalu', state: 'telangana', stateName: 'Telangana', description: 'Shell-shaped sweet snacks coated in sugar syrup — festive Telangana favorite.' },
  { name: 'Boondhi', price: 300, image: '/hyb_img/boondhi.jpg', slug: 'boondhi', state: 'telangana', stateName: 'Telangana', description: 'Tiny crispy gram flour drops — perfect as a snack or sweet base.' },
  { name: 'Chegodilu', price: 300, image: '/hyb_img/Chegodilu.jpg', slug: 'chegodilu', state: 'telangana', stateName: 'Telangana', description: 'Ring-shaped crunchy rice flour snack with sesame and cumin.' },
  { name: 'Nuvvula Laddu', price: 300, image: '/hyb_img/Nuvvula Laddu 1-800x800.jpg', slug: 'nuvvula-laddu', state: 'telangana', stateName: 'Telangana', description: 'Nutritious sesame seed balls bound with jaggery — winter delicacy.' },
  { name: 'Nalla Karam', price: 300, image: '/hyb_img/karamhyb.jpg', slug: 'nalla-karam', state: 'telangana', stateName: 'Telangana', description: 'Fiery black sesame chutney powder — the soul of Telangana meals.' },
  { name: 'Kadubali', price: 200, image: '/kar_img/kadubali.webp', slug: 'kadubali', state: 'karnataka', stateName: 'Karnataka', description: 'Steamed rice dumplings wrapped in jackfruit leaves — a Karnataka festive treat.' },
  { name: 'Kobbarimittai', price: 150, image: '/kar_img/kobbarimittai.webp', slug: 'kobbarimittai', state: 'karnataka', stateName: 'Karnataka', description: 'Sweet coconut candy flavored with cardamom — childhood nostalgia.' },
  { name: 'Antinundi', price: 180, image: '/kar_img/Antinundi.webp', slug: 'antinundi', state: 'karnataka', stateName: 'Karnataka', description: 'Crispy, flaky wheat-based sweet from North Karnataka — melt-in-mouth goodness.' },
  { name: 'Avalakki Mixture', price: 140, image: '/kar_img/avalakki mixture8.JPG', slug: 'avalakki-mixture', state: 'karnataka', stateName: 'Karnataka', description: 'Crunchy flattened rice snack mix with peanuts, curry leaves, and spices.' },
  { name: 'Ravaladdu', price: 180, image: '/kar_img/ravaladdu.jpeg', slug: 'ravaladdu', state: 'karnataka', stateName: 'Karnataka', description: 'Soft semolina laddu with ghee, coconut, and cardamom — pure bliss.' },
  { name: 'Nippattu', price: 180, image: '/kar_img/nippattu.webp', slug: 'nippattu', state: 'karnataka', stateName: 'Karnataka', description: 'Thin, crispy rice crackers seasoned with peanuts, dill, and chili — Karnataka specialty.' },
  { name: 'Mysorepak', price: 180, image: '/kar_img/mysorepak tamil.jpeg', slug: 'mysorepak', state: 'karnataka', stateName: 'Karnataka', description: 'Rich, buttery gram flour fudge from the Mysore Palace kitchens.' },
  { name: 'Belgaum Kunda', price: 180, image: '/kar_img/BelgaumKunda.webp', slug: 'belgaum-kunda', state: 'karnataka', stateName: 'Karnataka', description: 'Caramelized milk sweet from Belgaum — rich, dense, and unforgettable.' },
  { name: 'Unniyappam', price: 200, image: '/ker_img/unniyappam0.webp', slug: 'unniyappam', state: 'kerala', stateName: 'Kerala', description: 'Sweet banana fritters with jaggery and cardamom — a Kerala temple offering.' },
  { name: 'Achappam', price: 150, image: '/ker_img/achappam.jpg', slug: 'achappam', state: 'kerala', stateName: 'Kerala', description: 'Delicate rose-shaped cookie fried crispy — a Syrian Christian Christmas treat.' },
  { name: 'Sharkara Varatti', price: 200, image: '/ker_img/sharkara varatti.png', slug: 'sharkara-varatti', state: 'kerala', stateName: 'Kerala', description: 'Jaggery-coated banana chips — sweet, crunchy Sabarimala prasadam.' },
  { name: 'Kaya Varuthathu', price: 200, image: '/ker_img/banana-chips.jpg', slug: 'kaya-varuthathu', state: 'kerala', stateName: 'Kerala', description: 'Thin, crispy banana chips fried in coconut oil — the taste of Kerala.' },
  { name: 'Chakku Varuthathu', price: 200, image: '/ker_img/jackfruitchips.jpg', slug: 'chakku-varuthathu', state: 'kerala', stateName: 'Kerala', description: 'Crispy jackfruit chips with a hint of salt — tropical Kerala goodness.' },
  { name: 'Avalose Unda', price: 200, image: '/ker_img/Avalose-Unda-1.jpg', slug: 'avalose-unda', state: 'kerala', stateName: 'Kerala', description: 'Sweet rice flake balls with jaggery and cardamom — traditional Kerala sweet.' },
  { name: 'Kuzhalappam', price: 200, image: '/ker_img/kuzhalappam.avif', slug: 'kuzhalappam', state: 'kerala', stateName: 'Kerala', description: 'Hollow tube-shaped rice snack — crispy and addictive Kerala specialty.' },
  { name: 'Kozhukatta', price: 200, image: '/ker_img/kozhukattai.jpg', slug: 'kozhukatta', state: 'kerala', stateName: 'Kerala', description: 'Steamed rice dumplings with sweet coconut filling — Onam festival essential.' },
  { name: 'Ribbon Pakoda', price: 200, image: '/tamil_img/ribbon-pakoda1.jpg', slug: 'ribbon-pakoda', state: 'tamilnadu', stateName: 'Tamil Nadu', description: 'Long ribbon-shaped crispy snack made with rice and gram flour.' },
  { name: 'Murukku', price: 150, image: '/tamil_img/murukku-recipe.jpg', slug: 'murukku', state: 'tamilnadu', stateName: 'Tamil Nadu', description: 'Spiral-shaped crunchy rice snack — the king of South Indian snacks.' },
  { name: 'Manoharam', price: 150, image: '/tamil_img/manoharam.jpg', slug: 'manoharam', state: 'tamilnadu', stateName: 'Tamil Nadu', description: 'Flaky, melt-in-mouth sweet made with rice flour and jaggery.' },
  { name: 'Pori Undai', price: 150, image: '/tamil_img/murmuralado.jpg', slug: 'pori-undai', state: 'tamilnadu', stateName: 'Tamil Nadu', description: 'Puffed rice balls bound with jaggery — light, sweet, and crunchy.' },
  { name: 'Kadalaurundda', price: 150, image: '/tamil_img/kadalaurunddai0.jpg', slug: 'kadalaurundda', state: 'tamilnadu', stateName: 'Tamil Nadu', description: 'Roasted peanut balls with jaggery — protein-packed Tamil Nadu snack.' },
  { name: 'Palakova', price: 150, image: '/tamil_img/palkovasrivalliputhurtamil.jpg', slug: 'palakova', state: 'tamilnadu', stateName: 'Tamil Nadu', description: 'Slow-cooked milk fudge from Srivilliputhur — rich and creamy.' },
  { name: 'Tirunelveli Halwa', price: 150, image: '/tamil_img/tirunlvelihalwa.jpeg', slug: 'tirunelveli-halwa', state: 'tamilnadu', stateName: 'Tamil Nadu', description: 'Famous wheat halwa from Tirunelveli — bouncy, sweet, and aromatic.' },
  { name: 'Verkkadalai Laddu', price: 150, image: '/tamil_img/Verkkadalai laddu.jpg', slug: 'verkkadalai-laddu', state: 'tamilnadu', stateName: 'Tamil Nadu', description: 'Crunchy peanut laddu with jaggery — a Tamil Nadu festival favorite.' },
];

export default function ProductDetailPage({ params }) {
  const { slug } = use(params);
  const { user, getToken } = useAuth();
  const { lang, t, formatPrice } = useLanguage();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedWeight, setSelectedWeight] = useState('250g');

  useEffect(() => {
    // Try to fetch from API first
    fetch(`/api/products?slug=${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
        // Fetch related products from same state
        return fetch(`/api/products?state=${data.state}`);
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRelated(data.filter(p => p.slug !== slug).slice(0, 4));
        }
      })
      .catch(() => {
        // Fallback to static data
        const found = ALL_PRODUCTS.find(p => p.slug === slug);
        if (found) {
          setProduct(found);
          setRelated(ALL_PRODUCTS.filter(p => p.state === found.state && p.slug !== slug).slice(0, 4));
        }
        setLoading(false);
      });
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;

    if (!user) {
      window.dispatchEvent(new Event('openLoginModal'));
      return;
    }

    try {
      const token = await getToken();
      const multiplier = selectedWeight === '1kg' ? 4 : selectedWeight === '500g' ? 2 : 1;
      const displayPrice = product.price * multiplier;

      await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.uid,
        },
        body: JSON.stringify({
          productId: product._id || product.slug,
          name: product.name,
          nameJa: product.nameJa || '',
          price: displayPrice,
          image: product.image,
          weight: selectedWeight,
          quantity: 1,
        }),
      });
      setAddedToCart(true);
      window.dispatchEvent(new Event('cartUpdated'));
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (err) {
      console.error('Cart error:', err);
    }

    setAddedToCart(true);
    window.dispatchEvent(new Event('cartUpdated'));
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <>
        <Navbar showHome />
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar showHome />
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <h2>{lang === 'ja' ? '商品が見つかりません' : 'Product not found'}</h2>
          <Link href="/" className="back-link">← {lang === 'ja' ? 'ホームに戻る' : 'Back to Home'}</Link>
        </div>
        <Footer />
      </>
    );
  }

  const displayName = lang === 'ja' && product.nameJa ? product.nameJa : product.name;
  const displayDesc = lang === 'ja' && product.descriptionJa ? product.descriptionJa : product.description;

  return (
    <>
      <Navbar showHome />

      {addedToCart && (
        <div className="cart-notification">✓ {t('addedToCart')}!</div>
      )}

      <div className="product-detail">
        <Link href={product.state ? `/state/${product.state}` : '/'} className="back-link" style={{ width: '100%' }}>
          ← {lang === 'ja' ? '戻る' : 'Back'}
        </Link>

        <div className="product-detail-image">
          <img src={product.image} alt={displayName} />
        </div>

        <div className="product-detail-info">
          <h1>{displayName}</h1>
          <p className="product-detail-state">{t('from')} {t(product.state)}</p>
          <div className="d-flex align-items-center gap-3 mb-3">
            <p className="product-detail-price mb-0" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {formatPrice(product.price * (selectedWeight === '1kg' ? 4 : selectedWeight === '500g' ? 2 : 1))}
            </p>
            <select 
              className="form-select form-select-lg" 
              style={{ width: 'auto' }}
              value={selectedWeight}
              onChange={(e) => setSelectedWeight(e.target.value)}
            >
              <option value="250g">250g</option>
              <option value="500g">500g</option>
              <option value="1kg">1kg</option>
            </select>
          </div>
          <p className="product-detail-desc">
            {displayDesc || `Authentic ${product.name} from ${product.stateName}.`}
          </p>
          <button
            className="product-detail-btn"
            onClick={handleAddToCart}
            disabled={addedToCart}
          >
            {addedToCart ? `✓ ${t('addedToCart')}` : `🛒 ${t('addToCart')}`}
          </button>
        </div>

        {related.length > 0 && (
          <div className="related-products">
            <h2>{t('relatedProducts')} {t(product.state)}</h2>
            <div className="d-flex flex-wrap justify-content-center gap-4 mt-4">
              {related.map((rp, idx) => (
                <ProductCard key={rp.slug || idx} product={rp} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

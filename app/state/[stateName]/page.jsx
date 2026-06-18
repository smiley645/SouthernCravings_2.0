'use client';

import { useState, useEffect, use } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/context/LanguageContext';

const STATE_INFO = {
  andhra: {
    displayName: 'Andhra Pradesh',
    title: 'Andhra Special Food',
    description: 'Discover the bold, spicy, and unforgettable flavors of Andhra cuisine — handpicked dishes that bring tradition to your plate.',
    fallbackProducts: [
      { name: 'Kakinada Kaja', price: 120, image: '/Ap_img/kkd_kaja1.jpg', slug: 'kakinada-kaja', state: 'andhra', stateName: 'Andhra Pradesh' },
      { name: 'Ladoo', price: 150, image: '/Ap_img/Andhra_ladoo.jpg', slug: 'ladoo', state: 'andhra', stateName: 'Andhra Pradesh' },
      { name: 'Mango Jelly', price: 200, image: '/Ap_img/Andhra_mango_jelly.jpg', slug: 'mango-jelly', state: 'andhra', stateName: 'Andhra Pradesh' },
      { name: 'Ariselu', price: 180, image: '/Ap_img/Andhra_ariselu.jpg', slug: 'ariselu', state: 'andhra', stateName: 'Andhra Pradesh' },
      { name: 'Jagery Potarakulu', price: 150, image: '/Ap_img/Andhra_potarakulu.jpg', slug: 'jagery-potarakulu', state: 'andhra', stateName: 'Andhra Pradesh' },
      { name: 'Bobatlu', price: 160, image: '/Ap_img/bobatlu.jpg', slug: 'bobatlu', state: 'andhra', stateName: 'Andhra Pradesh' },
      { name: 'Jantikalu', price: 140, image: '/Ap_img/jantikalu.jpg', slug: 'jantikalu', state: 'andhra', stateName: 'Andhra Pradesh' },
      { name: 'Kaja', price: 200, image: '/Ap_img/andhra_kaja.jpg', slug: 'kaja', state: 'andhra', stateName: 'Andhra Pradesh' },
    ],
  },
  telangana: {
    displayName: 'Telangana',
    title: 'Telangana Special Food',
    description: "Experience the rich, spicy, and unique flavors of Telangana cuisine — authentic dishes that celebrate the region's vibrant culinary heritage.",
    fallbackProducts: [
      { name: 'Peanut Chikki', price: 200, image: '/hyb_img/Peanut-Chikkihyb.jpg', slug: 'peanut-chikki', state: 'telangana', stateName: 'Telangana' },
      { name: 'Sakinalu', price: 150, image: '/hyb_img/sakinaku.webp', slug: 'sakinalu', state: 'telangana', stateName: 'Telangana' },
      { name: 'Rava Laddu', price: 300, image: '/hyb_img/ravaladdu.jpeg', slug: 'rava-laddu', state: 'telangana', stateName: 'Telangana' },
      { name: 'Gavvalu', price: 300, image: '/hyb_img/gavvalu.webp', slug: 'gavvalu', state: 'telangana', stateName: 'Telangana' },
      { name: 'Boondhi', price: 300, image: '/hyb_img/boondhi.jpg', slug: 'boondhi', state: 'telangana', stateName: 'Telangana' },
      { name: 'Chegodilu', price: 300, image: '/hyb_img/Chegodilu.jpg', slug: 'chegodilu', state: 'telangana', stateName: 'Telangana' },
      { name: 'Nuvvula Laddu', price: 300, image: '/hyb_img/Nuvvula Laddu 1-800x800.jpg', slug: 'nuvvula-laddu', state: 'telangana', stateName: 'Telangana' },
      { name: 'Nalla Karam', price: 300, image: '/hyb_img/karamhyb.jpg', slug: 'nalla-karam', state: 'telangana', stateName: 'Telangana' },
    ],
  },
  karnataka: {
    displayName: 'Karnataka',
    title: 'Karnataka Special Food',
    description: "Experience the rich and varied flavors of Karnataka cuisine — famous for its unique blend of spices, traditional recipes, and culinary heritage from the heart of South India.",
    fallbackProducts: [
      { name: 'Kadubali', price: 200, image: '/kar_img/kadubali.webp', slug: 'kadubali', state: 'karnataka', stateName: 'Karnataka' },
      { name: 'Kobbarimittai', price: 150, image: '/kar_img/kobbarimittai.webp', slug: 'kobbarimittai', state: 'karnataka', stateName: 'Karnataka' },
      { name: 'Antinundi', price: 180, image: '/kar_img/Antinundi.webp', slug: 'antinundi', state: 'karnataka', stateName: 'Karnataka' },
      { name: 'Avalakki Mixture', price: 140, image: '/kar_img/avalakki mixture8.JPG', slug: 'avalakki-mixture', state: 'karnataka', stateName: 'Karnataka' },
      { name: 'Ravaladdu', price: 180, image: '/kar_img/ravaladdu.jpeg', slug: 'ravaladdu', state: 'karnataka', stateName: 'Karnataka' },
      { name: 'Nippattu', price: 180, image: '/kar_img/nippattu.webp', slug: 'nippattu', state: 'karnataka', stateName: 'Karnataka' },
      { name: 'Mysorepak', price: 180, image: '/kar_img/mysorepak tamil.jpeg', slug: 'mysorepak', state: 'karnataka', stateName: 'Karnataka' },
      { name: 'Belgaum Kunda', price: 180, image: '/kar_img/BelgaumKunda.webp', slug: 'belgaum-kunda', state: 'karnataka', stateName: 'Karnataka' },
    ],
  },
  kerala: {
    displayName: 'Kerala',
    title: 'Kerala Special Food',
    description: "Experience the authentic flavors of Kerala — where coconut, spices, and tradition blend to create a cuisine as lush and vibrant as the land itself. Savor the taste of God's Own Country!",
    fallbackProducts: [
      { name: 'Unniyappam', price: 200, image: '/ker_img/unniyappam0.webp', slug: 'unniyappam', state: 'kerala', stateName: 'Kerala' },
      { name: 'Achappam', price: 150, image: '/ker_img/achappam.jpg', slug: 'achappam', state: 'kerala', stateName: 'Kerala' },
      { name: 'Sharkara Varatti', price: 200, image: '/ker_img/sharkara varatti.png', slug: 'sharkara-varatti', state: 'kerala', stateName: 'Kerala' },
      { name: 'Kaya Varuthathu', price: 200, image: '/ker_img/banana-chips.jpg', slug: 'kaya-varuthathu', state: 'kerala', stateName: 'Kerala' },
      { name: 'Chakku Varuthathu', price: 200, image: '/ker_img/jackfruitchips.jpg', slug: 'chakku-varuthathu', state: 'kerala', stateName: 'Kerala' },
      { name: 'Avalose Unda', price: 200, image: '/ker_img/Avalose-Unda-1.jpg', slug: 'avalose-unda', state: 'kerala', stateName: 'Kerala' },
      { name: 'Kuzhalappam', price: 200, image: '/ker_img/kuzhalappam.avif', slug: 'kuzhalappam', state: 'kerala', stateName: 'Kerala' },
      { name: 'Kozhukatta', price: 200, image: '/ker_img/kozhukattai.jpg', slug: 'kozhukatta', state: 'kerala', stateName: 'Kerala' },
    ],
  },
  tamilnadu: {
    displayName: 'Tamil Nadu',
    title: 'Tamil Nadu Special Food',
    description: "Discover the diverse and aromatic flavors of Tamil Nadu cuisine — where every dish tells a story of tradition, vibrant spices, and the rich cultural heritage of the southern coast.",
    fallbackProducts: [
      { name: 'Ribbon Pakoda', price: 200, image: '/tamil_img/ribbon-pakoda1.jpg', slug: 'ribbon-pakoda', state: 'tamilnadu', stateName: 'Tamil Nadu' },
      { name: 'Murukku', price: 150, image: '/tamil_img/murukku-recipe.jpg', slug: 'murukku', state: 'tamilnadu', stateName: 'Tamil Nadu' },
      { name: 'Manoharam', price: 150, image: '/tamil_img/manoharam.jpg', slug: 'manoharam', state: 'tamilnadu', stateName: 'Tamil Nadu' },
      { name: 'Pori Undai', price: 150, image: '/tamil_img/murmuralado.jpg', slug: 'pori-undai', state: 'tamilnadu', stateName: 'Tamil Nadu' },
      { name: 'Kadalaurundda', price: 150, image: '/tamil_img/kadalaurunddai0.jpg', slug: 'kadalaurundda', state: 'tamilnadu', stateName: 'Tamil Nadu' },
      { name: 'Palakova', price: 150, image: '/tamil_img/palkovasrivalliputhurtamil.jpg', slug: 'palakova', state: 'tamilnadu', stateName: 'Tamil Nadu' },
      { name: 'Tirunelveli Halwa', price: 150, image: '/tamil_img/tirunlvelihalwa.jpeg', slug: 'tirunelveli-halwa', state: 'tamilnadu', stateName: 'Tamil Nadu' },
      { name: 'Verkkadalai Laddu', price: 150, image: '/tamil_img/Verkkadalai laddu.jpg', slug: 'verkkadalai-laddu', state: 'tamilnadu', stateName: 'Tamil Nadu' },
    ],
  },
};

export default function StatePage({ params }) {
  const { stateName } = use(params);
  const stateInfo = STATE_INFO[stateName];
  const { t } = useLanguage();
  const [products, setProducts] = useState(stateInfo ? stateInfo.fallbackProducts : []);

  useEffect(() => {
    if (!stateInfo) return;
    fetch(`/api/products?state=${stateName}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch(() => {});
  }, [stateName, stateInfo]);

  if (!stateInfo) {
    return (
      <>
        <Navbar showHome />
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h2>State not found</h2>
          <p>Please check the URL and try again.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar showHome />

      <main className="main_container">
        <section className="states-hero-text">
          <h2>{t(`${stateName}Title`)}</h2>
          <p>{t(stateName === 'tamilnadu' ? 'discoverTamilNadu' : `discover${stateName.charAt(0).toUpperCase() + stateName.slice(1)}`)}</p>
        </section>

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

'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { ui } from '@/lib/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sc_lang');
    if (saved) setLang(saved);
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'ja' : 'en';
    setLang(newLang);
    localStorage.setItem('sc_lang', newLang);
  };

  const t = (key) => {
    if (!mounted) return ui['en'][key] || key; // Default for SSR
    return ui[lang][key] || key;
  };

  const formatPrice = (priceInINR) => {
    if (!mounted) return `₹ ${priceInINR}`;
    if (lang === 'ja') {
      const yen = Math.round(priceInINR * 1.8);
      return `¥ ${yen}`;
    }
    return `₹ ${priceInINR}`;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t, formatPrice, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

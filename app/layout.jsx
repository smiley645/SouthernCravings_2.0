import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import BootstrapClient from '@/components/BootstrapClient';
import Chatbot from '@/components/Chatbot';

export const metadata = {
  title: 'Southern Cravings — Authentic South Indian Snacks & Sweets',
  description: 'Experience the taste of authentic Southern States. Handpicked snacks, sweets, pickles, and spices from Andhra Pradesh, Telangana, Karnataka, Kerala, and Tamil Nadu.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          <AuthProvider>
            {children}
            <Chatbot />
            <BootstrapClient />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function LoginModal({ onClose }) {
  const { login, signup } = useAuth();
  const { t } = useLanguage();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isRegister) {
        if (password !== confirmPassword) {
          setError(t('passwordsDoNotMatch'));
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError(t('passwordLengthError'));
          setLoading(false);
          return;
        }
        await signup(email, password, fullName);
        setSuccess(t('accountCreatedSuccess'));
        setTimeout(() => onClose(), 1500);
      } else {
        await login(email, password);
        setSuccess(t('loginSuccess'));
        setTimeout(() => onClose(), 1000);
      }
    } catch (err) {
      const code = err.code || '';
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError(t('invalidEmailPassword'));
      } else if (code === 'auth/email-already-in-use') {
        setError(t('emailAlreadyInUse'));
      } else if (code === 'auth/invalid-email') {
        setError(t('invalidEmailError'));
      } else if (code === 'auth/weak-password') {
        setError(t('weakPasswordError'));
      } else {
        setError(err.message || 'An error occurred. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="login-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="login-modal-content">
        <button className="login-modal-close" onClick={onClose}>×</button>

        <h2>{isRegister ? t('createAccount') : t('login')}</h2>

        {error && <div className="login-error">{error}</div>}
        {success && <div className="login-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <label htmlFor="fullname">{t('fullNameLabel')}</label>
              <input
                type="text"
                id="fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder={t('fullNamePlaceholder')}
              />
            </>
          )}

          <label htmlFor="email">{t('emailLabel')}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder={t('emailPlaceholder')}
          />

          <label htmlFor="password">{t('passwordLabel')}</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder={t('passwordPlaceholder')}
          />

          {isRegister && (
            <>
              <label htmlFor="confirm">{t('confirmPasswordLabel')}</label>
              <input
                type="password"
                id="confirm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder={t('confirmPasswordPlaceholder')}
              />
            </>
          )}

          <button type="submit" disabled={loading}>
            {loading ? t('pleaseWait') : isRegister ? t('createAccount') : t('login')}
          </button>
        </form>

        <div className="login-toggle">
          {isRegister ? (
            <>{t('alreadyHaveAccount')} <a onClick={() => { setIsRegister(false); setError(''); }}>{t('login')}</a></>
          ) : (
            <>{t('newToSouthernCravings')} <a onClick={() => { setIsRegister(true); setError(''); }}>{t('createAccount')}</a></>
          )}
        </div>
      </div>
    </div>
  );
}

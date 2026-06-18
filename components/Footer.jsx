import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer style={{ width: '100%', backgroundColor: '#d1ebcd', marginTop: '35px' }}>
      <div className="container py-4">
        <div className="row">
          {/* Footer Header */}
          <div className="col-12 text-center mb-4">
            <h2 className="fw-bold">{lang === 'ja' ? 'サザンクレイビングス' : 'SOUTHERN CRAVINGS'}</h2>
            <p className="mb-1">
              {lang === 'ja' 
                ? '✩✩ 南インド各州の味を体験してください ✩✩' 
                : '✩✩ Experience the Taste of Southern States ✩✩'}
            </p>
            <p className="mb-0">
              {t('footerAbout')}
            </p>
          </div>
        </div>
        <div className="row text-center text-md-start g-4">
          {/* Categories */}
          <div className="col-12 col-sm-6 col-md-4">
            <h5 className="fw-semibold">{t('footerCategories')}</h5>
            <ul className="list-unstyled">
              <li>{t('footerPickles')}</li>
              <li>{t('snacks')}</li>
              <li>{t('footerSpices')}</li>
              <li>{t('footerOils')}</li>
            </ul>
          </div>
          {/* Quick Links */}
          <div className="col-12 col-sm-6 col-md-4">
            <h5 className="fw-semibold">{t('footerQuickLinks')}</h5>
            <ul className="list-unstyled">
              <li>{t('footerTerms')}</li>
              <li>{t('footerPrivacy')}</li>
              <li>{t('footerRefund')}</li>
            </ul>
          </div>
          {/* Contact Us */}
          <div className="col-12 col-md-4">
            <h5 className="fw-semibold">{t('footerContactUs')}</h5>
            <p className="mb-1">📍 {lang === 'ja' ? 'カキナダ' : 'Kakinada'}</p>
            <p className="mb-1">📞 +91 123456789</p>
            <p className="mb-0">✉ southerncravings@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

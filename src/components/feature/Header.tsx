import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const services = [
    { name: 'Festgeld', path: '/leistungen/festgeld', icon: 'ri-safe-line', desc: 'Stabile Renditen' },
    { name: 'Flexgeld', path: '/leistungen/flexgeld', icon: 'ri-exchange-line', desc: 'Flexible Laufzeiten' },
    { name: 'Tagesgeld', path: '/leistungen/tagesgeld', icon: 'ri-wallet-3-line', desc: 'Tägliche Verfügbarkeit' },
    { name: 'Aktien', path: '/leistungen/aktien', icon: 'ri-line-chart-line', desc: 'Globale Märkte' },
    { name: 'Anleihen', path: '/leistungen/anleihen', icon: 'ri-stock-line', desc: 'Fixed Income' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-neutral-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                <span className="text-2xl font-bold text-white">J</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
                isScrolled ? 'text-neutral-900' : 'text-white'
              }`}>
                J30
              </span>
              <span className="text-xs text-amber-500 font-semibold">Vermögensverwaltung</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                location.pathname === '/' 
                  ? 'text-amber-500 bg-amber-500/10' 
                  : isScrolled 
                    ? 'text-neutral-700 hover:text-amber-500 hover:bg-amber-500/5' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Startseite
            </Link>
            
            <Link 
              to="/ueber-uns" 
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                location.pathname === '/ueber-uns' 
                  ? 'text-amber-500 bg-amber-500/10' 
                  : isScrolled 
                    ? 'text-neutral-700 hover:text-amber-500 hover:bg-amber-500/5' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Über Uns
            </Link>
            
            <Link 
              to="/team" 
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                location.pathname === '/team' 
                  ? 'text-amber-500 bg-amber-500/10' 
                  : isScrolled 
                    ? 'text-neutral-700 hover:text-amber-500 hover:bg-amber-500/5' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Unser Team
            </Link>
            
            {/* Services Dropdown */}
            <div 
              className="relative" 
              onMouseEnter={() => setIsServicesOpen(true)} 
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center space-x-1 ${
                  location.pathname.startsWith('/leistungen') 
                    ? 'text-amber-500 bg-amber-500/10' 
                    : isScrolled 
                      ? 'text-neutral-700 hover:text-amber-500 hover:bg-amber-500/5' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>Leistungen</span>
                <i className={`ri-arrow-down-s-line text-base transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`}></i>
              </button>
              
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-neutral-100 py-2 overflow-hidden">
                  <div className="px-4 py-2 border-b border-neutral-100">
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Unsere Anlageprodukte</p>
                  </div>
                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-amber-50 transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-500 transition-all duration-200">
                        <i className={`${service.icon} text-lg text-amber-600 group-hover:text-white transition-colors duration-200`}></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-neutral-800 group-hover:text-amber-600 transition-colors duration-200">{service.name}</p>
                        <p className="text-xs text-neutral-500">{service.desc}</p>
                      </div>
                      <i className="ri-arrow-right-line text-base text-neutral-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all duration-200"></i>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to="/maerkte" 
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                location.pathname === '/maerkte' 
                  ? 'text-amber-500 bg-amber-500/10' 
                  : isScrolled 
                    ? 'text-neutral-700 hover:text-amber-500 hover:bg-amber-500/5' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Märkte
            </Link>
            
            <Link 
              to="/blog" 
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                location.pathname === '/blog' 
                  ? 'text-amber-500 bg-amber-500/10' 
                  : isScrolled 
                    ? 'text-neutral-700 hover:text-amber-500 hover:bg-amber-500/5' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Blog & News
            </Link>
            
            <Link 
              to="/kontakt" 
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                location.pathname === '/kontakt' 
                  ? 'text-amber-500 bg-amber-500/10' 
                  : isScrolled 
                    ? 'text-neutral-700 hover:text-amber-500 hover:bg-amber-500/5' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Kontakt
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/login"
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-300 whitespace-nowrap ${
                isScrolled 
                  ? 'text-neutral-700 hover:text-amber-500' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Anmelden
            </Link>
            <Link
              to="/kontakt"
              className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-600 text-white text-sm font-bold rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
            >
              Jetzt starten
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
              isScrolled 
                ? 'bg-neutral-100 hover:bg-neutral-200' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl ${
              isScrolled ? 'text-neutral-900' : 'text-white'
            }`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed top-20 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-20 left-0 right-0 bg-white border-t border-neutral-200 shadow-2xl z-50 transition-all duration-300 ease-in-out transform ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        style={{ maxHeight: 'calc(100vh - 5rem)', overflowY: 'auto' }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
          <Link
            to="/"
            className={`flex items-center space-x-3 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
              location.pathname === '/'
                ? 'text-amber-500 bg-amber-50'
                : 'text-neutral-700 hover:text-amber-500 hover:bg-amber-50'
            }`}
          >
            <i className="ri-home-line text-lg"></i>
            <span>Startseite</span>
          </Link>

          <Link
            to="/ueber-uns"
            className={`flex items-center space-x-3 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
              location.pathname === '/ueber-uns'
                ? 'text-amber-500 bg-amber-50'
                : 'text-neutral-700 hover:text-amber-500 hover:bg-amber-50'
            }`}
          >
            <i className="ri-building-line text-lg"></i>
            <span>Über Uns</span>
          </Link>

          <Link
            to="/team"
            className={`flex items-center space-x-3 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
              location.pathname === '/team'
                ? 'text-amber-500 bg-amber-50'
                : 'text-neutral-700 hover:text-amber-500 hover:bg-amber-50'
            }`}
          >
            <i className="ri-team-line text-lg"></i>
            <span>Unser Team</span>
          </Link>

          <div className="px-4 py-3 bg-neutral-50 rounded-lg my-2">
            <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3 flex items-center space-x-2">
              <i className="ri-service-line"></i>
              <span>Leistungen</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {services.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    location.pathname === service.path
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-white hover:bg-amber-50 text-neutral-700 hover:text-amber-500'
                  }`}
                >
                  <i className={`${service.icon} text-base text-amber-500`}></i>
                  <span className="text-sm font-semibold">{service.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/maerkte"
            className={`flex items-center space-x-3 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
              location.pathname === '/maerkte'
                ? 'text-amber-500 bg-amber-50'
                : 'text-neutral-700 hover:text-amber-500 hover:bg-amber-50'
            }`}
          >
            <i className="ri-stock-line text-lg"></i>
            <span>Märkte</span>
          </Link>

          <Link
            to="/blog"
            className={`flex items-center space-x-3 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
              location.pathname === '/blog'
                ? 'text-amber-500 bg-amber-50'
                : 'text-neutral-700 hover:text-amber-500 hover:bg-amber-50'
            }`}
          >
            <i className="ri-newspaper-line text-lg"></i>
            <span>Blog & News</span>
          </Link>

          <Link
            to="/kontakt"
            className={`flex items-center space-x-3 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
              location.pathname === '/kontakt'
                ? 'text-amber-500 bg-amber-50'
                : 'text-neutral-700 hover:text-amber-500 hover:bg-amber-50'
            }`}
          >
            <i className="ri-mail-line text-lg"></i>
            <span>Kontakt</span>
          </Link>

          <div className="pt-4 pb-2 space-y-3 border-t border-neutral-200 mt-4">
            <Link
              to="/login"
              className="flex items-center justify-center space-x-2 w-full px-6 py-3 text-sm font-bold text-neutral-700 border-2 border-neutral-300 rounded-xl hover:border-amber-500 hover:text-amber-500 transition-all duration-200"
            >
              <i className="ri-login-box-line text-lg"></i>
              <span>Anmelden</span>
            </Link>
            <Link
              to="/kontakt"
              className="flex items-center justify-center space-x-2 w-full px-6 py-3 text-sm font-bold bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <i className="ri-rocket-line text-lg"></i>
              <span>Jetzt starten</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

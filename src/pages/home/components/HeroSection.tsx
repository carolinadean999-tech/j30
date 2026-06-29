import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary-light">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/images/hero-bg-001.jpg"
          alt="Financial District"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary-dark/90 to-primary/95"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-gold rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-gold-light rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-gold/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8 animate-slideDown">
            <i className="ri-shield-check-line text-accent-gold text-xl"></i>
            <span className="text-sm font-semibold text-white">Unabhängige Vermögensverwaltung</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
            Professionelle<br />
            <span className="gradient-text">Kapitalverwaltung</span><br />
            für Ihre Zukunft
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-4xl mx-auto leading-relaxed">
            Professionelle Anlagelösungen für institutionelle und qualifizierte Anleger
          </p>

          {/* Regulatory Notice */}
          <p className="text-sm text-white/70 mb-12 max-w-3xl mx-auto">
            Sitz in Oberhaching | Handelsregister HRB 293622 | Amtsgericht München
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Link to="/kontakt" className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-gold to-accent-gold-light rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative px-10 py-4 bg-gradient-to-r from-accent-gold to-accent-gold-light text-white text-base font-bold rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-300 whitespace-nowrap flex items-center space-x-3">
                <span>Jetzt informieren</span>
                <i className="ri-arrow-right-line text-xl group-hover:translate-x-1 transition-transform duration-300"></i>
              </div>
            </Link>
            
            <Link to="/leistungen/festgeld" className="group px-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white text-base font-bold rounded-2xl hover:bg-white/20 hover:border-accent-gold transition-all duration-300 whitespace-nowrap flex items-center space-x-3">
              <span>Anlageprodukte entdecken</span>
              <i className="ri-arrow-right-line text-xl group-hover:translate-x-1 transition-transform duration-300"></i>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-accent-gold/30 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-gold/20 to-accent-gold-light/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-funds-line text-3xl text-accent-gold"></i>
              </div>
              <p className="text-3xl font-bold text-white mb-2">2,5 Mrd. €</p>
              <p className="text-sm text-white/70">Verwaltetes Vermögen</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-accent-gold/30 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-gold/20 to-accent-gold-light/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-calendar-line text-3xl text-accent-gold"></i>
              </div>
              <p className="text-3xl font-bold text-white mb-2">15+ Jahre</p>
              <p className="text-sm text-white/70">Markterfahrung</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-accent-gold/30 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-gold/20 to-accent-gold-light/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-team-line text-3xl text-accent-gold"></i>
              </div>
              <p className="text-3xl font-bold text-white mb-2">450+</p>
              <p className="text-sm text-white/70">Zufriedene Kunden</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-accent-gold/30 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-gold/20 to-accent-gold-light/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-shield-check-line text-3xl text-accent-gold"></i>
              </div>
              <p className="text-3xl font-bold text-white mb-2">100%</p>
              <p className="text-sm text-white/70">Transparenz</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-accent-gold rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
